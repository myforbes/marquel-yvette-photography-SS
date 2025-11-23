#!/bin/bash
# deploy-to-aws.sh
# Automated deployment script for Marquel Yvette Photography

set -e  # Exit on error

# Configuration
BUCKET_NAME="marquelyvette-website"
DISTRIBUTION_ID="E50QXXWNUFNYT"  # CloudFront distribution ID

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Deploying Marquel Yvette Photography${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Install with: brew install awscli"
    exit 1
fi

# Check if bucket name is configured
if [ "$BUCKET_NAME" == "marquelyvette-website" ]; then
    echo -e "${RED}Warning: Using default bucket name${NC}"
    echo "Update BUCKET_NAME in this script to your actual S3 bucket name"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${BLUE}Step 1: Syncing files to S3...${NC}"

# Sync CSS files with long cache (1 year)
aws s3 sync ./css s3://$BUCKET_NAME/css \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "text/css"

# Sync JavaScript files with long cache (1 year)
aws s3 sync ./js s3://$BUCKET_NAME/js \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "application/javascript"

# Sync images with long cache (1 year)
aws s3 sync ./images s3://$BUCKET_NAME/images \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

# Sync fonts with long cache (1 year)
if [ -d "fonts" ]; then
  aws s3 sync ./fonts s3://$BUCKET_NAME/fonts \
    --delete \
    --cache-control "public, max-age=31536000, immutable"
fi

# Sync HTML files with shorter cache (1 day)
aws s3 sync . s3://$BUCKET_NAME \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=86400" \
  --content-type "text/html; charset=utf-8"

# Sync JSON files with medium cache (1 week)
aws s3 sync ./data s3://$BUCKET_NAME/data \
  --delete \
  --cache-control "public, max-age=604800" \
  --content-type "application/json"

# Sync other files (config, components, etc.)
aws s3 sync . s3://$BUCKET_NAME \
  --delete \
  --exclude "*.backup" \
  --exclude "*.bak*" \
  --exclude "*.tmp" \
  --exclude ".DS_Store" \
  --exclude ".git/*" \
  --exclude "images-original-backup/*" \
  --exclude "deploy-to-aws.sh" \
  --exclude "*.html" \
  --exclude "css/*" \
  --exclude "js/*" \
  --exclude "images/*" \
  --exclude "fonts/*" \
  --exclude "data/*" \
  --cache-control "public, max-age=31536000"

echo -e "${GREEN}✓ Files synced to S3${NC}"

echo -e "${BLUE}Step 2: Cache headers configured during sync${NC}"
echo -e "${GREEN}✓ Optimized cache headers set:${NC}"
echo "  - HTML: 1 day (86400s)"
echo "  - CSS/JS: 1 year (31536000s) immutable"
echo "  - Images: 1 year (31536000s) immutable"
echo "  - JSON: 1 week (604800s)"

# Invalidate CloudFront cache if distribution ID is set
if [ -n "$DISTRIBUTION_ID" ]; then
    echo -e "${BLUE}Step 3: Invalidating CloudFront cache...${NC}"

    aws cloudfront create-invalidation \
      --distribution-id $DISTRIBUTION_ID \
      --paths "/*" > /dev/null

    echo -e "${GREEN}✓ CloudFront cache invalidated${NC}"
else
    echo -e "${BLUE}Step 3: Skipping CloudFront invalidation (no distribution ID set)${NC}"
    echo "Add your CloudFront distribution ID to this script for automatic cache invalidation"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete! 🚀${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Your website has been deployed to AWS!"
echo ""
echo "URLs:"
echo "  S3: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
if [ -n "$DISTRIBUTION_ID" ]; then
    echo "  CloudFront: https://www.marquelyvette.com"
fi
echo ""
echo "Next steps:"
echo "1. Wait 1-2 minutes for changes to propagate"
echo "2. Test your website"
echo "3. Run PageSpeed Insights: https://pagespeed.web.dev/"
echo ""
