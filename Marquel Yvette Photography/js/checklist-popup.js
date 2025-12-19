/**
 * Perfect Headshot Checklist Popup - PRODUCTION VERSION
 * Shows after 30 seconds on site, once per session
 * Collects first name and email, submits to LeadConnector webhook
 */

(function() {
    'use strict';

    // Configuration
    const POPUP_DELAY = 10000; // 10 seconds
    const STORAGE_KEY = 'myp_checklist_popup_shown';
    const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/QqzMbs9W02wuc63zjyYB/webhook-trigger/887bd4a2-60fc-4ac1-90b5-8f163edb13d5';

    // Check if popup was already shown in this session
    function hasSeenPopup() {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }

    // Mark popup as shown
    function markPopupShown() {
        sessionStorage.setItem(STORAGE_KEY, 'true');
    }

    // Create and inject popup HTML
    function createPopup() {
        const popupHTML = `
            <div id="checklist-popup-overlay" class="checklist-popup-overlay">
                <div class="checklist-popup-modal">
                    <button class="checklist-popup-close" aria-label="Close popup">&times;</button>

                    <!-- Initial Form View -->
                    <div class="checklist-popup-content" id="checklist-form-view">
                        <div class="checklist-popup-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <h2>Get Your Free Checklist!</h2>
                        <h3>The Perfect Headshot Checklist</h3>
                        <p>Everything you need to prepare for your professional headshot session. Look confident, feel prepared, and get photos you'll love.</p>
                        <ul class="checklist-popup-benefits">
                            <li><i class="fas fa-check"></i> What to wear for different industries</li>
                            <li><i class="fas fa-check"></i> Hair & makeup tips</li>
                            <li><i class="fas fa-check"></i> Day-of preparation guide</li>
                        </ul>
                        <form id="checklist-popup-form" class="checklist-popup-form">
                            <input type="text" name="firstName" placeholder="First Name" required class="checklist-popup-input">
                            <input type="email" name="email" placeholder="Email Address" required class="checklist-popup-input">
                            <button type="submit" class="checklist-popup-cta">
                                <span class="btn-text">GET YOUR FREE CHECKLIST</span>
                                <span class="btn-loading" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i> Sending...
                                </span>
                            </button>
                        </form>
                        <p class="checklist-popup-subscribe-note">You'll also receive occasional tips and headshot guidance. Unsubscribe anytime.</p>
                        <p class="checklist-popup-dismiss">No thanks, I'm already prepared</p>
                    </div>

                    <!-- Success View -->
                    <div class="checklist-popup-content checklist-popup-success" id="checklist-success-view" style="display: none;">
                        <div class="checklist-popup-icon checklist-popup-icon-success">
                            <i class="fas fa-check"></i>
                        </div>
                        <h2>You're All Set!</h2>
                        <h3>Check Your Inbox</h3>
                        <p>Your Perfect Headshot Checklist is on its way! Check your email in the next few minutes.</p>
                        <p class="checklist-popup-success-note">Don't forget to check your spam folder if you don't see it.</p>
                        <button class="checklist-popup-cta checklist-popup-close-btn">CLOSE</button>
                    </div>
                </div>
            </div>
        `;

        // Inject CSS
        const popupCSS = `
            <style id="checklist-popup-styles">
                .checklist-popup-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.75);
                    z-index: 99999;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    padding: 20px;
                }

                .checklist-popup-overlay.active {
                    display: flex;
                    opacity: 1;
                }

                .checklist-popup-modal {
                    background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
                    border-radius: 16px;
                    max-width: 480px;
                    width: 100%;
                    position: relative;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
                    animation: popupSlideIn 0.4s ease-out;
                    overflow: hidden;
                }

                @keyframes popupSlideIn {
                    from {
                        transform: translateY(-30px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }

                .checklist-popup-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: transparent;
                    border: none;
                    font-size: 28px;
                    color: #999;
                    cursor: pointer;
                    padding: 5px 10px;
                    line-height: 1;
                    transition: color 0.2s ease;
                    z-index: 10;
                }

                .checklist-popup-close:hover {
                    color: #333;
                }

                .checklist-popup-content {
                    padding: 40px 35px;
                    text-align: center;
                }

                .checklist-popup-icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(45deg, #f4ca78, #b9914d);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px;
                    box-shadow: 0 8px 20px rgba(185, 145, 77, 0.3);
                }

                .checklist-popup-icon i {
                    font-size: 28px;
                    color: #fff;
                }

                .checklist-popup-icon-success {
                    background: linear-gradient(45deg, #4CAF50, #45a049);
                    box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
                }

                .checklist-popup-content h2 {
                    font-size: 1.1rem;
                    font-weight: 400;
                    color: #b9914d;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 10px;
                }

                .checklist-popup-content h3 {
                    font-size: 1.6rem;
                    font-weight: 600;
                    color: #2c2c2c;
                    margin-bottom: 15px;
                    line-height: 1.3;
                }

                .checklist-popup-content > p {
                    font-size: 1rem;
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 25px;
                }

                .checklist-popup-benefits {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 25px;
                    text-align: left;
                }

                .checklist-popup-benefits li {
                    display: flex;
                    align-items: center;
                    padding: 8px 0;
                    font-size: 0.95rem;
                    color: #444;
                }

                .checklist-popup-benefits li i {
                    color: #b9914d;
                    margin-right: 12px;
                    font-size: 0.85rem;
                }

                .checklist-popup-form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .checklist-popup-input {
                    width: 100%;
                    padding: 14px 18px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                    outline: none;
                }

                .checklist-popup-input:focus {
                    border-color: #b9914d;
                    box-shadow: 0 0 0 3px rgba(185, 145, 77, 0.1);
                }

                .checklist-popup-input::placeholder {
                    color: #999;
                }

                .checklist-popup-cta {
                    display: block;
                    width: 100%;
                    background: linear-gradient(45deg, #f4ca78, #b9914d);
                    color: #1a1a1a;
                    padding: 16px 35px;
                    border: none;
                    border-radius: 30px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(244, 202, 120, 0.3);
                    font-family: inherit;
                    margin-top: 5px;
                }

                .checklist-popup-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(244, 202, 120, 0.4);
                }

                .checklist-popup-cta:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .checklist-popup-subscribe-note {
                    margin-top: 8px !important;
                    font-size: 0.6rem !important;
                    color: #bbb !important;
                    line-height: 1.3 !important;
                    margin-bottom: 0 !important;
                }

                .checklist-popup-dismiss {
                    margin-top: 12px;
                    font-size: 0.85rem;
                    color: #999;
                    cursor: pointer;
                    transition: color 0.2s ease;
                    font-weight: 600;
                }

                .checklist-popup-dismiss:hover {
                    color: #666;
                    text-decoration: underline;
                }

                .checklist-popup-success-note {
                    font-size: 0.9rem !important;
                    color: #888 !important;
                    font-style: italic;
                }

                .checklist-popup-close-btn {
                    margin-top: 10px;
                }

                /* Error state */
                .checklist-popup-input.error {
                    border-color: #e74c3c;
                }

                .checklist-popup-error {
                    color: #e74c3c;
                    font-size: 0.85rem;
                    margin-top: 10px;
                    display: none;
                }

                .checklist-popup-error.visible {
                    display: block;
                }

                /* Mobile responsive */
                @media (max-width: 520px) {
                    .checklist-popup-modal {
                        margin: 10px;
                        max-width: calc(100% - 20px);
                    }

                    .checklist-popup-content {
                        padding: 30px 25px;
                    }

                    .checklist-popup-icon {
                        width: 60px;
                        height: 60px;
                        margin-bottom: 20px;
                    }

                    .checklist-popup-icon i {
                        font-size: 24px;
                    }

                    .checklist-popup-content h2 {
                        font-size: 0.95rem;
                    }

                    .checklist-popup-content h3 {
                        font-size: 1.3rem;
                    }

                    .checklist-popup-content > p {
                        font-size: 0.9rem;
                    }

                    .checklist-popup-benefits li {
                        font-size: 0.9rem;
                    }

                    .checklist-popup-input {
                        padding: 12px 15px;
                        font-size: 16px; /* Prevents zoom on iOS */
                    }

                    .checklist-popup-cta {
                        padding: 14px 25px;
                        font-size: 0.85rem;
                    }
                }
            </style>
        `;

        // Insert styles into head
        document.head.insertAdjacentHTML('beforeend', popupCSS);

        // Insert popup into body
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Get references
        const overlay = document.getElementById('checklist-popup-overlay');
        const closeBtn = overlay.querySelector('.checklist-popup-close');
        const dismissText = overlay.querySelector('.checklist-popup-dismiss');
        const form = document.getElementById('checklist-popup-form');
        const formView = document.getElementById('checklist-form-view');
        const successView = document.getElementById('checklist-success-view');
        const closeSuccessBtn = overlay.querySelector('.checklist-popup-close-btn');

        // Close popup function
        function closePopup() {
            overlay.classList.remove('active');
            markPopupShown();
        }

        // Show success view
        function showSuccess() {
            formView.style.display = 'none';
            successView.style.display = 'block';
        }

        // Form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('.checklist-popup-cta');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const firstName = form.querySelector('input[name="firstName"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();

            // Disable button and show loading
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            try {
                // Submit to webhook
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        email: email,
                        source: 'headshot_checklist_popup'
                    })
                });

                // Show success regardless of response (webhook may not return proper CORS headers)
                showSuccess();
                markPopupShown();

            } catch (error) {
                // Even on error, show success (CORS issues are common with webhooks)
                console.log('Webhook submitted (CORS may block response)');
                showSuccess();
                markPopupShown();
            }
        });

        // Event listeners
        closeBtn.addEventListener('click', closePopup);
        dismissText.addEventListener('click', closePopup);
        closeSuccessBtn.addEventListener('click', closePopup);

        // Close on overlay click (not modal)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closePopup();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closePopup();
            }
        });

        return overlay;
    }

    // Show popup
    function showPopup(overlay) {
        // Small delay to ensure transition works
        setTimeout(function() {
            overlay.classList.add('active');
        }, 50);
    }

    // Initialize
    function init() {
        // Don't show if already seen
        if (hasSeenPopup()) {
            return;
        }

        // Create popup after DOM is ready
        const overlay = createPopup();

        // Show after delay
        setTimeout(function() {
            showPopup(overlay);
        }, POPUP_DELAY);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
