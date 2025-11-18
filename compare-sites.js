const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const LIVE_URL = 'https://www.marquelyvette.com';
const LOCAL_FILE = path.resolve(__dirname, 'Marquel Yvette Photography/new-site/index.html');
const OUTPUT_DIR = path.resolve(__dirname, 'comparison-results');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

async function captureScreenshots(browser, url, prefix, isLocal = false) {
  const screenshots = [];

  for (const viewport of viewports) {
    console.log(`Capturing ${prefix} - ${viewport.name} (${viewport.width}x${viewport.height})`);

    const page = await browser.newPage();
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
    });

    try {
      if (isLocal) {
        await page.goto(`file://${url}`, { waitUntil: 'networkidle2', timeout: 60000 });
      } else {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      }

      // Wait a bit for any animations or lazy loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      const screenshotPath = path.join(OUTPUT_DIR, `${prefix}-${viewport.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      screenshots.push({
        viewport: viewport.name,
        path: screenshotPath,
        width: viewport.width,
        height: viewport.height
      });

      console.log(`✓ Saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`Error capturing ${prefix} - ${viewport.name}:`, error.message);
    } finally {
      await page.close();
    }
  }

  return screenshots;
}

async function comparePages() {
  console.log('Starting page comparison...\n');
  console.log(`Live URL: ${LIVE_URL}`);
  console.log(`Local File: ${LOCAL_FILE}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    console.log('Capturing live site screenshots...');
    const liveScreenshots = await captureScreenshots(browser, LIVE_URL, 'live', false);

    console.log('\nCapturing local site screenshots...');
    const localScreenshots = await captureScreenshots(browser, LOCAL_FILE, 'local', true);

    // Generate HTML report
    const reportHTML = generateReport(liveScreenshots, localScreenshots);
    const reportPath = path.join(OUTPUT_DIR, 'comparison-report.html');
    fs.writeFileSync(reportPath, reportHTML);

    console.log(`\n${'='.repeat(60)}`);
    console.log('Comparison complete!');
    console.log(`${'='.repeat(60)}`);
    console.log(`\nResults saved to: ${OUTPUT_DIR}`);
    console.log(`View report: file://${reportPath}\n`);

  } catch (error) {
    console.error('Error during comparison:', error);
  } finally {
    await browser.close();
  }
}

function generateReport(liveScreenshots, localScreenshots) {
  const comparisons = viewports.map(v => {
    const live = liveScreenshots.find(s => s.viewport === v.name);
    const local = localScreenshots.find(s => s.viewport === v.name);

    return {
      viewport: v.name,
      width: v.width,
      height: v.height,
      livePath: live ? path.basename(live.path) : null,
      localPath: local ? path.basename(local.path) : null
    };
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Comparison Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 30px;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 28px;
    }
    .info {
      color: #666;
      margin-bottom: 30px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 4px;
    }
    .comparison {
      margin-bottom: 50px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      background: #fafafa;
    }
    .comparison h2 {
      color: #444;
      margin-bottom: 15px;
      text-transform: capitalize;
      font-size: 20px;
    }
    .viewport-info {
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .screenshots {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .screenshot-container {
      background: white;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .screenshot-container h3 {
      margin-bottom: 10px;
      color: #555;
      font-size: 16px;
    }
    .screenshot-container img {
      width: 100%;
      height: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
      display: block;
    }
    .note {
      margin-top: 30px;
      padding: 15px;
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      color: #856404;
      border-radius: 4px;
    }
    @media (max-width: 1024px) {
      .screenshots {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Site Comparison Report</h1>
    <div class="info">
      <strong>Live Site:</strong> ${LIVE_URL}<br>
      <strong>Local Site:</strong> ${path.basename(LOCAL_FILE)}<br>
      <strong>Generated:</strong> ${new Date().toLocaleString()}
    </div>

    ${comparisons.map(comp => `
      <div class="comparison">
        <h2>${comp.viewport} View</h2>
        <div class="viewport-info">${comp.width}px × ${comp.height}px</div>
        <div class="screenshots">
          <div class="screenshot-container">
            <h3>Live Site</h3>
            ${comp.livePath ? `<img src="${comp.livePath}" alt="Live site ${comp.viewport}">` : '<p>Screenshot not available</p>'}
          </div>
          <div class="screenshot-container">
            <h3>Local Site</h3>
            ${comp.localPath ? `<img src="${comp.localPath}" alt="Local site ${comp.viewport}">` : '<p>Screenshot not available</p>'}
          </div>
        </div>
      </div>
    `).join('')}

    <div class="note">
      <strong>Note:</strong> Scroll through each comparison to identify differences between the live and local sites.
      Pay attention to layout, colors, fonts, images, spacing, and interactive elements.
    </div>
  </div>
</body>
</html>`;
}

// Run the comparison
comparePages().catch(console.error);
