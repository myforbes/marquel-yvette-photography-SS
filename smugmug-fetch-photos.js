const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs');

// Load credentials from .env.smugmug
function loadCredentials() {
    if (!fs.existsSync('.env.smugmug')) {
        console.error('Error: .env.smugmug file not found. Run smugmug-auth-simple.js first.');
        process.exit(1);
    }

    const envContent = fs.readFileSync('.env.smugmug', 'utf8');
    const credentials = {};

    envContent.split('\n').forEach(line => {
        if (line.startsWith('#') || !line.trim()) return;
        const [key, value] = line.split('=');
        if (key && value) {
            credentials[key.trim()] = value.trim();
        }
    });

    return {
        apiKey: credentials.SMUGMUG_API_KEY,
        apiSecret: credentials.SMUGMUG_API_SECRET,
        accessToken: credentials.SMUGMUG_ACCESS_TOKEN,
        accessTokenSecret: credentials.SMUGMUG_ACCESS_TOKEN_SECRET,
    };
}

const credentials = loadCredentials();

// Initialize OAuth
const oauth = new OAuth({
    consumer: {
        key: credentials.apiKey,
        secret: credentials.apiSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64');
    },
});

const token = {
    key: credentials.accessToken,
    secret: credentials.accessTokenSecret,
};

// Helper to delay between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Make authenticated SmugMug API request
async function smugmugRequest(url, method = 'GET', params = {}, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
        if (attempt > 0) {
            await delay(1000 * attempt); // Exponential backoff
        }

        const requestData = {
            url,
            method,
            data: params, // Include params in signature
        };

        const authHeader = oauth.authorize(requestData, token);
        const headers = oauth.toHeader(authHeader);

        try {
            const response = await axios({
                url,
                method,
                params,
                headers: {
                    ...headers,
                    'Accept': 'application/json',
                },
            });

            // Small delay to avoid nonce reuse
            await delay(500);

            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data || error.message;

            // Retry on nonce_used error
            if (errorMsg.Message && errorMsg.Message.includes('nonce_used') && attempt < retries - 1) {
                console.log(`Retrying due to nonce collision (attempt ${attempt + 2}/${retries})...`);
                continue;
            }

            console.error('API Error:', errorMsg);
            throw error;
        }
    }
}

// Get the authenticated user
async function getUser() {
    const data = await smugmugRequest('https://api.smugmug.com/api/v2!authuser');
    return data.Response.User;
}

// Get folder and its contents
async function getFolder(folderPath) {
    const url = `https://api.smugmug.com/api/v2/folder/user/marquelforbes${folderPath}`;
    try {
        const data = await smugmugRequest(url);
        return data.Response.Folder;
    } catch (error) {
        return null;
    }
}

// Get albums in a folder
async function getFolderAlbums(folderPath) {
    const url = `https://api.smugmug.com/api/v2/folder/user/marquelforbes${folderPath}!albums`;
    try {
        const data = await smugmugRequest(url);
        return data.Response.Album || [];
    } catch (error) {
        return [];
    }
}

// Get child folders
async function getChildFolders(folderPath) {
    const url = `https://api.smugmug.com/api/v2/folder/user/marquelforbes${folderPath}!children`;
    try {
        const data = await smugmugRequest(url);
        return data.Response.Folder || [];
    } catch (error) {
        return [];
    }
}

// Get user's albums
async function getAlbums(userUri) {
    const data = await smugmugRequest(`https://api.smugmug.com${userUri}`);
    return data.Response.Album || [];
}

// Get album by path using UrlPathLookup
async function getAlbumByPath(path) {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `https://api.smugmug.com/api/v2/user/marquelyvette!urlpathlookup`;

    try {
        const data = await smugmugRequest(url, 'GET', { urlpath: cleanPath });
        if (data.Response.Album) {
            return [data.Response.Album];
        }
        return null;
    } catch (error) {
        console.error(`Could not find album at path: ${path}`);
        return null;
    }
}

