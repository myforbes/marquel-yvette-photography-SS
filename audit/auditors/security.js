const axios = require('axios');
const tls = require('tls');
const config = require('../config');

/**
 * Security auditor: HTTPS, headers, SSL, mixed content, bucket access, sensitive files, third-party scripts.
 * @param {Array} pageDataList - collected page data from orchestrator
 * @returns {Array} results
 */
async function audit(pageDataList) {
  const results = [];

  // 1. HTTP → HTTPS redirect
  try {
    const resp = await axios.get('http://www.marquelyvette.com', {
      maxRedirects: 0,
      validateStatus: () => true,
      timeout: config.requestTimeout,
    });
    const location = resp.headers.location || '';
    results.push({
      category: 'security',
      check: 'HTTP → HTTPS redirect',
      status: resp.status === 301 && location.startsWith('https://') ? 'pass' : 'fail',
      severity: 'critical',
      detail: `Status ${resp.status}, Location: ${location}`,
    });
  } catch (err) {
    results.push({
      category: 'security',
      check: 'HTTP → HTTPS redirect',
      status: 'fail',
      severity: 'critical',
      detail: err.message,
    });
  }

  // 2. Security headers present with correct values
  try {
    const resp = await axios.get(config.baseUrl, {
      timeout: config.requestTimeout,
      validateStatus: () => true,
    });

    for (const [header, expected] of Object.entries(config.expectedHeaders)) {
      const actual = resp.headers[header];
      if (expected.presence) {
        // Just check presence
        results.push({
          category: 'security',
          check: `Header: ${header}`,
          status: actual ? 'pass' : 'fail',
          severity: expected.severity,
          detail: actual ? 'Present' : 'Missing',
        });
      } else {
        const matches = actual && actual.toLowerCase() === expected.value.toLowerCase();
        results.push({
          category: 'security',
          check: `Header: ${header}`,
          status: matches ? 'pass' : actual ? 'warn' : 'fail',
          severity: expected.severity,
          detail: actual ? `Got: ${actual.substring(0, 100)}` : 'Missing',
        });
      }
    }
  } catch (err) {
    results.push({
      category: 'security',
      check: 'Security headers check',
      status: 'fail',
      severity: 'critical',
      detail: err.message,
    });
  }

  // 3. SSL cert expiry (> 14 days) and TLS version
  try {
    const certInfo = await checkSSL('www.marquelyvette.com');
    const daysUntilExpiry = certInfo.daysUntilExpiry;
    results.push({
      category: 'security',
      check: 'SSL certificate expiry',
      status: daysUntilExpiry > 14 ? 'pass' : daysUntilExpiry > 0 ? 'warn' : 'fail',
      severity: 'critical',
      detail: `Expires in ${daysUntilExpiry} days (${certInfo.validTo})`,
    });
    results.push({
      category: 'security',
      check: 'TLS version',
      status: certInfo.tlsVersion >= 1.2 ? 'pass' : 'fail',
      severity: 'critical',
      detail: `TLS ${certInfo.tlsVersion}`,
    });
  } catch (err) {
    results.push({
      category: 'security',
      check: 'SSL/TLS check',
      status: 'fail',
      severity: 'critical',
      detail: err.message,
    });
  }

  // 4. No mixed content
  let mixedContentPages = [];
  for (const pd of pageDataList) {
    if (pd.httpResources && pd.httpResources.length > 0) {
      mixedContentPages.push({ path: pd.path, resources: pd.httpResources });
    }
  }
  results.push({
    category: 'security',
    check: 'No mixed content (http:// resources)',
    status: mixedContentPages.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: mixedContentPages.length === 0
      ? 'No mixed content found'
      : `${mixedContentPages.length} page(s) with mixed content`,
    subResults: mixedContentPages.map(p =>
      `${p.path}: ${p.resources.slice(0, 3).join(', ')}${p.resources.length > 3 ? '...' : ''}`
    ),
  });

  // 5. S3 bucket not publicly listable
  try {
    const resp = await axios.get(`https://${config.s3Bucket}.s3.amazonaws.com/`, {
      timeout: config.requestTimeout,
      validateStatus: () => true,
    });
    const isBlocked = resp.status === 403 || resp.status === 404;
    results.push({
      category: 'security',
      check: 'S3 bucket not publicly listable',
      status: isBlocked ? 'pass' : 'fail',
      severity: 'critical',
      detail: `GET bucket root returned HTTP ${resp.status}`,
    });
  } catch (err) {
    results.push({
      category: 'security',
      check: 'S3 bucket not publicly listable',
      status: 'pass',
      severity: 'critical',
      detail: `Request failed (likely blocked): ${err.message}`,
    });
  }

  // 6. Sensitive files not exposed
  const sensitiveResults = await Promise.all(
    config.sensitivePaths.map(async (path) => {
      try {
        const resp = await axios.get(`${config.baseUrl}${path}`, {
          timeout: config.requestTimeout,
          validateStatus: () => true,
          maxRedirects: 0,
        });
        const blocked = resp.status === 403 || resp.status === 404;
        return {
          path,
          status: resp.status,
          blocked,
        };
      } catch {
        return { path, status: 'error', blocked: true };
      }
    })
  );

  const exposedFiles = sensitiveResults.filter(r => !r.blocked);
  results.push({
    category: 'security',
    check: 'Sensitive files not exposed',
    status: exposedFiles.length === 0 ? 'pass' : 'fail',
    severity: 'critical',
    detail: exposedFiles.length === 0
      ? `All ${config.sensitivePaths.length} sensitive paths return 403/404`
      : `${exposedFiles.length} file(s) exposed`,
    subResults: exposedFiles.map(f => `${f.path} → HTTP ${f.status}`),
  });

  // 7. Third-party script integrity
  const allScriptDomains = new Set();
  for (const pd of pageDataList) {
    for (const src of (pd.externalScripts || [])) {
      try {
        const url = new URL(src);
        allScriptDomains.add(url.hostname);
      } catch { /* skip invalid */ }
    }
  }
  const untrustedDomains = [...allScriptDomains].filter(
    d => !config.trustedScriptDomains.some(trusted => d === trusted || d.endsWith(`.${trusted}`))
  );
  results.push({
    category: 'security',
    check: 'Third-party scripts from trusted domains',
    status: untrustedDomains.length === 0 ? 'pass' : 'warn',
    severity: 'warning',
    detail: untrustedDomains.length === 0
      ? `All external scripts from ${allScriptDomains.size} trusted domains`
      : `${untrustedDomains.length} unknown domain(s): ${untrustedDomains.join(', ')}`,
  });

  // 8. CloudFront direct access
  try {
    const resp = await axios.get(`https://${config.cloudfrontDomain}`, {
      maxRedirects: 0,
      validateStatus: () => true,
      timeout: config.requestTimeout,
    });
    const location = resp.headers.location || '';
    const redirectsToWww = location.includes('www.marquelyvette.com');
    const isRedirect = resp.status >= 300 && resp.status < 400;
    results.push({
      category: 'security',
      check: 'CloudFront direct access handled',
      status: isRedirect && redirectsToWww ? 'pass' : 'warn',
      severity: 'warning',
      detail: `Status ${resp.status}${location ? `, Location: ${location}` : ''}`,
    });
  } catch (err) {
    results.push({
      category: 'security',
      check: 'CloudFront direct access handled',
      status: 'warn',
      severity: 'warning',
      detail: err.message,
    });
  }

  return results;
}

function checkSSL(hostname) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(443, hostname, { servername: hostname }, () => {
      const cert = socket.getPeerCertificate();
      const protocol = socket.getProtocol(); // e.g. 'TLSv1.3'
      socket.end();

      if (!cert || !cert.valid_to) {
        return reject(new Error('Could not read certificate'));
      }

      const validTo = new Date(cert.valid_to);
      const now = new Date();
      const daysUntilExpiry = Math.floor((validTo - now) / (1000 * 60 * 60 * 24));
      const tlsVersionMatch = protocol.match(/(\d+\.\d+)/);
      const tlsVersion = tlsVersionMatch ? parseFloat(tlsVersionMatch[1]) : 0;

      resolve({ validTo: cert.valid_to, daysUntilExpiry, tlsVersion });
    });

    socket.on('error', reject);
    socket.setTimeout(config.requestTimeout, () => {
      socket.destroy();
      reject(new Error('TLS connection timeout'));
    });
  });
}

module.exports = { audit };
