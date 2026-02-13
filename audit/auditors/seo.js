const axios = require('axios');
const config = require('../config');

/**
 * SEO auditor: meta tags, structured data, sitemap, robots.txt, llms.txt.
 * @param {Array} pageDataList - collected page data from orchestrator
 * @returns {Array} results
 */
async function audit(pageDataList) {
  const results = [];

  // 1. Title tag checks
  const titleIssues = [];
  for (const pd of pageDataList) {
    const title = pd.title || '';
    if (!title) {
      titleIssues.push(`${pd.path}: missing title`);
    } else if (title.length < 30) {
      titleIssues.push(`${pd.path}: title too short (${title.length} chars)`);
    } else if (title.length > 60) {
      titleIssues.push(`${pd.path}: title too long (${title.length} chars)`);
    }
  }
  results.push({
    category: 'seo',
    check: 'Title tags (30-60 chars)',
    status: titleIssues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: titleIssues.length === 0
      ? `All ${pageDataList.length} pages have valid titles`
      : `${titleIssues.length} issue(s)`,
    subResults: titleIssues,
  });

  // 2. Meta description checks
  const descIssues = [];
  for (const pd of pageDataList) {
    const desc = pd.metaDescription || '';
    if (!desc) {
      descIssues.push(`${pd.path}: missing meta description`);
    } else if (desc.length < 50) {
      descIssues.push(`${pd.path}: description too short (${desc.length} chars)`);
    } else if (desc.length > 160) {
      descIssues.push(`${pd.path}: description too long (${desc.length} chars)`);
    }
  }
  results.push({
    category: 'seo',
    check: 'Meta descriptions (50-160 chars)',
    status: descIssues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: descIssues.length === 0
      ? `All ${pageDataList.length} pages have valid descriptions`
      : `${descIssues.length} issue(s)`,
    subResults: descIssues,
  });

  // 3. Canonical link checks
  const canonicalIssues = [];
  for (const pd of pageDataList) {
    const canonical = pd.canonical || '';
    const expectedUrl = `${config.baseUrl}${pd.path === '/' ? '/' : pd.path}`;
    if (!canonical) {
      canonicalIssues.push(`${pd.path}: missing canonical`);
    } else if (canonical !== expectedUrl && canonical !== expectedUrl.replace(/\/$/, '')) {
      canonicalIssues.push(`${pd.path}: canonical mismatch (${canonical})`);
    }
  }
  results.push({
    category: 'seo',
    check: 'Canonical URLs match sitemap',
    status: canonicalIssues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: canonicalIssues.length === 0
      ? `All ${pageDataList.length} pages have correct canonicals`
      : `${canonicalIssues.length} issue(s)`,
    subResults: canonicalIssues,
  });

  // 4. OG tags
  const ogIssues = [];
  const requiredOg = ['og:title', 'og:description', 'og:image'];
  for (const pd of pageDataList) {
    const missing = requiredOg.filter(tag => !pd.ogTags?.[tag]);
    if (missing.length > 0) {
      ogIssues.push(`${pd.path}: missing ${missing.join(', ')}`);
    }
  }
  results.push({
    category: 'seo',
    check: 'Open Graph tags present',
    status: ogIssues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: ogIssues.length === 0
      ? `All ${pageDataList.length} pages have OG tags`
      : `${ogIssues.length} page(s) missing OG tags`,
    subResults: ogIssues,
  });

  // 5. JSON-LD structured data
  const jsonLdIssues = [];
  for (const pd of pageDataList) {
    if (!pd.jsonLd || pd.jsonLd.length === 0) {
      jsonLdIssues.push(`${pd.path}: no JSON-LD found`);
    } else {
      for (const ld of pd.jsonLd) {
        if (!ld['@context'] || !ld['@type']) {
          jsonLdIssues.push(`${pd.path}: JSON-LD missing @context or @type`);
        }
      }
    }
  }
  results.push({
    category: 'seo',
    check: 'JSON-LD structured data valid',
    status: jsonLdIssues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: jsonLdIssues.length === 0
      ? `All ${pageDataList.length} pages have valid JSON-LD`
      : `${jsonLdIssues.length} issue(s)`,
    subResults: jsonLdIssues,
  });

  // 6. Image alt attributes
  const altIssues = [];
  for (const pd of pageDataList) {
    const missingAlt = (pd.imagesWithoutAlt || []).length;
    if (missingAlt > 0) {
      altIssues.push(`${pd.path}: ${missingAlt} image(s) missing alt text`);
    }
  }
  results.push({
    category: 'seo',
    check: 'Images have alt attributes',
    status: altIssues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: altIssues.length === 0
      ? 'All images have alt attributes'
      : `${altIssues.length} page(s) with missing alt text`,
    subResults: altIssues,
  });

  // 7. Exactly 1 H1 per page
  const h1Issues = [];
  for (const pd of pageDataList) {
    const count = pd.h1Count || 0;
    if (count === 0) {
      h1Issues.push(`${pd.path}: no H1 tag`);
    } else if (count > 1) {
      h1Issues.push(`${pd.path}: ${count} H1 tags (should be 1)`);
    }
  }
  results.push({
    category: 'seo',
    check: 'Exactly 1 H1 per page',
    status: h1Issues.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: h1Issues.length === 0
      ? `All ${pageDataList.length} pages have exactly 1 H1`
      : `${h1Issues.length} issue(s)`,
    subResults: h1Issues,
  });

  // 8. Sitemap.xml validation
  try {
    const resp = await axios.get(`${config.baseUrl}/sitemap.xml`, {
      timeout: config.requestTimeout,
    });
    const urlMatches = resp.data.match(/<loc>(.*?)<\/loc>/g) || [];
    const sitemapUrls = urlMatches.map(m => m.replace(/<\/?loc>/g, ''));

    // Check all sitemap URLs are reachable
    const unreachable = [];
    for (let i = 0; i < sitemapUrls.length; i += config.concurrency) {
      const batch = sitemapUrls.slice(i, i + config.concurrency);
      const batchResults = await Promise.all(
        batch.map(async (url) => {
          try {
            const r = await axios.head(url, { timeout: config.requestTimeout, validateStatus: () => true });
            return { url, status: r.status, ok: r.status < 400 };
          } catch (err) {
            return { url, status: 'error', ok: false, detail: err.message };
          }
        })
      );
      unreachable.push(...batchResults.filter(r => !r.ok));
    }

    results.push({
      category: 'seo',
      check: 'Sitemap.xml valid and URLs reachable',
      status: unreachable.length === 0 ? 'pass' : 'fail',
      severity: 'critical',
      detail: `${sitemapUrls.length} URLs in sitemap, ${unreachable.length} unreachable`,
      subResults: unreachable.map(u => `${u.url} → ${u.status}`),
    });
  } catch (err) {
    results.push({
      category: 'seo',
      check: 'Sitemap.xml valid and URLs reachable',
      status: 'fail',
      severity: 'critical',
      detail: `Could not fetch sitemap.xml: ${err.message}`,
    });
  }

  // 9. Robots.txt
  try {
    const resp = await axios.get(`${config.baseUrl}/robots.txt`, {
      timeout: config.requestTimeout,
    });
    const hasSitemapDirective = /^Sitemap:/im.test(resp.data);
    results.push({
      category: 'seo',
      check: 'robots.txt valid with Sitemap directive',
      status: hasSitemapDirective ? 'pass' : 'warn',
      severity: 'warning',
      detail: hasSitemapDirective
        ? 'robots.txt present with Sitemap directive'
        : 'robots.txt present but missing Sitemap directive',
    });

    // 10. Check robots.txt doesn't block sitemap pages
    const disallowRules = (resp.data.match(/^Disallow:\s*(.+)/gm) || [])
      .map(r => r.replace(/^Disallow:\s*/, '').trim())
      .filter(Boolean);

    const blockedPages = [];
    for (const page of config.pages) {
      for (const rule of disallowRules) {
        if (page.startsWith(rule) || rule === page) {
          blockedPages.push(`${page} blocked by Disallow: ${rule}`);
        }
      }
    }
    results.push({
      category: 'seo',
      check: 'robots.txt not blocking sitemap pages',
      status: blockedPages.length === 0 ? 'pass' : 'warn',
      severity: 'warning',
      detail: blockedPages.length === 0
        ? 'No sitemap pages blocked'
        : `${blockedPages.length} page(s) blocked`,
      subResults: blockedPages,
    });
  } catch (err) {
    results.push({
      category: 'seo',
      check: 'robots.txt valid with Sitemap directive',
      status: 'warn',
      severity: 'warning',
      detail: `Could not fetch robots.txt: ${err.message}`,
    });
  }

  // 11. llms.txt
  try {
    const resp = await axios.get(`${config.baseUrl}/llms.txt`, {
      timeout: config.requestTimeout,
    });
    // Extract URLs from llms.txt
    const urlRegex = /https?:\/\/[^\s)>\]]+/g;
    const llmsUrls = (resp.data.match(urlRegex) || []);

    const unreachableLlms = [];
    for (let i = 0; i < llmsUrls.length; i += config.concurrency) {
      const batch = llmsUrls.slice(i, i + config.concurrency);
      const batchResults = await Promise.all(
        batch.map(async (url) => {
          try {
            const r = await axios.head(url, { timeout: config.requestTimeout, validateStatus: () => true });
            return { url, ok: r.status < 400 };
          } catch {
            return { url, ok: false };
          }
        })
      );
      unreachableLlms.push(...batchResults.filter(r => !r.ok));
    }

    results.push({
      category: 'seo',
      check: 'llms.txt valid and URLs reachable',
      status: unreachableLlms.length === 0 ? 'pass' : 'warn',
      severity: 'warning',
      detail: `${llmsUrls.length} URLs in llms.txt, ${unreachableLlms.length} unreachable`,
      subResults: unreachableLlms.map(u => u.url),
    });

    // 12. Cross-reference llms.txt with sitemap
    const sitemapPaths = new Set(config.pages);
    const llmsPaths = llmsUrls
      .filter(u => u.startsWith(config.baseUrl))
      .map(u => new URL(u).pathname);
    const missingFromLlms = [...sitemapPaths].filter(
      p => !llmsPaths.includes(p) && !llmsPaths.includes(p.replace(/\/$/, ''))
    );

    if (missingFromLlms.length > 0) {
      results.push({
        category: 'seo',
        check: 'llms.txt covers sitemap pages',
        status: 'warn',
        severity: 'warning',
        detail: `${missingFromLlms.length} sitemap page(s) not in llms.txt`,
        subResults: missingFromLlms,
      });
    } else {
      results.push({
        category: 'seo',
        check: 'llms.txt covers sitemap pages',
        status: 'pass',
        severity: 'warning',
        detail: 'All sitemap pages referenced in llms.txt',
      });
    }
  } catch (err) {
    results.push({
      category: 'seo',
      check: 'llms.txt valid and URLs reachable',
      status: 'warn',
      severity: 'warning',
      detail: `Could not fetch llms.txt: ${err.message}`,
    });
  }

  return results;
}

module.exports = { audit };
