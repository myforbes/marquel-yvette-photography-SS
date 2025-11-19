// Photo Loader - Loads all images from config/photos.json
// Makes it easy to update photos across the entire site from one file

(function() {
  'use strict';

  // Load photos configuration
  fetch('config/photos.json')
    .then(response => response.json())
    .then(photos => {
      console.log('Loading photos from config...');

      // Load logo images
      if (photos.logo) {
        loadImage('[data-photo="logo-header"]', photos.logo.header);
        loadImage('[data-photo="logo-footer"]', photos.logo.footer);
      }

      // Load gallery images
      if (photos.gallery) {
        loadImage('[data-photo="gallery-1"]', photos.gallery.image1.src, photos.gallery.image1.alt);
        loadImage('[data-photo="gallery-2"]', photos.gallery.image2.src, photos.gallery.image2.alt);
        loadImage('[data-photo="gallery-3"]', photos.gallery.image3.src, photos.gallery.image3.alt);
        loadImage('[data-photo="gallery-4"]', photos.gallery.image4.src, photos.gallery.image4.alt);
        loadImage('[data-photo="gallery-5"]', photos.gallery.image5.src, photos.gallery.image5.alt);
        loadImage('[data-photo="gallery-6"]', photos.gallery.image6.src, photos.gallery.image6.alt);
        loadImage('[data-photo="gallery-7"]', photos.gallery.image7.src, photos.gallery.image7.alt);
        loadImage('[data-photo="gallery-8"]', photos.gallery.image8.src, photos.gallery.image8.alt);
        loadImage('[data-photo="gallery-9"]', photos.gallery.image9.src, photos.gallery.image9.alt);
        loadImage('[data-photo="gallery-10"]', photos.gallery.image10.src, photos.gallery.image10.alt);
      }

      // Load testimonial images
      if (photos.testimonials) {
        loadImage('[data-photo="testimonial-featured"]', photos.testimonials.featured.src, photos.testimonials.featured.alt);
        loadImage('[data-photo="testimonial-1"]', photos.testimonials.testimonial1.src, photos.testimonials.testimonial1.alt);
        loadImage('[data-photo="testimonial-2"]', photos.testimonials.testimonial2.src, photos.testimonials.testimonial2.alt);
        loadImage('[data-photo="testimonial-3"]', photos.testimonials.testimonial3.src, photos.testimonials.testimonial3.alt);
      }

      // Load service images
      if (photos.services) {
        loadImage('[data-photo="service-corporate"]', photos.services.corporate.src, photos.services.corporate.alt);
        loadImage('[data-photo="service-actor"]', photos.services.actor.src, photos.services.actor.alt);
        loadImage('[data-photo="service-linkedin"]', photos.services.linkedin.src, photos.services.linkedin.alt);
      }

      // Load team headshot images
      if (photos.teamHeadshots) {
        loadImage('[data-photo="team-1"]', photos.teamHeadshots.team1.src, photos.teamHeadshots.team1.alt);
        loadImage('[data-photo="team-2"]', photos.teamHeadshots.team2.src, photos.teamHeadshots.team2.alt);
      }

      // Load about section images
      if (photos.about) {
        loadImage('[data-photo="about-photographer"]', photos.about.photographer.src, photos.about.photographer.alt);
        loadImage('[data-photo="about-studio"]', photos.about.studio.src, photos.about.studio.alt);
      }

      // Load additional services images
      if (photos.additionalServices) {
        loadImage('[data-photo="service-branding"]', photos.additionalServices.branding.src, photos.additionalServices.branding.alt);
        loadImage('[data-photo="service-event"]', photos.additionalServices.eventCoverage.src, photos.additionalServices.eventCoverage.alt);
        loadImage('[data-photo="service-virtual"]', photos.additionalServices.virtualGallery.src, photos.additionalServices.virtualGallery.alt);
      }

      // Load process icons
      if (photos.process) {
        loadImage('[data-photo="process-icon-1"]', photos.process.icon1.src, photos.process.icon1.alt);
        loadImage('[data-photo="process-icon-2"]', photos.process.icon2.src, photos.process.icon2.alt);
        loadImage('[data-photo="process-icon-3"]', photos.process.icon3.src, photos.process.icon3.alt);
      }

      console.log('✓ All photos loaded from config');
    })
    .catch(error => {
      console.error('Error loading photos config:', error);
    });

  // Helper function to load an image
  function loadImage(selector, src, alt) {
    const img = document.querySelector(selector);
    if (img && src) {
      img.src = src;
      if (alt) {
        img.alt = alt;
      }
    }
  }

})();
