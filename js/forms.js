// Form Handling

class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('[data-form]');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            // Phone input formatting
            const phoneInputs = form.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(input => {
                input.addEventListener('input', (e) => this.formatPhoneInput(e.target));
            });
            
            // Form submission
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }
    
    formatPhoneInput(input) {
        let value = input.value.replace(/\D/g, '');
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        // Format: +7 (XXX) XXX-XX-XX
        if (value.length > 0) {
            if (value[0] === '8' || value[0] === '7') {
                value = '7' + value.slice(1);
            }
            
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.slice(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.slice(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.slice(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.slice(9, 11);
            }
            
            input.value = formatted;
        }
    }
    
    async handleSubmit(e, form) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const formType = form.dataset.form;
        
        // Add form type
        data.form_type = formType;
        data.timestamp = new Date().toISOString();
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправляем...';
        }
        
        try {
            // Send data (replace with your actual endpoint)
            await this.sendFormData(data);
            
            // Show success
            this.showSuccess();
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
        } finally {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
            }
        }
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'Это поле обязательно');
                isValid = false;
            } else if (input.type === 'email' && !window.utils.validateEmail(input.value)) {
                this.showError(input, 'Неверный формат email');
                isValid = false;
            } else if (input.type === 'tel' && !window.utils.validatePhone(input.value)) {
                this.showError(input, 'Неверный формат телефона');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }
    
    showError(input, message) {
        input.style.borderColor = 'var(--color-error)';
        
        // Remove existing error
        const existingError = input.parentElement.querySelector('.form__error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error
        const error = document.createElement('span');
        error.className = 'form__error';
        error.textContent = message;
        error.style.cssText = 'color: var(--color-error); font-size: 0.875rem; margin-top: 0.25rem; display: block;';
        input.parentElement.appendChild(error);
    }
    
    clearError(input) {
        input.style.borderColor = '';
        const error = input.parentElement.querySelector('.form__error');
        if (error) {
            error.remove();
        }
    }
    
    async sendFormData(data) {
        // Replace with your actual API endpoint
        console.log('Sending form data:', data);
        
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 1000);
        });
    }
    
    showSuccess() {
        const successModal = document.getElementById('successModal');
        if (successModal && window.modalManager) {
            window.modalManager.openModal('successModal');
        }
    }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});