# Clean Site Rebuild Plan
**Project:** Marquel Yvette Photography - Full HTML/CSS Rebuild
**Goal:** Build lightweight, PageSpeed-friendly site (90-95+ score)
**Date:** November 2, 2025

---

## Current State vs Target

### Current (Squarespace Export)
- **HTML:** 368KB (bloated)
- **CSS:** 2MB (site.css 1.5MB + static.css 429KB)
- **JavaScript:** 6KB (menu.js + gallery-autoplay.js)
- **Images:** 7.1MB (already optimized)
- **PageSpeed:** Crashes (cannot test)

### Target (Clean Rebuild)
- **HTML:** ~50KB (semantic, minimal)
- **CSS:** ~20-30KB (custom, lightweight)
- **JavaScript:** 6KB (keep our custom scripts)
- **Images:** 7.1MB (no changes - already optimized)
- **PageSpeed:** 90-95+ score

---

## Site Sections to Rebuild

### 1. Header/Navigation
**Current:** Complex Squarespace structure
**New:** Clean semantic header
```html
<header>
  <nav>
    <a href="/" class="logo">Marquel Yvette Photography</a>
    <button class="menu-toggle">☰</button>
    <ul class="nav-menu">
      <li><a href="#services">Services</a></li>
      <li><a href="#portfolio">Portfolio</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#contact" class="cta-button">Book Now</a></li>
    </ul>
  </nav>
</header>
```

### 2. Hero Section
**Content:**
- Large hero image
- Client testimonial quote
- Headline: "ONE HOUR. ONE IMAGE. A WHOLE NEW LEVEL OF CONFIDENCE"

**New Structure:**
```html
<section class="hero">
  <div class="hero-content">
    <h1>Premium Headshots | Washington DC Metro</h1>
    <p class="tagline">One hour. One image. A whole new level of confidence.</p>
    <blockquote>
      <p>"Marquel was very professional..."</p>
      <cite>— Client Name</cite>
    </blockquote>
  </div>
</section>
```

### 3. Service Categories (6 sections)
- Corporate Headshots
- Actor Headshots
- LinkedIn Headshots
- Realtor Headshots
- Executive Headshots
- Company Headshots

**New Structure:**
```html
<section class="services" id="services">
  <div class="service-category">
    <img src="./images/corporate.jpg" alt="Corporate Headshots">
    <h2>Corporate Headshots</h2>
    <p>Description text...</p>
  </div>
  <!-- Repeat for each service -->
</section>
```

### 4. Team Headshots Section
**Content:**
- Description text
- Team portfolio images
- "REQUEST A PROPOSAL" button

### 5. Portfolio Gallery
**Current:** 31 images with massive srcsets
**New:** Simple responsive grid with our CSS Grid (gallery.css)

```html
<section class="portfolio" id="portfolio">
  <div class="gallery-grid">
    <img src="./images/portfolio/image1.jpg" alt="Description">
    <!-- Use our existing optimized images -->
  </div>
</section>
```

### 6. Testimonials
**Content:** Client success stories with quotes

### 7. About Section
**Content:**
- Photographer photo
- Biography
- Professional narrative

### 8. Process Section
**Content:** 3 steps
- Schedule
- Shoot
- Download

### 9. Studio Location
**Content:**
- Studio photo
- Address details
- Landmark references

### 10. FAQ Section
**Current:** CSS-only accordion (keep this!)
**Action:** Rebuild with same checkbox technique

### 11. Footer
**Content:**
- Logo
- Contact info (phone, email)
- Service area
- Social media links
- Legal links
- Copyright

---

## Technical Implementation

### Phase 1: Foundation (30 min)
- [ ] Create clean HTML5 boilerplate
- [ ] Add semantic structure (<header>, <main>, <footer>)
- [ ] Set up meta tags (viewport, description, OG tags)
- [ ] Link to clean CSS and existing JS files

### Phase 2: Content Migration (2-3 hours)
- [ ] Extract all text content from current site
- [ ] Identify all images being used
- [ ] Create content inventory document
- [ ] Build each section one by one:
  - [ ] Header/Navigation
  - [ ] Hero section
  - [ ] Service categories (6)
  - [ ] Team headshots
  - [ ] Portfolio gallery
  - [ ] Testimonials
  - [ ] About section
  - [ ] Process section
  - [ ] Studio location
  - [ ] FAQ section
  - [ ] Footer

