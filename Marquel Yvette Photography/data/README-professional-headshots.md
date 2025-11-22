# Professional Headshots Landing Page - Content Management

This landing page uses a **front matter system** that separates content from code, making it easy to update text, images, pricing, and other content without touching the HTML.

## How It Works

The page content is managed through two files:

1. **JSON Data File**: `new-site/data/professional-headshots-landing.json`
   - Contains all page content (text, images, links, pricing, etc.)
   - Edit this file to update any content on the page

2. **JavaScript Loader**: `new-site/js/professional-headshots-loader.js`
   - Automatically loads content from the JSON file
   - Updates the HTML page when it loads
   - You shouldn't need to edit this file

## How to Update Content

### 1. Update Text Content

Open `professional-headshots-landing.json` and find the section you want to update:

```json
{
  "hero": {
    "title": "Your New Title Here",
    "subtitle": "Your new subtitle text..."
  }
}
```

### 2. Update Pricing

Edit the pricing section in the JSON file:

```json
{
  "pricing": {
    "packages": [
      {
        "title": "The Express",
        "price": "$525",
        "description": "Your updated description"
      }
    ]
  }
}
```

### 3. Update Images

Change image paths in the JSON file:

```json
{
  "benefits": {
    "gallery": [
      {
        "src": "new-site/images/portfolio/your-image.jpg",
        "alt": "Description of image"
      }
    ]
  }
}
```

### 4. Update Links/URLs

Modify button URLs and links:

```json
{
  "hero": {
    "buttons": [
      {
        "text": "Book Now",
        "url": "new-site/rates-2.html",
        "style": "primary"
      }
    ]
  }
}
```

### 5. Update Form Webhook

Change the form submission URL:

```json
{
  "leadMagnet": {
    "form": {
      "action": "https://your-webhook-url-here"
    }
  }
}
```

## Content Sections

The JSON file is organized into these main sections:

- **page** - Meta information (title, description, keywords)
- **hero** - Hero section content
- **benefits** - Benefits cards and gallery
- **pricing** - Pricing packages
- **howItWorks** - Process steps
- **testimonials** - Client testimonials
- **busyProfessionals** - Options for busy professionals
- **leadMagnet** - Email opt-in form
- **faq** - Frequently asked questions
- **footer** - Footer content

## Testing Your Changes

1. Save your changes to `professional-headshots-landing.json`
2. Open `professional-headshots-landing-page.html` in your browser
3. The JavaScript will automatically load and display your updated content
4. Check the browser console (F12) for any errors

## Important Notes

- Always use valid JSON syntax (proper quotes, commas, brackets)
- Test your JSON for syntax errors at https://jsonlint.com
- Image paths are relative to the HTML file location
- Changes take effect immediately when you refresh the page
- The HTML file still contains default content as a fallback

## Troubleshooting

**Content not updating?**
1. Check the browser console for JavaScript errors
2. Verify your JSON syntax is valid
3. Make sure the file paths are correct
4. Clear your browser cache and refresh

**Images not showing?**
1. Check that image file paths are correct
2. Ensure images exist in the specified location
3. Check image file names match exactly (including capitalization)

## Need Help?

If you encounter issues, check:
1. Browser console for error messages (F12 → Console tab)
2. JSON syntax using an online validator
3. File paths and image locations
