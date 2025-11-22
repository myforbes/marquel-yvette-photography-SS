const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs');

// Load credentials
const envContent = fs.readFileSync('.env.smugmug', 'utf8');
const credentials = {};
envContent.split('\n').forEach(line => {
    if (line.startsWith('#') || !line.trim()) return;
    const [key, value] = line.split('=');
    if (key && value) credentials[key.trim()] = value.trim();
});

const oauth = new OAuth({
    consumer: { key: credentials.SMUGMUG_API_KEY, secret: credentials.SMUGMUG_API_SECRET },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
});

const token = {
    key: credentials.SMUGMUG_ACCESS_TOKEN,
    secret: credentials.SMUGMUG_ACCESS_TOKEN_SECRET,
};

async function smugmugRequest(url) {
    const requestData = { url, method: 'GET' };
    const authHeader = oauth.authorize(requestData, token);
    const headers = oauth.toHeader(authHeader);

    const response = await axios({
        url,
        method: 'GET',
        headers: { ...headers, 'Accept': 'application/json' },
    });

    return response.data;
}

async function main() {
    try {
        // Get user info
        const userResponse = await smugmugRequest('https://api.smugmug.com/api/v2!authuser');
        const user = userResponse.Response.User;

        console.log('User Info:');
        console.log(JSON.stringify(user, null, 2));

        // Try to get the user's node
        console.log('\n\nTrying UserProfile...');
        if (user.Uris.UserProfile) {
            const profileResponse = await smugmugRequest(`https://api.smugmug.com${user.Uris.UserProfile.Uri}`);
            console.log(JSON.stringify(profileResponse.Response, null, 2));
        }

        // Try to get the node
        console.log('\n\nTrying Node...');
        if (user.Uris.Node) {
            const nodeResponse = await smugmugRequest(`https://api.smugmug.com${user.Uris.Node.Uri}`);
            console.log(JSON.stringify(nodeResponse.Response, null, 2));
        }

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

main();
