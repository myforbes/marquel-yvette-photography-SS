const axios = require('axios');
const config = require('../config');

/**
 * Checks page load status, links, images, and forms.
 * @param {Array} pageDataList - collected page data from orchestrator
 * @param {object} browser - Puppeteer browser instance
 * @returns {Array} results
 */
async function audit(pageDataList, browser) {
  const results = [];

  // 1. All pages return HTTP 200
  for (const pd of pageDataList) {
    results.push({
      category: 'functionality',
      check: `Page loads: ${pd.path}`,
      status: pd.status === 200 ? 'pass' : 'fail',
      severity: 'critical',
      detail: `HTTP ${pd.status}`,
    });
  }

  // 2. Non-www redirects to www with 301
  try {
    const resp = await axios.get(config.nonWwwUrl, {
      maxRedirects: 0,
      validateStatus: () => true,
      timeout: config.requestTimeout,
    });
    const location = resp.headers.location || '';
    const is301 = resp.status === 301;
    const redirectsToWww = location.startsWith(config.baseUrl);
    results.push({
      category: 'functionality',
      check: 'Non-www redirects to www',
      status: is301 && redirectsToWww ? 'pass' : 'fail',
      severity: 'critical',
      detail: `Status ${resp.status}, Location: ${location}`,
    });
  } catch (err) {
    results.push({
      category: 'functionality',
      check: 'Non-www redirects to www',
      status: 'fail',
      severity: 'critical',
      detail: err.message,
    });
  }

  // 3. Collect all links and images from page data
  const allInternalLinks = new Set();
  const allExternalLinks = new Set();
  const allImages = new Set();

  for (const pd of pageDataList) {
    for (const href of pd.links) {
      try {
        const url = new URL(href, config.baseUrl);
        // Skip non-HTTP protocols (tel:, mailto:, javascript:, etc.)
        if (url.protocol !== 'http:' && url.protocol !== 'https:') continue;
        if (url.hostname === 'www.marquelyvette.com' || url.hostname === 'marquelyvette.com') {
          allInternalLinks.add(url.href);
        } else {
          allExternalLinks.add(url.href);
        }
      } catch { /* skip invalid URLs */ }
    }
    for (const src of pd.images) {
      if (src) allImages.add(src.startsWith('http') ? src : new URL(src, config.baseUrl).href);
    }
  }

  // 4. Check internal links (HEAD requests, concurrent)
  const internalResults = await checkUrlsBatch(
    [...allInternalLinks],
    config.concurrency,
    config.requestTimeout,
    'Internal link'
  );
  let internalPass = 0;
  let internalFail = 0;
  for (const r of internalResults) {
    if (r.ok) { internalPass++; } else { internalFail++; }
  }
  results.push({
    category: 'functionality',
    check: 'Internal links reachable',
    status: internalFail === 0 ? 'pass' : 'fail',
    severity: 'critical',
    detail: `${internalPass} pass, ${internalFail} fail of ${allInternalLinks.size} unique links`,
    subResults: internalResults.filter(r => !r.ok).map(r => `${r.url} → ${r.detail}`),
  });

  // 5. Check external links (warning only)
  const externalResults = await checkUrlsBatch(
    [...allExternalLinks],
    config.concurrency,
    config.requestTimeout,
    'External link'
  );
  let extPass = 0;
  let extFail = 0;
  for (const r of externalResults) {
    if (r.ok) { extPass++; } else { extFail++; }
  }
  results.push({
    category: 'functionality',
    check: 'External links reachable',
    status: extFail === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: `${extPass} pass, ${extFail} unreachable of ${allExternalLinks.size} unique links`,
    subResults: externalResults.filter(r => !r.ok).map(r => `${r.url} → ${r.detail}`),
  });

  // 6. Check images load with image content-type
  const imageResults = await checkUrlsBatch(
    [...allImages],
    config.concurrency,
    config.requestTimeout,
    'Image',
    true
  );
  let imgPass = 0;
  let imgFail = 0;
  for (const r of imageResults) {
    if (r.ok) { imgPass++; } else { imgFail++; }
  }
  results.push({
    category: 'functionality',
    check: 'Images load correctly',
    status: imgFail === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: `${imgPass} pass, ${imgFail} fail of ${allImages.size} unique images`,
    subResults: imageResults.filter(r => !r.ok).map(r => `${r.url} → ${r.detail}`),
  });

  // 7. Form checks
  const formResults = await checkForms(browser);
  results.push(...formResults);

  return results;
}

async function checkUrlsBatch(urls, concurrency, timeout, label, expectImage = false) {
  const results = [];
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(url => checkUrl(url, timeout, expectImage))
    );
    results.push(...batchResults);
  }
  return results;
}

