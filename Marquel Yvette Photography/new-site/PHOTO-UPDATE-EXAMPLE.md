# Photo Update Example

## Quick Example: Changing a Gallery Photo

Let's say you want to replace the first gallery photo with a new client headshot.

### Step 1: Upload Your New Photo

Upload `my-awesome-headshot.jpg` to:
```
images/portfolio/my-awesome-headshot.jpg
```

### Step 2: Open config/photos.json

Find the gallery section and update image1:

**BEFORE:**
```json
"gallery": {
  "image1": {
    "src": "images/portfolio/Dionne_Kindra_697-MarquelYvette0085.jpg",
    "alt": "A professional woman with curly hair, smiling, dressed in a dark blazer and white top.",
    "priority": "high"
  }
}
```

**AFTER:**
```json
"gallery": {
  "image1": {
    "src": "images/portfolio/my-awesome-headshot.jpg",
    "alt": "Professional headshot of marketing executive in navy blazer",
    "priority": "high"
  }
}
```

### Step 3: Save & Test

1. Save `config/photos.json`
2. Refresh your browser
3. The photo updates automatically! ✨

---

## Updating Alt Text Only

You can also just update the alt text without changing the photo:

```json
"gallery": {
  "image1": {
    "src": "images/portfolio/Dionne_Kindra_697-MarquelYvette0085.jpg",
    "alt": "Executive director smiling in dark blazer - updated description",
    "priority": "high"
  }
}
```

The alt text in your HTML will automatically update when the page loads.

---

## How It Works

1. Your HTML has `data-photo` attributes on all images:
   ```html
   <img data-photo="gallery-1" src="..." alt="...">
   ```

2. The `photo-loader.js` script reads `config/photos.json`

3. It updates both the `src` and `alt` attributes automatically

4. You only need to edit ONE file (`photos.json`) to update photos sitewide!

---

## Benefits

✅ **Update once** - Change applied everywhere
✅ **Alt text included** - Update descriptions easily
✅ **No HTML editing** - Just edit the JSON file
✅ **Preview locally** - See changes before deploying
✅ **Version control friendly** - Track photo changes in git

---

## Photo Gallery Auto-Updates

**BONUS:** When you update a photo in `photos.json`, it updates BOTH:
1. ✅ The main website (homepage, rates, contact, etc.)
2. ✅ The photo gallery page (`photo-gallery.html`)

**Example:**

Update gallery image #1 in `photos.json`:
```json
"gallery": {
  "image1": {
    "src": "images/portfolio/new-headshot.jpg",
    "alt": "New client headshot",
    "priority": "high"
  }
}
```

**This ONE change updates:**
- Homepage gallery (shows the new photo)
- Photo gallery page (shows the new photo under "HOMEPAGE GALLERY")

You only edit ONE file and everything updates automatically!

---

## All Sections You Can Update

- **Homepage Gallery** (10 photos)
- **Testimonials** (4 photos)
- **Services** (3 photos)
- **Team Headshots** (2 photos)
- **About Section** (2 photos)
- **Additional Services** (3 photos)
- **Rates Page Banner** (8 photos)
- **Rates Testimonials** (3 photos)
- **Contact Page Portfolio** (4 photos)
- **Thank You Page Portfolio** (6 photos)
- **Process Icons** (3 icons)
- **Logo** (2 versions)

**Total:** 50+ images controlled from ONE file!

See `PHOTOS-GUIDE.md` for complete documentation!
