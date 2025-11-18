# Complete Site Rebuild Plan - All 11 Pages
**Project:** Marquel Yvette Photography - Full Website Rebuild
**Goal:** Build lightweight, PageSpeed-friendly site (90-95+ score)
**Date:** November 2, 2025

---

## Pages to Rebuild (11 Total)

### 1. **index.html** (Homepage)
**Sections:**
- Header/Navigation
- Hero with testimonial
- Value proposition
- 6 Service categories (Corporate, Actor, LinkedIn, Realtor, Executive, Company)
- Team headshots section
- Portfolio gallery (31 images)
- Testimonials
- About section
- Process (3 steps)
- Studio location
- FAQ accordion
- Footer

**Estimated Time:** 3-4 hours

---

### 2. **rates-2.html** (Pricing & Booking)
**Content:**
- **The Express** - $525 (20-min session, 2 retouched images)
- **The Signature** - $995 (60-min session, 5 images) - Most Popular
- **The Executive** - $1,895 (90-min session, 10 images)

**Features:**
- 3 Go HighLevel booking widget modals (one per package)
- Detailed package descriptions
- Add-on services (makeup: $150, additional photos: $195 each)
- 5-step process overview
- Testimonials

**Technical:**
- Need Go HighLevel embed code/URLs for each booking widget
- Modal/lightbox functionality for booking widgets

**Estimated Time:** 2 hours

---

