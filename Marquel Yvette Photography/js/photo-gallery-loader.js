// Photo Gallery Loader with Update Functionality
// Organizes photos by website page for easy management

(function() {
  'use strict';

  let photosConfig = null;
  let hasUpdates = false;
  const updatedPhotos = new Map();

  // Load photos configuration
  fetch('config/photos.json?v=' + Date.now())
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

      // Page order for display
      const pageOrder = [
        'homepage',
        'headshots',
        'ratesPage',
        'workplaceHeadshotsPage',
        'erasHeadshotsPage',
        'locationPages',
        'portfolioExtras'
      ];

      let totalPhotos = 0;

      // Process each page section
      pageOrder.forEach(pageName => {
        const pageData = photos[pageName];
        if (!pageData) return;

        // Create page section header
        const pageHeader = createPageHeader(pageData._pageName || pageName, pageData._description);
        galleryGrid.appendChild(pageHeader);

        // Process sections within the page
        const photoItems = extractPhotosFromPage(pageName, pageData);

        if (photoItems.length > 0) {
          // Create photo grid for this page
          const pageGrid = document.createElement('div');
          pageGrid.className = 'page-photo-grid';

          photoItems.forEach(photo => {
            const photoItem = createPhotoItem(photo);
            pageGrid.appendChild(photoItem);
            totalPhotos++;
          });

          galleryGrid.appendChild(pageGrid);
        }
      });

      console.log(`✓ Photo gallery loaded with ${totalPhotos} photos`);

      // Setup deploy button
      setupDownloadButton();
    })
    .catch(error => {
      console.error('Error loading photo gallery:', error);
    });

  // Create a page section header
  function createPageHeader(pageName, description) {
    const header = document.createElement('div');
    header.className = 'page-section-header';

    const title = document.createElement('h2');
    title.className = 'page-section-title';
    title.textContent = pageName;
    header.appendChild(title);

    if (description) {
      const desc = document.createElement('p');
      desc.className = 'page-section-description';
      desc.textContent = description;
      header.appendChild(desc);
    }

    return header;
  }

  // Extract all photos from a page section
  function extractPhotosFromPage(pageName, pageData) {
    const photos = [];

    function processObject(obj, path, sectionName) {
      if (!obj || typeof obj !== 'object') return;

      // Check if this object is a photo (has src property)
      if (obj.src && typeof obj.src === 'string') {
        photos.push({
          pageName: pageName,
          path: path,
          section: sectionName,
          src: obj.src,
          alt: obj.alt || '',
          usedOn: obj.usedOn || null
        });
        return;
      }

      // Otherwise, recurse into nested objects
      Object.entries(obj).forEach(([key, value]) => {
        // Skip metadata fields
        if (key.startsWith('_')) return;

        // Determine section name from _section field or key
        let newSection = sectionName;
        if (value && value._section) {
          newSection = value._section;
        } else if (!sectionName) {
          newSection = key;
        }

        const newPath = path ? `${path}.${key}` : key;
        processObject(value, newPath, newSection);
      });
    }

    processObject(pageData, '', null);
    return photos;
  }

  // Create a photo item with update button
  function createPhotoItem(photoData) {
    const div = document.createElement('div');
    div.className = 'photo-item';
    div.dataset.page = photoData.pageName;
    div.dataset.path = photoData.path;

    // Photo container
    const photoContainer = document.createElement('div');
    photoContainer.className = 'photo-container';

    const img = document.createElement('img');
    img.src = photoData.src;
    img.alt = photoData.alt;
    img.loading = 'lazy';
    img.onerror = function() {
      this.style.background = '#333';
      this.style.minHeight = '150px';
      this.alt = 'Image not found: ' + photoData.src;
    };

    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';

    // Section info
    const sectionText = document.createElement('p');
    sectionText.className = 'photo-section';
    sectionText.textContent = photoData.section || photoData.path;

    // Path info
    const pathText = document.createElement('p');
    pathText.className = 'photo-path';
    pathText.textContent = photoData.src;

    // Used on info (if applicable)
    if (photoData.usedOn) {
      const usedOnText = document.createElement('p');
      usedOnText.className = 'photo-used-on';
      usedOnText.textContent = 'Used on: ' + photoData.usedOn;
      overlay.appendChild(usedOnText);
    }

    overlay.appendChild(sectionText);
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
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.className = 'file-input';

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

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

      const formData = new FormData();
      formData.append('photo', file);
      formData.append('pageName', photoData.pageName);
      formData.append('path', photoData.path);
      formData.append('folder', folder);

      try {
        photoItem.style.opacity = '0.6';

        const response = await fetch('http://localhost:3000/api/upload-photo', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // Update preview image
          const reader = new FileReader();
          reader.onload = (event) => {
            imgElement.src = event.target.result;
          };
          reader.readAsDataURL(file);

          // Update config in memory using path
          updateConfigByPath(photoData.pageName, photoData.path, 'src', result.path);

          // Track the update
          updatedPhotos.set(`${photoData.pageName}.${photoData.path}`, {
            oldPath: result.oldPath,
            newPath: result.path,
            file: file
          });

          photoItem.classList.add('updated');
          photoItem.style.opacity = '1';
          hasUpdates = true;

          document.getElementById('deployBtn').classList.add('active');
          document.getElementById('uploadInstructions').classList.add('active');

          console.log(`✓ Photo uploaded and saved!`);
          console.log(`  Page: ${photoData.pageName}`);
          console.log(`  Path: ${photoData.path}`);
          console.log(`  Old: ${result.oldPath}`);
          console.log(`  New: ${result.path}`);
        } else {
          alert('Upload failed: ' + result.error);
          photoItem.style.opacity = '1';
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Make sure the photo gallery server is running on port 3000.');
        photoItem.style.opacity = '1';
      }
    };

    fileInput.click();
  }

  // Update config value by path
  function updateConfigByPath(pageName, path, property, value) {
    const pathParts = path.split('.');
    let current = photosConfig[pageName];

    for (let i = 0; i < pathParts.length - 1; i++) {
      if (current && current[pathParts[i]]) {
        current = current[pathParts[i]];
      } else {
        return false;
      }
    }

    const lastKey = pathParts[pathParts.length - 1];
    if (current && current[lastKey]) {
      current[lastKey][property] = value;
      return true;
    }
    return false;
  }

  // Setup deploy button
  function setupDownloadButton() {
    const deployBtn = document.getElementById('deployBtn');

    deployBtn.onclick = async () => {
      if (!hasUpdates) {
        alert('No updates to deploy');
        return;
      }

      if (!confirm('Deploy all changes to CloudFront? This will update your live website.')) {
        return;
      }

      deployBtn.disabled = true;
      deployBtn.textContent = 'Deploying...';
      deployBtn.style.opacity = '0.6';

      try {
        const updatedFiles = Array.from(updatedPhotos.values()).map(update => update.newPath);

        const response = await fetch('http://localhost:3000/api/deploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ updatedFiles })
        });

        const result = await response.json();

        if (result.success) {
          alert(`✅ Successfully deployed to CloudFront!\n\nInvalidation ID: ${result.invalidationId}\n\nYour live website will update in 1-2 minutes.`);

          deployBtn.textContent = 'Deployed ✓';
          deployBtn.style.background = '#4CAF50';

          console.log('✓ Deployment complete!');
          console.log(`  Invalidation ID: ${result.invalidationId}`);
          console.log(`  Updated files:`, updatedFiles);
        } else {
          alert('Deployment failed: ' + result.error);
          deployBtn.disabled = false;
          deployBtn.textContent = 'Deploy to CloudFront';
          deployBtn.style.opacity = '1';
        }
      } catch (error) {
        console.error('Deploy error:', error);
        alert('Deployment failed. Make sure the photo gallery server is running and AWS CLI is configured.');
        deployBtn.disabled = false;
        deployBtn.textContent = 'Deploy to CloudFront';
        deployBtn.style.opacity = '1';
      }
    };
  }

})();
