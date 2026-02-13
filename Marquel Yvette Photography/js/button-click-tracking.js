/**
 * GA4 Button Click Tracking
 * Self-contained GA4 event tracking for CTA buttons, phone, and email clicks.
 * Loads GA4 if not already present; uses gtag() API.
 *
 * Measurement ID: G-V0QWVDLC6V
 */
(function () {
  'use strict';

  var GA4_ID = 'G-V0QWVDLC6V';

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // Define gtag function if not already defined
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // Load the GA4 gtag.js script if not already injected
  function ensureGA4Script() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf('gtag/js?id=' + GA4_ID) !== -1) {
        return;
      }
    }

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);

    s.onload = function () {
      window.gtag('js', new Date());
      window.gtag('config', GA4_ID, { send_page_view: false });
    };
  }

  ensureGA4Script();

  // Send a GA4 event
  function sendEvent(eventName, params) {
    window.gtag('event', eventName, params);
  }

  // Get clean text content from an element
  function getButtonText(el) {
    return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim().substring(0, 100);
  }

  // Classify click and send event
  function handleClick(e) {
    var el = e.target.closest('a, button');
    if (!el) return;

    var href = el.getAttribute('href') || '';
    var text = getButtonText(el);
    var pagePath = window.location.pathname;

    // Phone click
    if (href.indexOf('tel:') === 0) {
      sendEvent('button_click', {
        event_category: 'Phone Click',
        event_label: text,
        button_location: pagePath,
        button_destination: href
      });
      return;
    }

    // Email click
    if (href.indexOf('mailto:') === 0) {
      sendEvent('button_click', {
        event_category: 'Email Click',
        event_label: text,
        button_location: pagePath,
        button_destination: href
      });
      return;
    }

    // CTA buttons: .cta, .book-now, .btn, a.cta-button
    var isCTA = el.classList.contains('cta') ||
                el.classList.contains('book-now') ||
                el.classList.contains('btn') ||
                (el.tagName === 'A' && el.classList.contains('cta-button'));

    if (isCTA) {
      sendEvent('button_click', {
        event_category: 'CTA Click',
        event_label: text,
        button_location: pagePath,
        button_destination: href
      });
      return;
    }

    // Links with hrefs containing "rates", "contact", "schedule"
    if (el.tagName === 'A') {
      var hrefLower = href.toLowerCase();
      if (hrefLower.indexOf('rates') !== -1 ||
          hrefLower.indexOf('contact') !== -1 ||
          hrefLower.indexOf('schedule') !== -1) {
        sendEvent('button_click', {
          event_category: 'Navigation Click',
          event_label: text,
          button_location: pagePath,
          button_destination: href
        });
      }
    }
  }

  // Attach listener on DOM ready
  function init() {
    document.addEventListener('click', handleClick, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
