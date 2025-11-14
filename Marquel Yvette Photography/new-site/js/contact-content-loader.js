/**
 * Contact Page Content Loader
 * Loads content from data/contact.json and populates the page
 */

async function loadContactContent() {
    try {
        const response = await fetch('data/contact.json');
        if (!response.ok) {
            console.warn('Contact data not found, using default content');
            return;
        }

        const data = await response.json();

        // Update page meta
        if (data.page) {
            document.title = data.page.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', data.page.description);
            }
        }

        // Update hero section
        if (data.hero) {
            const heroTitle = document.querySelector('.contact-page-title');
            if (heroTitle && data.hero.title) {
                heroTitle.textContent = data.hero.title;
            }

            const introParagraphs = document.querySelectorAll('.contact-intro-content p');
            if (introParagraphs && data.hero.intro) {
                data.hero.intro.forEach((text, index) => {
                    if (introParagraphs[index]) {
                        introParagraphs[index].textContent = text;
                    }
                });
            }
        }

        // Update form
        if (data.form) {
            const form = document.getElementById('contact-form');
            if (form) {
                if (data.form.action) {
                    form.action = data.form.action;
                }

                const redirectInput = form.querySelector('input[name="_next"]');
                if (redirectInput && data.form.redirectUrl) {
                    redirectInput.value = data.form.redirectUrl;
                }

                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton && data.form.submitButtonText) {
                    submitButton.textContent = data.form.submitButtonText;
                }

                const privacyNote = form.querySelector('.form-note');
                if (privacyNote && data.form.privacyNote) {
                    privacyNote.textContent = data.form.privacyNote;
                }
            }

            // Update success message
            if (data.form.successMessage) {
                const successDiv = document.getElementById('form-success');
                if (successDiv) {
                    const successTitle = successDiv.querySelector('h3');
                    const successText = successDiv.querySelector('p');
                    if (successTitle) successTitle.textContent = data.form.successMessage.title;
                    if (successText) successText.textContent = data.form.successMessage.text;
                }
            }

            // Update error message
            if (data.form.errorMessage) {
                const errorDiv = document.getElementById('form-error');
                if (errorDiv) {
                    const errorTitle = errorDiv.querySelector('h3');
                    const errorText = errorDiv.querySelector('p');
                    if (errorTitle) errorTitle.textContent = data.form.errorMessage.title;
                    if (errorText) {
                        // Preserve the link in the error message
                        const phoneLink = errorText.querySelector('a');
                        const phoneLinkHTML = phoneLink ? phoneLink.outerHTML : '';
                        errorText.innerHTML = data.form.errorMessage.text.replace('(703) 957-0643', phoneLinkHTML || '(703) 957-0643');
                    }
                }
            }
        }

        // Update contact methods
        if (data.contactMethods) {
            const sectionTitle = document.querySelector('.alternative-contact-section .section-title');
            if (sectionTitle && data.contactMethods.sectionTitle) {
                sectionTitle.textContent = data.contactMethods.sectionTitle;
            }

            const contactMethods = document.querySelectorAll('.contact-method');
            if (contactMethods && data.contactMethods.methods) {
                data.contactMethods.methods.forEach((method, index) => {
                    if (contactMethods[index]) {
                        const methodElement = contactMethods[index];

                        const icon = methodElement.querySelector('i');
                        if (icon && method.icon) {
                            icon.className = method.icon;
                        }

                        const title = methodElement.querySelector('h4');
                        if (title && method.title) {
                            title.textContent = method.title;
                        }

                        const linkParagraph = methodElement.querySelector('p:first-of-type');
                        if (linkParagraph) {
                            if (method.link) {
                                linkParagraph.innerHTML = `<a href="${method.link}">${method.linkText}</a>`;
                            } else {
                                linkParagraph.textContent = method.linkText;
                            }
                        }

                        const hours = methodElement.querySelector('.contact-hours');
                        if (hours && method.hours) {
                            hours.innerHTML = method.hours;
                        }
                    }
                });
            }
        }

        // Update portfolio section
        if (data.portfolio) {
            const portfolioTitle = document.querySelector('.portfolio-teaser-section .section-title');
            if (portfolioTitle && data.portfolio.sectionTitle) {
                portfolioTitle.textContent = data.portfolio.sectionTitle;
            }

            const portfolioImages = document.querySelectorAll('.portfolio-teaser-grid img');
            if (portfolioImages && data.portfolio.images) {
                data.portfolio.images.forEach((img, index) => {
                    if (portfolioImages[index]) {
                        portfolioImages[index].src = img.src;
                        portfolioImages[index].alt = img.alt;
                    }
                });
            }

            if (data.portfolio.ctaButton) {
                const ctaButton = document.querySelector('.portfolio-teaser-section .cta-button');
                if (ctaButton) {
                    ctaButton.textContent = data.portfolio.ctaButton.text;
                    ctaButton.href = data.portfolio.ctaButton.url;
                }
            }
        }

        console.log('✓ Contact content loaded successfully');

    } catch (error) {
        console.error('Error loading contact content:', error);
    }
}

// Load content when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContactContent);
} else {
    loadContactContent();
}
