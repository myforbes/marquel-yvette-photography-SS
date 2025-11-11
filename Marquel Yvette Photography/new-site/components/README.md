# Component System Documentation

## Overview

This directory contains modular HTML components for the Marquel Yvette Photography website. Each component represents a self-contained section of the page and uses data from the `data/content.json` file.

## Directory Structure

```
new-site/
├── components/          # HTML component templates
│   ├── hero.html       # Hero gallery + title section
│   ├── testimonial.html # Featured & grid testimonials
│   ├── about.html      # About/bio section
│   ├── services.html   # Primary & additional services
│   ├── team.html       # Team headshots section
│   ├── process.html    # 3-step process section
│   ├── faq.html        # FAQ accordion section
│   └── README.md       # This file
├── data/               # Content/data files
│   └── content.json    # All site content and copy
├── css/                # Stylesheets
├── images/             # Image assets
└── index.html          # Main page (uses components)
```

## Components

### 1. Hero Component (`hero.html`)

**Purpose:** Displays the hero gallery grid and main headline

**Data Source:** `data/content.json -> hero`

**Sections:**
- Hero gallery grid (10 images)
- Tagline + H1 title

**HTML Attributes:**
- `data-component="hero-gallery"` - Gallery section
- `data-component="hero-title"` - Title section

**Example Usage:**
```html
<!-- Include in index.html -->
<?php include 'components/hero.html'; ?>
```

**Data Structure:**
```json
{
  "hero": {
    "tagline": "ONE HOUR. ONE IMAGE...",
    "title": "High-end headshots...",
    "gallery": [
      {
        "image": "path/to/image.jpg",
        "alt": "Description"
      }
    ]
  }
}
```

---

### 2. Testimonial Component (`testimonial.html`)

**Purpose:** Displays client testimonials in featured and grid layouts

**Data Source:** `data/content.json -> testimonials`

**Sections:**
- Featured testimonial (large, 2-column)
- Client success stories grid (3 cards)

**HTML Attributes:**
- `data-component="testimonial-featured"`
- `data-component="testimonials-grid"`

**Data Structure:**
```json
{
  "testimonials": {
    "featured": {
      "quote": "...",
      "author": "Name",
      "image": "path/to/image.jpg",
      "alt": "Description"
    },
    "grid": [
      {
        "quote": "...",
        "author": "Name",
        "image": "path/to/image.jpg",
        "alt": "Description"
      }
    ]
  }
}
```

---

### 3. About Component (`about.html`)

**Purpose:** About section with photographer bio

**Data Source:** `data/content.json -> about`

**Special Formatting:**
- Each sentence is a separate `<p>` tag
- Highlighted text uses inline H2 with `font-size: 1.125rem`

**HTML Attributes:**
- `data-component="about"`

**Data Structure:**
```json
{
  "about": {
    "title": "LOUDOUN COUNTY Headshot Photographer",
    "image": "path/to/image.jpg",
    "alt": "Description",
    "text": {
      "intro": "First paragraph...",
      "highlight": "Emphasized sentence...",
      "body": [
        "Line 1",
        "Line 2",
        "..."
      ]
    }
  }
}
```

---

### 4. Services Component (`services.html`)

**Purpose:** Displays primary and additional service offerings

**Data Source:** `data/content.json -> services`

**Sections:**
- Primary services (3 cards)
- Additional services (3 detailed cards with bullet lists)

**HTML Attributes:**
- `data-component="services-primary"`
- `data-component="services-additional"`

**Data Structure:**
```json
{
  "services": {
    "primary": [
      {
        "title": "Service Name",
        "description": "Description...",
        "image": "path/to/image.jpg",
        "alt": "Description"
      }
    ],
    "additional": [
      {
        "title": "Service Name",
        "description": "Description...",
        "image": "path/to/image.jpg",
        "alt": "Description",
        "types": [
          "Type 1",
          "Type 2",
          "Type 3"
        ]
      }
    ]
  }
}
```

---

### 5. Team Component (`team.html`)

**Purpose:** Team headshots section

**Data Source:** `data/content.json -> team`

**HTML Attributes:**
- `data-component="team"`

**Data Structure:**
```json
{
  "team": {
    "title": "Team Headshots",
    "intro": "Introduction paragraph with <strong>tags</strong>...",
    "images": [
      {
        "src": "path/to/image.jpg",
        "alt": "Description"
      }
    ]
  }
}
```

---

### 6. Process Component (`process.html`)

**Purpose:** 3-step process section

**Data Source:** `data/content.json -> process`

**HTML Attributes:**
- `data-component="process"`

**Data Structure:**
```json
{
  "process": {
    "title": "The Process",
    "steps": [
      {
        "icon": "path/to/icon.png",
        "title": "Step Name",
        "description": "Description...",
        "alt": "Icon description"
      }
    ]
  }
}
```

