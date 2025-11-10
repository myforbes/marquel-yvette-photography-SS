# Page Metadata Guide

## Centralized Front Matter Management

All page metadata (SEO, titles, descriptions, Open Graph tags) is managed from **ONE FILE**: `config/pages.json`

This makes it easy to update page titles, descriptions, and SEO across your entire website!

---

## Quick Start: Updating Page Metadata

### Step 1: Open config/pages.json

All metadata for every page is stored in this single configuration file.

### Step 2: Find Your Page

Pages are organized by key:
- `homepage` - index.html
- `rates` - rates-2.html
- `contact` - contact.html
- `contactThankYou` - contact-thank-you.html
- `requestProposal` - request-proposal.html
- `teamPhotography` - team-photography.html

### Step 3: Update the Metadata

**Example:** Update the team photography page title

```json
"teamPhotography": {
  "title": "NEW TITLE HERE | Marquel Yvette Photography",
  "description": "NEW DESCRIPTION HERE",
  "keywords": "new, keywords, here"
}
```

### Step 4: Save & Refresh

- Save `config/pages.json`
- Refresh your website
- The page title, description, and SEO tags update automatically! ✨

---

## What You Can Update

### Basic SEO

```json
{
  "title": "Page Title | Marquel Yvette Photography",
  "description": "Meta description for search engines (160 chars max)",
  "keywords": "keyword1, keyword2, keyword3"
}
```

### Social Media Sharing (Open Graph)

```json
{
  "ogTitle": "Title when shared on Facebook/LinkedIn",
  "ogDescription": "Description when shared on social media",
  "ogImage": "images/portfolio/social-share-image.jpg"
}
```

### Canonical URL

```json
{
  "canonicalUrl": "https://www.marquelyvette.com/page-name.html"
}
```

### Structured Data (SEO)

```json
{
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marquel Yvette Photography"
  }
}
```

---

## Page-Specific Examples

### Homepage

```json
"homepage": {
  "title": "Professional Headshot Photographer | Loudoun County, VA",
  "description": "Professional headshot photography in Loudoun County, VA...",
  "keywords": "professional headshots, corporate headshots, LinkedIn photos...",
  "ogImage": "images/portfolio/featured-headshot.jpg"
}
```

### Team Photography Page

```json
"teamPhotography": {
  "title": "Team Photography Services | Marquel Yvette Photography",
  "description": "Professional team photography services in Loudoun County, VA...",
  "ogImage": "images/portfolio/team-grid.jpg",
  "stats": {
    "companiesServed": "50+",
    "professionalPhotographed": "500+"
  }
}
```

### Rates Page

```json
"rates": {
  "title": "Rates | Book Your Session | Marquel Yvette Photography",
  "packages": {
    "signature": {
      "name": "The Signature",
      "price": "$995",
      "featured": true
    }
  }
}
```

---

## Global Settings

The `global` section contains site-wide information:

```json
"global": {
  "businessName": "Marquel Yvette Photography",
  "tagline": "Capturing life's precious moments with artistry and elegance",
  "phone": "(703) 957-0643",
  "email": "marquel@marquelyvette.com",
  "location": "Chantilly, VA"
}
```

---

## How It Works

1. **JavaScript Loader**: Each page includes `js/meta-loader.js`

2. **Automatic Detection**: The script detects which page you're on

3. **Loads Metadata**: Fetches the correct metadata from `config/pages.json`

4. **Updates Page**: Injects meta tags, Open Graph tags, and structured data

5. **SEO Optimized**: Search engines and social media see the correct metadata

---

## SEO Best Practices

### Page Titles
- Keep under 60 characters
- Include primary keyword
- End with brand name: "| Marquel Yvette Photography"

**Good Example:**
```
"Team Photography Services | Marquel Yvette Photography"
```

### Meta Descriptions
- Keep 150-160 characters
- Include call-to-action
- Use active voice

**Good Example:**
```
"Professional team photography services in Loudoun County, VA. We come to you for efficient, stress-free team headshots. Get a quote today!"
```

### Keywords
- 5-10 relevant keywords
- Comma-separated
- Include location-based keywords

**Good Example:**
```
"team photography, corporate headshots, on-site photography, Loudoun County VA"
```

### Open Graph Images
- Minimum 1200x630 pixels
- High-quality, representative photo
- Shows well when cropped

---

## Deploying Metadata Changes

### To Local Site:
1. Update `config/pages.json`
2. Save file
3. Refresh browser

### To Live Site (CloudFront):
1. Update `config/pages.json`
2. Upload to S3:
   ```bash
   aws s3 cp config/pages.json s3://marquelyvette-website/config/pages.json
   ```
3. Invalidate cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/config/pages.json"
   ```
4. Wait 1-2 minutes, then refresh website

---

## Troubleshooting

### Metadata not updating?
1. Check the file path is correct in `pages.json`
2. Clear browser cache (Cmd + Shift + R)
3. Check browser console for errors (F12)
4. Make sure `js/meta-loader.js` is included in the HTML page

### Wrong metadata showing?
- Check the page key matches the filename in the `getCurrentPage()` function
- Verify the JSON is valid (no syntax errors)

---

## Quick Reference

| Page | Config Key | File |
|------|-----------|------|
| Homepage | `homepage` | index.html |
| Rates | `rates` | rates-2.html |
| Contact | `contact` | contact.html |
| Thank You | `contactThankYou` | contact-thank-you.html |
| Request Proposal | `requestProposal` | request-proposal.html |
| Team Photography | `teamPhotography` | team-photography.html |

---

## Adding a New Page

1. Add entry to `config/pages.json`:
```json
"newPage": {
  "title": "New Page Title | Marquel Yvette Photography",
  "description": "Page description here",
  "keywords": "relevant, keywords, here",
  "ogTitle": "Social media title",
  "ogDescription": "Social media description",
  "ogImage": "images/new-page-image.jpg",
  "canonicalUrl": "https://www.marquelyvette.com/new-page.html"
}
```

2. Update the page map in `js/meta-loader.js`:
```javascript
const pageMap = {
  'new-page.html': 'newPage',
  // ... other pages
};
```

3. Include meta-loader in your HTML:
```html
<script src="js/meta-loader.js"></script>
```

---

**Remember:** All page metadata is managed from ONE file: `config/pages.json`

This makes updating SEO, titles, and descriptions quick and easy! 🎉
