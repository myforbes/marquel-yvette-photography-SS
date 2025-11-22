# SmugMug API Integration

This integration allows you to fetch photos from your SmugMug galleries (including password-protected ones) to use on your website.

## Setup (Already Complete!)

Your SmugMug API is already set up and authenticated. Your credentials are stored in `.env.smugmug`.

## Quick Start

### Fetch Photos from a Gallery

```bash
# Fetch all 100 photos from 2025 Headshots
node smugmug-fetch-photos.js gallery-2025

# Fetch only 10 photos from 2025 Headshots
node smugmug-fetch-photos.js gallery-2025 10

# Fetch from 2024 gallery
node smugmug-fetch-photos.js gallery-2024

# Fetch from 2023 gallery
node smugmug-fetch-photos.js gallery-2023
```

Or use the helper script:

```bash
# Fetch 10 photos from 2025
./update-photos-from-smugmug.sh 2025 10

# Fetch 20 photos from 2024
./update-photos-from-smugmug.sh 2024 20
```

## Output

The scripts create a JSON file (e.g., `smugmug-2025-photos.json`) with photo data:

```json
[
  {
    "fileName": "CharlesDyson.jpg",
    "imageKey": "ZVK5M6b",
    "date": "2025-11-21T04:52:47+00:00",
    "original": "https://photos.smugmug.com/...",
    "large": "https://photos.smugmug.com/photos/i-ZVK5M6b/0/L/i-ZVK5M6b-L.jpg",
    "medium": "https://photos.smugmug.com/photos/i-ZVK5M6b/0/M/i-ZVK5M6b-M.jpg",
    "small": "https://photos.smugmug.com/photos/i-ZVK5M6b/0/S/i-ZVK5M6b-S.jpg",
    "thumbnail": "https://photos.smugmug.com/photos/i-ZVK5M6b/0/Th/i-ZVK5M6b-Th.jpg"
  }
]
```

## Available Commands

```bash
# List all your albums
node smugmug-fetch-photos.js list-albums

# List photos from a specific album
node smugmug-fetch-photos.js list-photos "All-Images/Headshots/Headshots-2025"

# Get photo URL for a specific image key
node smugmug-fetch-photos.js get-photo ZVK5M6b Large

# Download a photo
node smugmug-fetch-photos.js download ZVK5M6b Large ./my-photo.jpg

# Show help
node smugmug-fetch-photos.js help
```

## Using Photos on Your Website

The JSON file contains direct URLs to your SmugMug photos in various sizes. You can:

1. **Direct linking** - Use the URLs directly in your HTML `<img>` tags
2. **Download locally** - Download the photos and host them locally
3. **Dynamic loading** - Load the JSON file with JavaScript and display photos dynamically

Example using the JSON:

```javascript
fetch('smugmug-2025-photos.json')
  .then(response => response.json())
  .then(photos => {
    photos.forEach(photo => {
      console.log(photo.fileName, photo.large);
      // Create img elements, etc.
    });
  });
```

## Image Size Guide

- **original**: Full resolution (largest file size)
- **large**: ~1024px
- **medium**: ~600px
- **small**: ~400px
- **thumbnail**: ~150px

## Files Created

- `.env.smugmug` - Your API credentials (keep this secure!)
- `smugmug-fetch-photos.js` - Main script for fetching photos
- `smugmug-auth-simple.js` - OAuth authentication script (already run)
- `update-photos-from-smugmug.sh` - Convenience script
- `smugmug-YEAR-photos.json` - Photo data files

## Security Note

The `.env.smugmug` file contains your API credentials. Keep this file secure and never commit it to a public repository.

## Troubleshooting

If you encounter authentication issues:

1. Check that `.env.smugmug` exists and has your credentials
2. The credentials should not expire, but if they do, re-run:
   ```bash
   node smugmug-auth-simple.js
   ```
   And follow the authorization prompts again.

## Gallery Paths

Your SmugMug galleries are located at:
- 2025: `/All-Images/Headshots/Headshots-2025` (100 images)
- 2024: `/All-Images/Headshots/2024`
- 2023: `/All-Images/Headshots/2023`
