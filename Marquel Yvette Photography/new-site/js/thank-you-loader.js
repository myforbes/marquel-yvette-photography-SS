// Thank You Page Content Loader
// This script loads content from the JSON data file and populates the page dynamically

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('new-site/data/thank-you-page.json');
        const data = await response.json();

        // Load all sections
        loadPageMeta(data.page);
        loadHeader(data.header);
        loadCheckEmail(data.checkEmail);
        loadChecklistPreview(data.checklistPreview);
        loadNextSteps(data.nextSteps);
        loadCTA(data.cta);
        loadFooter(data.footer);

    } catch (error) {
        console.error('Error loading page content:', error);
    }
});

// Load Page Meta Information
function loadPageMeta(page) {
    document.title = page.title;
    document.querySelector('meta[name="description"]').setAttribute('content', page.description);
}

// Load Header Section
function loadHeader(header) {
    document.querySelector('[data-logo]').src = header.logo;
    document.querySelector('[data-main-title]').textContent = header.mainTitle;
    document.querySelector('[data-subtitle]').textContent = header.subtitle;
}

// Load Check Email Section
function loadCheckEmail(checkEmail) {
    document.querySelector('[data-email-title]').textContent = checkEmail.title;
    document.querySelector('[data-email-text]').textContent = checkEmail.text;
}

// Load Checklist Preview Section
function loadChecklistPreview(checklistPreview) {
    document.querySelector('[data-checklist-title]').textContent = checklistPreview.title;

    const itemsContainer = document.querySelector('[data-checklist-items]');
    itemsContainer.innerHTML = '';

    checklistPreview.items.forEach(item => {
        itemsContainer.innerHTML += `
            <div class="checklist-item">
                <div class="check-icon"></div>
                <div class="checklist-item-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
}

// Load Next Steps Section
function loadNextSteps(nextSteps) {
    document.querySelector('[data-steps-title]').textContent = nextSteps.title;

    const stepsContainer = document.querySelector('[data-next-steps]');
    stepsContainer.innerHTML = '';

    nextSteps.steps.forEach(step => {
        stepsContainer.innerHTML += `
            <div class="step-card">
                <div class="step-number">${step.number}</div>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        `;
    });
}

// Load CTA Section
function loadCTA(cta) {
    document.querySelector('[data-cta-title]').textContent = cta.title;
    document.querySelector('[data-cta-subtitle]').textContent = cta.subtitle;
    document.querySelector('[data-cta-button]').textContent = cta.buttonText;
    document.querySelector('[data-cta-button]').href = cta.buttonUrl;

    const testimonialHTML = `
        ${cta.testimonial.quote}
        <div class="testimonial-author">— ${cta.testimonial.author}</div>
    `;
    document.querySelector('[data-testimonial]').innerHTML = testimonialHTML;
}

// Load Footer
function loadFooter(footer) {
    document.querySelector('[data-footer-text]').textContent = footer.text;
}
