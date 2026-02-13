# Form Audit Report

**Website:** marquelyvette.com
**Scan Date:** 2026-02-13
**Files Scanned:** 33 HTML files (23 pages + 10 components)

---

## Summary

| # | Form Name | Page | Type | Fields | Validation |
|---|-----------|------|------|--------|------------|
| 1 | Checklist Lead Capture (inline) | `/headshots` | Native HTML `<form>` | 2 | Minimal |
| 2 | Checklist Popup | `/` (homepage) | JS-injected `<form>` | 2 | Minimal |
| 3 | Express Booking | `/rates-2` | GHL iframe | Unknown (hosted) | Hosted by GHL |
| 4 | Signature Booking | `/rates-2` | GHL iframe | Unknown (hosted) | Hosted by GHL |
| 5 | Executive Booking | `/rates-2` | GHL iframe | Unknown (hosted) | Hosted by GHL |
| 6 | Team Headshot Proposal | `/request-proposal` | GHL iframe | Unknown (hosted) | Hosted by GHL |
| 7 | Gift Card Checkout | `/gift-cards` | GHL embedded widget | Unknown (hosted) | Hosted by GHL |

**Total:** 7 forms across 4 pages

---

## Form 1: Checklist Lead Capture (Inline)

- **Page:** `/headshots` (headshots.html, line 787)
- **Purpose:** "Get The Perfect Headshot Checklist" — collects name/email in exchange for a free checklist PDF
- **Type:** Native HTML `<form>`
- **Method:** POST
- **Action:** `https://services.leadconnectorhq.com/hooks/QqzMbs9W02wuc63zjyYB/webhook-trigger/887bd4a2-60fc-4ac1-90b5-8f163edb13d5`

### Fields

| Field | Type | Name | Required | Placeholder |
|-------|------|------|----------|-------------|
| First Name | `text` | `name` | Yes | "First name" |
| Email | `email` | `email` | Yes | "name@email.com" |
| Submit | `button` | — | — | "Email Me The Checklist" |

### JavaScript Validation

**File:** Inline `<script>` block (headshots.html, lines 844–871)

- **Validation:** None beyond native HTML `required` attributes
- **No** email format validation
- **No** field-level error messages
- **Submit handler:** Disables button, shows "Sending..." text, POSTs FormData via `fetch()`
- **On success:** Redirects to `/thank-you-page.html`
- **On error:** Also redirects to `/thank-you-page.html` (errors are silently swallowed)
- **No loading spinner** — just button text change

### Potential Abandonment Issues

- Form is positioned below the fold in a lead capture section; users may not scroll to it
- No visual error feedback if submission fails — user is redirected regardless
- No field-level validation feedback before submit

---

## Form 2: Checklist Popup

- **Page:** `/` homepage (index.html) — loaded via `js/checklist-popup.min.js`
- **Purpose:** Same "Perfect Headshot Checklist" lead capture, but as a timed popup modal
- **Type:** JS-injected HTML `<form>` (created dynamically by checklist-popup.js)
- **Method:** POST (via `fetch()` with JSON body)
- **Action:** `https://services.leadconnectorhq.com/hooks/QqzMbs9W02wuc63zjyYB/webhook-trigger/887bd4a2-60fc-4ac1-90b5-8f163edb13d5`

### Trigger Behavior

- Appears after **10 seconds** on site (configurable via `POPUP_DELAY`)
- Only shown **once per session** (tracked via `sessionStorage`)
- Has "No thanks, I'm already prepared" dismiss link
- Closes on: X button, dismiss link, overlay click, Escape key

### Fields

| Field | Type | Name | Required | Placeholder |
|-------|------|------|----------|-------------|
| First Name | `text` | `firstName` | Yes | "First Name" |
| Email | `email` | `email` | Yes | "Email Address" |
| Submit | `button` | — | — | "GET YOUR FREE CHECKLIST" |

### JavaScript Validation

**File:** `js/checklist-popup.js` (lines 394–431)

- **Validation:** Native HTML `required` only
- **No** email format validation beyond browser default
- **No** custom error messages
- **Submit handler:** Disables button, shows spinner with "Sending..." text
- **Submission:** Sends JSON (`{first_name, email, source}`) via `fetch()` POST
- **On success:** Shows in-modal success view ("Check Your Inbox")
- **On error:** Also shows success view (CORS issues with webhook are expected and silently handled)
- **Has** `.error` CSS class defined but **never applied** by JavaScript

### Potential Abandonment Issues

- **HIGH RISK:** Popup has no field-level validation — `.error` class exists in CSS but is never used in JS
- Popup appears on the homepage only (1 page) — limited reach
- 10-second delay may be too aggressive or not enough depending on user intent
- "No thanks" dismiss is tracked via GTM but the popup itself never re-appears for that session
- Note: `firstName` field name differs from Form 1's `name` field — potential data inconsistency in CRM

---

## Form 3: Express Booking Calendar

- **Page:** `/rates-2` (rates-2.html, line 387)
- **Purpose:** Book an Express headshot session
- **Type:** GHL (GoHighLevel/LeadConnector) iframe calendar widget
- **Iframe Source:** `https://api.leadconnectorhq.com/booking/marquel-yvette-photography-7y55km7zujk/sv/68b5a68c76a8d84159740d31`
- **Trigger:** Opens via `openBookingModal()` when user clicks "Check Rates & Availability" CTA for Express package
- **Embed script:** `https://link.msgsndr.com/js/form_embed.js`

