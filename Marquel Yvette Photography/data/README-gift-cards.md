# Gift Cards Page - Front Matter Documentation

This file contains the structured content for the gift cards page (`gift-cards.html`).

## File Location
`data/gift-cards.json`

## Purpose
The gift cards page is a dedicated landing page for purchasing photography gift cards. It provides a clean, distraction-free experience for customers to buy gift cards without conflicts from other Go High Level scripts (like booking modals).

## Page Structure

### 1. Page Metadata
```json
"page": {
  "title": "Page title for SEO",
  "description": "Meta description for search engines",
  "url": "Canonical URL"
}
```

### 2. Hero Section
```json
"hero": {
  "title": "Main headline",
  "intro": "Brief introduction",
  "description": "Detailed description"
}
```

### 3. Gift Card Embed
```json
"giftCard": {
  "embedId": "Go High Level gift card ID",
  "scriptUrl": "GHL embed script URL"
}
```

### 4. Benefits
Array of benefit objects highlighting why gift cards are valuable:
```json
"benefits": [
  {
    "title": "Benefit title",
    "description": "Benefit description"
  }
]
```

### 5. Ideal For
List of ideal recipients/use cases for gift cards.

### 6. Call to Action
Primary and secondary CTAs for the page.

## Integration Notes

- The gift card embed uses Go High Level's gift card system
- No other GHL scripts should be loaded on this page to prevent conflicts
- The page is intentionally simple to focus on the gift card purchase experience
- Gift card sections on other pages (index.html, rates-2.html) link to this dedicated page

## Updating Content

To update the gift cards page content:
1. Edit `data/gift-cards.json`
2. Commit changes to git
3. Deploy to production

## Related Files
- `gift-cards.html` - The actual page template
- `data/content.json` - Homepage gift cards section (links to this page)
- `data/rates-content.json` - Pricing page gift cards section (links to this page)
