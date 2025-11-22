# Site Configuration

## Overview

This directory contains the **site-config.json** file, which is the single source of truth for all SEO metadata, Open Graph tags, business information, and Schema.org structured data.

**You only need to edit this ONE file** to update your website's meta information - no HTML editing required!

## The Configuration File

**File:** `config/site-config.json`

This JSON file contains all the information that appears in:
- Page title (browser tab)
- Meta description (search engine results)
- Open Graph tags (social media sharing previews)
- Schema.org data (Google search results)
- Business contact information

## How to Update Your Website Information

### Step 1: Open the Config File

Open `config/site-config.json` in any text editor.

### Step 2: Edit the Values

Simply change the text between the quotes. For example:

**Before:**
```json
"title": "Premium Headshots | Washington DC Metro | Marquel Yvette"
```

**After:**
```json
"title": "Professional Headshots | Best Photographer in DC | Marquel Yvette"
```

### Step 3: Save and Deploy

1. Save the file
2. Deploy to AWS:
   ```bash
   aws s3 cp config/site-config.json s3://marquelyvette-website/config/site-config.json
   aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/config/*"
   ```

That's it! Your changes will be live.

## Configuration Sections

### 1. Site Information

```json
"site": {
  "title": "Your page title (appears in browser tab)",
  "description": "Your site description (appears in search results)",
  "url": "https://www.marquelyvette.com",
  "language": "en"
}
```

**When to update:**
- Changing your main headline or tagline
- Updating your site description for SEO
- Rebranding

### 2. SEO Keywords

```json
"seo": {
  "keywords": "headshots, professional photography, corporate headshots, DC Metro",
  "author": "Marquel Yvette Photography"
}
```

**When to update:**
- Adding new services
- Targeting new keywords
- Expanding to new locations

### 3. Open Graph (Social Media)

```json
"openGraph": {
  "siteName": "Professional Headshot Photographer | Loudoun County, VA",
  "title": "Premium Headshots | Washington DC Metro | Marquel Yvette",
  "description": "Elevate your image with premium headshots...",
  "type": "website",
  "url": "https://www.marquelyvette.com",
  "image": "https://www.marquelyvette.com/images/og-image.jpg"
}
```

**When to update:**
- Changing how your site appears when shared on Facebook, LinkedIn, Twitter
- Updating the preview image (og:image)
- Updating your social media description

**Tips:**
- `image` should be 1200x630px for best results
- `description` should be 155-160 characters max

### 4. Business Information

```json
"business": {
  "name": "Marquel Yvette Photography",
  "type": "ProfessionalService",
  "description": "Loudoun County Virginia's Professional Headshot Photographer...",
  "phone": "(703)957-0643",
  "email": "",
  "logo": "https://...",
  "address": {
    "street": "42570 Unbridleds Song Place",
    "city": "South Riding",
    "state": "VA",
    "zip": "20152",
    "country": "US"
  }
}
```

**When to update:**
- Business address changes
- Phone number changes
- Business name/branding update
- Adding email contact

### 5. Location (GPS Coordinates)

```json
"location": {
  "latitude": 38.90439543593189,
  "longitude": -77.52974177231496
}
```

**When to update:**
- Moving studio location
- Opening new locations

**How to get coordinates:**
1. Go to Google Maps
2. Right-click your location
3. Click the coordinates to copy them

### 6. Business Hours

```json
"hours": {
  "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "opens": "00:00",
  "closes": "23:59"
}
```

**When to update:**
- Changing availability
- Setting specific hours (e.g., "09:00" to "17:00")
- Removing days you're closed

**Format:** Use 24-hour time (00:00 - 23:59)

### 7. Social Media

```json
"social": {
  "facebook": "https://www.facebook.com/marquelyvettephotography",
  "instagram": "https://www.instagram.com/marquelyvettephotography",
  "linkedin": "https://www.linkedin.com/in/marquelforbes/"
}
```

**When to update:**
- Changing social media usernames
- Adding new social platforms
- Removing old accounts

### 8. Assets (Favicon)

```json
"assets": {
  "favicon": "https://..."
}
```

**When to update:**
- Changing your site icon
- Updating branding

## Common Updates

### Update Page Title
```json
"site": {
  "title": "Your New Page Title Here"
}
```

### Update Meta Description
```json
"site": {
  "description": "Your new description for search engines (155 characters max)"
}
```

### Update Phone Number
```json
"business": {
  "phone": "(703)555-1234"
}
```

### Update Address
```json
"address": {
  "street": "123 New Street",
  "city": "New City",
  "state": "VA",
  "zip": "12345",
  "country": "US"
}
```

### Update Social Media Link
```json
"social": {
  "instagram": "https://www.instagram.com/yournewhandle"
}
```

## JSON Formatting Rules

**Important:** JSON is very strict about formatting. Follow these rules:

1. ✅ **Use double quotes** around all text
   - ✅ Correct: `"title": "My Title"`
   - ❌ Wrong: `'title': 'My Title'`

2. ✅ **Use commas** between items (but NOT after the last item in a section)
   - ✅ Correct: `"title": "...",` (comma if more items follow)
   - ✅ Correct: `"url": "..."` (no comma on last item)
   - ❌ Wrong: `"url": "...",` (comma on last item)

3. ✅ **Keep the structure** - don't remove entire sections, just change values

4. ✅ **Numbers don't need quotes**
   - ✅ Correct: `"latitude": 38.904`
   - ❌ Wrong: `"latitude": "38.904"`

## Testing Your Changes

Before deploying, you can validate your JSON:
1. Go to https://jsonlint.com
2. Paste your entire config file
3. Click "Validate JSON"
4. Fix any errors it finds

## Deployment

After making changes:

```bash
# Navigate to project
cd "Marquel Yvette Photography/new-site"

# Upload config file
aws s3 cp config/site-config.json s3://marquelyvette-website/config/site-config.json

# Clear cache
aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/config/*"

# Wait 1-2 minutes for changes to appear
```

## Troubleshooting

### Problem: Changes aren't showing up
**Solution:** Clear your browser cache or wait 1-2 minutes for CloudFront to update

### Problem: Site shows "Loading..." in title
**Solution:** The config file has a JSON error. Validate at jsonlint.com

### Problem: JSON validation errors
**Solution:** Check for:
- Missing or extra commas
- Single quotes instead of double quotes
- Missing closing braces `}` or brackets `]`

## Need Help?

If you encounter issues:
1. Validate JSON at https://jsonlint.com
2. Check the browser console (F12) for errors
3. Contact your developer

---

**Last Updated:** November 2, 2025
