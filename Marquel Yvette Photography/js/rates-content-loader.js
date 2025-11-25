/**
 * Rates Content Loader
 * Loads content from data/rates-content.json and populates the page
 */

async function loadRatesContent() {
    try {
        const response = await fetch('data/rates-content.json');
        const data = await response.json();

        // Update page meta
        if (data.page) {
            document.title = data.page.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', data.page.description);
            }
        }

        // Load Hero Section
        if (data.hero) {
            const heroTitle = document.querySelector('.rates-hero h1');
            const heroSubtitle = document.querySelector('.rates-hero p');
            if (heroTitle) heroTitle.textContent = data.hero.title;
            if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
        }

        // Load Packages
        if (data.packages) {
            const packageCards = document.querySelectorAll('.rates-package-card');

            data.packages.forEach((pkg, index) => {
                if (packageCards[index]) {
                    const card = packageCards[index];

                    // Update package title
                    const title = card.querySelector('.package-title');
                    if (title) title.textContent = pkg.name;

                    // Update description
                    const desc = card.querySelector('.package-description');
                    if (desc) desc.textContent = pkg.description;

                    // Update what's included
                    const included = card.querySelector('.package-included p');
                    if (included) included.textContent = pkg.whatsIncluded;

                    // Update price
                    const price = card.querySelector('.package-price');
                    if (price) price.textContent = pkg.price;

                    // Update button text
                    const button = card.querySelector('.package-button');
                    if (button) button.textContent = pkg.buttonText;

                    // Update featured label if it exists
                    if (pkg.featured) {
                        card.classList.add('rates-package-featured');
                        const badge = card.querySelector('.package-badge');
                        if (badge && pkg.featuredLabel) {
                            badge.textContent = pkg.featuredLabel;
                        }
                    }
                }
            });
        }

        // Load Journey Section
        if (data.journey) {
            const journeySection = document.querySelector('.rates-journey');
            if (journeySection) {
                const title = journeySection.querySelector('h2');
                if (title) title.textContent = data.journey.title;

                const steps = journeySection.querySelectorAll('.journey-step');
                if (steps.length === data.journey.steps.length) {
                    data.journey.steps.forEach((step, index) => {
                        const stepElement = steps[index];
                        const stepNumber = stepElement.querySelector('.step-number');
                        const stepTitle = stepElement.querySelector('h3');
                        const stepDesc = stepElement.querySelector('p');

                        if (stepNumber) stepNumber.textContent = step.number;
                        if (stepTitle) stepTitle.textContent = step.title;
                        if (stepDesc) stepDesc.textContent = step.description;
                    });
                }
            }
        }

        // Load Testimonials Section
        if (data.testimonials) {
            const testimonialsSection = document.querySelector('.testimonials-section');
            if (testimonialsSection) {
                const title = testimonialsSection.querySelector('.testimonials-title');
                if (title) title.textContent = data.testimonials.title;

                const testimonialCards = testimonialsSection.querySelectorAll('.testimonial-card-rate');
                if (testimonialCards.length === data.testimonials.reviews.length) {
                    data.testimonials.reviews.forEach((review, index) => {
                        const card = testimonialCards[index];
                        const name = card.querySelector('.author-name');
                        const text = card.querySelector('.testimonial-text');
                        const image = card.querySelector('.author-photo');

                        if (name) name.textContent = review.name;
                        if (text) text.textContent = review.text;
                        if (image && review.image) {
                            image.src = review.image;
                            image.alt = `${review.name} testimonial`;
                        }
                    });
                }
            }
        }

    } catch (error) {
        console.error('Error loading rates content:', error);
    }
}

// Load content when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRatesContent);
} else {
    loadRatesContent();
}
