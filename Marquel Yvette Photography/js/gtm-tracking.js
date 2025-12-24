/**
 * GTM Event Tracking - Comprehensive User Interaction Tracking
 * Pushes events to dataLayer for Google Tag Manager
 *
 * Events tracked:
 * - CTA button clicks
 * - Phone/email clicks
 * - Form interactions (start, submit, abandon)
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - FAQ accordion interactions
 * - Menu toggle
 * - Social media clicks
 * - Outbound link clicks
 * - Popup interactions
 * - Gallery/lightbox interactions
 */

(function() {
    'use strict';

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // Helper function to push events
    function pushEvent(eventName, eventData) {
        window.dataLayer.push({
            event: eventName,
            ...eventData
        });
    }

    // Helper to get page name from URL
    function getPageName() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return 'homepage';
        return path.replace(/^\/|\.html$/g, '').replace(/-/g, '_');
    }

    // =========================================
    // 1. CTA BUTTON TRACKING
    // =========================================
    function trackCTAClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a.cta-button, .cta-button');
            if (!link) return;

            const buttonText = link.textContent.trim().toUpperCase();
            const destination = link.getAttribute('href');

            // Determine CTA type based on text/destination
            let ctaType = 'other';
            if (buttonText.includes('RATE') || buttonText.includes('AVAILABILITY') || buttonText.includes('BOOK')) {
                ctaType = 'book_session';
            } else if (buttonText.includes('PROPOSAL')) {
                ctaType = 'request_proposal';
            } else if (buttonText.includes('GIFT')) {
                ctaType = 'purchase_gift_card';
            } else if (buttonText.includes('LEARN MORE')) {
                ctaType = 'learn_more';
            }

            pushEvent('cta_click', {
                cta_type: ctaType,
                cta_text: buttonText,
                cta_destination: destination,
                page_location: getPageName(),
                click_position: getCTAPosition(link)
            });
        });
    }

    // Get CTA position on page (header, hero, footer, etc.)
    function getCTAPosition(element) {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (header && header.contains(element)) return 'header';
        if (footer && footer.contains(element)) return 'footer';

        // Check section
        const section = element.closest('section');
        if (section) {
            const classes = section.className;
            if (classes.includes('hero')) return 'hero';
            if (classes.includes('services')) return 'services';
            if (classes.includes('team') || classes.includes('workplace')) return 'workplace';
            if (classes.includes('gift')) return 'gift_card';
            if (classes.includes('cta-section')) return 'cta_section';
        }

        return 'body';
    }

    // =========================================
    // 2. PHONE & EMAIL CLICK TRACKING
    // =========================================
    function trackContactClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href') || '';

            // Phone click
            if (href.startsWith('tel:')) {
                const phoneNumber = href.replace('tel:', '').replace(/\D/g, '');
                pushEvent('phone_click', {
                    phone_number: phoneNumber,
                    formatted_number: link.textContent.trim(),
                    page_location: getPageName(),
                    click_location: link.closest('footer') ? 'footer' : 'body'
                });
            }

            // Email click
            if (href.startsWith('mailto:')) {
                const email = href.replace('mailto:', '').split('?')[0];
                pushEvent('email_click', {
                    email_address: email,
                    page_location: getPageName(),
                    click_location: link.closest('footer') ? 'footer' : 'body'
                });
            }
        });
    }

    // =========================================
    // 3. SCROLL DEPTH TRACKING
    // =========================================
    function trackScrollDepth() {
        const thresholds = [25, 50, 75, 100];
        const triggered = new Set();

        function calculateScrollDepth() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) return 100;
            return Math.round((window.scrollY / scrollHeight) * 100);
        }

        function checkThresholds() {
            const depth = calculateScrollDepth();

            thresholds.forEach(threshold => {
                if (depth >= threshold && !triggered.has(threshold)) {
                    triggered.add(threshold);
                    pushEvent('scroll_depth', {
                        scroll_threshold: threshold,
                        page_location: getPageName()
                    });
                }
            });
        }

        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                checkThresholds();
            }, 100);
        }, { passive: true });
    }

    // =========================================
    // 4. FORM TRACKING
    // =========================================
    function trackFormInteractions() {
        // Track form field focus (form start)
        const formsTracked = new Set();

        document.addEventListener('focusin', function(e) {
            const field = e.target;
            if (!field.matches('input, textarea, select')) return;

            const form = field.closest('form');
            if (!form) return;

            const formId = form.id || form.getAttribute('name') || 'unknown_form';

            if (!formsTracked.has(formId)) {
                formsTracked.add(formId);

                let formType = 'unknown';
                if (formId.includes('checklist') || formId.includes('popup')) {
                    formType = 'checklist_popup';
                } else if (formId.includes('proposal') || formId.includes('contact')) {
                    formType = 'proposal_request';
                }

                pushEvent('form_start', {
                    form_id: formId,
                    form_type: formType,
                    first_field: field.name || field.id || 'unknown',
                    page_location: getPageName()
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', function(e) {
            const form = e.target;
            if (!form.matches('form')) return;

            const formId = form.id || form.getAttribute('name') || 'unknown_form';

            let formType = 'unknown';
            if (formId.includes('checklist') || formId.includes('popup')) {
                formType = 'checklist_popup';
            } else if (formId.includes('proposal') || formId.includes('contact')) {
                formType = 'proposal_request';
            }

            pushEvent('form_submit', {
                form_id: formId,
                form_type: formType,
                page_location: getPageName()
            });
        });
    }

    // =========================================
    // 5. FAQ ACCORDION TRACKING
    // =========================================
    function trackFAQInteractions() {
        document.addEventListener('change', function(e) {
            if (!e.target.matches('.faq-toggle')) return;

            const faqItem = e.target.closest('.faq-item');
            if (!faqItem) return;

            const questionLabel = faqItem.querySelector('.faq-question span:first-child');
            const question = questionLabel ? questionLabel.textContent.trim() : 'Unknown question';
            const isOpened = e.target.checked;

            pushEvent('faq_interaction', {
                faq_question: question,
                faq_action: isOpened ? 'expand' : 'collapse',
                page_location: getPageName()
            });
        });
    }

    // =========================================
    // 6. MOBILE MENU TRACKING
    // =========================================
    function trackMenuInteractions() {
        const menuBtn = document.querySelector('.header-burger-btn');
        if (!menuBtn) return;

        menuBtn.addEventListener('click', function() {
            const isOpening = !document.querySelector('.header-menu')?.classList.contains('menu-open');

            pushEvent('menu_toggle', {
                menu_action: isOpening ? 'open' : 'close',
                page_location: getPageName()
            });
        });
    }

    // =========================================
    // 7. SOCIAL MEDIA CLICK TRACKING
    // =========================================
    function trackSocialClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href') || '';

            let platform = null;
            if (href.includes('instagram.com')) platform = 'instagram';
            else if (href.includes('facebook.com')) platform = 'facebook';
            else if (href.includes('linkedin.com')) platform = 'linkedin';
            else if (href.includes('twitter.com') || href.includes('x.com')) platform = 'twitter';
            else if (href.includes('youtube.com')) platform = 'youtube';

            if (platform) {
                pushEvent('social_click', {
                    social_platform: platform,
                    social_url: href,
                    page_location: getPageName(),
                    click_location: link.closest('footer') ? 'footer' : 'body'
                });
            }
        });
    }

    // =========================================
    // 8. OUTBOUND LINK TRACKING
    // =========================================
    function trackOutboundLinks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href') || '';

            // Skip internal links, tel, mailto, and already tracked social
            if (!href.startsWith('http') ||
                href.includes('marquelyvette.com') ||
                href.includes('instagram.com') ||
                href.includes('facebook.com') ||
                href.includes('linkedin.com')) {
                return;
            }

            try {
                const url = new URL(href);
                pushEvent('outbound_click', {
                    outbound_url: href,
                    outbound_domain: url.hostname,
                    link_text: link.textContent.trim().substring(0, 100),
                    page_location: getPageName()
                });
            } catch (e) {
                // Invalid URL, skip
            }
        });
    }

    // =========================================
    // 9. POPUP TRACKING
    // =========================================
    function trackPopupInteractions() {
        // Use MutationObserver to detect popup opening
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const popup = mutation.target;
                    if (popup.id === 'checklist-popup-overlay') {
                        const isActive = popup.classList.contains('active');

                        pushEvent('popup_interaction', {
                            popup_name: 'checklist_popup',
                            popup_action: isActive ? 'view' : 'close',
                            page_location: getPageName()
                        });
                    }
                }
            });
        });

        // Start observing when popup is created
        const checkForPopup = setInterval(function() {
            const popup = document.getElementById('checklist-popup-overlay');
            if (popup) {
                observer.observe(popup, { attributes: true });
                clearInterval(checkForPopup);
            }
        }, 500);

        // Stop checking after 30 seconds
        setTimeout(function() {
            clearInterval(checkForPopup);
        }, 30000);

        // Track popup dismiss click
        document.addEventListener('click', function(e) {
            if (e.target.matches('.checklist-popup-dismiss')) {
                pushEvent('popup_interaction', {
                    popup_name: 'checklist_popup',
                    popup_action: 'dismiss',
                    page_location: getPageName()
                });
            }

            if (e.target.matches('.checklist-popup-close')) {
                pushEvent('popup_interaction', {
                    popup_name: 'checklist_popup',
                    popup_action: 'close_button',
                    page_location: getPageName()
                });
            }
        });
    }

    // =========================================
    // 10. INTERNAL NAVIGATION TRACKING
    // =========================================
    function trackInternalNavigation() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href') || '';

            // Only track internal .html links
            if (!href.endsWith('.html') && href !== '/') return;
            if (href.startsWith('http') && !href.includes('marquelyvette.com')) return;

            // Skip CTA buttons (already tracked)
            if (link.classList.contains('cta-button')) return;

            // Get destination page
            let destPage = href.replace(/^\/|\.html$/g, '').replace(/-/g, '_');
            if (href === '/' || href === '/index.html') destPage = 'homepage';

            // Determine navigation type
            let navType = 'content_link';
            if (link.closest('nav, .header-menu')) navType = 'header_nav';
            else if (link.closest('footer')) navType = 'footer_nav';
            else if (link.closest('.footer-service-areas')) navType = 'service_area_link';

            pushEvent('internal_navigation', {
                destination_page: destPage,
                navigation_type: navType,
                link_text: link.textContent.trim().substring(0, 50),
                page_location: getPageName()
            });
        });
    }

    // =========================================
    // 11. PAGE VIEW ENHANCEMENT
    // =========================================
    function trackEnhancedPageView() {
        // Push enhanced page data on load
        pushEvent('page_view_enhanced', {
            page_name: getPageName(),
            page_title: document.title,
            page_path: window.location.pathname,
            referrer: document.referrer,
            screen_width: window.innerWidth,
            device_type: window.innerWidth < 768 ? 'mobile' : (window.innerWidth < 1024 ? 'tablet' : 'desktop')
        });
    }

    // =========================================
    // 12. TIME ON PAGE TRACKING
    // =========================================
    function trackTimeOnPage() {
        const intervals = [30, 60, 120, 300]; // seconds
        const triggered = new Set();
        let startTime = Date.now();

        setInterval(function() {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

            intervals.forEach(function(interval) {
                if (timeOnPage >= interval && !triggered.has(interval)) {
                    triggered.add(interval);
                    pushEvent('time_on_page', {
                        time_threshold: interval,
                        page_location: getPageName()
                    });
                }
            });
        }, 5000);
    }

    // =========================================
    // 13. IMAGE/GALLERY CLICK TRACKING
    // =========================================
    function trackGalleryClicks() {
        document.addEventListener('click', function(e) {
            // Track hero gallery image clicks
            const galleryImg = e.target.closest('.gallery-grid-item img, .gallery-grid-item');
            if (galleryImg) {
                const img = galleryImg.tagName === 'IMG' ? galleryImg : galleryImg.querySelector('img');
                if (img) {
                    pushEvent('gallery_click', {
                        image_alt: img.alt || 'unknown',
                        gallery_type: 'hero_gallery',
                        page_location: getPageName()
                    });
                }
            }

            // Track portfolio/testimonial image clicks
            const portfolioImg = e.target.closest('.testimonial-card img, .service-card img, .about-image img');
            if (portfolioImg) {
                pushEvent('image_click', {
                    image_section: portfolioImg.closest('section')?.className.split(' ')[0] || 'unknown',
                    image_alt: portfolioImg.alt || 'unknown',
                    page_location: getPageName()
                });
            }
        });
    }

    // =========================================
    // INITIALIZE ALL TRACKING
    // =========================================
    function init() {
        trackEnhancedPageView();
        trackCTAClicks();
        trackContactClicks();
        trackScrollDepth();
        trackFormInteractions();
        trackFAQInteractions();
        trackMenuInteractions();
        trackSocialClicks();
        trackOutboundLinks();
        trackPopupInteractions();
        trackInternalNavigation();
        trackTimeOnPage();
        trackGalleryClicks();

        console.log('GTM tracking initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
