// Footer Component Loader
// Dynamically loads the footer component and populates it with content from data/footer.json

(function() {
  'use strict';

  const loadFooter = async () => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const targetElement = footerPlaceholder || document.body;

    try {
      // Load footer HTML template
      const response = await fetch('components/footer.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const footerHTML = await response.text();

      // Insert footer HTML
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
      } else {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = footerHTML;
        document.body.appendChild(tempDiv.firstElementChild);
      }

      // Now load and populate footer content
      await populateFooterContent();

    } catch (error) {
      console.error('Error loading footer:', error);
      showFallbackFooter();
    }
  };

  const populateFooterContent = async () => {
    try {
      const response = await fetch('data/footer.json');
      if (!response.ok) {
        console.warn('Footer data not found, using default content');
        return;
      }

      const data = await response.json();

      // Update branding
      if (data.branding) {
        const logo = document.querySelector('.footer-logo');
        const tagline = document.querySelector('.footer-tagline');

        if (logo && data.branding.logo) {
          logo.src = data.branding.logo;
          logo.alt = data.branding.logoAlt || 'Logo';
        }
        if (tagline && data.branding.tagline) {
          tagline.textContent = data.branding.tagline;
        }
      }

      // Update contact info
      if (data.contact) {
        const contactTitle = document.querySelector('.footer-contact h3');
        if (contactTitle && data.contact.title) {
          contactTitle.textContent = data.contact.title;
        }

        // Phone
        if (data.contact.phone) {
          const phoneLink = document.querySelector('.footer-contact a[href^="tel"]');
          if (phoneLink) {
            phoneLink.href = data.contact.phone.link;
            phoneLink.textContent = data.contact.phone.display;
          }
        }

        // Email
        if (data.contact.email) {
          const emailLink = document.querySelector('.footer-contact a[href^="mailto"]');
          if (emailLink) {
            emailLink.href = data.contact.email.link;
            emailLink.textContent = data.contact.email.display;
          }
        }

        // Location
        if (data.contact.location) {
          const locationSpan = document.querySelector('.footer-contact .footer-contact-item:last-child span');
          if (locationSpan) {
            locationSpan.textContent = data.contact.location.display;
          }
        }
      }

      // Update CTA
      if (data.cta) {
        const ctaTitle = document.querySelector('.footer-cta h3');
        const ctaDesc = document.querySelector('.footer-cta p');
        const ctaButton = document.querySelector('.footer-cta .cta-button');

        if (ctaTitle && data.cta.title) {
          ctaTitle.textContent = data.cta.title;
        }
        if (ctaDesc && data.cta.description) {
          ctaDesc.textContent = data.cta.description;
        }
        if (ctaButton && data.cta.button) {
          ctaButton.textContent = data.cta.button.text;
          ctaButton.href = data.cta.button.url;
        }
      }

      // Update social links
      if (data.social) {
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
          const instagramLink = socialLinks.querySelector('a[href*="instagram"]');
          const facebookLink = socialLinks.querySelector('a[href*="facebook"]');
          const linkedinLink = socialLinks.querySelector('a[href*="linkedin"]');

          if (instagramLink && data.social.instagram) {
            instagramLink.href = data.social.instagram.url;
            instagramLink.setAttribute('aria-label', data.social.instagram.label);
          }
          if (facebookLink && data.social.facebook) {
            facebookLink.href = data.social.facebook.url;
            facebookLink.setAttribute('aria-label', data.social.facebook.label);
          }
          if (linkedinLink && data.social.linkedin) {
            linkedinLink.href = data.social.linkedin.url;
            linkedinLink.setAttribute('aria-label', data.social.linkedin.label);
          }
        }
      }

      // Update legal/copyright
      if (data.legal) {
        const copyrightText = document.querySelector('.footer-legal > p');
        if (copyrightText && data.legal.copyright) {
          copyrightText.textContent = data.legal.copyright;
        }

        // Update footer links
        if (data.legal.links) {
          const footerLinksContainer = document.querySelector('.footer-links');
          if (footerLinksContainer) {
            const links = footerLinksContainer.querySelectorAll('a');

            // Only update if we have the same number of links
            if (links.length === data.legal.links.length) {
              data.legal.links.forEach((linkData, index) => {
                links[index].textContent = linkData.text;
                links[index].href = linkData.url;
              });
            }
          }
        }
      }

      console.log('✓ Footer content loaded successfully');

    } catch (error) {
      console.error('Error loading footer content:', error);
    }
  };

  const showFallbackFooter = () => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const fallbackFooter = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-legal">
            <p>&copy; 2026 Marquel Yvette Photography. All rights reserved.</p>
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
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }

})();
