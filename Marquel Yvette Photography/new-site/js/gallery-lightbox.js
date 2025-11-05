// Gallery Lightbox - Click to Enlarge
// Shows full-size image in overlay when gallery item is clicked

(function() {
  'use strict';

  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (galleryItems.length === 0) {
    return; // Exit if no gallery items
  }

  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <img class="lightbox-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const closeButton = lightbox.querySelector('.lightbox-close');

  // Add click event to each gallery item
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (!img) return;

    // Make gallery item focusable and clickable
    item.setAttribute('tabindex', '0');
    item.style.cursor = 'pointer';

    // Click to open lightbox
    item.addEventListener('click', function() {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || 'Gallery image';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Keyboard accessibility (Enter key)
    item.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        item.click();
      }
    });
  });

  // Close lightbox when clicking close button
  closeButton.addEventListener('click', closeLightbox);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

})();
