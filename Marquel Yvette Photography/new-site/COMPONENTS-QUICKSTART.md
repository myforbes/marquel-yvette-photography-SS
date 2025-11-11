# Component System - Quick Start Guide

## What is This?

Your website has been modularized into **reusable components**. This makes it easier to:
- **Update content** without touching HTML
- **Maintain consistency** across pages
- **Reuse sections** on different pages
- **Track changes** in version control

---

## File Structure

```
new-site/
├── components/              # 📁 Component templates
│   ├── hero.html           # Hero gallery + title
│   ├── testimonial.html    # Client testimonials
│   ├── about.html          # About section
│   ├── services.html       # Service offerings
│   ├── team.html           # Team photos
│   ├── process.html        # 3-step process
│   ├── faq.html            # FAQ accordion
│   ├── component-loader.js # JS to load components
│   └── README.md           # Full documentation
│
├── data/                    # 📁 Content data
│   └── content.json        # ⭐ ALL SITE CONTENT HERE
│
├── css/                     # Stylesheets (unchanged)
├── images/                  # Images (unchanged)
└── index.html              # Main page (unchanged for now)
```

---

## How to Use

### Option 1: Update Content Only (Recommended)

**To change ANY text, images, or content on the site:**

1. Open `data/content.json`
2. Find the section you want to edit
3. Change the text/image path
4. Save the file
5. Refresh the page (if using JavaScript loader)
   OR rebuild site (if using a static site generator)

**Example: Change the hero tagline**

```json
{
  "hero": {
    "tagline": "YOUR NEW TAGLINE HERE",
    "title": "Your new title..."
  }
}
```

That's it! No HTML editing required.

---

### Option 2: Use Component Loader (JavaScript)

The `component-loader.js` file can automatically populate components from `content.json`.

**Setup:**

1. Add to your `index.html` before `</body>`:

```html
<script src="components/component-loader.js"></script>
```

2. Add `data-component` attributes to your sections:

```html
<section class="hero-section">
    <div class="gallery-grid-wrapper" data-component="hero-gallery">
        <!-- Will be populated from content.json -->
    </div>
</section>
```

3. The script will automatically load content on page load.

**Benefits:**
- ✅ Content managed in JSON
- ✅ No server-side processing needed
- ✅ Works with current AWS setup
- ✅ Easy to update

---

### Option 3: Static Site Generator (Advanced)

For a more robust solution, use a static site generator:

**Recommended: Eleventy (11ty)**

```bash
# Install
npm install -g @11ty/eleventy

# Create .eleventy.js config
# (See components/README.md for example)

# Build
npx @11ty/eleventy

# Serve
npx @11ty/eleventy --serve
```

**Benefits:**
- ✅ Pre-rendered HTML (best performance)
- ✅ Template inheritance
- ✅ Build-time optimization
- ✅ Easy deployment

---

## Common Tasks

### Change Hero Tagline

**File:** `data/content.json`

```json
{
  "hero": {
    "tagline": "NEW TAGLINE HERE"
  }
}
```

### Add New Testimonial

**File:** `data/content.json`

```json
{
  "testimonials": {
    "grid": [
      {
        "quote": "New testimonial text...",
        "author": "Client Name",
        "image": "images/portfolio/new-image.jpg",
        "alt": "Client Name testimonial"
      }
    ]
  }
}
```

### Update About Section Text

**File:** `data/content.json`

```json
{
  "about": {
    "text": {
      "intro": "New intro paragraph...",
      "highlight": "New highlighted text...",
      "body": [
        "Line 1",
        "Line 2",
        "Line 3"
      ]
    }
  }
}
```

### Add FAQ Question

**File:** `data/content.json`

```json
{
  "faq": {
    "items": [
      {
        "question": "New question?",
        "answer": "Answer to the question..."
      }
    ]
  }
}
```

### Update Service Description

**File:** `data/content.json`

```json
{
  "services": {
    "primary": [
      {
        "title": "CORPORATE Headshots",
        "description": "NEW DESCRIPTION HERE"
      }
    ]
  }
}
```

---

## Data Structure Reference

### Hero Section
```json
"hero": {
  "tagline": "Text",
  "title": "Text",
  "gallery": [
    { "image": "path", "alt": "description" }
  ]
}
```

### Testimonials
```json
"testimonials": {
  "featured": {
    "quote": "Text",
    "author": "Name",
    "image": "path",
    "alt": "description"
  },
  "grid": [...]
}
```

### About
```json
"about": {
  "title": "Text",
  "image": "path",
  "alt": "description",
  "text": {
    "intro": "Paragraph",
    "highlight": "Emphasized text",
    "body": ["Line 1", "Line 2"]
  }
}
```

### Services
```json
"services": {
  "primary": [
    {
      "title": "Text",
      "description": "Text",
      "image": "path",
      "alt": "description"
    }
  ],
  "additional": [
    {
      "title": "Text",
      "description": "Text",
      "image": "path",
      "alt": "description",
      "types": ["Type 1", "Type 2"]
    }
  ]
}
```

### Team
```json
"team": {
  "title": "Text",
  "intro": "Paragraph with <strong>HTML</strong>",
  "images": [
    { "src": "path", "alt": "description" }
  ]
}
```

### Process
```json
"process": {
  "title": "Text",
  "steps": [
    {
      "icon": "path",
      "title": "Step Name",
      "description": "Text",
      "alt": "Icon description"
    }
  ]
}
```

### FAQ
```json
"faq": {
  "title": "Text",
  "subtitle": "Text",
  "items": [
    {
      "question": "Question?",
      "answer": "Answer text"
    }
  ]
}
```

---

## Deployment

### Current Setup (AWS S3/CloudFront)

Your deployment process remains the same:

```bash
# Upload to S3
aws s3 sync new-site/ s3://marquelyvette-website/

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E50QXXWNUFNYT \
  --paths "/*"
```

**Note:** Make sure to upload the `data/` and `components/` directories!

---

## Next Steps

1. ✅ **Review** the component files in `components/`
2. ✅ **Explore** the data structure in `data/content.json`
3. ✅ **Make a small change** to test the system
4. ✅ **Read** `components/README.md` for detailed docs
5. ✅ **Consider** implementing the JavaScript loader or static site generator

---

## Benefits of This Approach

### For You
- 🎯 **Easy Updates** - Edit JSON instead of HTML
- 📝 **Content Management** - All content in one place
- 🔄 **Reusability** - Use components on multiple pages
- 📊 **Version Control** - Track content changes easily

### For Developers
- 🏗️ **Maintainability** - Modular, organized code
- 🎨 **Consistency** - Same structure everywhere
- 🚀 **Scalability** - Easy to add new pages
- 🧪 **Testability** - Validate content separately

### For Performance
- ⚡ **PageSpeed** - Same fast loading
- 📦 **Size** - No extra overhead
- 🖼️ **Images** - Lazy loading still works
- 🎯 **SEO** - All content still crawlable

---

## Troubleshooting

### Content Not showing?
- Check browser console for errors
- Verify JSON syntax in content.json
- Ensure component-loader.js is loaded
- Check data-component attributes match

### Images Not Loading?
- Verify image paths in content.json
- Check images/ directory structure
- Ensure paths are relative to index.html

### FAQ Not Opening?
- Check HTML structure matches template
- Verify unique IDs for each FAQ item
- Ensure CSS is properly loaded

---

## Support

- **Full Documentation:** `components/README.md`
- **Component Templates:** `components/*.html`
- **Example Data:** `data/content.json`
- **Loader Script:** `components/component-loader.js`

---

**Last Updated:** 2025-11-02
**Version:** 1.0
