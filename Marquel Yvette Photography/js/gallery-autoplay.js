// Lightweight Gallery Auto-Advance
// Auto-rotates gallery every 3 seconds with pause on hover

(function() {
  'use strict';

  const nextButton = document.querySelector('.gallery-reel-control-btn[data-test="gallery-reel-control-btn-next"]');
  const gallery = document.querySelector('.gallery-reel');

  if (!nextButton || !gallery) {
    console.warn('Gallery auto-advance: Gallery elements not found');
    return; // Exit if elements don't exist
  }

  let autoAdvanceInterval = null;
  let isPaused = false;

  // Function to click next button
  function advanceGallery() {
    if (!isPaused && nextButton) {
      nextButton.click();
    }
  }

  // Start auto-advance
  function startAutoAdvance() {
    if (!autoAdvanceInterval) {
      autoAdvanceInterval = setInterval(advanceGallery, 3000); // 3 seconds
    }
  }

  // Stop auto-advance
  function stopAutoAdvance() {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
      autoAdvanceInterval = null;
    }
  }

  // Pause on hover (better UX - let users view images)
  gallery.addEventListener('mouseenter', function() {
    isPaused = true;
  });

  gallery.addEventListener('mouseleave', function() {
    isPaused = false;
  });

  // Pause on focus (accessibility - keyboard users)
  gallery.addEventListener('focusin', function() {
    isPaused = true;
  });

  gallery.addEventListener('focusout', function() {
    isPaused = false;
  });

  // Pause when tab is not visible (performance - save resources)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
  });

  // Start auto-advance on page load
  startAutoAdvance();

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    stopAutoAdvance();
  });

})();
