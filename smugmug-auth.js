const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
const readline = require('readline');

// SmugMug API configuration
const SMUGMUG_API_BASE = 'https://api.smugmug.com';
const REQUEST_TOKEN_URL = `${SMUGMUG_API_BASE}/services/oauth/1.0a/getRequestToken`;
const AUTHORIZE_URL = `${SMUGMUG_API_BASE}/services/oauth/1.0a/authorize`;
const ACCESS_TOKEN_URL = `${SMUGMUG_API_BASE}/services/oauth/1.0a/getAccessToken`;

// You'll need to provide these
const API_KEY = process.env.SMUGMUG_API_KEY || '';
const API_SECRET = process.env.SMUGMUG_API_SECRET || '';

if (!API_KEY || !API_SECRET) {
    console.error('Error: Please set SMUGMUG_API_KEY and SMUGMUG_API_SECRET environment variables');
    console.error('Usage: SMUGMUG_API_KEY="your-key" SMUGMUG_API_SECRET="your-secret" node smugmug-auth.js');
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

// Helper function to parse query string
function parseQueryString(queryString) {
    const params = {};
    queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Helper to get user input
function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function getRequestToken() {
    console.log('Step 1: Getting request token...');

    const requestData = {
        url: REQUEST_TOKEN_URL,
        method: 'GET',
        data: {
            oauth_callback: 'oob', // Out of band - user will manually enter the verifier
        },
    };

    const headers = oauth.toHeader(oauth.authorize(requestData));

    try {
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
    } catch (error) {
        console.error('Error getting request token:', error.response?.data || error.message);
        throw error;
    }
}

async function getAccessToken(requestToken, requestTokenSecret, verifier) {
    console.log('\nStep 3: Exchanging for access token...');

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

    try {
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
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw error;
    }
}

async function main() {
    try {
        // Step 1: Get request token
        const { oauth_token, oauth_token_secret } = await getRequestToken();
        console.log('✓ Request token obtained');

        // Step 2: Direct user to authorize
        const authUrl = `${AUTHORIZE_URL}?oauth_token=${oauth_token}&Access=Full&Permissions=Read`;
        console.log('\nStep 2: Please visit this URL to authorize the application:');
        console.log('\n' + authUrl + '\n');
        console.log('After authorizing, you will receive a 6-digit verification code.');

        const verifier = await getUserInput('Enter the verification code: ');

        // Step 3: Get access token
        const accessToken = await getAccessToken(oauth_token, oauth_token_secret, verifier.trim());

        console.log('\n✓ Success! Your OAuth credentials:');
        console.log('\n================================');
        console.log('API_KEY=' + API_KEY);
        console.log('API_SECRET=' + API_SECRET);
        console.log('ACCESS_TOKEN=' + accessToken.oauth_token);
        console.log('ACCESS_TOKEN_SECRET=' + accessToken.oauth_token_secret);
        console.log('================================\n');
        console.log('Save these credentials securely. You\'ll need them to access your SmugMug photos.');

        // Save to .env file
        const envContent = `# SmugMug API Credentials
SMUGMUG_API_KEY=${API_KEY}
SMUGMUG_API_SECRET=${API_SECRET}
SMUGMUG_ACCESS_TOKEN=${accessToken.oauth_token}
SMUGMUG_ACCESS_TOKEN_SECRET=${accessToken.oauth_token_secret}
`;

        const fs = require('fs');
        fs.writeFileSync('.env.smugmug', envContent);
        console.log('Credentials saved to .env.smugmug\n');

    } catch (error) {
        console.error('\n❌ Authentication failed:', error.message);
        process.exit(1);
    }
}

main();
