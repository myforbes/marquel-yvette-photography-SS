module.exports = {
  baseUrl: 'https://www.marquelyvette.com',
  nonWwwUrl: 'https://marquelyvette.com',
  cloudfrontDomain: 'd1pqc8zade8idc.cloudfront.net',
  s3Bucket: 'marquelyvette-website',

  // All 19 pages from sitemap.xml
  pages: [
    '/',
    '/rates-2',
    '/workplace-headshots',
    '/eras-headshots',
    '/gift-cards',
    '/request-proposal',
    '/headshots-ashburn-va',
    '/headshots-fairfax-va',
    '/headshots-leesburg-va',
    '/headshots-loudoun-county',
    '/headshots-reston-va',
    '/headshots-tysons-corner',
    '/headshots-washington-dc',
    '/thank-you-page',
    '/privacy-policy',
    '/tos',
    '/copyright',
    '/disclaimer',
    '/website-accessibility-statement',
  ],

  // Also check headshots page (has inline form, not in sitemap but is live)
  extraPages: ['/headshots'],

  forms: {
    // Inline checklist form on /headshots
    inlineChecklist: {
      page: '/headshots',
      selector: '#checklist-form',
      fields: ['input[name="name"]', 'input[name="email"]'],
      submitButton: 'button[type="submit"], input[type="submit"]',
      type: 'inline',
    },
    // Popup checklist (appears after 10s on any page)
    popupChecklist: {
      page: '/',
      overlaySelector: '#checklist-popup-overlay',
      formSelector: '#checklist-popup-form',
      fields: ['input[name="name"]', 'input[name="email"]'],
      submitButton: '.checklist-popup-cta',
      popupDelay: 12000, // 10s delay + 2s buffer
      type: 'popup',
    },
    // GHL proposal iframe on /request-proposal
    proposalIframe: {
      page: '/request-proposal',
      iframeSelector: '#inline-bV3K1OgeSUUvy4S1Qtsf',
      iframeSrc: 'https://api.leadconnectorhq.com/widget/form/bV3K1OgeSUUvy4S1Qtsf',
      type: 'iframe',
    },
  },

  // Expected security headers (from cloudfront-security-headers.js)
  expectedHeaders: {
    'strict-transport-security': {
      value: 'max-age=31536000; includeSubDomains; preload',
      severity: 'critical',
    },
    'x-content-type-options': {
      value: 'nosniff',
      severity: 'critical',
    },
    'x-frame-options': {
      value: 'SAMEORIGIN',
      severity: 'warning',
    },
    'x-xss-protection': {
      value: '1; mode=block',
      severity: 'warning',
    },
    'referrer-policy': {
      value: 'strict-origin-when-cross-origin',
      severity: 'warning',
    },
    'permissions-policy': {
      value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
      severity: 'warning',
    },
    'content-security-policy': {
      // Just check presence, not exact value (too long/volatile)
      presence: true,
      severity: 'warning',
    },
  },

  // Sensitive paths that should return 403 or 404
  sensitivePaths: [
    '/.env',
    '/.git/config',
    '/.gitignore',
    '/.DS_Store',
    '/deploy-to-aws.sh',
    '/start-photo-gallery.sh',
    '/package.json',
    '/package-lock.json',
    '/node_modules/',
    '/FORM-AUDIT-REPORT.md',
    '/README.md',
    '/DEPLOYMENT-GUIDE.md',
    '/FULL_REBUILD_PLAN.md',
    '/REBUILD_CLEAN_PLAN.md',
    '/SEO-CHECKLIST.md',
    '/GTM-SETUP-GUIDE.md',
    '/config/',
    '/data/',
    '/cloudfront/',
    '/audit/',
  ],

  // Expected third-party script domains
  trustedScriptDomains: [
    'cdnjs.cloudflare.com',
    'link.msgsndr.com',
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'connect.facebook.net',
    'snap.licdn.com',
    'call.chatra.io',
    'storage.googleapis.com',
  ],

  email: {
    from: 'marquel@marquelyvette.com',
    to: 'marquel@marquelyvette.com',
    subject: 'Weekly Site Audit Report — marquelyvette.com',
  },

  // Concurrency for link/image checking
  concurrency: 10,
  requestTimeout: 10000,
};