async function checkUrl(url, timeout, expectImage = false) {
  try {
    const resp = await axios.head(url, {
      timeout,
      validateStatus: () => true,
      maxRedirects: 5,
      headers: { 'User-Agent': 'MYP-Site-Audit/1.0' },
    });
    if (resp.status >= 400) {
      return { url, ok: false, detail: `HTTP ${resp.status}` };
    }
    if (expectImage) {
      const ct = resp.headers['content-type'] || '';
      if (!ct.startsWith('image/')) {
        return { url, ok: false, detail: `Content-Type: ${ct}` };
      }
    }
    return { url, ok: true, detail: `HTTP ${resp.status}` };
  } catch (err) {
    // For HEAD failures, try GET (some servers block HEAD)
    if (!expectImage) {
      try {
        const resp = await axios.get(url, {
          timeout,
          validateStatus: () => true,
          maxRedirects: 5,
          headers: { 'User-Agent': 'MYP-Site-Audit/1.0', Range: 'bytes=0-0' },
        });
        if (resp.status < 400) {
          return { url, ok: true, detail: `HTTP ${resp.status} (GET fallback)` };
        }
        return { url, ok: false, detail: `HTTP ${resp.status}` };
      } catch (err2) {
        return { url, ok: false, detail: err2.message };
      }
    }
    return { url, ok: false, detail: err.message };
  }
}

async function checkForms(browser) {
  const results = [];
  const page = await browser.newPage();

  try {
    // Form 1: Inline checklist on /headshots
    const formCfg = config.forms.inlineChecklist;
    await page.goto(`${config.baseUrl}${formCfg.page}`, { waitUntil: 'networkidle2', timeout: 30000 });

    const formExists = await page.$(formCfg.selector);
    const fieldsExist = formExists
      ? await Promise.all(formCfg.fields.map(f => page.$(f).then(el => !!el)))
      : [];
    const submitExists = formExists ? await page.$(formCfg.submitButton).then(el => !!el) : false;

    results.push({
      category: 'functionality',
      check: 'Headshots inline form present',
      status: formExists && fieldsExist.every(Boolean) && submitExists ? 'pass' : 'fail',
      severity: 'critical',
      detail: formExists
        ? `Form: yes, Fields: ${fieldsExist.filter(Boolean).length}/${formCfg.fields.length}, Submit: ${submitExists}`
        : 'Form not found',
    });

    // Form 2: Popup checklist (wait for it to appear)
    const popupCfg = config.forms.popupChecklist;
    // Clear session storage so popup shows
    await page.evaluate(() => sessionStorage.clear());
    await page.goto(`${config.baseUrl}${popupCfg.page}`, { waitUntil: 'networkidle2', timeout: 30000 });

    let popupAppeared = false;
    try {
      await page.waitForSelector(`${popupCfg.overlaySelector}.active`, { timeout: popupCfg.popupDelay });
      popupAppeared = true;
    } catch { /* popup didn't appear in time */ }

    if (popupAppeared) {
      const popupForm = await page.$(popupCfg.formSelector);
      const popupFields = popupForm
        ? await Promise.all(popupCfg.fields.map(f => page.$(f).then(el => !!el)))
        : [];
      const popupSubmit = popupForm ? await page.$(popupCfg.submitButton).then(el => !!el) : false;

      results.push({
        category: 'functionality',
        check: 'Checklist popup appears and has fields',
        status: popupForm && popupFields.every(Boolean) && popupSubmit ? 'pass' : 'warn',
        severity: 'warning',
        detail: `Popup: yes, Form: ${!!popupForm}, Fields: ${popupFields.filter(Boolean).length}/${popupCfg.fields.length}, Submit: ${popupSubmit}`,
      });
    } else {
      results.push({
        category: 'functionality',
        check: 'Checklist popup appears and has fields',
        status: 'warn',
        severity: 'warning',
        detail: `Popup did not appear within ${popupCfg.popupDelay / 1000}s`,
      });
    }

    // Form 3: Proposal iframe
    const iframeCfg = config.forms.proposalIframe;
    await page.goto(`${config.baseUrl}${iframeCfg.page}`, { waitUntil: 'networkidle2', timeout: 30000 });

    const iframeEl = await page.$(iframeCfg.iframeSelector);
    const iframeSrc = iframeEl ? await page.evaluate(el => el.src, iframeEl) : null;
    let ghlReachable = false;
    if (iframeSrc) {
      try {
        const resp = await axios.get(iframeSrc, { timeout: config.requestTimeout, validateStatus: () => true });
        ghlReachable = resp.status < 400;
      } catch { /* GHL unreachable */ }
    }

    results.push({
      category: 'functionality',
      check: 'Proposal iframe present and GHL reachable',
      status: iframeEl && ghlReachable ? 'pass' : 'fail',
      severity: 'critical',
      detail: `iframe: ${!!iframeEl}, src: ${iframeSrc || 'none'}, GHL reachable: ${ghlReachable}`,
    });
  } catch (err) {
    results.push({
      category: 'functionality',
      check: 'Form checks',
      status: 'fail',
      severity: 'critical',
      detail: `Error during form checks: ${err.message}`,
    });
  } finally {
    await page.close();
  }

  return results;
}

module.exports = { audit };
