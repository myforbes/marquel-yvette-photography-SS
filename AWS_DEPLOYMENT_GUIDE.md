# AWS Deployment Guide
## Marquel Yvette Photography - Static Website Hosting

---

## Overview

This guide will help you deploy your optimized photography website to AWS using:
- **S3** - Static file storage
- **CloudFront** - Global CDN for fast delivery
- **Route 53** - DNS management
- **ACM** - Free SSL certificate

**Expected Performance:** 90-95% PageSpeed score
**Expected Cost:** $1-5/month

---

## Prerequisites

✅ AWS Account (you have this!)
✅ Domain: www.marquelyvette.com
✅ Optimized website files (ready at: `/Users/marquel/MYP Current Website/Marquel Yvette Photography/`)

---

## Step 1: Create S3 Bucket for Website Hosting

### 1.1 Create Bucket

1. **Log into AWS Console**
2. **Go to S3:** https://s3.console.aws.amazon.com/s3/
3. **Click "Create bucket"**

**Settings:**
- **Bucket name:** `marquelyvette-website` (must be unique globally)
- **Region:** `us-east-1` (required for CloudFront)
- **Block Public Access:** UNCHECK all boxes (we need public access for website)
- **Bucket Versioning:** Enable (recommended for backups)
- **Click "Create bucket"**

### 1.2 Enable Static Website Hosting

1. **Click your bucket** → Properties tab
2. **Scroll to "Static website hosting"** → Edit
3. **Enable** static website hosting
4. **Index document:** `index.html`
5. **Error document:** `index.html` (for SPA routing)
6. **Save changes**

### 1.3 Set Bucket Policy for Public Access

