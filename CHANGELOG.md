# Changelog
## Marquel Yvette Photography Website

All notable changes to this project are documented in this file.

---

## [2.1.0] - November 11, 2025

### 🚀 Deployed to Production
- **Deployment Time:** November 11, 2025 at 22:46 UTC
- **CloudFront Invalidation:** I3T9DRQYBRSZ9S4IDREMEVYGCQ
- **Status:** ✅ Live and operational

### 🎨 Mobile & Tablet Optimization

#### Homepage (index.html)
- Added animated hamburger menu (burger-to-X transition)
- Implemented responsive gallery breakpoints:
  - 4 photos on iPhone
  - 6 photos on iPad Mini
  - 8 photos on iPad Air
  - 10 photos on desktop
- Added mobile-specific CTA button below gallery
- Optimized touch interactions (44x44px minimum tap targets)
- Added safe area support for iPhone X+ notched devices
- Standardized typography across all breakpoints
- Reduced excessive padding throughout mobile layout
- Implemented desktop-only hover effects
- Added mobile tap feedback with scale/opacity transitions
- Enhanced ARIA labels and keyboard navigation

#### Team Photography Page (team-photography.html)
- Full mobile/tablet responsive design
- Hamburger navigation on mobile
- Responsive image grid
- Optimized spacing and typography
- Touch-optimized interactions

### 📄 Documentation Updates
- Updated `REBUILD_COMPLETE.md` with new features and deployment status
- Updated `README.md` with complete project structure
- Updated `AWS_DEPLOYMENT_GUIDE.md` with deployment history
- Updated `content.json` with team photography page link
- Created `CHANGELOG.md` (this file)

---

## [2.0.0] - November 9, 2025

### ✨ New Features

#### Team Photography Landing Page
- **File:** team-photography.html
- Dedicated landing page for team photography services
- Hero section with service overview
- Photo examples showcase
- Service benefits grid
- Call-to-action buttons
- Fully responsive design

#### Photo Gallery System
- **Files:** photo-gallery.html, data/photos.json, js/photo-gallery.js
- Centralized photo management via JSON
- Interactive photo viewer with lightbox
- Click-to-enlarge functionality
- Keyboard navigation (arrow keys, ESC)
- Touch-enabled for mobile devices
- Photo categories: headshots, team, corporate, events
- Admin functionality to update photos
- Responsive grid layout
- Lazy loading for performance

#### Request Proposal System
- **File:** request-proposal.html
- Professional proposal request form
- Service type selection
- Date and time preferences
- Team size input
- Message/requirements field
- Contact information collection
- Form validation
- Success confirmation page

#### Centralized Metadata System
- **File:** data/content.json
- Centralized content management
- Site-wide metadata
- SEO optimization data
- Service descriptions
- Testimonials data
- Process steps
- FAQ content
- Easy content updates without HTML editing

### 🔧 Improvements
- Added photo update functionality
- Implemented centralized photo management
- Enhanced gallery manager capabilities

### Git Commits (November 9, 2025)
```
760cab7 - Optimize team photography page for mobile and tablet devices
85a1314 - Add team photography page photos to gallery manager
cf25976 - Add team photography page image placeholders to photos.json
ef41f9a - Add team photography landing page and centralized metadata system
5a71c98 - Add photo update functionality to photo gallery
23b9a5e - Add centralized photo management system and photo gallery viewer
```

---

## [1.2.0] - November 9, 2025

### 🎨 Design Updates
- Optimized homepage for mobile devices and tablets
- Reduced spacing throughout site to match live site layout
- Fixed gallery: Removed auto-advance, added click-to-enlarge lightbox
- Added tracking codes, gallery carousel, and live chat

### Git Commits
```
0c5e195 - Optimize homepage for mobile devices and tablets
5c7e20a - Reduce spacing throughout site to match live site layout
4adea30 - Fix gallery: Remove auto-advance, add click-to-enlarge lightbox
f77826f - Add tracking codes, gallery carousel, and live chat to match live site
```

---

## [1.1.0] - November 2-3, 2025

### 📄 New Pages
- **contact.html** - Professional contact form
- **contact-thank-you.html** - Form submission success page
- **rates-2.html** - Updated pricing and packages page

### 🚀 Performance Optimizations
- Implemented responsive image loading strategy for home page
- Implemented responsive image loading strategy for rates page
- Major performance optimization for home and rates pages

### 📝 Documentation
- Updated README with contact pages and project progress

### Git Commits
```
61b6f4b - Update README with contact pages and project progress
3a77efb - Add contact page and contact thank-you page with brand styling
70151c3 - Add responsive image loading strategy for home page
b8878e6 - Add responsive image loading strategy for rates page
c01beb2 - Major performance optimization for home and rates pages
```

---

## [1.0.0] - November 2, 2025

### 🎉 Initial Vanilla JS Rebuild

#### What We Removed
- ❌ Squarespace framework (~200KB)
- ❌ legacy.js (42KB - IE11 polyfills)
- ❌ modern.js (115KB - framework code)
- ❌ site-bundle.js (~50KB)
- ❌ SQUARESPACE_CONTEXT (massive JSON configuration)
- ❌ 15+ rollup scripts
- ❌ GalleryGrid controller
- ❌ Header controller
- ❌ All Squarespace API dependencies

#### What We Built
- ✅ **menu.js** (1.6KB) - Mobile hamburger menu
- ✅ **menu.css** (1.2KB) - Menu styles
- ✅ **gallery.css** (1.6KB) - Pure CSS Grid gallery
- ✅ **gallery-autoplay.js** (1.8KB) - Enhanced auto-advance

#### Results
- **97% JavaScript reduction** (200KB → 6KB)
- Zero dependencies
- Full accessibility (ARIA, keyboard nav)
- Progressive enhancement
- Better performance
- Easier maintenance

### 🚀 Initial Deployment
- **S3 Bucket:** marquelyvette-website
- **CloudFront:** E50QXXWNUFNYT
- **Branch:** rebuild-vanilla-js
- **Status:** Deployed to CloudFront

---

## Performance Metrics

### Before (Squarespace)
- JavaScript: ~200KB framework
- PageSpeed Score: ~27%
- Load Time: 4-6 seconds
- Render-Blocking: 440ms CSS + 200KB JS
- Monthly Cost: $16-23

### After (AWS Vanilla JS)
- JavaScript: ~6KB custom scripts
- PageSpeed Score: 90-95% (expected)
- Load Time: 1-2 seconds (expected)
- Render-Blocking: Minimal
- Monthly Cost: $1-5

---

## Repository Information

- **Live Site:** https://www.marquelyvette.com
- **CloudFront URL:** https://d1pqc8zade8idc.cloudfront.net
- **Branch:** rebuild-vanilla-js
- **Last Updated:** November 11, 2025
- **Status:** ✅ Deployed and Live

---

## Deployment Commands

### Quick Deploy
```bash
# From project root
cd "Marquel Yvette Photography/new-site"

# Sync to S3
aws s3 sync . s3://marquelyvette-website/ \
  --delete --exclude ".DS_Store" --exclude "*.md"

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id E50QXXWNUFNYT \
  --paths "/*"
```

### Check Deployment Status
```bash
# Check git status
git status

# Check recent commits
git log --oneline -10

# Check CloudFront invalidations
aws cloudfront list-invalidations \
  --distribution-id E50QXXWNUFNYT
```

---

*For detailed deployment information, see [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md)*

*For complete rebuild documentation, see [REBUILD_COMPLETE.md](REBUILD_COMPLETE.md)*
