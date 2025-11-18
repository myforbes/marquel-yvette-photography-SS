/**
 * Content Loader
 * Dynamically loads all images, links, and clickable assets from site-config.json
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadContent);
    } else {
        loadContent();
    }

    function loadContent() {
        fetch('new-site/config/site-config.json')
            .then(response => response.json())
            .then(config => {
                loadLogos(config);
                loadHeroGallery(config);
                loadButtons(config);
                loadServiceCards(config);
                loadTeamHeadshots(config);
                loadClientTestimonials(config);
                loadAboutSection(config);
                loadProcessIcons(config);
                loadAdditionalServices(config);
                loadLocationSection(config);
                loadFooterContact(config);
                loadFooterSocial(config);
                loadFooterLinks(config);

                console.log('✓ All content loaded from configuration');
            })
            .catch(error => {
                console.error('Error loading site content:', error);
            });
    }

    function loadLogos(config) {
        // Header logo
        const headerLogo = document.querySelector('.header-logo-img');
        if (headerLogo && config.assets.headerLogo) {
            headerLogo.src = config.assets.headerLogo;
        }

        // Footer logo
        const footerLogo = document.querySelector('.footer-logo');
        if (footerLogo && config.assets.footerLogo) {
            footerLogo.src = config.assets.footerLogo;
        }
    }

    function loadHeroGallery(config) {
        if (!config.heroGallery) return;

        const galleryItems = document.querySelectorAll('.gallery-grid-item img');
        const isMobile = window.innerWidth < 768;

        config.heroGallery.forEach((item, index) => {
            if (galleryItems[index]) {
                galleryItems[index].src = item.image;
                galleryItems[index].alt = item.alt;

                // On mobile, only load first 3 images eagerly, rest lazy
                // On desktop, load first 6 eagerly
                const eagerLoadCount = isMobile ? 3 : 6;
                galleryItems[index].loading = index < eagerLoadCount ? 'eager' : 'lazy';
            }
        });
    }

    function loadButtons(config) {
        if (!config.links) return;

        // Update all "SEE RATES & AVAILABILITY" buttons
        const ratesButtons = document.querySelectorAll('a[href*="rates"]');
        ratesButtons.forEach(btn => {
            btn.href = config.links.rates;
        });

        // Update all "REQUEST A PROPOSAL" buttons
        const proposalButtons = document.querySelectorAll('a[href*="proposal"]');
        proposalButtons.forEach(btn => {
            btn.href = config.links.proposal;
        });
    }

    function loadServiceCards(config) {
        if (!config.serviceCards) return;

        const serviceImages = document.querySelectorAll('.services-grid-3col .service-card img');
        config.serviceCards.forEach((service, index) => {
            if (serviceImages[index]) {
                serviceImages[index].src = service.image;
                serviceImages[index].alt = service.alt;
            }
        });
    }

    function loadTeamHeadshots(config) {
        if (!config.teamHeadshots) return;

        const teamImages = document.querySelectorAll('.team-images-grid .team-image img');
        config.teamHeadshots.forEach((item, index) => {
            if (teamImages[index]) {
                teamImages[index].src = item.image;
                teamImages[index].alt = item.alt;
            }
        });
    }

    function loadClientTestimonials(config) {
        if (!config.clientTestimonials) return;

        const testimonialImages = document.querySelectorAll('.testimonials-grid-3col .testimonial-card img');
        config.clientTestimonials.forEach((item, index) => {
            if (testimonialImages[index]) {
                testimonialImages[index].src = item.image;
                testimonialImages[index].alt = item.alt;
            }
        });

        // Featured testimonial
        if (config.featuredTestimonial) {
            const featuredImg = document.querySelector('.testimonial-featured img');
            if (featuredImg) {
                featuredImg.src = config.featuredTestimonial.image;
                featuredImg.alt = config.featuredTestimonial.alt;
            }
        }
    }

    function loadAboutSection(config) {
        if (!config.aboutSection) return;

        const aboutImage = document.querySelector('.about-section .about-image img');
        if (aboutImage) {
            aboutImage.src = config.aboutSection.image;
            aboutImage.alt = config.aboutSection.alt;
        }
    }

    function loadProcessIcons(config) {
        if (!config.processIcons) return;

        const processImages = document.querySelectorAll('.process-step img');
        config.processIcons.forEach((item, index) => {
            if (processImages[index]) {
                processImages[index].src = item.image;
                processImages[index].alt = item.alt;
            }
        });
    }

    function loadAdditionalServices(config) {
        if (!config.additionalServices) return;

        const additionalServiceImages = document.querySelectorAll('.additional-services-section .service-card-detailed img');
        config.additionalServices.forEach((service, index) => {
            if (additionalServiceImages[index]) {
                additionalServiceImages[index].src = service.image;
                additionalServiceImages[index].alt = service.alt;
            }
        });
    }

    function loadLocationSection(config) {
        if (!config.locationSection) return;

        const locationImage = document.querySelector('.location-section img');
        if (locationImage) {
            locationImage.src = config.locationSection.image;
            locationImage.alt = config.locationSection.alt;
        }
    }

    function loadFooterContact(config) {
        if (!config.business) return;

        // Phone number
        const phoneLink = document.querySelector('footer a[href^="tel:"]');
        if (phoneLink && config.business.phoneLink) {
            phoneLink.href = config.business.phoneLink;
            phoneLink.textContent = config.business.phone;
        }

        // Email
        const emailLink = document.querySelector('footer a[href^="mailto:"]');
        if (emailLink && config.business.emailLink) {
            emailLink.href = config.business.emailLink;
            emailLink.textContent = config.business.email;
        }
    }

    function loadFooterSocial(config) {
        if (!config.business.social) return;

        // Instagram
        const instagramLink = document.querySelector('footer a[href*="instagram"]');
        if (instagramLink) {
            instagramLink.href = config.business.social.instagram;
        }

        // Facebook
        const facebookLink = document.querySelector('footer a[href*="facebook"]');
        if (facebookLink) {
            facebookLink.href = config.business.social.facebook;
        }

        // LinkedIn
        const linkedinLink = document.querySelector('footer a[href*="linkedin"]');
        if (linkedinLink) {
            linkedinLink.href = config.business.social.linkedin;
        }
    }

    function loadFooterLinks(config) {
        if (!config.links) return;

        // Privacy Policy
        const privacyLink = document.querySelector('footer a[href*="privacy"]');
        if (privacyLink) {
            privacyLink.href = config.links.privacyPolicy;
        }

        // Terms of Service
        const tosLink = document.querySelector('footer a[href*="tos"]');
        if (tosLink) {
            tosLink.href = config.links.termsOfService;
        }

        // Disclaimer
        const disclaimerLink = document.querySelector('footer a[href*="disclaimer"]');
        if (disclaimerLink) {
            disclaimerLink.href = config.links.disclaimer;
        }

        // Accessibility
        const accessibilityLink = document.querySelector('footer a[href*="accessibility"]');
        if (accessibilityLink) {
            accessibilityLink.href = config.links.accessibility;
        }

        // Copyright
        const copyrightLink = document.querySelector('footer a[href*="copyright"]');
        if (copyrightLink) {
            copyrightLink.href = config.links.copyright;
        }
    }
})();
