# Photo Management Guide

## How to Update Photos on Your Website

All photos are managed from **ONE FILE**: `config/photos.json`

This makes it super easy to update any photo on your website!

---

## Quick Start: Updating a Photo

### Step 1: Upload Your New Photo

Upload your new image to the appropriate folder:
- **Portfolio photos** → `images/portfolio/`
- **Logo images** → `images/logos/`
- **Icons** → `images/backgrounds/`

### Step 2: Update photos.json

Open `config/photos.json` and find the photo you want to change.

**Example:** To change the first gallery image:

```json
"gallery": {
  "image1": {
    "src": "images/portfolio/YOUR-NEW-PHOTO.jpg",
    "alt": "Description of the photo",
    "priority": "high"
  }
}
```

### Step 3: Save & Refresh

- Save `photos.json`
- Refresh your website
- Done! ✨

---

## Photo Sections

### 🖼️ Gallery (Hero Section - 10 photos)

**Location in config:** `photos.gallery`

Controls the main gallery grid at the top of your homepage.

**Photos shown by device:**
- iPhone: 4 photos (image1-4)
- iPad Mini: 6 photos (image1-6)
- iPad Air: 8 photos (image1-8)
- Desktop: 10 photos (all)

**To update:**
```json
"gallery": {
  "image1": {
    "src": "images/portfolio/YOUR-PHOTO.jpg",
    "alt": "Professional description",
    "priority": "high"  // "high" = preloaded for fast display
  }
}
```

---

### 💬 Testimonials

**Location in config:** `photos.testimonials`

Controls testimonial section photos.

**Sections:**
- `featured` = Large testimonial with photo
- `testimonial1`, `testimonial2`, `testimonial3` = 3-column grid

**To update:**
```json
"testimonials": {
  "featured": {
    "src": "images/portfolio/CLIENT-PHOTO.jpg",
    "alt": "Client name"
  }
}
```

---

### 💼 Service Photos

**Location in config:** `photos.services`

Controls the 3 main service cards:
- Corporate Headshots
- Actor Headshots
- LinkedIn Headshots

**To update:**
```json
"services": {
  "corporate": {
    "src": "images/portfolio/CORPORATE-HEADSHOT.jpg",
    "alt": "Corporate headshot example"
  }
}
```

---

### 👥 Team Headshots

**Location in config:** `photos.teamHeadshots`

Controls the 2 team photo examples.

**To update:**
```json
"teamHeadshots": {
  "team1": {
    "src": "images/portfolio/TEAM-PHOTO-1.jpg",
    "alt": "Company name team headshots"
  }
}
```

---

### 👤 About Section

**Location in config:** `photos.about`

Controls:
- Your photographer photo
- Studio photo

**To update:**
```json
"about": {
  "photographer": {
    "src": "images/portfolio/YOUR-HEADSHOT.jpg",
    "alt": "Marquel Yvette, Professional Headshot Photographer"
  }
}
```

---

### ➕ Additional Services

**Location in config:** `photos.additionalServices`

Controls the 3 additional service photos:
- Branding Photography
- Event Coverage
- Virtual Gallery

**To update:**
```json
"additionalServices": {
  "branding": {
    "src": "images/portfolio/BRANDING-PHOTO.jpg",
    "alt": "Branding photography example"
  }
}
```

---

### 🎨 Logo

**Location in config:** `photos.logo`

Controls:
- Header logo (dark version)
- Footer logo (light version)

**To update:**
```json
"logo": {
  "header": "images/logos/YOUR-LOGO-DARK.png",
  "footer": "images/logos/YOUR-LOGO-LIGHT.png"
}
```

---

### 📸 Photo Gallery Page

**Location in config:** ALL sections

The photo gallery page (`photo-gallery.html`) automatically displays ALL photos from your `photos.json` file, organized by location.

**How it works:**
- Gallery photos show as "HOMEPAGE GALLERY"
- Testimonials show as "TESTIMONIALS"
- Service photos show as "SERVICES SECTION"
- Banner gallery shows as "RATES PAGE BANNER"
- And more...

**To update the photo gallery:**
Just update any section in `photos.json` and the photo gallery updates automatically!

**Note:** The page name appears under each photo when you hover over it.

---

## Tips & Best Practices

### Image Naming
Use descriptive filenames:
- ✅ Good: `client-name-corporate-headshot.jpg`
- ❌ Bad: `IMG_1234.jpg`

### Image Sizes
- **Gallery photos:** 1000-1500px wide
- **Testimonial photos:** 500-800px wide
- **Service cards:** 500-1000px wide
- **Team photos:** 1920px wide
- **Logos:** SVG or PNG at 2x resolution

### Alt Text
Always write descriptive alt text:
- ✅ Good: "Female lawyer professional headshot in Maryland"
- ❌ Bad: "Photo 1"

### Priority
Gallery images 1-6 should have `"priority": "high"` for faster loading.

---

## Deploying Photo Changes

### To Local Site:
1. Update `config/photos.json`
2. Save file
3. Refresh browser

### To Live Site (CloudFront):
1. Update `config/photos.json`
2. Upload to S3:
   ```bash
   cd "Marquel Yvette Photography/new-site"
   aws s3 cp config/photos.json s3://marquelyvette-website/config/photos.json
   ```
3. Invalidate cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/config/photos.json"
   ```
4. Wait 1-2 minutes, then refresh website

---

## Troubleshooting

### Photo not updating?
1. Check the file path is correct in `photos.json`
2. Make sure the photo file exists in the folder
3. Clear browser cache (Cmd + Shift + R)
4. Check browser console for errors (F12)

### Photo shows broken image?
- File path might be wrong
- Photo file might not be uploaded
- Check for typos in filename

### Need help?
Check the browser console (press F12) for error messages.

---

## Quick Reference

| What to Update | Edit This Section |
|----------------|-------------------|
| Main gallery photos | `photos.gallery` |
| Client testimonials | `photos.testimonials` |
| Service examples | `photos.services` |
| Team headshot examples | `photos.teamHeadshots` |
| About section photos | `photos.about` |
| Additional services | `photos.additionalServices` |
| Rates page banner | `photos.bannerGallery` |
| Rates testimonials | `photos.ratesTestimonials` |
| Contact page photos | `photos.contactPortfolio` |
| Thank you page photos | `photos.thankYouPortfolio` |
| Logo images | `photos.logo` |
| **Photo Gallery Page** | **All sections** (auto-updates) |

---

**Remember:** All photo changes are made in ONE file: `config/photos.json`

This makes updating your website photos quick and easy! 🎉
