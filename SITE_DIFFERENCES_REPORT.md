# Live Site vs Local Site - Difference Report

Generated: 2025-11-05

## Summary
The local site has most of the styling correct (colors, fonts, layout), but is missing several key functional and tracking elements that exist on the live Squarespace site.

---

## 🔴 CRITICAL DIFFERENCES

### 1. **Gallery Behavior**
- **Live**: Auto-advancing carousel (3-second intervals)
- **Local**: Static grid gallery (no auto-advance)
- **Impact**: HIGH - Major visual/UX difference
- **Status**: Needs JS implementation

### 2. **Analytics & Tracking** (Missing on Local)
- Google Tag Manager (GTM-M65WTH7W)
- Google Analytics (UA-119111297-1, G-V0QWVDLC6V)
- Facebook Pixel tracking
- LinkedIn Insight Tag
- **Impact**: HIGH - No visitor tracking/conversion data
- **Status**: Need to add tracking scripts

### 3. **Live Chat Widget**
- **Live**: Chatra live chat (disabled on mobile)
- **Local**: None
- **Impact**: MEDIUM - Lost customer engagement channel
- **Status**: Need to add Chatra integration

---

## 🟡 MODERATE DIFFERENCES

### 4. **Contact Form**
- **Live**: Contact form with multi-field validation + RecaptchaEnterprise
- **Local**: Links to rates-2.html (likely no form)
- **Impact**: MEDIUM - Different conversion path
- **Status**: Verify if contact form needed on home page

### 5. **Navigation**
- **Live**: Full Squarespace navigation system
- **Local**: Simplified nav with one CTA button
- **Impact**: MEDIUM - Different navigation structure
- **Status**: Need to verify intended navigation

---

## 🟢 MINOR DIFFERENCES OR NON-ISSUES

### 6. **Typography**
- **Live**: Arial as primary fallback
- **Local**: Montserrat (custom font, more premium)
- **Impact**: LOW - Intentional improvement
- **Status**: OK - Better than live

### 7. **Grid System**
- **Live**: Squarespace flex grid (8/24 columns)
- **Local**: CSS Grid (modern, cleaner)
- **Impact**: LOW - Modern alternative
- **Status**: OK - Better performance

### 8. **Color Scheme**
- **Live**: #f4ca78, #b9914d (gold), #2c2c2c (dark)
- **Local**: SAME colors defined in CSS variables
- **Impact**: NONE - Perfect match
- **Status**: ✅ CORRECT

### 9. **Header Blur Effect**
- **Live**: backdrop-filter: blur(12px)
- **Local**: SAME (line 99 of main.css)
- **Impact**: NONE - Perfect match
- **Status**: ✅ CORRECT

---

## 📋 ACTION ITEMS (Priority Order)

### Priority 1: Essential Functionality
1. Add Google Analytics tracking (essential for business metrics)
2. Add Facebook Pixel (for ad tracking)
3. Add LinkedIn Insight Tag

### Priority 2: User Experience
4. Implement gallery auto-advance carousel functionality
5. Add Chatra live chat widget
6. Verify contact form requirements

### Priority 3: Optional Enhancements
7. Review navigation structure
8. Add Google Tag Manager for unified tracking

---

## 🎯 RECOMMENDATION

**Best Approach:**
1. **Quick Fix** - Add tracking codes first (30 mins)
2. **Enhanced UX** - Implement gallery carousel (1 hour)
3. **Full Parity** - Add chat widget and verify forms (1 hour)

**Total Estimated Time**: 2.5 - 3 hours

---

## Questions for You:
1. Do you want the gallery to auto-advance like the live site, or prefer the static grid?
2. Do you want to add all tracking codes (Analytics, Facebook, LinkedIn)?
3. Do you want to add the Chatra live chat widget?
4. Is there a contact form that should be on the home page?
