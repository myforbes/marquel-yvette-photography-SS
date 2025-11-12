# Marquel Yvette Photography Website

Professional headshot photography website for Marquel Yvette Photography, serving the Washington DC Metro area, Loudoun County, and Northern Virginia.

**Live Site:** https://www.marquelyvette.com

## Project Overview

This project represents a complete migration from Squarespace to a custom-built, performance-optimized static website hosted on AWS. The rebuild achieves pixel-perfect visual fidelity to the original design while delivering superior performance, reduced costs, and full code ownership.

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Hosting:** AWS S3 (static hosting)
- **CDN:** AWS CloudFront
- **Version Control:** Git/GitHub
- **Deployment:** AWS CLI
- **Fonts:** Google Fonts (Montserrat)
- **Icons:** Font Awesome 6

## Key Features

### Performance Optimizations
- **Zero framework overhead** - Pure vanilla JavaScript
- **Optimized images** - WebP format, lazy loading
- **Clean CSS architecture** - Modular stylesheets (12KB main.css)
- **Fast page loads** - Static hosting with global CDN
- **Efficient caching** - CloudFront edge caching

### Design Fidelity
- **Pixel-perfect match** to original Squarespace design
- **Responsive design** - Mobile-first approach
- **Professional typography** - Montserrat font family
- **Consistent shadows** - Depth effects on all images (0 10px 30px rgba)
- **Smooth interactions** - Hover effects, transitions

### Core Functionality
- **Auto-advancing gallery** - 10-image hero grid with smooth transitions
- **Mobile hamburger menu** - Touch-friendly navigation
- **FAQ accordion** - Expandable Q&A section
- **Interactive forms** - Contact and booking forms
- **Social media integration** - Instagram, Facebook, LinkedIn
- **SEO optimized** - Meta tags, Open Graph, Schema.org markup

## Project Structure

```
Marquel Yvette Photography/
├── README.md                    # This file
├── new-site/                    # Production website
│   ├── index.html              # Homepage
│   ├── rates-2.html            # Pricing & booking page
│   ├── request-proposal.html   # Team proposal form
│   ├── contact.html            # Contact form page
│   ├── contact-thank-you.html  # Contact confirmation page
│   ├── css/
│   │   ├── main.css            # Primary stylesheet (12KB)
│   │   ├── gallery.css         # Gallery-specific styles
│   │   ├── menu.css            # Mobile menu styles
│   │   ├── contact-form.css    # Contact form styles
│   │   ├── thank-you.css       # Thank you page styles
│   │   └── pricing.css         # Pricing page styles
│   ├── js/
│   │   ├── gallery-autoplay.js # Auto-advancing gallery
│   │   ├── menu.js             # Mobile hamburger menu
│   │   ├── contact-form.js     # Contact form handling
│   │   └── meta-loader.js      # Dynamic metadata loading
│   ├── images/
│   │   ├── portfolio/          # Portfolio images
│   │   ├── banner-gallery/     # Banner headshot images
│   │   ├── backgrounds/        # Background images
│   │   └── logos/              # Icons and logos
│   └── components/
│       ├── README.md           # Component documentation
│       └── [component files]   # Modular HTML components
├── css-backup/                  # Original Squarespace CSS backup
└── [backup files]              # Development backups
```

## Migration Details

### From Squarespace to AWS

**Original Platform:**
- Squarespace hosted website
- Heavy framework dependencies (1.5MB+ CSS)
- Limited customization options
- Monthly subscription costs

**New Platform:**
- AWS S3 + CloudFront
- Clean, custom codebase
- Full control and ownership
- Minimal hosting costs (~$1-3/month)

### Rebuild Phases

1. **Phase 1:** Remove Squarespace framework scripts
2. **Phase 2:** Rebuild mobile hamburger menu (vanilla JS)
3. **Phase 3:** Rebuild gallery grid (CSS Grid)
4. **Phase 4:** Rebuild auto-advancing gallery (vanilla JS)
5. **Phase 5:** Visual design refinements (shadow boxes, spacing, typography)

## AWS Infrastructure

### S3 Bucket
- **Bucket:** `marquelyvette-website`
- **Region:** us-east-1
- **Configuration:** Static website hosting enabled
- **Permissions:** Public read access

### CloudFront Distribution
- **Distribution ID:** `E50QXXWNUFNYT`
- **Domain:** d1abc123example.cloudfront.net
- **Custom Domain:** www.marquelyvette.com
- **SSL/TLS:** HTTPS enabled
- **Caching:** Standard caching policies

## Development Workflow

### Local Development

```bash
# Navigate to project directory
cd "Marquel Yvette Photography/new-site"

# Start local server
python3 -m http.server 8002

# View at http://localhost:8002
```

### Making Changes

1. Edit files locally (HTML, CSS, JS)
2. Test changes in browser
3. Verify responsiveness (mobile, tablet, desktop)
4. Stage changes: `git add [files]`
5. Commit: `git commit -m "Description"`
6. Push to GitHub: `git push origin rebuild-vanilla-js`

### Deployment to AWS

```bash
# Upload specific file
aws s3 cp new-site/css/main.css s3://marquelyvette-website/css/main.css

# Sync entire directory
aws s3 sync new-site/ s3://marquelyvette-website/ --exclude ".*" --exclude "components/*"

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/css/main.css"

# Or invalidate all
aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/*"
```

## CSS Architecture

### Modular Stylesheets

- **main.css** (12KB) - Core styles, layout, components
- **gallery.css** (1.6KB) - Gallery grid and hero section
- **menu.css** (1.3KB) - Mobile hamburger menu

### Design System

**Colors:**
```css
--color-gold-dark: #c09e61;
--color-dark: #1a1a1a;
--color-dark-secondary: #2d2d2d;
--color-text-dark-gray: #4a4a4a;
--color-bg-light: #f5f5f5;
```

