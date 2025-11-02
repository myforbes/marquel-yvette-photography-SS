# Site Rebuild Plan - Remove Squarespace Framework
## Marquel Yvette Photography

**Date:** November 2, 2025
**Goal:** Remove all Squarespace framework JavaScript to achieve 95+ PageSpeed score

---

## Executive Summary

Your site currently has excellent content and design, but Squarespace's framework JavaScript (42KB legacy code + 115KB modern code) is causing performance issues and breaking automated testing tools.

**Solution:** Rebuild interactive features using modern vanilla JavaScript and CSS - **reducing JavaScript from ~200KB to ~5KB**.

---

## What Will Change

### ✅ Features That Stay THE SAME:
- All content and text
- All images (already optimized!)
- All styling and design
- FAQ accordion (already CSS-only!)
- Smooth scrolling (already native CSS!)
- Fixed header (already pure CSS!)
- Analytics scripts (Google, Facebook, LinkedIn)
- Chatra live chat widget
- All meta tags and SEO

### 🔧 Features We'll Rebuild (Lightweight):
1. **Mobile Hamburger Menu** → 20 lines vanilla JS
2. **Gallery Grid** → CSS Grid (0 JS needed!)
3. **Auto-Advancing Gallery** → 15 lines vanilla JS
4. **Image Lightbox** → 50 lines vanilla JS (optional)

### ❌ What Gets Removed:
- Squarespace framework (157KB JavaScript)
- Legacy polyfills (42KB)
- 15+ Squarespace rollup scripts
- YUI3 framework
- All Squarespace API calls (causing the PageSpeed crashes)

---

## Expected Performance Improvement

| Metric | Current | After Rebuild | Improvement |
|--------|---------|---------------|-------------|
| **JavaScript Size** | ~200KB | ~5KB | **97.5% smaller** |
| **PageSpeed Score** | Cannot test | **95-100** | Testable! |
| **First Load** | 4-6s | **1-2s** | 3-4x faster |
| **Lighthouse Performance** | Unknown | **95-100** | Excellent |
| **Total Blocking Time** | High | **< 100ms** | Minimal |

---

## Rebuild Phases

### Phase 1: Remove Squarespace Scripts (30 min)
**Remove these scripts from index.html:**
```html
<!-- REMOVE -->
<script src="./js/legacy.js"></script>
<script src="./js/modern.js"></script>
<script>SQUARESPACE_ROLLUPS = {};</script>
<!-- ...all Squarespace rollup scripts... -->
```

**Keep these scripts:**
```html
<!-- KEEP -->
<script async src="./js/gtm.js"></script> <!-- Google Analytics -->
<script async src="./js/fbevents.js"></script> <!-- Facebook Pixel -->
<!-- Chatra chat widget -->
```

---

### Phase 2: Mobile Hamburger Menu (20 min)
**Replace Squarespace menu controller with:**

```javascript
// Lightweight menu toggle - 20 lines
const menuBtn = document.querySelector('.header-burger-btn');
const nav = document.querySelector('.header-menu');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded',
    menuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );
});

// Close menu on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
    nav.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});
```

**CSS:**
```css
.header-menu {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.header-menu.menu-open {
  transform: translateX(0);
}
```

---

### Phase 3: Gallery Grid with CSS Grid (30 min)
**Replace Squarespace GalleryGrid with pure CSS:**

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0;
}

.gallery-grid-item {
  aspect-ratio: 1;
  overflow: hidden;
}

.gallery-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-grid-item:hover img {
  transform: scale(1.05);
}
```

**No JavaScript needed!**

---

### Phase 4: Auto-Advancing Gallery (15 min)
**Replace with simple vanilla JS:**

```javascript
// Auto-advance gallery - 15 lines
function autoAdvanceGallery() {
  const nextBtn = document.querySelector('.gallery-reel-control-btn[data-test="gallery-reel-control-btn-next"]');
  if (nextBtn) {
    nextBtn.click();
  }
}

// Auto-advance every 3 seconds
setInterval(autoAdvanceGallery, 3000);

