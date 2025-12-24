# Google Tag Manager Setup Guide

This guide explains how to configure Google Tag Manager (GTM) to capture all the events being pushed from your website.

## Your GTM Container ID
**GTM-M65WTH7W**

## Events Being Tracked

The `js/gtm-tracking.js` script pushes the following events to the dataLayer:

| Event Name | Description | Key Parameters |
|------------|-------------|----------------|
| `cta_click` | CTA button clicks | cta_type, cta_text, cta_destination, page_location, click_position |
| `phone_click` | Phone number clicks | phone_number, formatted_number, page_location, click_location |
| `email_click` | Email link clicks | email_address, page_location, click_location |
| `scroll_depth` | Scroll milestones (25%, 50%, 75%, 100%) | scroll_threshold, page_location |
| `form_start` | User starts filling a form | form_id, form_type, first_field, page_location |
| `form_submit` | Form submission | form_id, form_type, page_location |
| `faq_interaction` | FAQ accordion open/close | faq_question, faq_action, page_location |
| `menu_toggle` | Mobile menu open/close | menu_action, page_location |
| `social_click` | Social media link clicks | social_platform, social_url, page_location, click_location |
| `outbound_click` | External link clicks | outbound_url, outbound_domain, link_text, page_location |
| `popup_interaction` | Checklist popup interactions | popup_name, popup_action, page_location |
| `internal_navigation` | Internal page link clicks | destination_page, navigation_type, link_text, page_location |
| `page_view_enhanced` | Enhanced page view data | page_name, page_title, page_path, referrer, screen_width, device_type |
| `time_on_page` | Time thresholds (30s, 60s, 2min, 5min) | time_threshold, page_location |
| `gallery_click` | Gallery image clicks | image_alt, gallery_type, page_location |
| `image_click` | Portfolio/testimonial image clicks | image_section, image_alt, page_location |

---

## Step-by-Step GTM Configuration

### 1. Create Data Layer Variables

Go to **Variables > User-Defined Variables > New** and create these variables:

#### Variable: `DLV - cta_type`
- Type: Data Layer Variable
- Data Layer Variable Name: `cta_type`

#### Variable: `DLV - cta_text`
- Type: Data Layer Variable
- Data Layer Variable Name: `cta_text`

#### Variable: `DLV - page_location`
- Type: Data Layer Variable
- Data Layer Variable Name: `page_location`

#### Variable: `DLV - scroll_threshold`
- Type: Data Layer Variable
- Data Layer Variable Name: `scroll_threshold`

#### Variable: `DLV - form_type`
- Type: Data Layer Variable
- Data Layer Variable Name: `form_type`

#### Variable: `DLV - social_platform`
- Type: Data Layer Variable
- Data Layer Variable Name: `social_platform`

#### Variable: `DLV - popup_action`
- Type: Data Layer Variable
- Data Layer Variable Name: `popup_action`

---

### 2. Create Triggers

Go to **Triggers > New** and create these triggers:

#### Trigger: CTA Click
- Type: Custom Event
- Event name: `cta_click`

#### Trigger: Phone Click
- Type: Custom Event
- Event name: `phone_click`

#### Trigger: Email Click
- Type: Custom Event
- Event name: `email_click`

#### Trigger: Scroll Depth
- Type: Custom Event
- Event name: `scroll_depth`

#### Trigger: Form Start
- Type: Custom Event
- Event name: `form_start`

#### Trigger: Form Submit
- Type: Custom Event
- Event name: `form_submit`

#### Trigger: FAQ Interaction
- Type: Custom Event
- Event name: `faq_interaction`

#### Trigger: Menu Toggle
- Type: Custom Event
- Event name: `menu_toggle`

#### Trigger: Social Click
- Type: Custom Event
- Event name: `social_click`

#### Trigger: Popup Interaction
- Type: Custom Event
- Event name: `popup_interaction`

---

### 3. Create Tags for Google Analytics 4

#### Tag: GA4 - CTA Click
- Type: Google Analytics: GA4 Event
- Configuration Tag: Your GA4 Configuration
- Event Name: `cta_click`
- Event Parameters:
  - `cta_type`: {{DLV - cta_type}}
  - `cta_text`: {{DLV - cta_text}}
  - `page_location`: {{DLV - page_location}}
- Trigger: CTA Click

#### Tag: GA4 - Phone Click (Conversion)
- Type: Google Analytics: GA4 Event
- Configuration Tag: Your GA4 Configuration
- Event Name: `phone_click`
- Event Parameters:
  - `page_location`: {{DLV - page_location}}
