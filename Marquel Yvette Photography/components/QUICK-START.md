# Quick Start: Clone a Service Landing Page

**Want to create a new service page in 5 minutes? Follow this guide!**

---

## Step 1: Copy the JSON Template (2 minutes)

```bash
cd data/services
cp workplace-headshots.json your-new-service.json
```

Edit `your-new-service.json`:
- Change `pageId` to match your filename
- Update all text content
- Modify benefits, steps, and stats

## Step 2: Copy the HTML File (1 minute)

```bash
cp components/service-landing-page.html your-new-service.html
```

That's it! The HTML file is ready to use as-is.

## Step 3: Update the JavaScript Mapping (1 minute)

Edit `js/service-landing-loader.js`:

```javascript
const serviceMap = {
    'workplace-headshots.html': 'workplace-headshots',
    'your-new-service.html': 'your-new-service',  // ADD THIS
    'service-landing-page.html': 'workplace-headshots'
};
```

## Step 4: Link It Up (1 minute)

Add a link to your new page in `index.html`:

```html
<a href="your-new-service.html" class="cta-button">LEARN MORE</a>
```

## Step 5: Test It!

Open in browser:
```
http://localhost:8000/your-new-service.html
```

---

## Done! 🎉

Your new service page is live with:
- ✅ Professional design
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Easy to update

**Edit content?** Just update the JSON file - no HTML needed!

---

## Common Use Cases

### Actor Headshots
```json
"pageId": "actor-headshots",
"hero": {
  "title": "Professional Actor Headshots",
  "subtitle": "Your First Audition Happens Before You Walk in the Room"
}
```

### Real Estate Photography
```json
"pageId": "real-estate-photography",
"hero": {
  "title": "Real Estate Photography",
  "subtitle": "Sell Properties Faster with Stunning Photos"
}
```

### Event Photography
```json
"pageId": "event-photography",
"hero": {
  "title": "Event Photography",
  "subtitle": "Capture Every Memorable Moment"
}
```

---

**Need more help?** See `SERVICE-LANDING-PAGE-GUIDE.md` for full documentation.
