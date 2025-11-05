// Gallery Auto-Advance Carousel
// Auto-rotates gallery images every 3 seconds with smooth fade transitions

(function() {
  'use strict';

  const galleryWrapper = document.querySelector('.gallery-grid-wrapper');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (!galleryWrapper || galleryItems.length === 0) {
    console.warn('Gallery auto-advance: Gallery elements not found');
    return;
  }

  let currentIndex = 0;
  let autoAdvanceInterval = null;
  let isPaused = false;

  // Function to show specific gallery items (show 5 at a time on desktop)
  function showGallerySlide(startIndex) {
    const viewportWidth = window.innerWidth;
    let itemsToShow = 5; // Desktop default

    if (viewportWidth <= 480) {
      itemsToShow = 2; // Mobile portrait
    } else if (viewportWidth <= 768) {
      itemsToShow = 3; // Mobile landscape
    } else if (viewportWidth <= 1024) {
      itemsToShow = 4; // Tablet
    }

    galleryItems.forEach((item, index) => {
      // Calculate if this item should be visible
      const adjustedIndex = startIndex % galleryItems.length;
      const visibleIndices = [];

      for (let i = 0; i < itemsToShow; i++) {
        visibleIndices.push((adjustedIndex + i) % galleryItems.length);
      }

      if (visibleIndices.includes(index)) {
        item.style.opacity = '1';
        item.style.transition = 'opacity 0.8s ease-in-out';
      } else {
        item.style.opacity = '0.4';
        item.style.transition = 'opacity 0.8s ease-in-out';
      }
    });
  }

  // Function to advance to next slide
  function advanceGallery() {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      showGallerySlide(currentIndex);
    }
  }

  // Start auto-advance
  function startAutoAdvance() {
    if (!autoAdvanceInterval) {
      autoAdvanceInterval = setInterval(advanceGallery, 3000); // 3 seconds like live site
    }
  }

  // Stop auto-advance
  function stopAutoAdvance() {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
      autoAdvanceInterval = null;
    }
  }

  // Pause on hover (better UX)
  galleryWrapper.addEventListener('mouseenter', function() {
    isPaused = true;
  });

  galleryWrapper.addEventListener('mouseleave', function() {
    isPaused = false;
  });

  // Pause on focus (accessibility)
  galleryWrapper.addEventListener('focusin', function() {
    isPaused = true;
  });

  galleryWrapper.addEventListener('focusout', function() {
    isPaused = false;
  });

  // Pause when tab is not visible (performance)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      showGallerySlide(currentIndex);
    }, 250);
  });

  // Initialize: show first slide
  showGallerySlide(0);

  // Start auto-advance on page load
  startAutoAdvance();

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    stopAutoAdvance();
  });

})();
