/**
 * Contact Form Handler
 * Handles form validation, submission, and user feedback
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }

    function initContactForm() {
        const form = document.getElementById('proposal-form');
        const phoneInput = document.getElementById('phone');
        const successMessage = document.getElementById('form-success');
        const errorMessage = document.getElementById('form-error');

        if (!form) return; // Exit if form not found on page

        // Phone number formatting
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }

        // Form submission
        form.addEventListener('submit', handleFormSubmit);

        // Real-time validation on blur
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', validateField);
        });
    }

    /**
     * Format phone number as user types
     */
    function formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

        if (value.length === 0) {
            e.target.value = '';
            return;
        }

        // Format: (XXX) XXX-XXXX
        if (value.length <= 3) {
            e.target.value = `(${value}`;
        } else if (value.length <= 6) {
            e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }

    /**
     * Validate individual field
     */
    function validateField(e) {
        const field = e.target;
        const fieldType = field.type;
        const value = field.value.trim();

        // Clear previous validation
        clearFieldError(field);

        // Required field check
        if (field.hasAttribute('required') && value === '') {
            showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (fieldType === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.id === 'phone' && value !== '') {
            const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number: (703) 555-1234');
                return false;
            }
        }

        // Select validation
        if (fieldType === 'select-one' && field.hasAttribute('required') && value === '') {
            showFieldError(field, 'Please select an option');
            return false;
        }

        return true;
    }

    /**
     * Show field error message
     */
    function showFieldError(field, message) {
        field.classList.add('error');

        // Create error message element if it doesn't exist
        let errorElement = field.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.color = '#f44336';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            errorElement.style.display = 'block';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    /**
     * Clear field error message
     */
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Validate entire form
     */
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const fieldValid = validateField({ target: field });
            if (!fieldValid) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Handle form submission
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formWrapper = form.closest('.form-wrapper');
        const successMessage = document.getElementById('form-success');
        const errorMessage = document.getElementById('form-error');

        // Validate form
        if (!validateForm(form)) {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        formWrapper.classList.add('form-loading');
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'SENDING';
        submitButton.disabled = true;

        try {
            // Get form data
            const formData = new FormData(form);

            // IMPORTANT: Replace with your actual form service endpoint
            // Options: Formspree, Netlify Forms, EmailJS, or custom backend
            const formAction = form.getAttribute('action');

            // Submit form
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success - show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Optional: Send to Google Analytics or tracking
                if (window.gtag) {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Proposal Request'
                    });
                }

                // Reset form after 5 seconds (optional)
                setTimeout(() => {
                    form.reset();
                }, 5000);

            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);

            // Show error message
            form.style.display = 'none';
            errorMessage.style.display = 'block';

            // Scroll to error message
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } finally {
            // Remove loading state
            formWrapper.classList.remove('form-loading');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    }

    /**
     * Alternative: Simple form submission without fetch (for testing)
     * Uncomment this and replace handleFormSubmit if you want basic HTML form submission
     */
    /*
    function handleFormSubmit(e) {
        const form = e.target;

        // Validate form
        if (!validateForm(form)) {
            e.preventDefault();
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return false;
        }

        // Let form submit normally to action URL
        return true;
    }
    */

})();
