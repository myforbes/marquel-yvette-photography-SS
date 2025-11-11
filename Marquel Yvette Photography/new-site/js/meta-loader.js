/**
 * Meta Tags Loader
 * Dynamically loads page metadata from config/pages.json
 * Manages SEO, Open Graph tags, and structured data per page
 */

(function() {
    'use strict';

    // Determine current page
    const currentPage = getCurrentPage();

    // Load page metadata configuration
    fetch('config/pages.json')
        .then(response => response.json())
        .then(pagesConfig => {
            console.log('Loading page metadata from config...');

            const pageData = pagesConfig[currentPage];
            const globalData = pagesConfig.global;

            if (!pageData) {
                console.warn(`No metadata found for page: ${currentPage}`);
                return;
            }

            const head = document.head;

            // Update page title
            if (pageData.title) {
                document.title = pageData.title;
            }

            // Create and inject meta tags
            const metaTags = [
                // Basic meta tags
                { name: 'description', content: pageData.description },
                { name: 'keywords', content: pageData.keywords },

                // Open Graph / Social Media
                { property: 'og:site_name', content: globalData.businessName },
                { property: 'og:title', content: pageData.ogTitle || pageData.title },
                { property: 'og:description', content: pageData.ogDescription || pageData.description },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: pageData.canonicalUrl || window.location.href },
                { property: 'og:image', content: pageData.ogImage ? new URL(pageData.ogImage, window.location.origin).href : null },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: pageData.ogTitle || pageData.title },
                { name: 'twitter:description', content: pageData.ogDescription || pageData.description },
                { name: 'twitter:image', content: pageData.ogImage ? new URL(pageData.ogImage, window.location.origin).href : null }
            ];

            // Inject meta tags
            metaTags.forEach(tag => {
                if (!tag.content) return;

                const meta = document.createElement('meta');
                if (tag.name) meta.setAttribute('name', tag.name);
                if (tag.property) meta.setAttribute('property', tag.property);
                meta.setAttribute('content', tag.content);
                head.appendChild(meta);
            });

            // Update canonical URL
            if (pageData.canonicalUrl) {
                let canonical = document.querySelector('link[rel="canonical"]');
                if (!canonical) {
                    canonical = document.createElement('link');
                    canonical.setAttribute('rel', 'canonical');
                    head.appendChild(canonical);
                }
                canonical.setAttribute('href', pageData.canonicalUrl);
            }

            // Add structured data (JSON-LD) if present
            if (pageData.structuredData) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(pageData.structuredData, null, 2);
                head.appendChild(script);
            }

            console.log(`✓ Metadata loaded for page: ${currentPage}`);
        })
        .catch(error => {
            console.error('Error loading page metadata:', error);
        });

    // Helper: Determine current page
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

        const pageMap = {
            'index.html': 'homepage',
            '': 'homepage',
            '/': 'homepage',
            'rates-2.html': 'rates',
            'contact.html': 'contact',
            'contact-thank-you.html': 'contactThankYou',
            'request-proposal.html': 'requestProposal',
            'workplace-headshots.html': 'workplaceHeadshots'
        };

        return pageMap[filename] || 'homepage';
    }
})();