### 3. **request-proposal.html** (Team/Custom Proposal Form)
**Form Fields:**
1. Name* (First, Last)
2. Email Address*
3. Company Name*
4. Phone* (format: (###) ### ####)
5. Quantity of People to be Photographed
6. Add-on Services (checkboxes):
   - Makeup Artist
   - Group Images
   - Office Candids
7. Notes (textarea)

**Submit Button:** "REQUEST MY CUSTOM PROPOSAL"
**Success Page:** /proposal-thank-you

**Technical:**
- Form validation
- Submit to Go HighLevel or email?
- Spam protection (honeypot or reCAPTCHA?)

**Estimated Time:** 1.5 hours

---

### 4. **proposal-thank-you.html** (Proposal Confirmation)
**Content:**
- "THANK YOU!" heading with checkmark icon
- Confirmation message
- "I will email a proposal customized especially for your needs"
- Call-to-action: Call (703) 957-0643 for urgent assistance
- "I look forward to helping you..."

**Estimated Time:** 30 min

---

### 5. **contact.html** (General Contact Page)
**Form Fields:**
1. Name* (First, Last)
2. Email Address*
3. Phone*
4. Message* ("Please let me know how I can help")

**Submit Button:** "SUBMIT MY QUESTION"
**Success Page:** /contact-thank-you

**Additional Content:**
- Contact information (phone, email, address)
- Portfolio images
- "SEE RATES AND AVAILABILITY" CTA

**Estimated Time:** 1.5 hours

---

### 6. **contact-thank-you.html** (Contact Confirmation)
**Content:**
- Confirmation message: "Thank you for your inquiry. I have received your information..."
- Call-to-action: Call (703) 957-0643
- "I look forward to helping you..."

**Estimated Time:** 30 min

---

### 7. **privacy-policy.html** (Privacy Policy)
**Sections:**
- Effective Date: August 6, 2025
- Information Collection
- How We Use Your Information
- Information Sharing (third-party services list)
- Website Analytics
- Cookies
- Image Usage & Model Rights
- Data Security
- Your Rights
- Data Retention
- Children's Privacy
- Contact Information

**Estimated Time:** 1 hour (mostly copy-paste, format cleanly)

---

### 8. **tos.html** (Terms of Service)
**Sections:**
- Website Terms of Use
- Website Viewing License
- Image Copyright & Usage (AI training prohibition)
- Disclaimers
- Warranties
- Contact Response Time (48 hours)
- Governing Law (Virginia, Loudoun County)

**Estimated Time:** 1 hour

---

### 9. **disclaimer.html** (Professional Services Disclaimer)
**Sections:**
- Service Availability
- Portfolio Representation
- Technical Limitations
- Professional Advice
- Limitation of Liability

**Estimated Time:** 1 hour

---

### 10. **website-accessibility-statement.html** (Accessibility)
**Content:**
- Accessibility Commitment statement
- Current Efforts:
  - Alt text for images
  - Keyboard navigation
  - Color contrast standards
  - Structured heading hierarchy
- Feedback section (contact for issues)

**Estimated Time:** 45 min

---

### 11. **copyright.html** (Copyright Notice)
**Note:** You mentioned this page but I didn't find a URL.

**Assumed Content:**
- Copyright statement
- Image usage terms
- DMCA policy
- AI training prohibition

**Estimated Time:** 30 min

---

## Technical Requirements

### Forms (3 total)
1. **Request Proposal Form** (7 fields)
2. **Contact Form** (4 fields)
3. Both need backend submission handling

**Options:**
- **Option A:** Submit to Go HighLevel (preferred - you already use it)
- **Option B:** Use Formspree, Netlify Forms, or similar service
- **Option C:** AWS Lambda + SES for email

**Your choice?**

---

### Go HighLevel Integration

**Needed from you:**
1. **Booking widget embed codes** for rates-2.html:
   - The Express booking URL/embed code
   - The Signature booking URL/embed code
   - The Executive booking URL/embed code

2. **Form submission endpoints:**
   - Proposal form submission URL
   - Contact form submission URL

**Or:** Should I build forms to submit via email to info@marquelyvette.com?

---

## Shared Components (Build Once, Use Everywhere)

### Header/Navigation
- Logo
- Navigation menu
- Mobile hamburger menu
- "SEE RATES AND AVAILABILITY" button → /rates-2

### Footer
- Logo
- Tagline: "Capturing life's precious moments with artistry and elegance"
- Contact info: (703) 957-0643, info@marquelyvette.com
- Service area: DMV Metropolitan Area
- Social media: Instagram, Facebook, LinkedIn
- Footer links:
  - Privacy Policy
  - Terms of Service
  - Disclaimer
  - Accessibility Statement
  - Copyright
- "Book Session" button → /rates-2
- Copyright: © 2025 Marquel Yvette Photography LLC

---

## File Structure

```
/
├── index.html                          (Homepage)
├── rates-2.html                        (Pricing + GHL booking)
├── request-proposal.html               (Team proposal form)
├── proposal-thank-you.html             (Proposal confirmation)
├── contact.html                        (Contact form)
├── contact-thank-you.html              (Contact confirmation)
├── privacy-policy.html                 (Privacy policy)
├── tos.html                            (Terms of service)
├── disclaimer.html                     (Disclaimer)
├── website-accessibility-statement.html (Accessibility)
├── copyright.html                      (Copyright notice)
│
├── css/
│   ├── main.css                        (Global styles ~20KB)
│   ├── menu.css                        (Keep - mobile menu)
│   ├── gallery.css                     (Keep - portfolio grid)
│   └── forms.css                       (Form styling ~5KB)
│
├── js/
│   ├── menu.js                         (Keep - 1.6KB)
│   ├── gallery-autoplay.js             (Keep - 1.8KB)
│   ├── modals.js                       (For GHL booking modals - 2KB)
│   └── forms.js                        (Form validation - 3KB)
│
└── images/
    └── portfolio/                      (Keep all 31 images)
```

---

## Timeline Estimate (Revised for 11 Pages)

| Page | Time | Priority |
|------|------|----------|
| 1. index.html (Homepage) | 3-4 hours | HIGH |
| 2. rates-2.html (Pricing) | 2 hours | HIGH |
| 3. request-proposal.html | 1.5 hours | HIGH |
| 4. proposal-thank-you.html | 30 min | MEDIUM |
| 5. contact.html | 1.5 hours | HIGH |
| 6. contact-thank-you.html | 30 min | MEDIUM |
| 7. privacy-policy.html | 1 hour | MEDIUM |
| 8. tos.html | 1 hour | MEDIUM |
| 9. disclaimer.html | 1 hour | MEDIUM |
| 10. accessibility-statement.html | 45 min | LOW |
| 11. copyright.html | 30 min | LOW |
| **Shared Components** (header/footer) | 2 hours | HIGH |
| **Global CSS** | 3-4 hours | HIGH |
| **Testing & Refinement** | 3-4 hours | HIGH |
| **TOTAL** | **20-25 hours** | |

---

## Build Strategy

### Phase 1: Foundation (3-4 hours)
- [ ] Create shared header/footer components
- [ ] Build global CSS (main.css)
- [ ] Set up file structure
- [ ] Create homepage (index.html) first

### Phase 2: High-Priority Pages (6-8 hours)
- [ ] rates-2.html (pricing + booking)
- [ ] request-proposal.html (form)
- [ ] contact.html (form)

### Phase 3: Confirmation Pages (1-2 hours)
- [ ] proposal-thank-you.html
- [ ] contact-thank-you.html

### Phase 4: Legal Pages (3-4 hours)
- [ ] privacy-policy.html
- [ ] tos.html
- [ ] disclaimer.html
- [ ] accessibility-statement.html
- [ ] copyright.html

### Phase 5: Integration & Testing (3-4 hours)
- [ ] Integrate Go HighLevel booking widgets
- [ ] Set up form submissions
- [ ] Test all internal links
- [ ] Test mobile menu
- [ ] Test FAQ accordion
- [ ] Cross-browser testing
- [ ] Mobile device testing

### Phase 6: Deployment (2 hours)
- [ ] Upload all pages to S3
- [ ] Set up proper redirects
- [ ] Invalidate CloudFront cache
- [ ] **Test PageSpeed Insights** on multiple pages
- [ ] Verify all functionality

---

## Expected Results

### Performance Gains (Per Page)
- **HTML:** ~50-70KB per page (vs 368KB)
- **CSS:** ~25KB shared (vs 2MB)
- **JavaScript:** ~10KB total (vs 200KB+ Squarespace)
- **PageSpeed Score:** 90-95+ (vs crash)

### Benefits
- ✅ All 11 pages fast and testable
- ✅ Clean, maintainable code
- ✅ Consistent design across all pages
- ✅ Mobile-optimized
- ✅ SEO-friendly
- ✅ No framework dependencies

---

## Questions Before We Start

### 1. Go HighLevel Integration
**I need:**
- Booking widget embed codes for The Express, The Signature, The Executive
- Form submission webhook URLs (or should forms email you directly?)

**Can you provide these, or should I build without GHL for now and add it later?**

### 2. Form Handling
**Option A:** Submit to Go HighLevel (need webhook URLs)
**Option B:** Email submissions to info@marquelyvette.com
**Option C:** Use third-party form service (Formspree, Netlify)

**Your preference?**

### 3. Content Refinement
You said you want text "updated/refined" - should I:
- **Option A:** Slightly improve/polish existing text while keeping core message
- **Option B:** Rewrite sections significantly for clarity and conversion
- **Option C:** Show you drafts page-by-page for approval?

### 4. About Page
I didn't find a separate /about page. Is the "About" content on the homepage, or should I create a dedicated About page?

### 5. Build Approach
**Option A:** Build and deploy page-by-page (you can review as I go)
**Option B:** Build all pages locally, then deploy all at once
**Option C:** Build homepage first, test PageSpeed, then continue

**Your preference?**

---

## Next Steps

Once you answer the questions above, I'll:

1. Start with shared components (header/footer)
2. Build homepage (index.html)
3. Build rates-2.html with booking integration
4. Continue through all pages
5. Deploy and test PageSpeed on each page

**Ready to proceed?**
**Estimated completion: 20-25 hours of work**