---

### 7. FAQ Component (`faq.html`)

**Purpose:** FAQ accordion with 2-column layout

**Data Source:** `data/content.json -> faq`

**Features:**
- Black background questions (white text)
- Gray background when expanded
- Plus icon rotates 45° on open
- 2-column grid layout

**HTML Attributes:**
- `data-component="faq"`

**Data Structure:**
```json
{
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "Got Questions? We've Got Answers!",
    "items": [
      {
        "question": "Question text?",
        "answer": "Answer text..."
      }
    ]
  }
}
```

---

## Using Components

### Option 1: Server-Side Includes (PHP)

If using PHP server:

```php
<?php include 'components/hero.html'; ?>
<?php include 'components/testimonial.html'; ?>
<?php include 'components/about.html'; ?>
```

### Option 2: JavaScript Template Engine

Use a simple templating system to load components and populate with data:

```javascript
// Load content.json
fetch('data/content.json')
  .then(response => response.json())
  .then(data => {
    // Populate components with data
    populateHero(data.hero);
    populateTestimonials(data.testimonials);
    populateAbout(data.about);
    // etc...
  });
```

### Option 3: Build Tool (Recommended)

Use a static site generator like:
- **11ty (Eleventy)** - Simple, flexible
- **Hugo** - Fast, powerful
- **Jekyll** - Popular, GitHub Pages compatible

Example with 11ty:

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  return {
    dir: {
      input: "components",
      output: "_site",
      data: "../data"
    }
  };
};
```

---

## Templating Syntax

Components use `{{variable}}` syntax as placeholders. These need to be replaced with actual values from `content.json`.

**Example:**

Template:
```html
<h2>{{about.title}}</h2>
<p>{{about.text.intro}}</p>
```

Rendered:
```html
<h2>LOUDOUN COUNTY Headshot Photographer</h2>
<p>Hi there! I'm Marquel Forbes, your headshot photographer...</p>
```

---

## Updating Content

To update any content on the site:

1. **Open** `data/content.json`
2. **Edit** the relevant content
3. **Save** the file
4. **Rebuild** the site (if using a build tool)
5. **Deploy** to S3/CloudFront

**No HTML editing required!**

---

## CSS Classes Reference

All components use existing CSS classes from `css/main.css`:

### Hero
- `.hero-section`
- `.gallery-grid-wrapper`
- `.gallery-grid-item`
- `.hero-title-section`
- `.hero-tagline`
- `.hero-h1`

### Testimonials
- `.testimonial-featured`
- `.testimonial-two-col`
- `.testimonials-grid-3col`
- `.testimonial-card`

### About
- `.about-section`
- `.about-two-col`
- `.about-image`
- `.about-content`
- `.bio-text`

### Services
- `.services-grid-section`
- `.services-grid-3col`
- `.service-card`
- `.service-card-detailed`
- `.service-types`

### Team
- `.team-headshots-section`
- `.team-intro`
- `.team-images-grid`

### Process
- `.process-section`
- `.process-steps`
- `.process-step`
- `.process-icon`

### FAQ
- `.faq-section`
- `.faq-subtitle`
- `.faq-grid`
- `.faq-column`
- `.faq-item`
- `.faq-toggle`
- `.faq-question`
- `.faq-icon`
- `.faq-answer`

---

## Development Workflow

### Adding New Content

1. Add data to `content.json`
2. Update component template if needed
3. Rebuild/refresh

### Creating New Components

1. Create HTML file in `components/`
2. Add data structure to `content.json`
3. Add CSS classes to `css/main.css`
4. Document in this README

### Deployment

```bash
# Deploy components (if using build tool)
npm run build

# Upload to S3
aws s3 sync _site/ s3://marquelyvette-website/

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E50QXXWNUFNYT \
  --paths "/*"
```

---

## Benefits of Component System

1. **Maintainability** - Edit content in one place (content.json)
2. **Reusability** - Use components across multiple pages
3. **Consistency** - Same structure across all instances
4. **Separation of Concerns** - Content separate from presentation
5. **Easier Updates** - Non-developers can edit JSON
6. **Version Control** - Track content changes easily
7. **Performance** - Can implement lazy loading per component

---

## Future Enhancements

- [ ] Add JavaScript to load components dynamically
- [ ] Implement client-side templating engine
- [ ] Add component lazy loading
- [ ] Create component preview page
- [ ] Add YAML support (alternative to JSON)
- [ ] Implement multi-language support
- [ ] Add content validation schema

---

## Support

For questions or issues with the component system, contact the development team or create an issue in the project repository.

**Last Updated:** 2025-11-02
