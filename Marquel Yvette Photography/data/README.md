# Rates Page Content Management

This file (`rates-content.json`) contains all the editable content for the rates-2.html page.

## How to Update Content

Simply edit the `rates-content.json` file to update:

### Page Information
- **title**: Browser tab title and SEO title
- **description**: Meta description for SEO

### Banner Gallery
Edit the `banner.images` array to update the hero banner gallery images:
- List of image paths for the 8 headshots displayed at the top
- Images should be optimized to 500x500px for best performance
- Images are displayed in a 4-column grid (2 columns on mobile)

### Hero Section
- **title**: Main heading on the page
- **subtitle**: Introductory paragraph below the title

### Pricing Packages
Edit the `packages` array to update pricing information:

```json
{
  "id": "express",              // Unique identifier (don't change)
  "name": "The Express",        // Package name
  "price": "$525",              // Display price
  "description": "...",         // Short description
  "featured": false,            // Set to true to add "Most Popular" label
  "featuredLabel": "Most Popular", // Label text for featured packages
  "whatsIncluded": "...",       // Bullet points of what's included
  "buttonText": "Book The Express", // Button text
  "bookingUrl": "...",          // Go HighLevel booking URL
  "iframeId": "..."             // iframe ID (from Go HighLevel)
}
```

### Journey Steps
Edit the `journey.steps` array to update the session process:
- **number**: Step number (1-5)
- **title**: Step title
- **description**: Step description

### Testimonials
Edit the `testimonials.reviews` array:
- **name**: Client name
- **text**: Testimonial quote
- **image**: Path to client photo

## Important Notes

1. **Booking URLs**: Get these from your Go HighLevel account
2. **iframe IDs**: Must match the ID from Go HighLevel embed code
3. **Images**: Make sure image paths are correct
4. **Formatting**: Maintain valid JSON syntax (no trailing commas, proper quotes)

## Need Help?

- Use a JSON validator if you get errors: https://jsonlint.com/
- Keep backups before making major changes
- Test changes on localhost before deploying