// Pause on hover
const gallery = document.querySelector('.gallery-reel');
gallery.addEventListener('mouseenter', () => clearInterval(autoAdvanceInterval));
gallery.addEventListener('mouseleave', () => {
  autoAdvanceInterval = setInterval(autoAdvanceGallery, 3000);
});
```

---

### Phase 5: FAQ Accordion (KEEP AS-IS!)
**Already CSS-only - no changes needed!**

Your accordion uses checkboxes - perfect!

```html
<!-- This is already lightweight and perfect! -->
<input type="checkbox" id="question1" class="questions">
<label for="question1" class="question">...</label>
<div class="answers">...</div>
```

---

### Phase 6: Image Lightbox (Optional - 30 min)
**Add lightweight lightbox (only if needed):**

```javascript
// Simple lightbox - 50 lines
class SimpleLightbox {
  constructor() {
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <img src="" alt="">
    `;
    document.body.appendChild(this.lightbox);

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target.className === 'lightbox-close') {
        this.close();
      }
    });
  }

  open(imgSrc) {
    this.lightbox.querySelector('img').src = imgSrc;
    this.lightbox.classList.add('active');
  }

  close() {
    this.lightbox.classList.remove('active');
  }
}

// Initialize
const lightbox = new SimpleLightbox();
document.querySelectorAll('.gallery-grid-item img').forEach(img => {
  img.addEventListener('click', () => lightbox.open(img.src));
});
```

**CSS:**
```css
.lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
}

.lightbox.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 40px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}
```

---

### Phase 7: Testing (1 hour)
**Comprehensive testing checklist:**

- [ ] Mobile menu opens/closes
- [ ] Gallery grid displays correctly
- [ ] Auto-advance works (3-second interval)
- [ ] FAQ accordion expands/collapses
- [ ] Lightbox opens/closes (if implemented)
- [ ] All links work
- [ ] Analytics tracking works
- [ ] Chatra chat widget works
- [ ] Mobile responsive (test iPhone, Android)
- [ ] Tablet responsive (test iPad)
- [ ] Desktop responsive (test various sizes)
- [ ] Cross-browser (Chrome, Firefox, Safari)

---

### Phase 8: PageSpeed Test (10 min)
**Run PageSpeed Insights:**
- URL: https://d1pqc8zade8idc.cloudfront.net
- Expected scores: **95-100** (both mobile and desktop!)

---

## Benefits

### Performance
- **97.5% less JavaScript** (200KB → 5KB)
- **95+ PageSpeed score** (vs untestable)
- **3-4x faster load times**
- **Perfect for SEO** (Google loves fast sites!)

### Reliability
- **No API dependencies** (won't crash testing tools)
- **Future-proof** (vanilla JS works forever)
- **Easy to maintain** (simple, readable code)
- **No framework updates** needed

### User Experience
- **Faster loading** for visitors
- **Better mobile performance**
- **Improved accessibility**
- **Same great design**

---

## Timeline

| Phase | Time | Total |
|-------|------|-------|
| Phase 1: Remove scripts | 30 min | 0.5 hr |
| Phase 2: Mobile menu | 20 min | 0.8 hr |
| Phase 3: Gallery grid | 30 min | 1.3 hr |
| Phase 4: Auto-advance | 15 min | 1.5 hr |
| Phase 5: FAQ (no work!) | 0 min | 1.5 hr |
| Phase 6: Lightbox (optional) | 30 min | 2.0 hr |
| Phase 7: Testing | 60 min | 3.0 hr |
| Phase 8: PageSpeed test | 10 min | 3.2 hr |

**Total: ~3-4 hours of work**

---

## Risks & Mitigation

### Risk 1: Something breaks during testing
**Mitigation:** We have full Git backup + AWS S3 backup

### Risk 2: Missing an interactive feature
**Mitigation:** Comprehensive feature analysis already done

### Risk 3: Analytics stop working
**Mitigation:** All analytics scripts are being kept

### Risk 4: Chat widget breaks
**Mitigation:** Chatra is independent, won't be affected

---

## Backup Strategy

**Before starting ANY phase:**
1. ✅ Create Git branch: `git checkout -b rebuild-vanilla-js`
2. ✅ Backup current CloudFront version
3. ✅ Backup index.html: `index.html.squarespace-backup`

**After completing ALL phases:**
1. Test thoroughly on CloudFront (not affecting live site)
2. Only deploy to custom domain when verified working
3. Keep Squarespace live until 100% confident

---

## Success Criteria

We're done when ALL of these are true:

- [ ] All features work perfectly (mobile menu, galleries, FAQ)
- [ ] PageSpeed Insights gives **95+** score (mobile & desktop)
- [ ] Site loads in **< 2 seconds**
- [ ] No JavaScript errors in console
- [ ] Analytics tracking confirmed working
- [ ] Tested on iPhone, Android, iPad, desktop
- [ ] Tested on Chrome, Firefox, Safari
- [ ] You approve the final result!

---

## Rollback Plan

If ANYTHING goes wrong:

1. **Restore from Git:**
   ```bash
   git checkout main
   ```

2. **Re-upload to S3:**
   ```bash
   aws s3 sync . s3://marquelyvette-website
   ```

3. **Invalidate CloudFront:**
   ```bash
   aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths "/*"
   ```

**Total rollback time: < 5 minutes**

---

## Next Steps

**If you approve this plan:**

1. I'll create a new Git branch
2. Start with Phase 1 (remove Squarespace scripts)
3. Work through each phase sequentially
4. Test thoroughly after each phase
5. Show you results at key milestones

**If you have concerns:**
- Ask any questions
- Request modifications to the plan
- Take time to review

---

## Questions to Consider

Before we start, consider:

1. **Do you use any Squarespace-specific features** I haven't identified?
2. **Are you comfortable with testing** before going live?
3. **Do you want the lightbox feature?** (optional but nice)
4. **Any other interactivity** you want to add while we're rebuilding?

---

**This is your site - we'll only proceed when you're 100% ready!**

Last Updated: November 2, 2025
