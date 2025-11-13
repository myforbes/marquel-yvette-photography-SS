#!/bin/bash

# Simple deployment script for Marquel Yvette Photography website
# Usage: ./deploy.sh "Your commit message here"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if commit message was provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide a commit message${NC}"
    echo "Usage: ./deploy.sh \"Your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"

echo -e "${BLUE}Starting deployment...${NC}\n"

# Step 1: Git add all changes
echo -e "${BLUE}1. Adding changes to git...${NC}"
git add .
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to add files to git${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Changes added${NC}\n"

# Step 2: Commit changes
echo -e "${BLUE}2. Committing changes...${NC}"
git commit -m "$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
if [ $? -ne 0 ]; then
    echo -e "${RED}Commit failed (maybe no changes?)${NC}"
    # Don't exit - might just be no changes to commit
fi
echo -e "${GREEN}✓ Changes committed${NC}\n"

# Step 3: Push to GitHub
echo -e "${BLUE}3. Pushing to GitHub...${NC}"
git push
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to GitHub${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Pushed to GitHub${NC}\n"

# Step 4: Sync to S3
echo -e "${BLUE}4. Syncing to S3...${NC}"
aws s3 sync . s3://marquelyvette-website/ \
    --exclude "*.DS_Store" \
    --exclude ".git/*" \
    --exclude "components/*" \
    --exclude "node_modules/*" \
    --exclude "*.md"
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to sync to S3${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Synced to S3${NC}\n"

# Step 5: Invalidate CloudFront cache
echo -e "${BLUE}5. Invalidating CloudFront cache...${NC}"
aws cloudfront create-invalidation \
    --distribution-id E50QXXWNUFNYT \
    --paths "/*" > /dev/null
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to invalidate CloudFront cache${NC}"
    exit 1
fi
echo -e "${GREEN}✓ CloudFront cache invalidated${NC}\n"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Your changes are now live at:"
echo -e "${BLUE}https://d1pqc8zade8idc.cloudfront.net/${NC}\n"
