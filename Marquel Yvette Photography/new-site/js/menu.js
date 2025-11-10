// Lightweight Mobile Menu - Vanilla JS
// Replaces Squarespace Header Controller (~20 lines vs 100KB framework)

(function() {
  'use strict';

  const menuBtn = document.querySelector('.header-burger-btn');
  const menu = document.querySelector('.header-menu');

  if (!menuBtn || !menu) return; // Exit if elements not found

  // Toggle menu open/close
  menuBtn.addEventListener('click', function() {
    const isOpen = menu.classList.contains('menu-open');

    if (isOpen) {
      menu.classList.remove('menu-open');
      menuBtn.classList.remove('menu-active'); // Animate burger back to hamburger
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; // Re-enable scrolling
    } else {
      menu.classList.add('menu-open');
      menuBtn.classList.add('menu-active'); // Animate burger to X
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('menu-open')) {
      menu.classList.remove('menu-open');
      menuBtn.classList.remove('menu-active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus(); // Return focus to button for accessibility
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (menu.classList.contains('menu-open') &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)) {
      menu.classList.remove('menu-open');
      menuBtn.classList.remove('menu-active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Initialize aria-expanded
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
  }

})();