// Get images from an album
async function getAlbumImages(albumKey) {
    const url = `https://api.smugmug.com/api/v2/album/${albumKey}!images`;
    const data = await smugmugRequest(url);
    return data.Response.AlbumImage || [];
}

// Get image sizes/URLs
async function getImageSizes(imageKey) {
    const url = `https://api.smugmug.com/api/v2/image/${imageKey}!sizes`;
    const data = await smugmugRequest(url);
    return data.Response.ImageSizes;
}

// Download image
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        if (!command || command === 'help') {
            console.log(`
SmugMug Photo Fetcher

Commands:
  list-albums                    - List all your albums
  explore-folders <path>         - Explore folders at path (default: /)
  list-photos <album-path>       - List photos from an album
  get-photo <image-key> <size>   - Get photo URL (sizes: Small, Medium, Large, XLarge, Original)
  download <image-key> <size> <output> - Download a photo
  gallery-2025                   - Get photos from 2025 Headshots gallery
  gallery-2024                   - Get photos from 2024 Headshots gallery
  gallery-2023                   - Get photos from 2023 Headshots gallery

Examples:
  node smugmug-fetch-photos.js list-albums
  node smugmug-fetch-photos.js explore-folders /All-Images/Headshots
  node smugmug-fetch-photos.js list-photos "All-Images/Headshots/Headshots-2025"
  node smugmug-fetch-photos.js gallery-2025
            `);
            return;
        }

        const user = await getUser();
        console.log(`Authenticated as: ${user.Name} (${user.NickName})\n`);

        switch (command) {
            case 'list-albums': {
                const albums = await getAlbums(user.Uris.UserAlbums.Uri);
                console.log('Your Albums:');
                albums.forEach(album => {
                    console.log(`  - ${album.Name} (${album.ImageCount} images)`);
                    console.log(`    Path: ${album.UrlPath}`);
                    console.log(`    Key: ${album.AlbumKey}`);
                    console.log('');
                });
                break;
            }

            case 'explore-folders': {
                const folderPath = args[1] || '';
                console.log(`Exploring folder: ${folderPath || '/'}\n`);

                const childFolders = await getChildFolders(folderPath);
                if (childFolders.length > 0) {
                    console.log('Subfolders:');
                    childFolders.forEach(folder => {
                        console.log(`  📁 ${folder.Name}`);
                        console.log(`     Path: ${folder.UrlPath}`);
                    });
                    console.log('');
                }

                const albums = await getFolderAlbums(folderPath);
                if (albums.length > 0) {
                    console.log('Albums:');
                    albums.forEach(album => {
                        console.log(`  📷 ${album.Name} (${album.ImageCount} images)`);
                        console.log(`     Path: ${album.UrlPath}`);
                        console.log(`     Key: ${album.AlbumKey}`);
                        console.log('');
                    });
                }

                if (childFolders.length === 0 && albums.length === 0) {
                    console.log('No folders or albums found at this path');
                }
                break;
            }

            case 'list-photos': {
                const albumPath = args[1];
                if (!albumPath) {
                    console.error('Please provide an album path');
                    return;
                }

                const albums = await getAlbumByPath(albumPath);
                if (!albums || albums.length === 0) {
                    console.error('Album not found');
                    return;
                }

                const album = albums[0];
                const images = await getAlbumImages(album.AlbumKey);

                console.log(`Photos in "${album.Name}" (${images.length} images):\n`);
                images.forEach((img, index) => {
                    console.log(`${index + 1}. ${img.FileName}`);
                    console.log(`   Key: ${img.ImageKey}`);
                    console.log(`   Date: ${img.Date || img.DateTimeUploaded}`);
                    console.log('');
                });
                break;
            }

            case 'get-photo': {
                const imageKey = args[1];
                const size = args[2] || 'Large';

                if (!imageKey) {
                    console.error('Please provide an image key');
                    return;
                }

                const sizes = await getImageSizes(imageKey);
                const sizeObj = sizes.find(s => s.Label === size) || sizes[0];

                console.log(`Image URL (${sizeObj.Label}):`);
                console.log(sizeObj.Url);
                console.log(`\nDimensions: ${sizeObj.Width}x${sizeObj.Height}`);
                break;
            }

            case 'download': {
                const imageKey = args[1];
                const size = args[2] || 'Large';
                const output = args[3] || `./downloads/${imageKey}.jpg`;

                if (!imageKey) {
                    console.error('Please provide an image key');
                    return;
                }

                // Create downloads directory if it doesn't exist
                const dir = output.substring(0, output.lastIndexOf('/'));
                if (dir && !fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                const sizes = await getImageSizes(imageKey);
                const sizeObj = sizes.find(s => s.Label === size) || sizes[0];

                console.log(`Downloading ${sizeObj.Label} (${sizeObj.Width}x${sizeObj.Height})...`);
                await downloadImage(sizeObj.Url, output);
                console.log(`✓ Saved to: ${output}`);
                break;
            }

            case 'gallery-2025':
            case 'gallery-2024':
            case 'gallery-2023': {
                const year = command.split('-')[1];
                const path = year === '2025'
                    ? 'All-Images/Headshots/Headshots-2025'
                    : `All-Images/Headshots/${year}`;

                const albums = await getAlbumByPath(path);
                if (!albums || albums.length === 0) {
                    console.error(`Album not found for ${year}`);
                    return;
                }

                const album = albums[0];
                const images = await getAlbumImages(album.AlbumKey);

                console.log(`${year} Headshots Gallery (${images.length} images):\n`);

                // Check if user wants to limit the number of images
                const limit = args[1] ? parseInt(args[1]) : images.length;
                const imagesToProcess = images.slice(0, limit);

                console.log(`Processing ${imagesToProcess.length} images...\n`);

                // Save to JSON for easy use
                const photoData = [];

                for (const img of imagesToProcess) {
                    // Construct image URLs directly using SmugMug's URL pattern
                    // Format: https://photos.smugmug.com/photos/i-{ImageKey}/0/{Size}/i-{ImageKey}-{Size}.jpg
                    const imageKey = img.ImageKey;
                    const ext = img.FileName.toLowerCase().endsWith('.png') ? 'png' : 'jpg';

                    photoData.push({
                        fileName: img.FileName,
                        imageKey: imageKey,
                        date: img.Date || img.DateTimeUploaded,
                        // Direct URLs using SmugMug's pattern
                        original: img.ArchivedUri || `https://photos.smugmug.com/photos/i-${imageKey}/0/O/i-${imageKey}-O.${ext}`,
                        large: `https://photos.smugmug.com/photos/i-${imageKey}/0/L/i-${imageKey}-L.${ext}`,
                        medium: `https://photos.smugmug.com/photos/i-${imageKey}/0/M/i-${imageKey}-M.${ext}`,
                        small: `https://photos.smugmug.com/photos/i-${imageKey}/0/S/i-${imageKey}-S.${ext}`,
                        thumbnail: `https://photos.smugmug.com/photos/i-${imageKey}/0/Th/i-${imageKey}-Th.${ext}`,
                    });

                    console.log(`✓ ${img.FileName}`);
                }

                const outputFile = `smugmug-${year}-photos.json`;
                fs.writeFileSync(outputFile, JSON.stringify(photoData, null, 2));
                console.log(`\n✓ Photo data saved to: ${outputFile}`);
                console.log(`   Total photos in gallery: ${images.length}`);
                console.log(`   Photos saved to file: ${photoData.length}`);
                break;
            }

            default:
                console.error(`Unknown command: ${command}`);
                console.log('Run "node smugmug-fetch-photos.js help" for usage');
        }

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
