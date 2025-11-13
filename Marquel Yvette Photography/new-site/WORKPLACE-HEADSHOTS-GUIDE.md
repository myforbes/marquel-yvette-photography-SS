# Workplace Headshots Page - Content Update Guide

This guide explains how to update the content on the Workplace Headshots page without editing HTML code.

## Quick Start

All the text content for the workplace headshots page is stored in:
```
data/workplace-headshots.json
```

Simply edit this JSON file to update any text on the page, then the changes will automatically appear when the page loads.

## File Structure

The JSON file is organized into these main sections:

### 1. Page Meta Information
```json
"page": {
  "title": "Page title for browser tab",
  "description": "SEO meta description"
}
```

### 2. Hero Section
The large section at the top with the main heading and team photo.
```json
"hero": {
  "title": "Main heading",
  "subtitle": "Subheading text",
  "description": "Paragraph description",
  "image": "path/to/image.png",
  "imageAlt": "Image description for accessibility",
  "ctaButtons": [
    {
      "text": "Button text",
      "url": "link-url.html",
      "style": "primary" or "outline"
    }
  ]
}
```

### 3. Benefits Section
The "Why Companies Choose..." section with 6 cards.
```json
"benefits": {
  "sectionTitle": "Section heading",
  "items": [
    {
      "icon": "fas fa-building",  // Font Awesome icon class
      "title": "Card title",
      "description": "Card description text"
    }
  ]
}
```

**Available Icon Classes:**
- `fas fa-building` - Building icon
- `fas fa-clock` - Clock icon
- `fas fa-users` - People icon
- `fas fa-gift` - Gift box icon
- `fas fa-camera` - Camera icon
- `fas fa-tachometer-alt` - Speed/gauge icon
- `fas fa-chart-line` - Chart icon
- `fas fa-heart` - Heart icon
- `fas fa-trophy` - Trophy icon

### 4. How It Works Section
The step-by-step process with numbered circles.
```json
"howItWorks": {
  "sectionTitle": "Section heading",
  "steps": [
    {
      "number": 1,
      "title": "Step title",
      "description": "Step description"
    }
  ]
}
```

### 5. Portfolio Section
The "Workplace Headshot Grids We've Created" section.
```json
"portfolio": {
  "sectionTitle": "Section heading",
  "description": "Section description paragraph",
  "grids": [
    {
      "title": "Grid title",
      "label": "Company type label"
    }
  ]
}
```

### 6. Stats Section
The gold section with numbers and statistics.
```json
"stats": {
  "sectionTitle": "Section heading",
  "highlights": [
    {
      "stat": "50+",
      "label": "Label text"
    }
  ]
}
```

### 7. Employee Gift Section
The "More Than Photos..." section with 4 feature cards.
```json
"employeeGift": {
  "sectionTitle": "Section heading",
  "description": "Section description",
  "features": [
    {
      "icon": "fas fa-chart-line",
      "title": "Feature title",
      "description": "Feature description"
    }
  ]
}
```

### 8. Final CTA Section
The bottom call-to-action section with buttons.
```json
"finalCta": {
  "title": "Section heading",
  "description": "Description text",
  "buttons": [
    {
      "text": "Button text",
      "url": "link-url.html",
      "style": "primary" or "outline"
    }
  ],
  "footerText": "Small text at bottom"
}
```

## How to Update Content

### Example 1: Change the Hero Heading
1. Open `data/workplace-headshots.json`
2. Find the `"hero"` section
3. Update the `"title"` value:
   ```json
   "title": "Your New Heading Here"
   ```
4. Save the file
5. Refresh the page in your browser

### Example 2: Update Statistics
1. Open `data/workplace-headshots.json`
2. Find the `"stats"` section
3. Update the numbers and labels:
   ```json
   "highlights": [
     {
       "stat": "100+",
       "label": "Happy Clients"
     }
   ]
   ```
4. Save and refresh

### Example 3: Change Button Text
1. Open `data/workplace-headshots.json`
2. Find the section with buttons (hero, finalCta)
3. Update the `"text"` value:
   ```json
   "ctaButtons": [
     {
       "text": "New Button Text",
       "url": "rates-2.html",
       "style": "primary"
     }
   ]
   ```
4. Save and refresh

### Example 4: Update a Benefit Card
1. Open `data/workplace-headshots.json`
2. Find the `"benefits"` section
3. Find the card you want to update in the `"items"` array
4. Change the title and/or description:
   ```json
   {
     "icon": "fas fa-building",
     "title": "New Card Title",
     "description": "New card description goes here."
   }
   ```
5. Save and refresh

## Tips

- **Always use valid JSON syntax** - Make sure quotes, commas, and brackets are correct
- **Test your JSON** - Use a JSON validator (like jsonlint.com) if you're unsure
- **Keep backups** - Save a copy of the working file before making major changes
- **Icons** - To change icons, find more Font Awesome classes at fontawesome.com
- **URLs** - Use relative paths for internal links (e.g., `rates-2.html`) and full URLs for external links

## Deployment

After updating the JSON file:
1. Test locally by opening the HTML file in a browser
2. Commit your changes to git
3. Deploy to your server/CloudFront as usual

The content loader script (`js/workplace-content-loader.js`) automatically reads the JSON file and updates the page when it loads.

## Troubleshooting

**Problem**: Changes don't appear on the page
- **Solution**: Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**Problem**: Page is blank or errors appear
- **Solution**: Check your JSON syntax - you may have a missing comma, quote, or bracket

**Problem**: Some content updates but not all
- **Solution**: Make sure the HTML structure matches what the loader expects (don't remove HTML elements)

## Need Help?

If you need to add new sections or change the page structure, you'll need to edit both:
1. `data/workplace-headshots.json` - Add the new content
2. `workplace-headshots.html` - Add the HTML structure
3. `js/workplace-content-loader.js` - Add the loading logic

For simple text changes, stick to editing just the JSON file!
