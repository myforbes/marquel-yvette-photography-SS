# Photo Gallery - Quick Start Guide

## Update Photos Visually (Easy Way!)

### Step 1: Start the Photo Gallery Server

```bash
./start-photo-gallery.sh
```

You'll see:
```
🎨 Photo Gallery Server running at http://localhost:3000
📸 Open: http://localhost:3000/photo-gallery.html
```

### Step 2: Open the Photo Gallery

The server will automatically open your browser to:
```
http://localhost:3000/photo-gallery.html
```

Or manually open that URL in your browser.

### Step 3: Update Photos

You'll see **ALL your website photos** organized by page:
- Homepage Gallery
- Testimonials
- Services
- Team Headshots
- About Section
- Additional Services
- Rates Page Banner
- Contact Page
- Thank You Page
- Workplace Headshots Page

**To update a photo:**
1. Click the **"Update Photo"** button under any image
2. Select your new photo from your computer
3. The photo automatically:
   - ✅ Saves to the correct folder
   - ✅ Updates `config/photos.json`
   - ✅ Shows a preview

### Step 4: Deploy to Live Site

After updating all the photos you want:

1. Click the **"Deploy to CloudFront"** button at the top
2. Wait 1-2 minutes
3. Your live website now has the new photos!

### Step 5: Stop the Server

When you're done updating photos:
- Press `Ctrl+C` in the terminal to stop the server

---

## What Happens Behind the Scenes

1. **You click a photo** → Opens file picker
2. **You select new image** → Uploads to local directory
3. **Server updates** → Saves to `images/portfolio/` (or appropriate folder)
4. **JSON updates** → `config/photos.json` updates automatically
5. **You see preview** → Photo shows green checkmark ✓
6. **Click Deploy** → Uploads to S3 and invalidates CloudFront cache
7. **Live site updates** → New photo appears on the actual page!

---

## Example Workflow

```bash
# 1. Start the gallery
./start-photo-gallery.sh

# Browser opens showing all your photos

# 2. Click "Update Photo" under a gallery image
# 3. Choose new-client-headshot.jpg from your computer
# 4. See it update instantly with ✓
# 5. Repeat for any other photos you want to change
# 6. Click "Deploy to CloudFront" button
# 7. Wait 1-2 minutes
# 8. Visit your website - photos are updated!

# 9. Press Ctrl+C to stop the server when done
```

---

## Which Photo is Which?

When you hover over a photo in the gallery, you'll see:
- **Location label** (e.g., "Homepage Gallery", "Testimonials")
- **File path** (e.g., "images/portfolio/photo.jpg")

This tells you exactly where that photo appears on your website!

---

## Tips

- **Update multiple photos** before deploying (saves time)
- **Test locally first** - refresh your local site to see changes
- **Use descriptive filenames** for your new photos
- **Keep backups** of your original photos
- **Deploy when ready** - no rush, all changes are saved locally first

---

## Troubleshooting

**Server won't start?**
```bash
# Make sure you're in the right directory
cd /Users/marquel/MYP\ Current\ Website/Marquel\ Yvette\ Photography/new-site

# Try running directly
node photo-gallery-server.js
```

**Can't connect to gallery?**
- Make sure the server is running (you should see the startup message)
- Try http://localhost:3000/photo-gallery.html

**Deploy button doesn't work?**
- Make sure AWS CLI is configured
- Check that you have internet connection

---

## Alternative: Manual Method

Don't want to use the visual gallery? You can still edit `config/photos.json` directly:

```bash
# 1. Edit config/photos.json
# 2. Upload your new photos to images/portfolio/
# 3. Deploy
./deploy.sh "Updated photos"
```

But the visual gallery is **much easier**! 🎨
