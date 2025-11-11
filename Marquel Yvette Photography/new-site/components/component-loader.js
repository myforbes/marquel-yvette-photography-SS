/**
 * Simple Component Loader for Marquel Yvette Photography
 *
 * This script demonstrates how to load components and populate them with data
 * from the content.json file.
 *
 * Usage:
 * 1. Add data-component attribute to sections in HTML
 * 2. Load content.json
 * 3. Call populateComponents()
 */

// Load content data
let siteContent = {};

async function loadContent() {
  try {
    const response = await fetch('data/content.json');
    siteContent = await response.json();
    console.log('Content loaded successfully');
    return siteContent;
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}

// Populate hero gallery
function populateHeroGallery(data) {
  const galleryWrapper = document.querySelector('[data-component="hero-gallery"]');
  if (!galleryWrapper || !data.hero.gallery) return;

  galleryWrapper.innerHTML = '';

  data.hero.gallery.forEach(item => {
    const galleryItem = `
      <div class="gallery-grid-item">
        <div class="gallery-grid-item-wrapper">
          <img src="${item.image}" alt="${item.alt}" loading="eager">
        </div>
      </div>
    `;
    galleryWrapper.insertAdjacentHTML('beforeend', galleryItem);
  });
}

// Populate hero title
function populateHeroTitle(data) {
  const heroTitle = document.querySelector('[data-component="hero-title"]');
  if (!heroTitle) return;

  const tagline = heroTitle.querySelector('.hero-tagline');
  const title = heroTitle.querySelector('.hero-h1');

  if (tagline) tagline.textContent = data.hero.tagline;
  if (title) title.textContent = data.hero.title;
}

// Populate featured testimonial
function populateFeaturedTestimonial(data) {
  const section = document.querySelector('[data-component="testimonial-featured"]');
  if (!section || !data.testimonials.featured) return;

  const img = section.querySelector('.testimonial-image img');
  const quote = section.querySelector('blockquote p');
  const author = section.querySelector('cite');

  if (img) {
    img.src = data.testimonials.featured.image;
    img.alt = data.testimonials.featured.alt;
  }
  if (quote) quote.innerHTML = `"${data.testimonials.featured.quote}"`;
  if (author) author.textContent = `— ${data.testimonials.featured.author}`;
}

// Populate testimonials grid
function populateTestimonialsGrid(data) {
  const section = document.querySelector('[data-component="testimonials-grid"]');
  if (!section || !data.testimonials.grid) return;

  const grid = section.querySelector('.testimonials-grid-3col');
  if (!grid) return;

  grid.innerHTML = '';

  data.testimonials.grid.forEach(testimonial => {
    const card = `
      <div class="testimonial-card">
        <img src="${testimonial.image}" alt="${testimonial.alt}" loading="lazy">
        <blockquote>
          <p>"${testimonial.quote}"</p>
          <cite>— ${testimonial.author}</cite>
        </blockquote>
      </div>
    `;
    grid.insertAdjacentHTML('beforeend', card);
  });
}

// Populate about section
function populateAbout(data) {
  const section = document.querySelector('[data-component="about"]');
  if (!section || !data.about) return;

  const img = section.querySelector('.about-image img');
  const title = section.querySelector('.section-title');
  const bioText = section.querySelector('.bio-text');

  if (img) {
    img.src = data.about.image;
    img.alt = data.about.alt;
  }
  if (title) title.textContent = data.about.title;

  if (bioText) {
    bioText.innerHTML = `
      <p>${data.about.text.intro}</p>
      <h2 style="display:inline;font-size:1.125rem;">${data.about.text.highlight}</h2><p style="display:inline"> </p>
      ${data.about.text.body.map(line => `<p>${line}</p>`).join('\n')}
    `;
  }
}

// Populate primary services
function populatePrimaryServices(data) {
  const section = document.querySelector('[data-component="services-primary"]');
  if (!section || !data.services.primary) return;

  const grid = section.querySelector('.services-grid-3col');
  if (!grid) return;

  grid.innerHTML = '';

  data.services.primary.forEach(service => {
    const card = `
      <div class="service-card">
        <img src="${service.image}" alt="${service.alt}" loading="lazy">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    `;
    grid.insertAdjacentHTML('beforeend', card);
  });

  // Update CTA button
  const ctaButton = section.querySelector('.cta-button');
  if (ctaButton && data.cta) {
    ctaButton.href = data.cta.url;
    ctaButton.textContent = data.cta.text;
  }
}

// Populate additional services
function populateAdditionalServices(data) {
  const section = document.querySelector('[data-component="services-additional"]');
  if (!section || !data.services.additional) return;

  const grid = section.querySelector('.services-grid-3col');
  if (!grid) return;

  grid.innerHTML = '';

  data.services.additional.forEach(service => {
    const types = service.types.map(type => `<li>${type}</li>`).join('');
    const card = `
      <div class="service-card-detailed">
        <img src="${service.image}" alt="${service.alt}" loading="lazy">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="service-types">
          ${types}
        </ul>
      </div>
    `;
    grid.insertAdjacentHTML('beforeend', card);
  });
}

// Populate team section
function populateTeam(data) {
  const section = document.querySelector('[data-component="team"]');
  if (!section || !data.team) return;

  const title = section.querySelector('.section-title');
  const intro = section.querySelector('.team-intro');
  const grid = section.querySelector('.team-images-grid');

  if (title) title.textContent = data.team.title;
  if (intro) intro.innerHTML = data.team.intro;

  if (grid) {
    grid.innerHTML = '';
    data.team.images.forEach(img => {
      const imageDiv = `
        <div class="team-image">
          <img src="${img.src}" alt="${img.alt}" loading="lazy">
        </div>
      `;
      grid.insertAdjacentHTML('beforeend', imageDiv);
    });
  }
}

// Populate process section
function populateProcess(data) {
  const section = document.querySelector('[data-component="process"]');
  if (!section || !data.process) return;

  const title = section.querySelector('.section-title');
  const stepsContainer = section.querySelector('.process-steps');

  if (title) title.textContent = data.process.title;

  if (stepsContainer) {
    stepsContainer.innerHTML = '';
    data.process.steps.forEach(step => {
      const stepDiv = `
        <div class="process-step">
          <div class="process-icon">
            <img src="${step.icon}" alt="${step.alt}" loading="lazy">
          </div>
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </div>
      `;
      stepsContainer.insertAdjacentHTML('beforeend', stepDiv);
    });
  }
}

// Populate FAQ section
function populateFAQ(data) {
  const section = document.querySelector('[data-component="faq"]');
  if (!section || !data.faq) return;

  const title = section.querySelector('.section-title');
  const subtitle = section.querySelector('.faq-subtitle');
  const columns = section.querySelectorAll('.faq-column');

  if (title) title.textContent = data.faq.title;
  if (subtitle) subtitle.textContent = data.faq.subtitle;

  if (columns.length >= 2 && data.faq.items) {
    const midpoint = Math.ceil(data.faq.items.length / 2);
    const firstHalf = data.faq.items.slice(0, midpoint);
    const secondHalf = data.faq.items.slice(midpoint);

    // Populate first column
    columns[0].innerHTML = '';
    firstHalf.forEach((item, index) => {
      const faqItem = createFAQItem(item, index);
      columns[0].insertAdjacentHTML('beforeend', faqItem);
    });

    // Populate second column
    columns[1].innerHTML = '';
    secondHalf.forEach((item, index) => {
      const faqItem = createFAQItem(item, midpoint + index);
      columns[1].insertAdjacentHTML('beforeend', faqItem);
    });
  }
}

// Helper function to create FAQ item HTML
function createFAQItem(item, index) {
  return `
    <div class="faq-item">
      <input type="checkbox" class="faq-toggle" id="faq-${index}">
      <label for="faq-${index}" class="faq-question">
        ${item.question}
        <span class="faq-icon">+</span>
      </label>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </div>
  `;
}

// Main function to populate all components
async function populateComponents() {
  const data = await loadContent();
  if (!data) {
    console.error('Failed to load content');
    return;
  }

  // Populate all sections
  populateHeroGallery(data);
  populateHeroTitle(data);
  populateFeaturedTestimonial(data);
  populateTestimonialsGrid(data);
  populateAbout(data);
  populatePrimaryServices(data);
  populateAdditionalServices(data);
  populateTeam(data);
  populateProcess(data);
  populateFAQ(data);

  console.log('All components populated successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateComponents);
} else {
  populateComponents();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadContent,
    populateComponents,
    populateHeroGallery,
    populateHeroTitle,
    populateFeaturedTestimonial,
    populateTestimonialsGrid,
    populateAbout,
    populatePrimaryServices,
    populateAdditionalServices,
    populateTeam,
    populateProcess,
    populateFAQ
  };
}