### Phase 3: Custom CSS (2-3 hours)
- [ ] Create modern, lightweight CSS
- [ ] Use CSS Grid and Flexbox (no frameworks)
- [ ] Mobile-first responsive design
- [ ] Reuse our existing:
  - menu.css (mobile menu)
  - gallery.css (portfolio grid)
- [ ] Color scheme from existing site
- [ ] Typography (Open Sans font)
- [ ] Animations (subtle, performant)

### Phase 4: JavaScript (30 min)
- [ ] Keep menu.js (already built)
- [ ] Keep gallery-autoplay.js (already built)
- [ ] No additional JS needed

### Phase 5: Optimization (1 hour)
- [ ] Minify HTML (optional)
- [ ] Minify CSS
- [ ] Add lazy loading to images
- [ ] Optimize meta tags
- [ ] Add structured data (Schema.org)

### Phase 6: Testing & Deployment (1 hour)
- [ ] Test all links
- [ ] Test mobile menu
- [ ] Test FAQ accordion
- [ ] Test gallery autoplay
- [ ] Test across browsers (Chrome, Safari, Firefox)
- [ ] Test on mobile devices
- [ ] Upload to S3
- [ ] Invalidate CloudFront
- [ ] **Run PageSpeed Insights** (should score 90-95+)

---

## File Structure

```
/
├── index.html              (NEW - clean, ~50KB)
├── css/
│   ├── main.css           (NEW - custom styles, ~20KB)
│   ├── menu.css           (KEEP - our mobile menu)
│   └── gallery.css        (KEEP - our CSS Grid)
├── js/
│   ├── menu.js            (KEEP - our menu script)
│   └── gallery-autoplay.js (KEEP - our gallery script)
└── images/
    └── portfolio/         (KEEP - already optimized)
```

---

## What We're Removing

- ❌ site.css (1.5MB Squarespace bloat)
- ❌ static.css (429KB Squarespace bloat)
- ❌ website.components.button.visitor.js (Squarespace script)
- ❌ 3000+ character body class
- ❌ Massive image srcsets (7 URLs per image)
- ❌ All Squarespace framework remnants

---

## What We're Keeping

- ✅ All optimized images (7.1MB)
- ✅ menu.js (1.6KB)
- ✅ menu.css (1.2KB)
- ✅ gallery.css (1.6KB)
- ✅ gallery-autoplay.js (1.8KB)
- ✅ All content (text, images, testimonials)
- ✅ FAQ accordion functionality
- ✅ Brand colors and fonts

---

## Expected Results

### Performance Gains
- **HTML:** 368KB → 50KB (86% reduction)
- **CSS:** 2MB → 25KB (98.7% reduction)
- **Total Page Weight:** ~2.4MB → ~7.2MB (images account for most)
- **PageSpeed Score:** Crash → 90-95+

### Benefits
- ✅ Extremely fast load times
- ✅ Better SEO ranking
- ✅ Lower mobile data usage
- ✅ Easier to maintain
- ✅ Full control over code
- ✅ No framework dependencies
- ✅ Can test with PageSpeed Insights

---

## Timeline Estimate

| Phase | Time | Status |
|-------|------|--------|
| Phase 1: Foundation | 30 min | Pending |
| Phase 2: Content Migration | 2-3 hours | Pending |
| Phase 3: Custom CSS | 2-3 hours | Pending |
| Phase 4: JavaScript | 30 min | Pending |
| Phase 5: Optimization | 1 hour | Pending |
| Phase 6: Testing & Deployment | 1 hour | Pending |
| **Total** | **6-9 hours** | **0% Complete** |

---

## Questions for User

Before we start, please confirm:

1. **Content:** Should I copy ALL text exactly as-is, or do you want to make any changes?
2. **Images:** Use all current portfolio images, or select specific ones?
3. **Analytics:** Do you want Google Analytics added back? (Can add later)
4. **Contact Form:** I see "REQUEST A PROPOSAL" buttons - where do they go? Do you have a form system?
5. **Priority:** Are there any sections less important that we could build later?

---

## Next Steps

Once you approve this plan:

1. I'll create the clean HTML foundation
2. Build section by section
3. Test each section as we go
4. Show you progress at key milestones
5. Deploy and verify PageSpeed score

Ready to proceed?
