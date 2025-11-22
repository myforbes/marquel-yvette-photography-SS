# Page Connection Guide

How service landing pages connect to other pages on your site.

---

## Current Page Flow

```
Homepage (index.html)
    │
    ├─→ Workplace Headshots Section
    │   └─→ [LEARN MORE] → workplace-headshots.html
    │   └─→ [REQUEST PROPOSAL] → request-proposal.html
    │
    ├─→ Corporate Headshots Section
    │   └─→ [SEE RATES] → rates-2.html
    │
    └─→ Contact Section
        └─→ [CONTACT] → contact.html

Workplace Headshots Page (workplace-headshots.html)
    │
    ├─→ [Get a Custom Quote] → #contact (scroll to form)
    ├─→ [See How It Works] → #how-it-works (scroll to section)
    ├─→ [Request a Custom Quote] → contact.html
    └─→ [Call Button] → tel:+17039570643

Request Proposal Page (request-proposal.html)
    │
    └─→ GHL Embedded Form → Submits to GoHighLevel CRM
```

---

## Adding New Service Connections

### From Homepage

Add a new service section in `index.html`:

```html
<section class="service-section">
    <div class="container">
        <h2 class="section-title">Your New Service</h2>
        <p>Service description...</p>
        <a href="your-new-service.html" class="cta-button">LEARN MORE</a>
    </div>
</section>
```

### From Navigation Menu

If you want a top-level menu item, edit the header:

```html
<nav class="header-menu">
    <a href="rates-2.html">Rates</a>
    <a href="workplace-headshots.html">Workplace Headshots</a>
    <a href="your-new-service.html">Your Service</a>  <!-- ADD THIS -->
    <a href="contact.html" class="cta-button">Contact</a>
</nav>
```

### From Other Service Pages

Cross-link related services:

```html
<section class="related-services">
    <h3>You Might Also Like</h3>
    <a href="actor-headshots.html">Actor Headshots</a>
    <a href="workplace-headshots.html">Workplace Headshots</a>
</section>
```

---

## Call-to-Action Buttons

### Primary CTAs (What you want users to do)

**Request Proposal:**
```html
<a href="request-proposal.html" class="cta-button">REQUEST A PROPOSAL</a>
```

**View Pricing:**
```html
<a href="rates-2.html" class="cta-button">SEE RATES & AVAILABILITY</a>
```

**Contact:**
```html
<a href="contact.html" class="cta-button">GET IN TOUCH</a>
```

**Call:**
```html
<a href="tel:+17039570643" class="cta-button">CALL NOW</a>
```

### Secondary CTAs (Supporting actions)

**Learn More:**
```html
<a href="service-page.html" class="cta-button-outline">LEARN MORE</a>
```

**View Gallery:**
```html
<a href="photo-gallery.html" class="cta-button-outline">VIEW GALLERY</a>
```

---

## Internal Linking Best Practices

### 1. Link to Service Pages from Homepage
Every service should have a dedicated landing page linked from the homepage.

### 2. Service Pages → Conversion
Every service page should have clear paths to:
- Request proposal
- View rates
- Contact form
- Phone number

### 3. Cross-Link Related Services
Link similar services to each other:
- Workplace Headshots ↔ Executive Portraits
- Actor Headshots ↔ Personal Branding
- Real Estate Photography ↔ Commercial Photography

### 4. Footer Links
Every page footer should include:
- Main services
- Contact info
- Social media
- Legal pages

---

## Anchor Links (On-Page Navigation)

Use anchor links to scroll to sections:

```html
<!-- Link -->
<a href="#how-it-works">See How It Works</a>

<!-- Target Section -->
<section id="how-it-works">
    <h2>How It Works</h2>
</section>
```

**Common Anchors:**
- `#contact` - Contact section
- `#how-it-works` - Process section
- `#pricing` - Pricing section
- `#gallery` - Photo gallery
- `#testimonials` - Reviews section

---

## External Links

### Social Media
```html
<a href="https://www.instagram.com/marquelyvettephoto" target="_blank" rel="noopener noreferrer">
    Instagram
</a>
```

### Phone Numbers
```html
<a href="tel:+17039570643">(703) 957-0643</a>
```

### Email
```html
<a href="mailto:marquel@marquelyvette.com">marquel@marquelyvette.com</a>
```

---

## Navigation Hierarchy

```
Level 1 (Main Navigation)
├── Home
├── Services
│   ├── Workplace Headshots
│   ├── Actor Headshots
│   └── Executive Portraits
├── Rates
├── Gallery
└── Contact

Level 2 (Footer Navigation)
├── About
├── FAQ
├── Privacy Policy
├── Terms of Service
└── Social Media Links
```

---

## Testing Your Connections

### Checklist

- [ ] All links work (no 404 errors)
- [ ] Links open in correct window (internal vs external)
- [ ] Phone and email links work on mobile
- [ ] Anchor links scroll smoothly
- [ ] Back button works correctly
- [ ] Navigation is consistent across pages

### How to Test

1. **Click every link** on every page
2. **Test on mobile** (phone and email links)
3. **Use browser back button** (should work smoothly)
4. **Check external links** (should open in new tab)

---

## Common Issues

### Link Goes to 404
**Problem:** File doesn't exist or filename is wrong
**Fix:** Check filename matches exactly (case-sensitive)

### Link Opens Wrong Page
**Problem:** Wrong href value
**Fix:** Verify the href path is correct

### Phone Link Doesn't Work
**Problem:** Missing `tel:` prefix
**Fix:** Use `tel:+17039570643` format

### Email Link Doesn't Work
**Problem:** Missing `mailto:` prefix
**Fix:** Use `mailto:email@domain.com` format

---

**Quick Reference: Main Site Pages**

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `index.html` | Main landing page |
| Workplace Headshots | `workplace-headshots.html` | Service landing page |
| Request Proposal | `request-proposal.html` | Lead capture form |
| Rates | `rates-2.html` | Pricing information |
| Contact | `contact.html` | Contact form |
| Photo Gallery | `photo-gallery.html` | Portfolio viewer |

---

*Last Updated: November 11, 2025*
