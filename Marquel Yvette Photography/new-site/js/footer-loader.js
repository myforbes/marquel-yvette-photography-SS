// Footer Component Loader
// Dynamically loads the footer component from components/footer.html

(function() {
  'use strict';

  const loadFooter = async () => {
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // If no placeholder, try to find existing footer or append to body
    const targetElement = footerPlaceholder || document.body;

    try {
      const response = await fetch('components/footer.html');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const footerHTML = await response.text();

      // If we have a placeholder, replace its content
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
      } else {
        // Otherwise append to body
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = footerHTML;
        document.body.appendChild(tempDiv.firstElementChild);
      }

    } catch (error) {
      console.error('Error loading footer:', error);

      // Fallback: show basic footer
      const fallbackFooter = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-legal">
              <p>&copy; 2025 Marquel Yvette Photography. All rights reserved.</p>
              <div class="footer-links">
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="tos.html">Terms of Service</a>
                <a href="disclaimer.html">Disclaimer</a>
                <a href="website-accessibility-statement.html">Accessibility</a>
                <a href="copyright.html">Copyright</a>
              </div>
            </div>
          </div>
        </footer>
      `;

      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = fallbackFooter;
      }
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }

})();
