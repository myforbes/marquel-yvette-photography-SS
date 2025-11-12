# Policy Pages & Footer Component Guide

Complete documentation for managing policy pages and the footer component system.

---

## Overview

This system provides:
- **Centralized footer component** that updates across all pages
- **Dynamic policy content** managed through JSON
- **5 policy pages**: Privacy Policy, Terms of Service, Accessibility, Disclaimer, Copyright
- **Easy content updates** without editing HTML

---

## File Structure

```
new-site/
├── components/
│   ├── footer.html              # Footer component (edit once, updates everywhere)
│   └── policy-template.html     # Template for policy pages
├── data/
│   └── policies.json            # All policy content (EDIT THIS FILE)
├── js/
│   ├── footer-loader.js         # Loads footer component
│   └── policy-loader.js         # Loads policy content dynamically
└── [Policy Pages]
    ├── privacy-policy.html      # Privacy Policy page
    ├── tos.html                 # Terms of Service page
    ├── website-accessibility-statement.html  # Accessibility page
    ├── disclaimer.html          # Disclaimer page
    └── copyright.html           # Copyright page
```

---

## How to Update Policy Content

### Step 1: Edit data/policies.json

Open `data/policies.json` and locate the policy you want to update:

```json
{
  "privacyPolicy": {
    "title": "Privacy Policy",
    "lastUpdated": "November 12, 2025",
    "sections": [
      {
        "heading": "Your Section Heading",
        "content": "Your content here..."
      }
    ]
  }
}
```

### Step 2: Policy Types Available

- `privacyPolicy` - Privacy Policy content
- `termsOfService` - Terms of Service content
- `accessibility` - Accessibility Statement content
- `disclaimer` - Disclaimer content
- `copyright` - Copyright Notice content

### Step 3: Content Formatting

**Plain Text:**
```json
"content": "This is a simple paragraph."
```

**Multiple Paragraphs:**
```json
"content": "First paragraph.\n\nSecond paragraph.\n\nThird paragraph."
```

**Bullet Lists:**
```json
"content": "Introduction text:\n\n• First item\n• Second item\n• Third item"
```

**Mixed Content:**
```json
"content": "We collect the following:\n\n• Personal information\n• Contact details\n• Payment information\n\nAll data is securely stored."
```

---

## How to Update the Footer

### Option 1: Edit Footer Component (Recommended)

Edit `components/footer.html` - changes apply to ALL pages automatically.

**Example: Update Phone Number**
```html
<p><strong>Phone:</strong> <a href="tel:+17039570643">(703) 957-0643</a></p>
```

**Example: Update Tagline**
```html
<p class="footer-tagline">Your new tagline here</p>
```

**Example: Add New Policy Link**
```html
<div class="footer-links">
    <a href="privacy-policy.html">Privacy Policy</a>
    <a href="tos.html">Terms of Service</a>
    <a href="new-policy.html">New Policy</a>  <!-- ADD THIS -->
</div>
```

### Option 2: What to Edit

**Contact Information:**
- Phone: Line 13
- Email: Line 14
- Location: Line 15

**CTA Button:**
- Text: Line 21
- Link: Line 22

**Social Links:**
- Instagram: Line 28
- Facebook: Line 31
- LinkedIn: Line 34

**Legal Links:**
- Policy links: Lines 41-45

---

## Adding a New Policy Page

### Step 1: Add Content to policies.json

```json
{
  "newPolicy": {
    "title": "New Policy Title",
    "lastUpdated": "November 12, 2025",
    "sections": [
      {
        "heading": "Section 1",
        "content": "Content here..."
      }
    ]
  }
}
```

### Step 2: Create HTML Page

Copy the template:
```bash
cp components/policy-template.html new-policy.html
```

### Step 3: Update policy-loader.js

Add mapping in `js/policy-loader.js`:
```javascript
const policyMap = {
  'privacy-policy.html': 'privacyPolicy',
  'tos.html': 'termsOfService',
  'new-policy.html': 'newPolicy',  // ADD THIS
  // ...
};
```

