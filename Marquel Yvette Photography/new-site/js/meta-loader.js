/**
 * Meta Tags Loader
 * Loads site configuration and injects meta tags into HTML head
 */

(function() {
    'use strict';

    // Load configuration and inject meta tags
    fetch('config/site-config.json')
        .then(response => response.json())
        .then(config => {
            const head = document.head;

            // Set page title
            document.title = config.site.title;

            // Create and inject meta tags
            const metaTags = [
                // Basic meta tags
                { name: 'description', content: config.site.description },
                { name: 'keywords', content: config.seo.keywords },
                { name: 'author', content: config.seo.author },

                // Open Graph / Social Media
                { property: 'og:site_name', content: config.openGraph.siteName },
                { property: 'og:title', content: config.openGraph.title },
                { property: 'og:description', content: config.openGraph.description },
                { property: 'og:type', content: config.openGraph.type },
                { property: 'og:url', content: config.openGraph.url },
                { property: 'og:image', content: config.openGraph.image },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: config.openGraph.title },
                { name: 'twitter:description', content: config.openGraph.description },
                { name: 'twitter:image', content: config.openGraph.image }
            ];

            // Inject meta tags
            metaTags.forEach(tag => {
                const meta = document.createElement('meta');
                if (tag.name) meta.setAttribute('name', tag.name);
                if (tag.property) meta.setAttribute('property', tag.property);
                if (tag.content) meta.setAttribute('content', tag.content);
                head.appendChild(meta);
            });

            // Update favicon
            const favicon = document.querySelector('link[rel="icon"]');
            if (favicon) {
                favicon.href = config.assets.favicon;
            }

            // Create Schema.org structured data
            const schema = {
                "@context": "https://schema.org",
                "@type": config.business.type,
                "name": config.business.name,
                "description": config.business.description,
                "image": config.business.logo,
                "url": config.site.url,
                "telephone": config.business.phone,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": config.business.address.street,
                    "addressLocality": config.business.address.city,
                    "addressRegion": config.business.address.state,
                    "postalCode": config.business.address.zip,
                    "addressCountry": config.business.address.country
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": config.business.location.latitude,
                    "longitude": config.business.location.longitude
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": config.business.hours.days,
                    "opens": config.business.hours.opens,
                    "closes": config.business.hours.closes
                },
                "sameAs": [
                    config.business.social.facebook,
                    config.business.social.instagram,
                    config.business.social.linkedin
                ]
            };

            // Inject Schema.org JSON-LD
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema, null, 2);
            head.appendChild(script);

            console.log('✓ Site configuration loaded successfully');
        })
        .catch(error => {
            console.error('Error loading site configuration:', error);
        });
})();
