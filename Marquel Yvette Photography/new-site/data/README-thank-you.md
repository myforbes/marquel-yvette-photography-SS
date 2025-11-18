# Thank You Page - Content Management

This thank you page uses a **front matter system** that separates content from code, making it easy to update text and content without touching the HTML.

## How It Works

The page content is managed through two files:

1. **JSON Data File**: `new-site/data/thank-you.json`
   - Contains all page content (text, testimonials, steps, etc.)
   - Edit this file to update any content on the page

2. **JavaScript Loader**: `new-site/js/thank-you-loader.js`
   - Automatically loads content from the JSON file
   - Updates the HTML page when it loads
   - You shouldn't need to edit this file

## How to Update Content

### 1. Update Main Heading & Subtitle

Open `thank-you.json` and edit the header section:

```json
{
  "header": {
    "mainTitle": "Thank You!",
    "subtitle": "Your Headshot Checklist is on its way to your inbox."
  }
}
```

### 2. Update Checklist Items

Edit the checklist items in the JSON file:

```json
{
  "checklistPreview": {
    "items": [
      {
        "title": "Your Item Title",
        "description": "Your item description"
      }
    ]
  }
}
```

### 3. Update Next Steps

Modify the steps section:

```json
{
  "nextSteps": {
    "steps": [
      {
        "number": 1,
        "title": "Step Title",
        "description": "Step description"
      }
    ]
  }
}
```

### 4. Update CTA Section

Change the call-to-action content:

```json
{
  "cta": {
    "title": "Your CTA Title",
    "subtitle": "Your CTA subtitle text",
    "buttonText": "Button Text",
    "buttonUrl": "link-url.html",
    "testimonial": {
      "quote": "Your testimonial quote",
      "author": "Client Name, Title"
    }
  }
}
```

## Content Sections

The JSON file is organized into these main sections:

- **page** - Meta information (title, description)
- **header** - Logo, main heading, and subtitle
- **checkEmail** - Email confirmation message
- **checklistPreview** - List of what's included in the checklist
- **nextSteps** - Action steps for the user
- **cta** - Call-to-action section with testimonial
- **footer** - Footer text

## Testing Your Changes

1. Save your changes to `thank-you.json`
2. View the page at: **http://localhost:8080/thank-you.html**
3. The JavaScript will automatically load and display your updated content
4. Check the browser console (F12) for any errors

## Important Notes

- Always use valid JSON syntax (proper quotes, commas, brackets)
- Test your JSON for syntax errors at https://jsonlint.com
- Changes take effect immediately when you refresh the page
- The HTML file contains default content as a fallback

## Integrating with Your Email Form

To redirect users to this thank you page after they submit the checklist form:

1. Update your webhook/form handler to redirect to: `thank-you.html`
2. Or add JavaScript redirect after form submission
3. Or use the form's success redirect URL setting

## Troubleshooting

**Content not updating?**
1. Check the browser console for JavaScript errors
2. Verify your JSON syntax is valid
3. Make sure you're viewing via localhost (not file://)
4. Clear your browser cache and refresh

## Need Help?

If you encounter issues, check:
1. Browser console for error messages (F12 → Console tab)
2. JSON syntax using an online validator
3. That the local server is running on port 8080
