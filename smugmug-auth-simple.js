const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');

// SmugMug API configuration
const SMUGMUG_API_BASE = 'https://api.smugmug.com';
const REQUEST_TOKEN_URL = `${SMUGMUG_API_BASE}/services/oauth/1.0a/getRequestToken`;
const AUTHORIZE_URL = `${SMUGMUG_API_BASE}/services/oauth/1.0a/authorize`;
const ACCESS_TOKEN_URL = `${SMUGMUG_API_BASE}/services/oauth/1.0a/getAccessToken`;

const API_KEY = process.env.SMUGMUG_API_KEY || '';
const API_SECRET = process.env.SMUGMUG_API_SECRET || '';
const VERIFIER = process.argv[2];

if (!API_KEY || !API_SECRET) {
    console.error('Error: Please set SMUGMUG_API_KEY and SMUGMUG_API_SECRET environment variables');
    process.exit(1);
}

// Initialize OAuth
const oauth = new OAuth({
    consumer: {
        key: API_KEY,
        secret: API_SECRET,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64');
    },
});

function parseQueryString(queryString) {
    const params = {};
    queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

async function getRequestToken() {
    console.log('Step 1: Getting request token...');

    const requestData = {
        url: REQUEST_TOKEN_URL,
        method: 'GET',
        data: {
            oauth_callback: 'oob',
        },
    };

    const headers = oauth.toHeader(oauth.authorize(requestData));

    const response = await axios({
        url: REQUEST_TOKEN_URL,
        method: 'GET',
        params: { oauth_callback: 'oob' },
        headers: {
            ...headers,
            'Accept': 'application/json',
        },
    });

    const tokens = parseQueryString(response.data);
    return {
        oauth_token: tokens.oauth_token,
        oauth_token_secret: tokens.oauth_token_secret,
    };
}

async function getAccessToken(requestToken, requestTokenSecret, verifier) {
    console.log('Step 2: Exchanging for access token...');

    const token = {
        key: requestToken,
        secret: requestTokenSecret,
    };

    const requestData = {
        url: ACCESS_TOKEN_URL,
        method: 'GET',
        data: {
            oauth_verifier: verifier,
        },
    };

    const authHeader = oauth.authorize(requestData, token);
    const headers = oauth.toHeader(authHeader);

    const response = await axios({
        url: ACCESS_TOKEN_URL,
        method: 'GET',
        params: { oauth_verifier: verifier },
        headers: {
            ...headers,
            'Accept': 'application/json',
        },
    });

    const tokens = parseQueryString(response.data);
    return {
        oauth_token: tokens.oauth_token,
        oauth_token_secret: tokens.oauth_token_secret,
    };
}

async function main() {
    try {
        const { oauth_token, oauth_token_secret } = await getRequestToken();
        console.log('✓ Request token obtained');

        const authUrl = `${AUTHORIZE_URL}?oauth_token=${oauth_token}&Access=Full&Permissions=Read`;
        console.log('\nAuthorization URL:');
        console.log(authUrl);

        if (!VERIFIER) {
            console.log('\nPlease visit the URL above, authorize the app, and run:');
            console.log(`SMUGMUG_API_KEY="${API_KEY}" SMUGMUG_API_SECRET="${API_SECRET}" node smugmug-auth-simple.js <VERIFIER_CODE>`);

            // Save the tokens for the next run
            const fs = require('fs');
            fs.writeFileSync('.smugmug-temp-tokens.json', JSON.stringify({
                oauth_token,
                oauth_token_secret,
            }));
            console.log('\nRequest token saved. Run the command above with your verifier code.');
            return;
        }

        // If we have a verifier, try to use saved tokens first
        let requestToken = oauth_token;
        let requestTokenSecret = oauth_token_secret;

        const fs = require('fs');
        if (fs.existsSync('.smugmug-temp-tokens.json')) {
            const saved = JSON.parse(fs.readFileSync('.smugmug-temp-tokens.json', 'utf8'));
            requestToken = saved.oauth_token;
            requestTokenSecret = saved.oauth_token_secret;
            console.log('Using saved request token...');
        }

        const accessToken = await getAccessToken(requestToken, requestTokenSecret, VERIFIER);

        console.log('\n✓ Success! Your OAuth credentials:');
        console.log('\n================================');
        console.log('SMUGMUG_API_KEY=' + API_KEY);
        console.log('SMUGMUG_API_SECRET=' + API_SECRET);
        console.log('SMUGMUG_ACCESS_TOKEN=' + accessToken.oauth_token);
        console.log('SMUGMUG_ACCESS_TOKEN_SECRET=' + accessToken.oauth_token_secret);
        console.log('================================\n');

        const envContent = `# SmugMug API Credentials
SMUGMUG_API_KEY=${API_KEY}
SMUGMUG_API_SECRET=${API_SECRET}
SMUGMUG_ACCESS_TOKEN=${accessToken.oauth_token}
SMUGMUG_ACCESS_TOKEN_SECRET=${accessToken.oauth_token_secret}
`;

        fs.writeFileSync('.env.smugmug', envContent);
        console.log('Credentials saved to .env.smugmug');

        // Clean up temp file
        if (fs.existsSync('.smugmug-temp-tokens.json')) {
            fs.unlinkSync('.smugmug-temp-tokens.json');
        }

    } catch (error) {
        console.error('\n❌ Error:', error.response?.data || error.message);
        process.exit(1);
    }
}

main();