**Typography:**
```css
--font-primary: 'Montserrat', sans-serif;
--font-weight-normal: 400;
--font-weight-bold: 700;
```

**Spacing:**
```css
--spacing-xs: 10px;
--spacing-sm: 20px;
--spacing-md: 40px;
--spacing-lg: 60px;
--spacing-xl: 80px;
```

## Key Components

### Hero Gallery
- 10-image grid layout
- Auto-advancing every 8 seconds
- Smooth fade transitions
- Responsive grid (1-3 columns)

### Service Cards
- 3-column grid layout
- Image shadow effects
- Hover animations
- Responsive stacking

### FAQ Accordion
- 2-column grid layout
- Expandable/collapsible items
- Icon rotation animations
- Black/gray backgrounds

### Team Headshots
- Large grid images
- Call-to-action button
- Client success stories

## SEO & Metadata

### Meta Tags
```html
<title>Premium Headshots | Washington DC Metro | Marquel Yvette</title>
<meta name="description" content="Elevate your image with premium headshots...">
```

### Open Graph (Social Media)
```html
<meta property="og:title" content="Premium Headshots | Washington DC Metro">
<meta property="og:image" content="https://www.marquelyvette.com/images/og-image.jpg">
<meta property="og:url" content="https://www.marquelyvette.com">
```

### Schema.org Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Marquel Yvette Photography",
  "description": "Professional Headshot Photographer...",
  "url": "https://www.marquelyvette.com/"
}
```

## Performance Metrics

### Before (Squarespace)
- CSS Size: ~1.5MB+
- JavaScript: Heavy framework dependencies
- Load Time: 3-5 seconds
- Multiple HTTP requests for scripts

### After (Custom Build)
- CSS Size: ~15KB total (modular files)
- JavaScript: Minimal vanilla JS (~5KB)
- Load Time: <1 second
- Optimized asset loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 992px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
```

## Image Optimization

- **Format:** JPG for photos, PNG for logos/icons
- **Compression:** Optimized for web (60-80% quality)
- **Lazy loading:** Native lazy loading on images
- **Shadow effects:** Consistent depth (0 10px 30px rgba)

## Forms & Integrations

- **Booking Form:** Schedule.com integration
- **Contact Form:** Email integration
- **Analytics:** (Can be added as needed)
- **Social Media:** Direct links to profiles

## Version History

- **v1.0** - Initial Squarespace site
- **v2.0** - Complete rebuild with vanilla JS/CSS
  - Phase 1-4: Framework removal and core rebuilds
  - Phase 5: Visual design refinements
- **v2.1** - Additional pages and optimization (Nov 11, 2025)
  - Contact page with simplified form
  - Contact thank-you page with brand styling
  - Portfolio image optimization (Dennis: 381K → 28K)
  - Workplace headshots landing page
  - Photo gallery system
  - Mobile/tablet optimizations
- **v2.2** - Mobile optimization & design fixes (Nov 12, 2025)
  - Fixed homepage testimonials overlap on mobile
  - Reduced title font sizes across all mobile breakpoints
  - Optimized pricing page for mobile (4 images, proper padding)
  - Redesigned pricing page testimonials to match live site
  - Enhanced mobile typography and spacing throughout
- **Current:** Local changes ready for deployment to AWS S3 + CloudFront

## Pages Built

### ✅ Completed Pages (5/11)
1. **index.html** - Homepage with portfolio gallery, services, testimonials
2. **rates-2.html** - Pricing page with 3 packages and booking modals
3. **request-proposal.html** - Team proposal request form
4. **contact.html** - General contact form
5. **contact-thank-you.html** - Contact confirmation page

### 🔄 In Progress
6. **proposal-thank-you.html** - Proposal confirmation page (30 min)

### 📋 Pending Pages (5)
7. **privacy-policy.html** - Privacy policy
8. **tos.html** - Terms of service
9. **disclaimer.html** - Professional services disclaimer
10. **website-accessibility-statement.html** - Accessibility statement
11. **copyright.html** - Copyright notice

## Future Enhancements

- [ ] Add blog section for photography tips
- [ ] Implement client portal for photo delivery
- [ ] Add booking calendar integration
- [ ] Create gallery filtering by category
- [ ] Implement image lazy loading for performance
- [ ] Add Google Analytics or privacy-focused alternative
- [ ] Create automated deployment pipeline (GitHub Actions)
- [ ] Add automated image optimization in build process

## Maintenance

### Regular Tasks
- Update portfolio images quarterly
- Review and update service pricing
- Check and renew SSL certificates (auto-renewed by AWS)
- Monitor CloudFront usage and costs
- Review and optimize images for performance

### Content Updates
1. Edit HTML content directly in `index.html`
2. Test locally
3. Deploy to S3
4. Invalidate CloudFront cache

## Costs

### Squarespace (Before)
- $26-40/month subscription
- $312-480/year

### AWS (After)
- S3 Storage: <$1/month
- CloudFront: $1-3/month (depending on traffic)
- Domain (Route 53): ~$1/month
- **Total:** ~$3-5/month ($36-60/year)

**Annual Savings:** ~$250-420/year

## Support & Contact

**Website:** https://www.marquelyvette.com
**Developer:** Contact via GitHub repository
**Repository:** https://github.com/myforbes/marquel-yvette-photography-SS

## License

© 2025 Marquel Yvette Photography. All rights reserved.

Website code is proprietary. Portfolio images and content are copyrighted by Marquel Yvette Photography.

---

**Last Updated:** November 2, 2025
**Current Branch:** rebuild-vanilla-js
**Status:** ✅ Production - Deployed and Live