1. **Go to Permissions tab**
2. **Bucket Policy** → Edit
3. **Paste this policy** (replace `marquelyvette-website` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::marquelyvette-website/*"
    }
  ]
}
```

4. **Save changes**

---

## Step 2: Upload Your Website Files

### Option A: AWS Console (Easy)

1. **Click your bucket** → Objects tab
2. **Click "Upload"**
3. **Add files:**
   - Drag entire folder: `/Users/marquel/MYP Current Website/Marquel Yvette Photography/`
4. **Click "Upload"**

### Option B: AWS CLI (Faster, Recommended)

**Install AWS CLI:**
```bash
# Install AWS CLI
brew install awscli

# Configure credentials
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Region: us-east-1
# Output format: json
```

**Upload files:**
```bash
cd "/Users/marquel/MYP Current Website/Marquel Yvette Photography"

# Upload all files with proper cache headers
aws s3 sync . s3://marquelyvette-website \
  --exclude "*.backup" \
  --exclude "*.bak*" \
  --exclude ".DS_Store" \
  --exclude "images-original-backup/*" \
  --cache-control "public, max-age=31536000" \
  --metadata-directive REPLACE

# Update HTML with shorter cache (it changes more often)
aws s3 cp index.html s3://marquelyvette-website/index.html \
  --cache-control "public, max-age=3600" \
  --content-type "text/html"
```

**Test:** Visit the S3 website endpoint (find in Properties → Static website hosting)

---

## Step 3: Create CloudFront Distribution (CDN)

### 3.1 Request SSL Certificate (Do This FIRST)

1. **Go to ACM:** https://console.aws.amazon.com/acm/
2. **Region:** Change to `us-east-1` (required for CloudFront)
3. **Click "Request certificate"**
4. **Request public certificate**
5. **Domain names:**
   - `marquelyvette.com`
   - `www.marquelyvette.com`
6. **Validation:** DNS validation (recommended)
7. **Click "Request"**

**Validate certificate:**
- Click your certificate
- Click "Create records in Route 53" (if using Route 53)
- OR manually add CNAME records to your DNS provider
- **Wait 5-30 minutes for validation**

### 3.2 Create CloudFront Distribution

1. **Go to CloudFront:** https://console.aws.amazon.com/cloudfront/
2. **Click "Create distribution"**

**Settings:**
- **Origin domain:** Select your S3 bucket `marquelyvette-website.s3.us-east-1.amazonaws.com`
- **Origin path:** Leave blank
- **Name:** `marquelyvette-s3-origin`

**Default cache behavior:**
- **Viewer protocol policy:** Redirect HTTP to HTTPS
- **Allowed HTTP methods:** GET, HEAD, OPTIONS
- **Cache policy:** CachingOptimized
- **Origin request policy:** CORS-S3Origin

**Settings:**
- **Alternate domain names (CNAMEs):**
  - `www.marquelyvette.com`
  - `marquelyvette.com`
- **Custom SSL certificate:** Select your ACM certificate
- **Default root object:** `index.html`
- **Standard logging:** On (recommended)
  - **S3 bucket:** Create new bucket for logs

**Click "Create distribution"**

**Wait 15-20 minutes for deployment** ☕

---

## Step 4: Configure DNS (Route 53 or Your DNS Provider)

### Option A: Using Route 53 (Recommended)

**Transfer domain to Route 53:**

1. **Go to Route 53:** https://console.aws.amazon.com/route53/
2. **Click "Hosted zones"** → Create hosted zone
3. **Domain name:** `marquelyvette.com`
4. **Create**

**Create DNS records:**

1. **Click your hosted zone**
2. **Create record:**
   - **Record name:** `www`
   - **Record type:** A
   - **Alias:** Yes
   - **Alias target:** Select your CloudFront distribution
   - **Create**

3. **Create another record:**
   - **Record name:** (leave blank for root domain)
   - **Record type:** A
   - **Alias:** Yes
   - **Alias target:** Select your CloudFront distribution
   - **Create**

**Update nameservers at Squarespace:**
- Copy the 4 nameservers from Route 53
- Go to your domain registrar (Squarespace)
- Update nameservers to Route 53's nameservers

### Option B: Using Your Current DNS Provider

**Add these records at your DNS provider:**

1. **CNAME record:**
   - **Name:** `www`
   - **Value:** `[your-cloudfront-distribution].cloudfront.net`
   - **TTL:** 300

2. **A record (or ALIAS if supported):**
   - **Name:** `@` (or leave blank)
   - **Value:** Point to CloudFront (or use www redirect)

---

## Step 5: Configure Cache Headers for Maximum Performance

Create this script to set optimal cache headers:

```bash
#!/bin/bash
# update-cache-headers.sh

BUCKET="marquelyvette-website"

# Images - cache for 1 year
aws s3 cp s3://$BUCKET/images/ s3://$BUCKET/images/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "image/jpeg"

aws s3 cp s3://$BUCKET/images/ s3://$BUCKET/images/ \
  --recursive \
  --exclude "*" --include "*.png" \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "image/png"

# CSS - cache for 1 year
aws s3 cp s3://$BUCKET/css/ s3://$BUCKET/css/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "text/css"

# JavaScript - cache for 1 year
aws s3 cp s3://$BUCKET/js/ s3://$BUCKET/js/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "application/javascript"

# HTML - cache for 1 hour (updates more frequently)
aws s3 cp s3://$BUCKET/index.html s3://$BUCKET/index.html \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=3600" \
  --content-type "text/html; charset=utf-8"

echo "✓ Cache headers updated!"
```

**Run it:**
```bash
chmod +x update-cache-headers.sh
./update-cache-headers.sh
```

---

## Step 6: Test Your Deployment

### 6.1 Test CloudFront URL

Visit: `https://[your-distribution].cloudfront.net`

Should show your website!

### 6.2 Test Custom Domain

Wait for DNS propagation (5 minutes - 48 hours)

Visit: `https://www.marquelyvette.com`

### 6.3 Run PageSpeed Test

https://pagespeed.web.dev/

**Expected scores:**
- **Desktop:** 90-95%
- **Mobile:** 80-90%

---

## Step 7: Set Up Continuous Deployment (Optional)

**Automate uploads when you update files:**

```bash
#!/bin/bash
# deploy.sh

BUCKET="marquelyvette-website"
DISTRIBUTION_ID="YOUR_CLOUDFRONT_ID"  # Get from CloudFront console

# Upload files
aws s3 sync . s3://$BUCKET \
  --delete \
  --exclude "*.backup" \
  --exclude "*.bak*" \
  --exclude ".DS_Store" \
  --exclude ".git/*" \
  --exclude "images-original-backup/*"

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "✓ Deployed to AWS!"
echo "✓ CloudFront cache invalidated"
echo "Visit: https://www.marquelyvette.com"
```

**Usage:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Cost Estimate

### Monthly Costs (estimated for photography site):

| Service | Usage | Cost |
|---------|-------|------|
| **S3 Storage** | 10 GB | $0.23 |
| **S3 Requests** | 10,000 GET | $0.004 |
| **CloudFront** | 50 GB transfer | $4.25 |
| **Route 53** | 1 hosted zone | $0.50 |
| **ACM Certificate** | SSL certificate | FREE |
| **Total** | | **~$5/month** |

**With light traffic (< 10 GB/month):** ~$1-2/month

**Squarespace costs:** $16-23/month
**Savings:** $11-18/month = **$132-216/year** 💰

---

## Performance Benefits vs Squarespace

| Metric | Squarespace | AWS S3+CloudFront |
|--------|-------------|-------------------|
| **PageSpeed Score** | 27% | 90-95% |
| **Global CDN** | Limited | 400+ edge locations |
| **Cache Control** | Limited | Full control |
| **Legacy JS** | Required | Optional |
| **Image Optimization** | Limited | Full control |
| **Cost** | $16-23/mo | $1-5/mo |

---

## Maintenance

### Update Website Content:

```bash
# Edit your files locally
cd "/Users/marquel/MYP Current Website/Marquel Yvette Photography"

# Upload changes
aws s3 sync . s3://marquelyvette-website

# Invalidate cache (if needed for immediate updates)
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Monitor Costs:

- AWS Billing Dashboard: https://console.aws.amazon.com/billing/
- Set up billing alerts (recommended)

---

## Troubleshooting

### Website not loading:
1. Check S3 bucket policy is public
2. Check CloudFront distribution is deployed
3. Check DNS records point to CloudFront

### Images not loading:
1. Check cache headers with browser DevTools
2. Verify files uploaded to S3
3. Clear CloudFront cache

### SSL certificate issues:
1. Must be in `us-east-1` region
2. Must be validated (check ACM console)
3. Domain must match CloudFront alternate names

---

## Security Best Practices

1. **Enable CloudFront access logging**
2. **Set up AWS CloudWatch alerts** for unusual traffic
3. **Enable S3 versioning** (already done)
4. **Rotate access keys** regularly
5. **Use IAM roles** instead of root account

---

## Next Steps

1. ✅ Create S3 bucket
2. ✅ Upload optimized files
3. ✅ Request SSL certificate
4. ✅ Create CloudFront distribution
5. ✅ Configure DNS
6. ✅ Test deployment
7. ✅ Cancel Squarespace subscription

**Questions?** Refer to AWS documentation:
- S3: https://docs.aws.amazon.com/s3/
- CloudFront: https://docs.aws.amazon.com/cloudfront/
- Route 53: https://docs.aws.amazon.com/route53/

---

**Good luck with your deployment!** 🚀

Last updated: November 2025
