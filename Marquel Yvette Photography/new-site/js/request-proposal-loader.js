/**
 * Request Proposal Content Loader
 * Loads content from data/request-proposal.json and populates the page
 */

async function loadProposalContent() {
    try {
        const response = await fetch('data/request-proposal.json');
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
            const heroSection = document.querySelector('.proposal-hero');
            if (heroSection) {
                const title = heroSection.querySelector('h1');
                const description = heroSection.querySelector('p');

                if (title) title.textContent = data.hero.title;
                if (description) description.textContent = data.hero.description;
            }
        }

        // Load Benefits Section
        if (data.benefits) {
            const benefitsSection = document.querySelector('.proposal-benefits');
            if (benefitsSection) {
                const sectionTitle = benefitsSection.querySelector('h2');
                if (sectionTitle) sectionTitle.textContent = data.benefits.sectionTitle;

                const benefitItems = benefitsSection.querySelectorAll('.benefit-item');
                if (benefitItems.length === data.benefits.items.length) {
                    data.benefits.items.forEach((item, index) => {
                        const benefitElement = benefitItems[index];
                        const icon = benefitElement.querySelector('.benefit-icon i');
                        const title = benefitElement.querySelector('.benefit-content h3');
                        const description = benefitElement.querySelector('.benefit-content p');

                        if (icon) icon.className = item.icon;
                        if (title) title.textContent = item.title;
                        if (description) description.textContent = item.description;
                    });
                }
            }
        }

        // Load Form Section
        if (data.form) {
            const formSection = document.querySelector('.proposal-form-wrapper');
            if (formSection) {
                const title = formSection.querySelector('h2');
                const subtitle = formSection.querySelector('.form-subtitle');

                if (title) title.textContent = data.form.title;
                if (subtitle) subtitle.textContent = data.form.subtitle;

                // Update iframe if needed
                const iframe = formSection.querySelector('iframe');
                if (iframe && data.form.iframeUrl) {
                    iframe.src = data.form.iframeUrl;
                    iframe.setAttribute('data-form-name', data.form.formName);
                    iframe.setAttribute('data-form-id', data.form.formId);
                    iframe.title = data.form.formName;
                }
            }
        }

        // Load Process Section
        if (data.process) {
            const processSection = document.querySelector('.proposal-process');
            if (processSection) {
                const sectionTitle = processSection.querySelector('h2');
                if (sectionTitle) sectionTitle.textContent = data.process.sectionTitle;

                const processItems = processSection.querySelectorAll('.process-item');
                if (processItems.length === data.process.steps.length) {
                    data.process.steps.forEach((step, index) => {
                        const item = processItems[index];
                        const number = item.querySelector('.process-number');
                        const title = item.querySelector('h3');
                        const description = item.querySelector('p');

                        if (number) number.textContent = step.number;
                        if (title) title.textContent = step.title;
                        if (description) description.textContent = step.description;
                    });
                }
            }
        }

        // Load Trust Stats Section
        if (data.trust) {
            const trustSection = document.querySelector('.trust-section');
            if (trustSection) {
                const sectionTitle = trustSection.querySelector('h2');
                if (sectionTitle) sectionTitle.textContent = data.trust.sectionTitle;

                const trustStats = trustSection.querySelectorAll('.trust-stat');
                if (trustStats.length === data.trust.stats.length) {
                    data.trust.stats.forEach((stat, index) => {
                        const item = trustStats[index];
                        const number = item.querySelector('.stat-number');
                        const label = item.querySelector('.stat-label');

                        if (number) number.textContent = stat.number;
                        if (label) label.textContent = stat.label;
                    });
                }
            }
        }

        // Load Contact Section
        if (data.contact) {
            const contactSection = document.querySelector('.alt-contact-section');
            if (contactSection) {
                const sectionTitle = contactSection.querySelector('h2');
                if (sectionTitle) sectionTitle.textContent = data.contact.sectionTitle;

                const contactOptions = contactSection.querySelectorAll('.contact-option');
                if (contactOptions.length === data.contact.options.length) {
                    data.contact.options.forEach((option, index) => {
                        const element = contactOptions[index];
                        const icon = element.querySelector('i');
                        const title = element.querySelector('h3');
                        const link = element.querySelector('a');
                        const hours = element.querySelector('.contact-hours');

                        if (icon) icon.className = option.icon;
                        if (title) title.textContent = option.title;

                        if (link) {
                            if (option.link) {
                                link.href = option.link;
                            }
                            link.textContent = option.linkText;
                        } else {
                            // If no link exists, just set the text in a p tag
                            const linkP = element.querySelector('p:not(.contact-hours)');
                            if (linkP) linkP.textContent = option.linkText;
                        }

                        if (hours) hours.innerHTML = option.hours;
                    });
                }
            }
        }

        console.log('✓ Request proposal content loaded successfully');

    } catch (error) {
        console.error('Error loading request proposal content:', error);
    }
}

// Load content when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProposalContent);
} else {
    loadProposalContent();
}