- Trigger: Phone Click

#### Tag: GA4 - Email Click (Conversion)
- Type: Google Analytics: GA4 Event
- Configuration Tag: Your GA4 Configuration
- Event Name: `email_click`
- Event Parameters:
  - `page_location`: {{DLV - page_location}}
- Trigger: Email Click

#### Tag: GA4 - Form Submit (Conversion)
- Type: Google Analytics: GA4 Event
- Configuration Tag: Your GA4 Configuration
- Event Name: `generate_lead`
- Event Parameters:
  - `form_type`: {{DLV - form_type}}
  - `page_location`: {{DLV - page_location}}
- Trigger: Form Submit

#### Tag: GA4 - Scroll Depth
- Type: Google Analytics: GA4 Event
- Configuration Tag: Your GA4 Configuration
- Event Name: `scroll`
- Event Parameters:
  - `percent_scrolled`: {{DLV - scroll_threshold}}
  - `page_location`: {{DLV - page_location}}
- Trigger: Scroll Depth

---

### 4. Create Tags for Facebook Pixel

#### Tag: FB - Lead (Form Submit)
- Type: Custom HTML
- HTML:
```html
<script>
  fbq('track', 'Lead', {
    content_name: '{{DLV - form_type}}'
  });
</script>
```
- Trigger: Form Submit

#### Tag: FB - Contact (Phone/Email Click)
- Type: Custom HTML
- HTML:
```html
<script>
  fbq('track', 'Contact');
</script>
```
- Trigger: Phone Click, Email Click

---

### 5. Create Tags for LinkedIn Insight

#### Tag: LinkedIn - Conversion (Form Submit)
- Type: Custom HTML
- HTML:
```html
<script>
  window.lintrk('track', { conversion_id: YOUR_CONVERSION_ID });
</script>
```
- Trigger: Form Submit

---

## Recommended Conversions to Mark in GA4

After publishing these tags, go to **GA4 > Admin > Conversions** and mark these events as conversions:

1. **generate_lead** - Form submissions (highest priority)
2. **phone_click** - Phone number clicks
3. **email_click** - Email link clicks

---

## Testing Your Setup

### 1. Use GTM Preview Mode
1. In GTM, click "Preview" button
2. Enter your website URL
3. Browse your site and trigger events
4. Verify events appear in the Tag Assistant

### 2. Check dataLayer in Browser Console
1. Open your website
2. Open Developer Tools (F12)
3. In Console, type: `dataLayer`
4. Browse and trigger events
5. Verify events are being pushed

### 3. GA4 DebugView
1. Go to GA4 > Admin > DebugView
2. Install GA Debugger Chrome extension
3. Browse your site
4. Watch events appear in real-time

---

## Quick Reference: Event Parameters

### CTA Click Events
```javascript
{
  event: 'cta_click',
  cta_type: 'book_session' | 'request_proposal' | 'purchase_gift_card' | 'learn_more' | 'other',
  cta_text: 'SEE RATES & AVAILABILITY',
  cta_destination: '/rates-2.html',
  page_location: 'homepage',
  click_position: 'header' | 'hero' | 'services' | 'footer' | 'body'
}
```

### Form Events
```javascript
{
  event: 'form_submit',
  form_id: 'checklist-popup-form',
  form_type: 'checklist_popup' | 'proposal_request',
  page_location: 'homepage'
}
```

### Contact Events
```javascript
{
  event: 'phone_click',
  phone_number: '7039570643',
  formatted_number: '(703) 957-0643',
  page_location: 'homepage',
  click_location: 'footer' | 'body'
}
```

---

## Pages with Tracking Installed

The tracking script has been added to all pages:
- index.html (Homepage)
- rates-2.html (Pricing/Booking)
- headshots.html (Professional Headshots)
- workplace-headshots.html (Team/Corporate)
- gift-cards.html (Gift Cards)
- request-proposal.html (Proposal Form)
- thank-you-page.html (Confirmation)
- headshots-ashburn-va.html
- headshots-fairfax-va.html
- headshots-reston-va.html
- headshots-leesburg-va.html
- headshots-washington-dc.html
- privacy-policy.html
- tos.html
- copyright.html
- disclaimer.html
- site-gallery.html
- photo-gallery.html

---

## Need Help?

For questions about GTM setup, refer to:
- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
