// Policy Content Loader
// Dynamically loads policy content from data/policies.json based on page type

(function() {
  'use strict';

  // Get policy type from page filename
  const getPolicyType = () => {
    const path = window.location.pathname;
    const filename = path.split('/').pop();

    const policyMap = {
      'privacy-policy.html': 'privacyPolicy',
      'privacy-policy': 'privacyPolicy',
      'tos.html': 'termsOfService',
      'tos': 'termsOfService',
      'terms-of-service.html': 'termsOfService',
      'terms-of-service': 'termsOfService',
      'website-accessibility-statement.html': 'accessibility',
      'website-accessibility-statement': 'accessibility',
      'accessibility.html': 'accessibility',
      'accessibility': 'accessibility',
      'disclaimer.html': 'disclaimer',
      'disclaimer': 'disclaimer',
      'copyright.html': 'copyright',
      'copyright': 'copyright'
    };

    return policyMap[filename] || null;
  };

  // Load and render policy content
  const loadPolicyContent = async () => {
    const policyType = getPolicyType();

    if (!policyType) {
      console.error('Unknown policy page');
      return;
    }

    try {
      const response = await fetch('data/policies.json');
      const policies = await response.json();
      const policy = policies[policyType];

      if (!policy) {
        console.error(`Policy not found: ${policyType}`);
        return;
      }

      // Update page title
      document.title = `${policy.title} | Marquel Yvette Photography`;

      // Update policy title
      const titleElement = document.querySelector('.policy-title');
      if (titleElement) {
        titleElement.textContent = policy.title;
      }

      // Update last updated date
      const dateElement = document.querySelector('.policy-last-updated');
      if (dateElement) {
        dateElement.textContent = `Last Updated: ${policy.lastUpdated}`;
      }

      // Render policy sections
      const contentElement = document.querySelector('.policy-content');
      if (contentElement && policy.sections) {
        contentElement.innerHTML = policy.sections.map(section => `
          <section class="policy-section">
            <h2>${section.heading}</h2>
            <div class="policy-text">${formatContent(section.content)}</div>
          </section>
        `).join('');
      }

    } catch (error) {
      console.error('Error loading policy content:', error);
    }
  };

  // Format content with proper line breaks and lists
  const formatContent = (content) => {
    return content
      .split('\n\n')
      .map(paragraph => {
        // Check if paragraph contains bullet points
        if (paragraph.includes('•')) {
          const items = paragraph.split('\n').filter(line => line.trim());
          const hasIntro = !items[0].trim().startsWith('•');

          let html = '';
          if (hasIntro) {
            html += `<p>${items[0]}</p>`;
            html += '<ul>';
            items.slice(1).forEach(item => {
              if (item.trim().startsWith('•')) {
                html += `<li>${item.replace('•', '').trim()}</li>`;
              }
            });
            html += '</ul>';
          } else {
            html += '<ul>';
            items.forEach(item => {
              if (item.trim().startsWith('•')) {
                html += `<li>${item.replace('•', '').trim()}</li>`;
              }
            });
            html += '</ul>';
          }
          return html;
        }

        // Regular paragraph
        return `<p>${paragraph}</p>`;
      })
      .join('');
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPolicyContent);
  } else {
    loadPolicyContent();
  }

})();
