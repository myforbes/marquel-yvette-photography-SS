// Photo Gallery Loader with Update Functionality
// Allows users to preview photo changes and download updated config

(function() {
  'use strict';

  let photosConfig = null;
  let hasUpdates = false;
  const updatedPhotos = new Map(); // Track which photos have been updated

  // Load photos configuration
  fetch('config/photos.json')
    .then(response => response.json())
    .then(photos => {
      console.log('Loading photo gallery from config...');
      photosConfig = photos;

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
            section: 'gallery',
            key: key,
            src: photo.src,
            alt: photo.alt,
            location: 'Homepage Gallery',
            priority: photo.priority
          });
        });
      }

      // Testimonial photos
      if (photos.testimonials) {
        Object.entries(photos.testimonials).forEach(([key, photo]) => {
          photoItems.push({
            section: 'testimonials',
            key: key,
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
            section: 'services',
            key: key,
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
            section: 'teamHeadshots',
            key: key,
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
            section: 'about',
            key: key,
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
            section: 'additionalServices',
            key: key,
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
            section: 'bannerGallery',
            key: key,
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
            section: 'ratesTestimonials',
            key: key,
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
            section: 'contactPortfolio',
            key: key,
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
            section: 'thankYouPortfolio',
            key: key,
            src: photo.src,
            alt: photo.alt,
            location: 'Thank You Page'
          });
        });
      }

      // Create photo items and add to gallery
      photoItems.forEach((photo, index) => {
        const photoItem = createPhotoItem(photo, index);
        galleryGrid.appendChild(photoItem);
      });

      console.log(`✓ Photo gallery loaded with ${photoItems.length} photos`);

      // Setup download button
      setupDownloadButton();
    })
    .catch(error => {
      console.error('Error loading photo gallery:', error);
    });

  // Helper function to create a photo item with update button
  function createPhotoItem(photoData, index) {
    const div = document.createElement('div');
    div.className = 'photo-item';
    div.dataset.section = photoData.section;
    div.dataset.key = photoData.key;

    // Photo container
    const photoContainer = document.createElement('div');
    photoContainer.className = 'photo-container';

    const img = document.createElement('img');
    img.src = photoData.src;
    img.alt = photoData.alt;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';

    const locationText = document.createElement('p');
    locationText.className = 'photo-location';
    locationText.textContent = photoData.location;

    const pathText = document.createElement('p');
    pathText.className = 'photo-path';
    pathText.textContent = photoData.src;

    overlay.appendChild(locationText);
    overlay.appendChild(pathText);
    photoContainer.appendChild(img);
    photoContainer.appendChild(overlay);

    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.className = 'update-photo-btn';
    updateBtn.textContent = 'Update Photo';
    updateBtn.onclick = () => handleUpdateClick(div, photoData, img);

    div.appendChild(photoContainer);
    div.appendChild(updateBtn);

    return div;
  }

  // Handle update button click
  function handleUpdateClick(photoItem, photoData, imgElement) {
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.className = 'file-input';

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Read file and preview
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update preview image
        imgElement.src = event.target.result;

        // Determine folder based on current path
        let folder = 'images/portfolio/';
        if (photoData.src.includes('banner-gallery')) {
          folder = 'images/banner-gallery/';
        } else if (photoData.src.includes('testimonials')) {
          folder = 'images/testimonials/';
        } else if (photoData.src.includes('logos')) {
          folder = 'images/logos/';
        } else if (photoData.src.includes('backgrounds')) {
          folder = 'images/backgrounds/';
        }

        // Generate new path with original filename or new filename
        const newFileName = file.name;
        const newPath = folder + newFileName;

        // Update config in memory
        if (photosConfig[photoData.section] && photosConfig[photoData.section][photoData.key]) {
          const oldPath = photosConfig[photoData.section][photoData.key].src;
          photosConfig[photoData.section][photoData.key].src = newPath;

          // Track the update
          updatedPhotos.set(`${photoData.section}.${photoData.key}`, {
            oldPath: oldPath,
            newPath: newPath,
            file: file
          });

          // Mark as updated
          photoItem.classList.add('updated');
          hasUpdates = true;

          // Show download button and instructions
          document.getElementById('downloadConfigBtn').classList.add('active');
          document.getElementById('uploadInstructions').classList.add('active');

          console.log(`Updated: ${photoData.section}.${photoData.key}`);
          console.log(`Old: ${oldPath}`);
          console.log(`New: ${newPath}`);
        }
      };

      reader.readAsDataURL(file);
    };

    // Trigger file selection
    fileInput.click();
  }

  // Setup download button
  function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadConfigBtn');

    downloadBtn.onclick = () => {
      if (!hasUpdates) {
        alert('No updates to download');
        return;
      }

      // Create downloadable JSON
      const dataStr = JSON.stringify(photosConfig, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // Create download link
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'photos.json';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✓ Downloaded updated photos.json');

      // Show file upload summary
      console.log('\n📸 Files to upload to S3:');
      updatedPhotos.forEach((update, key) => {
        console.log(`- ${update.file.name} → ${update.newPath}`);
      });
    };
  }

})();