### Step 4: Add Link to Footer

Edit `components/footer.html`:
```html
<div class="footer-links">
    <a href="privacy-policy.html">Privacy Policy</a>
    <a href="new-policy.html">New Policy</a>  <!-- ADD THIS -->
</div>
```

---

## Using Footer Component on New Pages

### Step 1: Add Placeholder in HTML

```html
<!-- At the end of your page, before closing </body> -->
<div id="footer-placeholder"></div>
```

### Step 2: Load Footer Script

```html
<script src="js/footer-loader.js" defer></script>
```

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <!-- Your page content here -->

    <!-- Footer Component -->
    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script src="js/footer-loader.js" defer></script>
</body>
</html>
```

---

## Policy Page URLs

All policy pages are accessible at:

- **Privacy Policy:** `/privacy-policy.html`
- **Terms of Service:** `/tos.html`
- **Accessibility:** `/website-accessibility-statement.html`
- **Disclaimer:** `/disclaimer.html`
- **Copyright:** `/copyright.html`

---

## Updating Existing Pages to Use Footer Component

### Pages to Update:
- index.html
- rates-2.html
- workplace-headshots.html
- contact.html
- request-proposal.html
- photo-gallery.html

### Steps for Each Page:

1. **Find the footer section:**
```html
<footer class="site-footer">
    <!-- entire footer content -->
</footer>
```

2. **Replace with placeholder:**
```html
<div id="footer-placeholder"></div>
```

3. **Add footer-loader.js:**
```html
<script src="js/footer-loader.js" defer></script>
```

---

## Benefits of Component System

✅ **Update Once, Change Everywhere**
- Edit footer in one place → updates on all pages

✅ **Easy Content Management**
- Edit JSON file → policy pages update automatically

✅ **Consistent Design**
- Footer looks identical across all pages

✅ **Maintainable**
- No need to edit 10+ HTML files for simple changes

✅ **Version Control Friendly**
- Policy changes tracked in JSON
- Footer changes tracked in one component

---

## Troubleshooting

### Footer Not Showing

**Check 1:** Verify placeholder exists
```html
<div id="footer-placeholder"></div>
```

**Check 2:** Verify script is loaded
```html
<script src="js/footer-loader.js" defer></script>
```

**Check 3:** Check browser console for errors (F12)

### Policy Content Not Loading

**Check 1:** Verify filename matches mapping in policy-loader.js

**Check 2:** Verify policy type exists in policies.json

**Check 3:** Check browser console for errors

### Styling Issues

**Check 1:** Ensure main.css is loaded
```html
<link rel="stylesheet" href="css/main.css">
```

**Check 2:** Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

---

## Common Updates

### Update Copyright Year

**File:** `components/footer.html`
**Line:** 40
```html
<p>&copy; 2025 Marquel Yvette Photography. All rights reserved.</p>
```

### Update Last Updated Date

**File:** `data/policies.json`
**Field:** `lastUpdated`
```json
"lastUpdated": "November 12, 2025"
```

### Add New Social Link

**File:** `components/footer.html`
**Section:** Social Links (Lines 27-36)
```html
<a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <i class="fab fa-twitter"></i>
</a>
```

---

## Best Practices

1. **Always update policies.json** instead of HTML
2. **Test changes locally** before deploying
3. **Update lastUpdated date** when changing policy content
4. **Keep footer.html clean** and well-formatted
5. **Use meaningful section headings** in policies
6. **Include contact information** in all policies

---

## File Locations Quick Reference

| File | Purpose | When to Edit |
|------|---------|--------------|
| `data/policies.json` | Policy content | Update policy text |
| `components/footer.html` | Footer layout | Change footer design/links |
| `js/footer-loader.js` | Footer loader | Add new pages (rarely) |
| `js/policy-loader.js` | Policy loader | Add new policies |

---

*Last Updated: November 12, 2025*
*Created by: Claude Code*
