/**
 * Generates an HTML email report from audit results.
 * @param {Array} results - all audit results
 * @param {number} durationMs - audit duration in milliseconds
 * @returns {string} HTML email content
 */
function generateReport(results, durationMs) {
  const now = new Date();
  const durationSec = Math.round(durationMs / 1000);

  // Calculate next Monday 8 AM ET
  const nextRun = new Date(now);
  nextRun.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
  nextRun.setHours(8, 0, 0, 0);

  // Group by category
  const categories = {
    functionality: { label: 'Functionality', results: [] },
    security: { label: 'Security', results: [] },
    seo: { label: 'SEO', results: [] },
  };

  for (const r of results) {
    if (categories[r.category]) {
      categories[r.category].results.push(r);
    }
  }

  // Calculate scores
  const scores = {};
  for (const [key, cat] of Object.entries(categories)) {
    const total = cat.results.length;
    const passed = cat.results.filter(r => r.status === 'pass').length;
    const hasCriticalFail = cat.results.some(r => r.status === 'fail' && r.severity === 'critical');
    const pct = total > 0 ? Math.round((passed / total) * 100) : 0;
    scores[key] = { total, passed, pct, hasCriticalFail };
  }

  // Collect all failures and warnings
  const issues = results.filter(r => r.status !== 'pass');
  const criticalIssues = issues.filter(r => r.status === 'fail' && r.severity === 'critical');
  const warnings = issues.filter(r => r.status !== 'pass' && !(r.status === 'fail' && r.severity === 'critical'));

  function getScoreColor(pct, hasCriticalFail) {
    if (hasCriticalFail || pct < 90) return { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' };
    if (pct < 100) return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' };
    return { bg: '#dcfce7', border: '#22c55e', text: '#166534' };
  }

  function statusIcon(status) {
    if (status === 'pass') return '<span style="color:#22c55e;font-weight:bold;">PASS</span>';
    if (status === 'warn') return '<span style="color:#f59e0b;font-weight:bold;">WARN</span>';
    return '<span style="color:#ef4444;font-weight:bold;">FAIL</span>';
  }

  const scoreCards = Object.entries(categories).map(([key, cat]) => {
    const s = scores[key];
    const c = getScoreColor(s.pct, s.hasCriticalFail);
    return `
      <td style="width:33%;padding:8px;">
        <div style="background:${c.bg};border:2px solid ${c.border};border-radius:8px;padding:16px;text-align:center;">
          <div style="font-size:14px;color:${c.text};font-weight:600;margin-bottom:4px;">${cat.label}</div>
          <div style="font-size:32px;color:${c.text};font-weight:bold;">${s.pct}%</div>
          <div style="font-size:12px;color:${c.text};">${s.passed}/${s.total} checks passed</div>
        </div>
      </td>`;
  }).join('');

  const issueRows = criticalIssues.length > 0
    ? criticalIssues.map(r => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">
            <span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">CRITICAL</span>
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;font-size:13px;">${r.check}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280;">${r.detail}</td>
        </tr>`).join('')
    : '<tr><td style="padding:12px;color:#166534;font-size:13px;" colspan="3">No critical issues found</td></tr>';

  const warningRows = warnings.length > 0
    ? warnings.map(r => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;">
            <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">WARN</span>
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;font-size:13px;">${r.check}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280;">${r.detail}</td>
        </tr>`).join('')
    : '';

  function buildDetailSection(key, cat) {
    const rows = cat.results.map(r => {
      let detailHtml = `<span style="font-size:12px;color:#6b7280;">${r.detail}</span>`;
      if (r.subResults && r.subResults.length > 0) {
        detailHtml += '<ul style="margin:4px 0 0 0;padding-left:16px;">';
        for (const sub of r.subResults.slice(0, 5)) {
          detailHtml += `<li style="font-size:11px;color:#9ca3af;margin:2px 0;">${escapeHtml(sub)}</li>`;
        }
        if (r.subResults.length > 5) {
          detailHtml += `<li style="font-size:11px;color:#9ca3af;">...and ${r.subResults.length - 5} more</li>`;
        }
        detailHtml += '</ul>';
      }
      return `
        <tr>
          <td style="padding:6px 12px;border-bottom:1px solid #f9fafb;vertical-align:top;">${statusIcon(r.status)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #f9fafb;font-size:13px;vertical-align:top;">${r.check}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #f9fafb;vertical-align:top;">${detailHtml}</td>
        </tr>`;
    }).join('');

    return `
      <h2 style="font-size:16px;color:#1f2937;margin:24px 0 8px;padding-bottom:4px;border-bottom:2px solid #e5e7eb;">
        ${cat.label}
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        ${rows}
      </table>`;
  }

  const detailSections = Object.entries(categories)
    .map(([key, cat]) => buildDetailSection(key, cat))
    .join('');

  const totalChecks = results.length;
  const totalPassed = results.filter(r => r.status === 'pass').length;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;margin-top:20px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:#1a1a1a;padding:24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:20px;margin:0;">Site Audit Report</h1>
      <p style="color:#9ca3af;font-size:13px;margin:4px 0 0;">marquelyvette.com &mdash; ${formatDate(now)}</p>
    </div>

    <div style="padding:24px;">

      <!-- Summary -->
      <p style="font-size:14px;color:#374151;margin:0 0 16px;">
        <strong>${totalPassed}/${totalChecks}</strong> checks passed.
        ${criticalIssues.length > 0
          ? `<span style="color:#ef4444;font-weight:600;">${criticalIssues.length} critical issue(s) require attention.</span>`
          : '<span style="color:#166534;">No critical issues.</span>'}
      </p>

      <!-- Score Cards -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>${scoreCards}</tr>
      </table>

      <!-- Critical Issues -->
      ${criticalIssues.length > 0 ? `
      <h2 style="font-size:16px;color:#991b1b;margin:0 0 8px;">Critical Issues</h2>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #fee2e2;border-radius:8px;margin-bottom:16px;">
        ${issueRows}
      </table>` : ''}

      <!-- Warnings -->
      ${warnings.length > 0 ? `
      <h2 style="font-size:16px;color:#92400e;margin:0 0 8px;">Warnings (${warnings.length})</h2>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #fef3c7;border-radius:8px;margin-bottom:16px;">
        ${warningRows}
      </table>` : ''}

      <!-- Detailed Results -->
      <h2 style="font-size:18px;color:#1f2937;margin:24px 0 8px;">Detailed Results</h2>
      ${detailSections}

      <!-- Footer -->
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="font-size:12px;color:#9ca3af;margin:0;">
          Audit completed in ${durationSec}s &mdash; Next scheduled run: ${formatDate(nextRun)}
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { generateReport };
