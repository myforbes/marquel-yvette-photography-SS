# CloudFront Functions

This directory contains CloudFront Functions used for the Marquel Yvette Photography website.

## url-rewrite-function.js

**Purpose:** Enforces clean URLs by redirecting .html URLs to clean versions and internally rewriting clean URLs to serve .html files from S3.

**Behavior:**
- Redirects `/headshots.html` → `/headshots` (301 redirect)
- Rewrites `/headshots` → `/headshots.html` internally to serve the file
- Handles directory paths by appending `index.html`

**Deployment:**

To update this function in CloudFront:

```bash
# Update the function (get current ETag first)
ETAG=$(aws cloudfront describe-function --name url-rewrite-function --stage LIVE --query 'ETag' --output text)

# Update the function code
aws cloudfront update-function \
  --name url-rewrite-function \
  --function-code fileb://cloudfront/url-rewrite-function.js \
  --function-config Comment="Redirects .html URLs to clean URLs and rewrites clean URLs to serve .html files",Runtime=cloudfront-js-1.0 \
  --if-match $ETAG

# Get new ETag
NEW_ETAG=$(aws cloudfront describe-function --name url-rewrite-function --query 'ETag' --output text)

# Publish to LIVE
aws cloudfront publish-function \
  --name url-rewrite-function \
  --if-match $NEW_ETAG
```

**Function ARN:** `arn:aws:cloudfront::976340105051:function/url-rewrite-function`
**Distribution ID:** E50QXXWNUFNYT
