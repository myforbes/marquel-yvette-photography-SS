const puppeteer = require('puppeteer');
const config = require('./config');
const functionality = require('./auditors/functionality');
const security = require('./auditors/security');
const seo = require('./auditors/seo');
const { generateReport } = require('./report/generate-report');
const { sendReport } = require('./report/email-report');
const fs = require('fs');
const path = require('path');

const startTime = Date.now();

async function main() {
  console.log('=== MYP Site Audit ===');
  console.log(`Started: ${new Date().toISOString()}`);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    // Phase 1: Visit all pages and collect data
    console.log(`\nPhase 1: Visiting ${config.pages.length + config.extraPages.length} pages...`);
    const allPaths = [...config.pages, ...config.extraPages];
    const pageDataList = [];

    for (const pagePath of allPaths) {
      const data = await collectPageData(browser, pagePath);
      pageDataList.push(data);
      const icon = data.status === 200 ? '+' : 'X';
      console.log(`  [${icon}] ${pagePath} (${data.status})`);
    }

    // Phase 2: Run auditors
    console.log('\nPhase 2: Running auditors...');

    console.log('  Running functionality checks...');
    const funcResults = await functionality.audit(pageDataList, browser);
    console.log(`    ${funcResults.filter(r => r.status === 'pass').length}/${funcResults.length} passed`);

    console.log('  Running security checks...');
    const secResults = await security.audit(pageDataList);
    console.log(`    ${secResults.filter(r => r.status === 'pass').length}/${secResults.length} passed`);

    console.log('  Running SEO checks...');
    const seoResults = await seo.audit(pageDataList);
    console.log(`    ${seoResults.filter(r => r.status === 'pass').length}/${seoResults.length} passed`);

    const allResults = [...funcResults, ...secResults, ...seoResults];

    // Phase 3: Generate report
    const durationMs = Date.now() - startTime;
    console.log(`\nPhase 3: Generating report (${Math.round(durationMs / 1000)}s elapsed)...`);
    const html = generateReport(allResults, durationMs);

    // Save report to file
    const reportPath = path.join(__dirname, 'report', 'latest-report.html');
    fs.writeFileSync(reportPath, html);
    console.log(`  Report saved: ${reportPath}`);

    // Phase 4: Send email
    const shouldSendEmail = process.env.SEND_EMAIL !== 'false';
    if (shouldSendEmail) {
      console.log('\nPhase 4: Sending email...');
      try {
        await sendReport(html);
        console.log('  Email sent successfully.');
      } catch (err) {
        console.error(`  Email failed: ${err.message}`);
        // Don't fail the whole audit for email issues
      }
    } else {
      console.log('\nPhase 4: Skipping email (SEND_EMAIL=false)');
    }

    // Summary
    const totalChecks = allResults.length;
    const passed = allResults.filter(r => r.status === 'pass').length;
    const failed = allResults.filter(r => r.status === 'fail').length;
    const warned = allResults.filter(r => r.status === 'warn').length;
    const criticalFails = allResults.filter(r => r.status === 'fail' && r.severity === 'critical');

    console.log(`\n=== Summary ===`);
    console.log(`Total: ${totalChecks} | Pass: ${passed} | Warn: ${warned} | Fail: ${failed}`);
    console.log(`Duration: ${Math.round(durationMs / 1000)}s`);

    if (criticalFails.length > 0) {
      console.log(`\nCRITICAL FAILURES (${criticalFails.length}):`);
      for (const f of criticalFails) {
        console.log(`  [FAIL] ${f.check}: ${f.detail}`);
      }
    } else {
      console.log('\nAll critical checks passed.');
    }
  } finally {
    await browser.close();
  }
}

/**
 * Visit a page and collect all data needed by all auditors in a single pass.
 */
async function collectPageData(browser, pagePath) {
  const page = await browser.newPage();
  const url = `${config.baseUrl}${pagePath}`;
  const data = { path: pagePath, url };

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    data.status = response ? response.status() : 0;

    // Collect everything in one evaluate call
    const pageInfo = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a[href]')].map(a => a.href);
      const images = [...document.querySelectorAll('img')].map(img => img.src).filter(src => src && src !== window.location.href);
      const imagesWithoutAlt = [...document.querySelectorAll('img')]
        .filter(img => !img.alt || img.alt.trim() === '')
        .map(img => img.src);

      const title = document.title || '';
      const metaDesc = document.querySelector('meta[name="description"]');
      const canonical = document.querySelector('link[rel="canonical"]');

      // OG tags
      const ogTags = {};
      document.querySelectorAll('meta[property^="og:"]').forEach(el => {
        ogTags[el.getAttribute('property')] = el.getAttribute('content');
      });

      // JSON-LD
      const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
      const jsonLd = jsonLdScripts.map(s => {
        try { return JSON.parse(s.textContent); } catch { return null; }
      }).filter(Boolean);

      // H1 count
      const h1Count = document.querySelectorAll('h1').length;

      // External scripts
      const externalScripts = [...document.querySelectorAll('script[src]')]
        .map(s => s.src)
        .filter(src => !src.startsWith(window.location.origin));

      // Mixed content: find any http:// resources in src/href attributes
      const httpResources = [];
      document.querySelectorAll('[src],[href]').forEach(el => {
        const val = el.getAttribute('src') || el.getAttribute('href');
        if (val && val.startsWith('http://') && !val.startsWith('http://localhost')) {
          httpResources.push(val);
        }
      });

      return {
        links,
        images,
        imagesWithoutAlt,
        title,
        metaDescription: metaDesc ? metaDesc.getAttribute('content') : '',
        canonical: canonical ? canonical.getAttribute('href') : '',
        ogTags,
        jsonLd,
        h1Count,
        externalScripts,
        httpResources,
      };
    });

    Object.assign(data, pageInfo);
  } catch (err) {
    data.status = 0;
    data.error = err.message;
    data.links = [];
    data.images = [];
    data.imagesWithoutAlt = [];
    data.title = '';
    data.metaDescription = '';
    data.canonical = '';
    data.ogTags = {};
    data.jsonLd = [];
    data.h1Count = 0;
    data.externalScripts = [];
    data.httpResources = [];
  } finally {
    await page.close();
  }

  return data;
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
