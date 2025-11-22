/**
 * Service Landing Page Loader
 * Dynamically loads service content from JSON configuration files
 */

(function() {
    'use strict';

    // Get service ID from URL parameter or filename
    function getServiceId() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');

        if (serviceParam) {
            return serviceParam;
        }

        // Fall back to filename mapping
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);

        const serviceMap = {
            'workplace-headshots.html': 'workplace-headshots',
            'service-landing-page.html': 'workplace-headshots' // Default for testing
        };

        return serviceMap[filename] || 'workplace-headshots';
    }

    // Load service data
    async function loadServiceData(serviceId) {
        try {
            const response = await fetch(`data/services/${serviceId}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load service data: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading service data:', error);
            return null;
        }
    }

    // Update page meta tags
    function updateMeta(meta) {
        if (!meta) return;

        if (meta.title) {
            document.title = meta.title;
            document.getElementById('page-title').textContent = meta.title;
        }

        if (meta.description) {
            const descMeta = document.getElementById('page-description');
            if (descMeta) {
                descMeta.setAttribute('content', meta.description);
            }
        }
    }

    // Populate hero section
    function populateHero(hero) {
        if (!hero) return;

        const titleEl = document.getElementById('hero-title');
        const subtitleEl = document.getElementById('hero-subtitle');
        const descriptionEl = document.getElementById('hero-description');

        if (titleEl && hero.title) titleEl.textContent = hero.title;
        if (subtitleEl && hero.subtitle) subtitleEl.textContent = hero.subtitle;
        if (descriptionEl && hero.description) descriptionEl.textContent = hero.description;
    }

    // Populate benefits section
    function populateBenefits(benefits) {
        if (!benefits || !benefits.items) return;

        const titleEl = document.getElementById('benefits-title');
        const gridEl = document.getElementById('benefits-grid');

        if (titleEl && benefits.title) {
            titleEl.textContent = benefits.title;
        }

        if (gridEl) {
            gridEl.innerHTML = '';
            benefits.items.forEach(benefit => {
                const card = document.createElement('div');
                card.className = 'benefit-card';
                card.innerHTML = `
                    <div class="benefit-icon">
                        <i class="fas ${benefit.icon}"></i>
                    </div>
                    <h3>${benefit.title}</h3>
                    <p>${benefit.description}</p>
                `;
                gridEl.appendChild(card);
            });
        }
    }

    // Populate process/steps section
    function populateProcess(process) {
        if (!process || !process.steps) return;

        const containerEl = document.getElementById('steps-container');

        if (containerEl) {
            containerEl.innerHTML = '';
            process.steps.forEach((step, index) => {
                const stepEl = document.createElement('div');
                stepEl.className = 'step';
                stepEl.innerHTML = `
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">
                        <h3>${step.title}</h3>
                        <p>${step.description}</p>
                    </div>
                `;
                containerEl.appendChild(stepEl);
            });
        }
    }

    // Populate stats section
    function populateStats(stats) {
        if (!stats || !stats.items) return;

        const titleEl = document.getElementById('stats-title');
        const containerEl = document.getElementById('stats-container');

        if (titleEl && stats.title) {
            titleEl.textContent = stats.title;
        }

        if (containerEl) {
            containerEl.innerHTML = '';
            stats.items.forEach(stat => {
                const statEl = document.createElement('div');
                statEl.className = 'highlight-item';
                statEl.innerHTML = `
                    <div class="highlight-stat">${stat.number}</div>
                    <div class="highlight-label">${stat.label}</div>
                `;
                containerEl.appendChild(statEl);
            });
        }
    }

    // Populate CTA section
    function populateCTA(cta) {
        if (!cta) return;

        const titleEl = document.getElementById('cta-title');
        const descEl = document.getElementById('cta-description');

        if (titleEl && cta.title) titleEl.textContent = cta.title;
        if (descEl && cta.description) descEl.textContent = cta.description;
    }

    // Initialize page
    async function init() {
        const serviceId = getServiceId();
        console.log('Loading service:', serviceId);

        const data = await loadServiceData(serviceId);

        if (!data) {
            console.error('Failed to load service data');
            return;
        }

        // Populate all sections
        updateMeta(data.meta);
        populateHero(data.hero);
        populateBenefits(data.benefits);
        populateProcess(data.process);
        populateStats(data.stats);
        populateCTA(data.cta);

        console.log('Service page loaded successfully');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
