# CloudFront Security Headers Setup

This guide explains how to deploy security headers to your CloudFront distribution.

## Quick Setup via AWS Console

### Step 1: Create the CloudFront Function

1. Go to **AWS Console** → **CloudFront** → **Functions**
2. Click **Create function**
3. Name it: `security-headers`
4. Copy the contents of `cloudfront-security-headers.js` into the function code editor
5. Click **Save changes**
6. Click **Publish** to make it live

### Step 2: Associate with Your Distribution

1. Go to **CloudFront** → **Distributions**
2. Select your distribution (for marquelyvette.com)
3. Go to the **Behaviors** tab
4. Edit the **Default (*)** behavior
5. Under **Function associations**:
   - **Viewer response**: Select `security-headers`
6. Click **Save changes**
7. Wait for the distribution to deploy (Status: "Deployed")

### Step 3: Verify Headers

Test that headers are working:

```bash
curl -I https://www.marquelyvette.com
```

You should see these headers in the response:
- `strict-transport-security`
- `x-content-type-options`
- `x-frame-options`
- `x-xss-protection`
- `referrer-policy`
- `permissions-policy`
- `content-security-policy`

## Alternative: AWS CLI Deployment

```bash
# Create the function
aws cloudfront create-function \
  --name security-headers \
  --function-config Comment="Add security headers",Runtime="cloudfront-js-2.0" \
  --function-code fileb://cloudfront-security-headers.js

# Publish the function
aws cloudfront publish-function \
  --name security-headers \
  --if-match <ETAG_FROM_CREATE>

# Update distribution behavior (requires updating the distribution config)
```

## What These Headers Do

| Header | Purpose |
|--------|---------|
| `Strict-Transport-Security` | Forces browsers to use HTTPS for 1 year |
| `X-Content-Type-Options` | Prevents browsers from MIME-sniffing |
| `X-Frame-Options` | Prevents your site from being embedded in iframes (clickjacking) |
| `X-XSS-Protection` | Enables browser's XSS filter (legacy browsers) |
| `Referrer-Policy` | Controls what referrer info is sent with requests |
| `Permissions-Policy` | Restricts access to browser features like camera, mic |
| `Content-Security-Policy` | Prevents XSS by controlling what resources can load |

## Content Security Policy Details

The CSP is configured for your specific integrations:
- **LeadConnector**: Forms, booking, webhooks
- **Google Analytics/Tag Manager**: Tracking scripts
- **Google Fonts**: Web fonts
- **YouTube**: Embedded videos (if used)

If you add new external services, you may need to update the CSP.

## Troubleshooting

### Something broken after adding headers?

The Content-Security-Policy might be blocking legitimate resources. Check:
1. Open browser DevTools → Console
2. Look for CSP violation errors
3. Add the blocked domain to the appropriate CSP directive

### Common CSP fixes:

- New script blocked? Add to `script-src`
- New iframe blocked? Add to `frame-src`
- New image source? Add to `img-src`
- API calls blocked? Add to `connect-src`