### Fields

Not scannable — form content is hosted inside GHL iframe. Typical GHL booking forms include: name, email, phone, date/time selection.

### Potential Abandonment Issues

- Form is inside a modal — user must click a CTA to open it
- iframe may have slow load times (external resource)
- `heightMode=fixed` with `overflow: hidden` — long forms could be cut off on small screens
- No `scrolling="yes"` attribute — content overflow is hidden

---

## Form 4: Signature Booking Calendar

- **Page:** `/rates-2` (rates-2.html, line 397)
- **Purpose:** Book a Signature headshot session
- **Type:** GHL iframe calendar widget
- **Iframe Source:** `https://api.leadconnectorhq.com/booking/marquel-yvette-photography-7y55km7zujk/sv/68b5a68d76a8d8e9bd740da7`
- **Trigger:** Opens via `openSignatureModal()` when user clicks CTA for Signature package

### Fields & Issues

Same as Form 3 — hosted GHL iframe with identical potential issues.

---

## Form 5: Executive Booking Calendar

- **Page:** `/rates-2` (rates-2.html, line 407)
- **Purpose:** Book an Executive headshot session
- **Type:** GHL iframe calendar widget
- **Iframe Source:** `https://api.leadconnectorhq.com/booking/marquel-yvette-photography-7y55km7zujk/sv/68f6705e7576abd99edbd5ac`
- **Trigger:** Opens via `openExecutiveModal()` when user clicks CTA for Executive package

### Fields & Issues

Same as Forms 3–4 — hosted GHL iframe with identical potential issues.

---

## Form 6: Team Headshot Proposal Form

- **Page:** `/request-proposal` (request-proposal.html, line 604)
- **Purpose:** Request a custom team/workplace headshot proposal
- **Type:** GHL embedded inline iframe (always visible, not in a modal)
- **Iframe Source:** `https://api.leadconnectorhq.com/widget/form/bV3K1OgeSUUvy4S1Qtsf`
- **Form Name:** "Team Headshot Form" (from `data-form-name` attribute)
- **Form ID:** `bV3K1OgeSUUvy4S1Qtsf`
- **Embed script:** `https://link.msgsndr.com/js/form_embed.js`

### Fields

Not scannable — hosted inside GHL iframe. Based on the `data-form-name` attribute, this is configured as a "Team Headshot Form" in GHL.

### Potential Abandonment Issues

- **HIGH RISK:** Iframe has `min-height: 600px` — this is a tall form, suggesting many fields
- Many-field forms have the highest abandonment rates
- Form is always visible (no modal), which is good for visibility but may overwhelm users
- No progress indicator if the form has multiple steps

### Additional Note

A `js/contact-form.js` file exists (239 lines) with comprehensive validation logic (email regex, phone formatting, field-level errors, GA4 tracking). However, **this script is not loaded on any page**. It targets a `#proposal-form` element that doesn't exist in the current HTML. This appears to be a legacy/unused contact form handler.

---

## Form 7: Gift Card Checkout

- **Page:** `/gift-cards` (gift-cards.html, line 164)
- **Purpose:** Purchase a photography gift card
- **Type:** GHL embedded payment widget
- **Widget ID:** `6920d8834828bb3d5329c7a7` (via `data-gc-id` attribute)
- **Embed script:** `https://storage.googleapis.com/leadgen-payment-products-preview-nuxt-assets/js/iframe-resizer/gc-embed.parent.js`

### Fields

Not scannable — hosted inside GHL payment widget iframe. Typical fields: name, email, payment details, gift card amount.

### Potential Abandonment Issues

- Payment forms generally have higher abandonment rates
- External widget — no control over UX or error messaging
- Uses iframe-resizer script, which is good for responsive sizing

---

## Analysis: Most Likely 87% Abandonment Candidate

Based on the audit, the form most likely responsible for the 87% abandonment rate is:

### **Form 6: Team Headshot Proposal Form** (`/request-proposal`)

**Why:**
1. **Longest form** — the 600px minimum height suggests multiple fields (name, email, phone, company, team size, location, dates, budget, notes, etc.)
2. **Multi-field GHL forms** typically have 6–12 fields, which correlates with high abandonment
3. **Always visible on page** — every page visit counts as a form impression, inflating the denominator
4. **No progress indicator** — users can't see how much is left
5. **Hosted in iframe** — cross-origin context may cause friction (autofill may not work, password managers may not detect fields)

### Runner-up: **Form 2: Checklist Popup** (homepage)

**Why it could also be the source:**
- Every homepage visitor who sees the popup and dismisses it = abandoned
- 10-second auto-trigger means high impression count
- "No thanks" dismissals and overlay/Escape closes all count as abandonment
- However, popup abandonment is expected behavior and typically not tracked as "form abandonment" in GA4

### Recommendations

1. **Check GA4 for the specific form URL** — filter events by `page_path` to isolate which page the abandonment is on
2. **Log into GHL** and check the "Team Headshot Form" analytics for submission vs. impression ratio
3. **Review GHL form field count** — consider removing optional fields or breaking into steps
4. **Add the unused `contact-form.js` validation** to native forms (Forms 1 & 2) for better UX
5. **Fix field name inconsistency** — Form 1 uses `name`, Form 2 uses `firstName` for the same CRM webhook
