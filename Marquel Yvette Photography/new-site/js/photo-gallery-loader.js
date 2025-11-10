// Photo Gallery Loader - Dynamically builds the photo gallery from config/photos.json
// Shows all photos across the site with their usage locations

(function() {
  'use strict';

  // Load photos configuration
  fetch('config/photos.json')
    .then(response => response.json())
    .then(photos => {
      console.log('Loading photo gallery from config...');

      const galleryGrid = document.querySelector('.photo-grid');
      if (!galleryGrid) {
        console.error('Photo grid container not found');
        return;
      }

      // Clear existing photos
      galleryGrid.innerHTML = '';

      // Build gallery from all photos in config
      const photoItems = [];

      // Gallery photos (Homepage)
      if (photos.gallery) {
        Object.entries(photos.gallery).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Homepage Gallery'
          });
        });
      }

      // Testimonial photos
      if (photos.testimonials) {
        Object.entries(photos.testimonials).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Testimonials'
          });
        });
      }

      // Service photos
      if (photos.services) {
        Object.entries(photos.services).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Services Section'
          });
        });
      }

      // Team headshots
      if (photos.teamHeadshots) {
        Object.entries(photos.teamHeadshots).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Team Headshots'
          });
        });
      }

      // About section photos
      if (photos.about) {
        Object.entries(photos.about).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'About Section'
          });
        });
      }

      // Additional services
      if (photos.additionalServices) {
        Object.entries(photos.additionalServices).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Additional Services'
          });
        });
      }

      // Banner gallery photos (Rates page)
      if (photos.bannerGallery) {
        Object.entries(photos.bannerGallery).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Rates Page Banner'
          });
        });
      }

      // Rates testimonials
      if (photos.ratesTestimonials) {
        Object.entries(photos.ratesTestimonials).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Rates Testimonials'
          });
        });
      }

      // Contact page portfolio
      if (photos.contactPortfolio) {
        Object.entries(photos.contactPortfolio).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Contact Page'
          });
        });
      }

      // Thank you page portfolio
      if (photos.thankYouPortfolio) {
        Object.entries(photos.thankYouPortfolio).forEach(([key, photo]) => {
          photoItems.push({
            src: photo.src,
            alt: photo.alt,
            location: 'Thank You Page'
          });
        });
      }

      // Create photo items and add to gallery
      photoItems.forEach(photo => {
        const photoItem = createPhotoItem(photo.src, photo.alt, photo.location);
        galleryGrid.appendChild(photoItem);
      });

      console.log(`✓ Photo gallery loaded with ${photoItems.length} photos`);
    })
    .catch(error => {
      console.error('Error loading photo gallery:', error);
    });

  // Helper function to create a photo item
  function createPhotoItem(src, alt, location) {
    const div = document.createElement('div');
    div.className = 'photo-item';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';

    const locationText = document.createElement('p');
    locationText.className = 'photo-location';
    locationText.textContent = location;

    overlay.appendChild(locationText);
    div.appendChild(img);
    div.appendChild(overlay);

    return div;
  }

})();
