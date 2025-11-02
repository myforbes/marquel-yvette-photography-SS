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

# Upload all files with proper cache headers
aws s3 sync . s3://$BUCKET_NAME \
  --delete \
  --exclude "*.backup" \
  --exclude "*.bak*" \
  --exclude "*.tmp" \
  --exclude ".DS_Store" \
  --exclude ".git/*" \
  --exclude "images-original-backup/*" \
  --exclude "deploy-to-aws.sh" \
  --cache-control "public, max-age=31536000, immutable"

echo -e "${GREEN}✓ Files synced to S3${NC}"

echo -e "${BLUE}Step 2: Setting specific cache headers...${NC}"

# HTML files - shorter cache (1 hour)
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=3600" \
  --content-type "text/html; charset=utf-8"

echo -e "${GREEN}✓ Cache headers configured${NC}"

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
