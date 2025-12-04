/**
 * Home Page Content Loader
 * Loads all text content from data/content.json for the home page
 */

(function() {
  'use strict';

  // Load content configuration
  fetch('data/content.json')
    .then(response => response.json())
    .then(content => {
      console.log('Loading home page content from data/content.json...');

      // Load Hero Section
      if (content.hero) {
        const tagline = document.querySelector('.hero-tagline');
        if (tagline) tagline.textContent = content.hero.tagline;

        const title = document.querySelector('.hero-h1');
        if (title) title.textContent = content.hero.title;
      }

      // Load Featured Testimonial
      if (content.testimonials && content.testimonials.featured) {
        const featuredQuote = document.querySelector('.testimonial-featured blockquote p');
        if (featuredQuote) featuredQuote.textContent = content.testimonials.featured.quote;

        const featuredAuthor = document.querySelector('.testimonial-featured cite');
        if (featuredAuthor) featuredAuthor.textContent = content.testimonials.featured.author;
      }

      // Load Service Cards (Primary 3)
      if (content.services && content.services.primary) {
        const serviceCards = document.querySelectorAll('.services-grid-3col .service-card');
        content.services.primary.forEach((service, index) => {
          if (serviceCards[index]) {
            const title = serviceCards[index].querySelector('h3');
            const description = serviceCards[index].querySelector('p');
            if (title) title.textContent = service.title;
            if (description) description.textContent = service.description;
          }
        });
      }

      // Load Testimonial Grid Quotes
      if (content.testimonials && content.testimonials.grid) {
        const testimonialCards = document.querySelectorAll('.testimonials-grid-3col .testimonial-card');
        content.testimonials.grid.forEach((testimonial, index) => {
          if (testimonialCards[index]) {
            const quote = testimonialCards[index].querySelector('blockquote p');
            const author = testimonialCards[index].querySelector('cite');
            if (quote) quote.textContent = testimonial.quote;
            if (author) author.textContent = testimonial.author;
          }
        });
      }

      // Load Team Headshots Section
      if (content.team) {
        const teamTitle = document.querySelector('.team-headshots-section h2');
        if (teamTitle) teamTitle.textContent = content.team.title;

        const teamIntro = document.querySelector('.team-headshots-section .team-intro');
        if (teamIntro) teamIntro.innerHTML = content.team.intro;
      }

      // Load About Section
      if (content.about) {
        const aboutTitle = document.querySelector('.about-section h2');
        if (aboutTitle) aboutTitle.textContent = content.about.title;

        const aboutIntro = document.querySelector('.about-text-intro');
        if (aboutIntro) aboutIntro.textContent = content.about.text.intro;

        const aboutHighlight = document.querySelector('.about-text-highlight');
        if (aboutHighlight) aboutHighlight.textContent = content.about.text.highlight;

        const aboutBody = document.querySelector('.about-text-body');
        if (aboutBody && content.about.text.body) {
          aboutBody.textContent = content.about.text.body.join(' ');
        }
      }

      // Load Process Steps
      if (content.process && content.process.steps) {
        const processSteps = document.querySelectorAll('.process-step');
        content.process.steps.forEach((step, index) => {
          if (processSteps[index]) {
            const title = processSteps[index].querySelector('h3');
            const description = processSteps[index].querySelector('p');
            if (title) title.textContent = step.title;
            if (description) description.textContent = step.description;
          }
        });
      }

      // Load Additional Services
      if (content.services && content.services.additional) {
        const additionalServiceCards = document.querySelectorAll('.additional-services-section .service-card-detailed');
        content.services.additional.forEach((service, index) => {
          if (additionalServiceCards[index]) {
            const title = additionalServiceCards[index].querySelector('h3');
            const description = additionalServiceCards[index].querySelector('p');
            if (title) title.textContent = service.title;
            if (description) description.textContent = service.description;

            // Load service types list
            const typesList = additionalServiceCards[index].querySelector('.service-types');
            if (typesList && service.types) {
              typesList.innerHTML = '';
              service.types.forEach(type => {
                const li = document.createElement('li');
                li.textContent = type;
                typesList.appendChild(li);
              });
            }
          }
        });
      }

      // Load FAQ Section
      if (content.faq && content.faq.items) {
        const faqTitle = document.querySelector('.faq-section h2');
        if (faqTitle) faqTitle.textContent = content.faq.title;

        const faqSubtitle = document.querySelector('.faq-section .faq-subtitle');
        if (faqSubtitle) faqSubtitle.textContent = content.faq.subtitle;

        const faqItems = document.querySelectorAll('.faq-item');
        content.faq.items.forEach((item, index) => {
          if (faqItems[index]) {
            const question = faqItems[index].querySelector('.faq-question');
            const answer = faqItems[index].querySelector('.faq-answer');
            // Only update the text span, preserve the faq-icon span
            if (question) {
              const textSpan = question.querySelector('span:not(.faq-icon)');
              if (textSpan) textSpan.textContent = item.question;
            }
            if (answer) answer.innerHTML = '<p>' + item.answer + '</p>';
          }
        });
      }

      // Load Gift Cards Section
      if (content.giftCards) {
        const giftTitle = document.querySelector('.gift-cards-section h2');
        if (giftTitle) giftTitle.textContent = content.giftCards.title;

        const giftIntro = document.querySelector('.gift-intro');
        if (giftIntro) giftIntro.textContent = content.giftCards.intro;

        const giftDescription = document.querySelector('.gift-description');
        if (giftDescription) giftDescription.textContent = content.giftCards.description;

        const giftBenefits = document.querySelector('.gift-benefits');
        if (giftBenefits) giftBenefits.textContent = content.giftCards.benefits;
      }

      // Load Location Section
      if (content.location) {
        const locationTitle = document.querySelector('.location-section h2');
        if (locationTitle) locationTitle.textContent = content.location.title;

        const locationText = document.querySelector('.location-text');
        if (locationText && content.location.text) {
          locationText.innerHTML = content.location.text.map(p => `<p>${p}</p>`).join('');
        }
      }

      console.log('✓ All home page content loaded from data/content.json');
    })
    .catch(error => {
      console.error('Error loading home page content:', error);
    });

})();
