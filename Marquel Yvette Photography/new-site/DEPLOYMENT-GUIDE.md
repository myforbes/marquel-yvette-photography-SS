# Easy Deployment Guide

## Quick Deploy - One Command!

After making any changes to your website, just run:

```bash
./deploy.sh "Brief description of what you changed"
```

### Examples:

```bash
./deploy.sh "Updated pricing on rates page"
```

```bash
./deploy.sh "Changed hero text on workplace headshots"
```

```bash
./deploy.sh "Added new testimonial"
```

## What the Script Does Automatically:

1. ✅ Adds all your changes to git
2. ✅ Commits with your message
3. ✅ Pushes to GitHub
4. ✅ Syncs everything to S3
5. ✅ Clears CloudFront cache
6. ✅ Shows you when it's done!

## Step-by-Step Workflow:

### 1. Make Your Changes
Edit any JSON file (like `data/workplace-headshots.json` or `data/rates-content.json`)

### 2. Deploy
```bash
./deploy.sh "What you changed"
```

### 3. Wait
The script takes about 30-60 seconds to complete.

### 4. Done!
Your changes are live at https://d1pqc8zade8idc.cloudfront.net/

## First Time Setup:

If you get a "permission denied" error, run this once:
```bash
chmod +x deploy.sh
```

## Tips:

- **Always include a message** - It helps you remember what you changed
- **Be specific** - "Updated Express package pricing" is better than "changed stuff"
- **Test locally first** - Open the HTML file in your browser before deploying
- **Cache might delay** - Users may need to refresh (Ctrl+Shift+R) to see changes

## Common Scenarios:

### Updating Content via JSON Files:
```bash
# 1. Edit data/workplace-headshots.json or data/rates-content.json
# 2. Run:
./deploy.sh "Updated hero section text"
```

### Changing Images:
```bash
# 1. Add new images to images/ folder
# 2. Update JSON file to reference new images
# 3. Run:
./deploy.sh "Added new portfolio images"
```

### Multiple Changes:
```bash
# 1. Make all your edits
# 2. Run:
./deploy.sh "Updated pricing and added testimonials"
```

## That's It!

No more typing long commands. Just edit your files and run `./deploy.sh "message"` - we handle the rest!
