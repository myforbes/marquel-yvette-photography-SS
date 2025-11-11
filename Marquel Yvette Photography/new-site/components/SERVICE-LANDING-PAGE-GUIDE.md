# Service Landing Page Component System

A reusable component system for creating service-specific landing pages. Clone this to quickly create new service pages with consistent design and functionality.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Creating a New Service Page](#creating-a-new-service-page)
4. [Customization Guide](#customization-guide)
5. [Files Structure](#files-structure)
6. [Examples](#examples)

---

## Overview

This component system allows you to create professional service landing pages by:
- Using a reusable HTML template
- Configuring content via JSON files
- Automatically populating all sections
- Maintaining consistent design across all services

**Current Services:**
- ✅ Workplace Headshots (`workplace-headshots.html`)

**Future Services (Examples):**
- Actor Headshots
- Executive Portraits
- Real Estate Photography
- Event Photography
- Personal Branding

---

## How It Works

### The System Has 3 Parts:

1. **Template** (`components/service-landing-page.html`)
   - Reusable HTML structure
   - Pre-styled sections
   - Responsive design built-in

2. **Content Data** (`data/services/[service-name].json`)
   - All text content
   - Benefits, steps, stats
   - Meta tags for SEO

3. **Loader Script** (`js/service-landing-loader.js`)
   - Reads JSON data
   - Populates HTML template
   - Updates page dynamically

---

## Creating a New Service Page

### Step 1: Create Your Service JSON File

Create a new file: `data/services/[your-service-name].json`

**Example:** `data/services/actor-headshots.json`

```json
{
  "pageId": "actor-headshots",
  "meta": {
    "title": "Actor Headshots | Professional Photography | Marquel Yvette Photography",
    "description": "Professional actor headshots in Loudoun County, VA. Stand out at auditions with compelling headshots that showcase your range and personality.",
    "keywords": "actor headshots, theatrical photography, casting photos, DC actor headshots"
  },
  "hero": {
    "title": "Professional Actor Headshots",
    "subtitle": "Your First Audition Happens Before You Walk in the Room",
    "description": "Your headshot is your calling card. Let's create compelling images that showcase your range, personality, and help you book more roles."
  },
  "benefits": {
    "title": "Why Actors Choose Marquel Yvette",
    "items": [
      {
        "icon": "fa-theater-masks",
        "title": "Showcase Your Range",
        "description": "We'll capture multiple looks that demonstrate your versatility and help you stand out in casting calls."
      },
      {
        "icon": "fa-eye",
        "title": "Industry-Standard Quality",
        "description": "Professional headshots that meet all casting director expectations and reproduce beautifully in print and digital formats."
      }
      // Add more benefits...
    ]
  },
  "process": {
    "steps": [
      {
        "title": "Pre-Session Consultation",
        "description": "We'll discuss your target roles, current needs, and the looks you want to capture."
      },
      {
        "title": "Photo Session",
        "description": "Relaxed 1-2 hour session capturing multiple looks, expressions, and wardrobe changes."
      }
      // Add more steps...
    ]
  },
  "stats": {
    "title": "Results That Speak",
    "items": [
      {
        "number": "200+",
        "label": "Actors Photographed"
      },
      {
        "number": "100%",
        "label": "Industry Standard"
      }
      // Add more stats...
    ]
  },
  "cta": {
    "title": "Ready to Level Up Your Headshots?",
    "description": "Let's create headshots that open doors and help you book more roles."
  }
}
```

### Step 2: Copy the Template

```bash
# Copy the template to create your new page
cp components/service-landing-page.html actor-headshots.html
```

### Step 3: Update the JavaScript Mapping

Edit `js/service-landing-loader.js` and add your page to the service map:

```javascript
const serviceMap = {
    'workplace-headshots.html': 'workplace-headshots',
    'actor-headshots.html': 'actor-headshots',  // ADD THIS LINE
    'service-landing-page.html': 'workplace-headshots'
};
```

### Step 4: Link to Your New Page

Add links to your new service page from:
- Homepage (`index.html`)
- Navigation menu
- Other relevant pages

```html
<a href="actor-headshots.html" class="cta-button">LEARN MORE</a>
```

### Step 5: Test Your New Page

1. Open your new page in browser: `http://localhost:8000/actor-headshots.html`
2. Verify all content loads correctly
3. Test on mobile devices
4. Check all links work

---

## Customization Guide

### Content You Can Customize

#### 1. Hero Section
- Main title
- Subtitle
- Description
- CTA button text

#### 2. Benefits Section
- Section title
- Number of benefit cards (3-6 recommended)
- Icon for each benefit (Font Awesome icons)
- Title and description for each

#### 3. Process Steps
- Number of steps (3-7 recommended)
- Title and description for each
- Steps are automatically numbered

#### 4. Stats Section
- Section title
- Number of stats (2-6 recommended)
- Stat number/value
- Label for each stat

#### 5. Final CTA
- CTA headline
- CTA description
- Button destinations

### Styling Customization

The template includes built-in responsive styles, but you can customize:

#### Colors
Edit in the `<style>` section of the template:

```css
/* Primary color */
color: #f4ca78;  /* Gold accent */

/* Background colors */
background: #1a1a1a;  /* Dark */
background: #f8f8f8;  /* Light gray */

/* Text colors */
color: #2c2c2c;  /* Dark text */
color: #666;     /* Medium gray */
```

#### Icons
Use any Font Awesome icon:
- Find icons at: https://fontawesome.com/icons
- Use format: `fa-icon-name`

**Examples:**
- `fa-camera` - Camera
- `fa-users` - Group
- `fa-clock` - Clock
- `fa-star` - Star
- `fa-heart` - Heart

#### Sections
You can hide/show sections by commenting out in the HTML:

```html
<!-- Hide stats section
<section class="why-choose-section">
  ...
</section>
-->
```

---

## Files Structure

```
new-site/
├── components/
│   ├── service-landing-page.html     # Template (DO NOT EDIT directly)
│   └── SERVICE-LANDING-PAGE-GUIDE.md # This guide
├── data/
│   └── services/
│       ├── workplace-headshots.json  # Workplace headshots content
│       └── actor-headshots.json      # Your new service content
├── js/
│   └── service-landing-loader.js     # Loader script
├── workplace-headshots.html          # Live workplace headshots page
└── actor-headshots.html              # Your new service page
```

---

## Examples

### Example 1: Workplace Headshots (Current)

**Page:** `workplace-headshots.html`
**Data:** `data/services/workplace-headshots.json`

**Features:**
- 6 benefit cards
- 5-step process
- 4 statistics
- Professional corporate focus

### Example 2: Actor Headshots (Future)

**Page:** `actor-headshots.html`
**Data:** `data/services/actor-headshots.json`

**Features:**
- 4 benefit cards
- 4-step process
- 3 statistics
- Creative/artistic focus

### Example 3: Real Estate Photography (Future)

**Page:** `real-estate-photography.html`
**Data:** `data/services/real-estate-photography.json`

**Features:**
- 6 benefit cards
- 5-step process
- 4 statistics
- Property-focused imagery

---

## Best Practices

### Content Writing

1. **Keep it concise**
   - Headlines: 3-8 words
   - Descriptions: 1-2 sentences
   - Benefits: 2-3 sentences max

2. **Focus on benefits, not features**
   - ❌ "I use professional cameras"
   - ✅ "Get studio-quality images"

3. **Use active voice**
   - ❌ "Photos are delivered within a week"
   - ✅ "Receive your photos within a week"

4. **Include specific numbers**
   - ❌ "Many clients served"
   - ✅ "500+ professionals photographed"

### Design Tips

1. **Use 3-6 benefit cards**
   - Too few = looks empty
   - Too many = overwhelming

2. **Keep steps to 3-7**
   - Clear, logical progression
   - Each step = distinct phase

3. **Stats should be impressive**
   - Use real numbers
   - Round to look clean (500+ vs 487)

4. **Choose relevant icons**
   - Match the benefit/feature
   - Stay consistent in style

---

## Troubleshooting

### Page shows "Loading..." but content doesn't appear

**Cause:** JSON file not found or has errors

**Fix:**
1. Check JSON file exists: `data/services/[service-name].json`
2. Validate JSON syntax: https://jsonlint.com
3. Check browser console for errors (F12)

### Wrong content is showing

**Cause:** Service mapping incorrect

**Fix:**
1. Check filename matches in `service-landing-loader.js`
2. Verify `pageId` in JSON matches filename
3. Clear browser cache (Cmd+Shift+R)

### Styles look broken

**Cause:** CSS file missing or link broken

**Fix:**
1. Verify `css/main.css` exists
2. Check file path is correct
3. Clear browser cache

---

## Need Help?

1. **Check existing examples:** Look at `workplace-headshots.json`
2. **Validate your JSON:** Use https://jsonlint.com
3. **Test locally first:** Use local server before deploying
4. **Check browser console:** Look for JavaScript errors (F12)

---

## Quick Checklist for New Service

- [ ] Create JSON file in `data/services/`
- [ ] Copy template to new HTML file
- [ ] Update `service-landing-loader.js` mapping
- [ ] Write all content sections
- [ ] Choose appropriate icons
- [ ] Test locally
- [ ] Add navigation links
- [ ] Test on mobile
- [ ] Deploy to production

---

**Happy Cloning! 🎉**

*Last Updated: November 11, 2025*
