#!/bin/bash

# Update photos from SmugMug
# Usage: ./update-photos-from-smugmug.sh [year] [number-of-photos]

YEAR=${1:-2025}
LIMIT=${2:-10}

echo "Fetching $LIMIT photos from $YEAR Headshots gallery..."

# Fetch photos from SmugMug
node smugmug-fetch-photos.js gallery-$YEAR $LIMIT

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Successfully fetched photos!"
    echo "✓ Photo data saved to: smugmug-$YEAR-photos.json"
    echo ""
    echo "You can now use these photos on your website."
    echo "The JSON file contains URLs for different sizes:"
    echo "  - original: Full resolution"
    echo "  - large: Large size"
    echo "  - medium: Medium size"
    echo "  - small: Small size"
    echo "  - thumbnail: Thumbnail size"
else
    echo ""
    echo "❌ Failed to fetch photos from SmugMug"
    exit 1
fi
