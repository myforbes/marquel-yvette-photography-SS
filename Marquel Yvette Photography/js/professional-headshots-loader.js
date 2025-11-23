// Professional Headshots Landing Page Content Loader
// This script loads content from the JSON data file and populates the page dynamically

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('data/headshots.json');
        const data = await response.json();

        // Load all sections
        loadPageMeta(data.page);
        loadHero(data.hero);
        loadBenefits(data.benefits);
        loadPricing(data.pricing);
        loadHowItWorks(data.howItWorks);
        loadTestimonials(data.testimonials);
        loadBusyProfessionals(data.busyProfessionals);
        loadLeadMagnet(data.leadMagnet);
        loadFAQ(data.faq);
        loadFooter(data.footer);

    } catch (error) {
        console.error('Error loading page content:', error);
    }
});

// Load Page Meta Information
function loadPageMeta(page) {
    document.title = page.title;
    document.querySelector('meta[name="description"]').setAttribute('content', page.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', page.keywords);
}

// Load Hero Section
function loadHero(hero) {
    document.querySelector('[data-hero-logo]').src = hero.logo;
    document.querySelector('[data-hero-eyebrow]').textContent = hero.eyebrow;
    document.querySelector('[data-hero-title]').textContent = hero.title;
    document.querySelector('[data-hero-subtitle]').textContent = hero.subtitle;
    document.querySelector('[data-hero-location]').textContent = hero.locationText;
    document.querySelector('[data-hero-image]').src = hero.heroImage;
    document.querySelector('[data-hero-image]').alt = hero.heroImageAlt;
    document.querySelector('[data-hero-pill]').textContent = hero.pillText;

    // Load buttons
    const buttonsContainer = document.querySelector('[data-hero-buttons]');
    buttonsContainer.innerHTML = '';
    hero.buttons.forEach(button => {
        const btnClass = button.style === 'primary' ? 'cta-button' : 'cta-button secondary';
        buttonsContainer.innerHTML += `<a href="${button.url}" class="${btnClass}">${button.text}</a>`;
    });
}

// Load Benefits Section
function loadBenefits(benefits) {
    document.querySelector('[data-benefits-title]').textContent = benefits.sectionTitle;
    document.querySelector('[data-benefits-intro]').textContent = benefits.sectionIntro;

    // Load benefit cards
    const cardsContainer = document.querySelector('[data-benefits-cards]');
    cardsContainer.innerHTML = '';
    benefits.cards.forEach(card => {
        cardsContainer.innerHTML += `
            <div class="benefit-card">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
            </div>
        `;
    });

    // Load gallery images
    const galleryContainer = document.querySelector('[data-benefits-gallery]');
    galleryContainer.innerHTML = '';
    benefits.gallery.forEach(image => {
        galleryContainer.innerHTML += `<img src="${image.src}" alt="${image.alt}">`;
    });
}

// Load Pricing Section
function loadPricing(pricing) {
    document.querySelector('[data-pricing-title]').textContent = pricing.sectionTitle;
    document.querySelector('[data-pricing-intro]').textContent = pricing.sectionIntro;

    // Load pricing packages
    const packagesContainer = document.querySelector('[data-pricing-packages]');
    packagesContainer.innerHTML = '';
    pricing.packages.forEach(pkg => {
        let packageHTML = `
            <div class="pricing-card">
                <h3>${pkg.title}</h3>
                <div class="price">${pkg.price}</div>
                <p>${pkg.description}</p>
        `;

        if (pkg.ctaButton) {
            packageHTML += `<a href="${pkg.ctaButton.url}" class="cta-button secondary" style="margin-top: 15px; display: inline-block;">${pkg.ctaButton.text}</a>`;
        }

        packageHTML += `</div>`;
        packagesContainer.innerHTML += packageHTML;
    });

    // Load pricing CTA button
    document.querySelector('[data-pricing-cta]').href = pricing.ctaButton.url;
    document.querySelector('[data-pricing-cta]').textContent = pricing.ctaButton.text;
}

// Load How It Works Section
function loadHowItWorks(howItWorks) {
    document.querySelector('[data-how-title]').textContent = howItWorks.sectionTitle;
    document.querySelector('[data-how-intro]').textContent = howItWorks.sectionIntro;

    const stepsContainer = document.querySelector('[data-how-steps]');
    stepsContainer.innerHTML = '';
    howItWorks.steps.forEach(step => {
        stepsContainer.innerHTML += `
            <div class="step-card">
                <div class="step-number">${step.number}</div>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        `;
    });
}

// Load Testimonials Section
function loadTestimonials(testimonials) {
    document.querySelector('[data-testimonials-title]').textContent = testimonials.sectionTitle;
    document.querySelector('[data-testimonials-intro]').textContent = testimonials.sectionIntro;

    const testimonialsContainer = document.querySelector('[data-testimonials-grid]');
    testimonialsContainer.innerHTML = '';
    testimonials.items.forEach(item => {
        testimonialsContainer.innerHTML += `
            <div class="testimonial">
                <p>${item.quote}</p>
                <span>${item.author}</span>
            </div>
        `;
    });
}

// Load Busy Professionals Section
function loadBusyProfessionals(busyProfessionals) {
    document.querySelector('[data-busy-title]').textContent = busyProfessionals.sectionTitle;
    document.querySelector('[data-busy-intro]').textContent = busyProfessionals.sectionIntro;

    const cardsContainer = document.querySelector('[data-busy-cards]');
    cardsContainer.innerHTML = '';
    busyProfessionals.cards.forEach(card => {
        cardsContainer.innerHTML += `
            <div class="benefit-card">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
            </div>
        `;
    });

    document.querySelector('[data-busy-cta]').href = busyProfessionals.ctaButton.url;
    document.querySelector('[data-busy-cta]').textContent = busyProfessionals.ctaButton.text;
}

// Load Lead Magnet Section
function loadLeadMagnet(leadMagnet) {
    document.querySelector('[data-lead-title]').textContent = leadMagnet.sectionTitle;
    document.querySelector('[data-lead-description]').textContent = leadMagnet.description;

    const benefitsContainer = document.querySelector('[data-lead-benefits]');
    benefitsContainer.innerHTML = '';
    leadMagnet.benefits.forEach(benefit => {
        benefitsContainer.innerHTML += `<li>${benefit}</li>`;
    });

    // Set form action and fields
    const form = document.querySelector('[data-lead-form]');
    form.action = leadMagnet.form.action;

    document.querySelector('[data-lead-submit]').textContent = leadMagnet.form.submitButton;
    document.querySelector('[data-lead-disclaimer]').textContent = leadMagnet.form.disclaimer;
}

// Load FAQ Section
function loadFAQ(faq) {
    document.querySelector('[data-faq-title]').textContent = faq.sectionTitle;

    const faqContainer = document.querySelector('[data-faq-items]');
    faqContainer.innerHTML = '';
    faq.items.forEach(item => {
        faqContainer.innerHTML += `
            <div class="faq-item">
                <div class="faq-question">${item.question}</div>
                <div class="faq-answer">${item.answer}</div>
            </div>
        `;
    });
}

// Load Footer
function loadFooter(footer) {
    document.querySelector('[data-footer-copyright]').textContent = footer.copyright;
    document.querySelector('[data-footer-location]').textContent = footer.location;
}
