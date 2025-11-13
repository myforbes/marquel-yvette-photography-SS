/**
 * Workplace Headshots Content Loader
 * Loads content from data/workplace-headshots.json and populates the page
 */

async function loadWorkplaceContent() {
    try {
        const response = await fetch('data/workplace-headshots.json');
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
            const hero = document.querySelector('.team-hero-content');
            if (hero) {
                hero.querySelector('h1').textContent = data.hero.title;
                hero.querySelector('.team-hero-subtitle').textContent = data.hero.subtitle;
                hero.querySelector('.team-hero-description').textContent = data.hero.description;

                // Update CTA buttons
                const buttons = hero.querySelectorAll('.hero-cta-group a');
                if (data.hero.ctaButtons && buttons.length >= data.hero.ctaButtons.length) {
                    data.hero.ctaButtons.forEach((btn, index) => {
                        buttons[index].textContent = btn.text;
                        buttons[index].href = btn.url;
                    });
                }
            }

            // Update hero image
            const heroImage = document.querySelector('.team-hero-image img');
            if (heroImage && data.hero.image) {
                heroImage.src = data.hero.image;
                heroImage.alt = data.hero.imageAlt || '';
            }
        }

        // Load Benefits Section
        if (data.benefits) {
            const benefitsSection = document.querySelector('.benefits-section');
            if (benefitsSection) {
                benefitsSection.querySelector('.section-title').textContent = data.benefits.sectionTitle;

                const benefitsGrid = benefitsSection.querySelector('.benefits-grid');
                const cards = benefitsGrid.querySelectorAll('.benefit-card');

                if (cards.length === data.benefits.items.length) {
                    data.benefits.items.forEach((item, index) => {
                        const card = cards[index];
                        card.querySelector('.benefit-icon i').className = item.icon;
                        card.querySelector('h3').textContent = item.title;
                        card.querySelector('p').textContent = item.description;
                    });
                }
            }
        }

        // Load How It Works Section
        if (data.howItWorks) {
            const howItWorksSection = document.querySelector('.how-it-works-section');
            if (howItWorksSection) {
                howItWorksSection.querySelector('.section-title').textContent = data.howItWorks.sectionTitle;

                const steps = howItWorksSection.querySelectorAll('.step');
                if (steps.length === data.howItWorks.steps.length) {
                    data.howItWorks.steps.forEach((step, index) => {
                        const stepElement = steps[index];
                        stepElement.querySelector('.step-number').textContent = step.number;
                        stepElement.querySelector('.step-content h3').textContent = step.title;
                        stepElement.querySelector('.step-content p').textContent = step.description;
                    });
                }
            }
        }

        // Load Portfolio Section
        if (data.portfolio) {
            const portfolioSection = document.querySelector('.portfolio-grid-section');
            if (portfolioSection) {
                portfolioSection.querySelector('.section-title').textContent = data.portfolio.sectionTitle;
                portfolioSection.querySelector('p').textContent = data.portfolio.description;

                const gridItems = portfolioSection.querySelectorAll('.team-grid-item');
                if (gridItems.length === data.portfolio.grids.length) {
                    data.portfolio.grids.forEach((grid, index) => {
                        const item = gridItems[index];
                        item.querySelector('.team-grid-label h4').textContent = grid.title;
                        item.querySelector('.team-grid-label p').textContent = grid.label;
                    });
                }
            }
        }

        // Load Stats Section
        if (data.stats) {
            const statsSection = document.querySelector('.why-choose-section');
            if (statsSection) {
                statsSection.querySelector('.section-title').textContent = data.stats.sectionTitle;

                const highlights = statsSection.querySelectorAll('.highlight-item');
                if (highlights.length === data.stats.highlights.length) {
                    data.stats.highlights.forEach((stat, index) => {
                        const item = highlights[index];
                        item.querySelector('.highlight-stat').textContent = stat.stat;
                        item.querySelector('.highlight-label').textContent = stat.label;
                    });
                }
            }
        }

        // Load Employee Gift Section
        if (data.employeeGift) {
            const giftSection = document.querySelector('.employee-gift-section');
            if (giftSection) {
                giftSection.querySelector('.section-title').textContent = data.employeeGift.sectionTitle;
                giftSection.querySelector('.gift-content > p').textContent = data.employeeGift.description;

                const features = giftSection.querySelectorAll('.gift-feature');
                if (features.length === data.employeeGift.features.length) {
                    data.employeeGift.features.forEach((feature, index) => {
                        const item = features[index];
                        item.querySelector('i').className = feature.icon;
                        item.querySelector('h4').textContent = feature.title;
                        item.querySelector('p').textContent = feature.description;
                    });
                }
            }
        }

        // Load Final CTA Section
        if (data.finalCta) {
            const ctaSection = document.querySelector('.final-cta-section');
            if (ctaSection) {
                ctaSection.querySelector('h2').textContent = data.finalCta.title;
                ctaSection.querySelector('.final-cta-content > p').textContent = data.finalCta.description;

                const buttons = ctaSection.querySelectorAll('.final-cta-content > div a');
                if (buttons.length === data.finalCta.buttons.length) {
                    data.finalCta.buttons.forEach((btn, index) => {
                        buttons[index].textContent = btn.text;
                        buttons[index].href = btn.url;
                    });
                }

                const footerText = ctaSection.querySelector('.final-cta-content > p:last-child');
                if (footerText) {
                    footerText.textContent = data.finalCta.footerText;
                }
            }
        }

    } catch (error) {
        console.error('Error loading workplace content:', error);
    }
}

// Load content when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWorkplaceContent);
} else {
    loadWorkplaceContent();
}
