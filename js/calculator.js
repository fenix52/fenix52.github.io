// Calculator Functionality

class Calculator {
    constructor() {
        this.form = document.getElementById('calculatorForm');
        if (!this.form) return;
        
        this.steps = document.querySelectorAll('.calculator__step');
        this.currentStep = 1;
        this.totalSteps = this.steps.length;
        this.formData = {};
        
        this.init();
    }
    
    init() {
        // Navigation buttons
        const nextButtons = document.querySelectorAll('.calculator__next');
        const prevButtons = document.querySelectorAll('.calculator__prev');
        
        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => this.goToStep(parseInt(btn.dataset.next)));
        });
        
        prevButtons.forEach(btn => {
            btn.addEventListener('click', () => this.goToStep(parseInt(btn.dataset.prev)));
        });
        
        // Quick area buttons
        const quickButtons = document.querySelectorAll('.calculator__quick-btn');
        quickButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const area = btn.dataset.area;
                const input = document.querySelector('input[name="area"]');
                if (input) input.value = area;
            });
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time calculation
        this.form.addEventListener('change', () => this.calculateTotal());
        this.form.addEventListener('input', window.utils.debounce(() => this.calculateTotal(), 300));
    }
    
    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return;
        
        // Validate current step before moving forward
        if (stepNumber > this.currentStep && !this.validateCurrentStep()) {
            return;
        }
        
        // Hide current step
        this.steps[this.currentStep - 1].classList.remove('active');
        
        // Show new step
        this.currentStep = stepNumber;
        this.steps[this.currentStep - 1].classList.add('active');
        
        // Update progress
        this.updateProgress();
        
        // Calculate if on result step
        if (this.currentStep === this.totalSteps) {
            this.calculateTotal();
        }
    }
    
    validateCurrentStep() {
        const currentStepElement = this.steps[this.currentStep - 1];
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        
        for (let input of requiredInputs) {
            if (!input.value || (input.type === 'radio' && !currentStepElement.querySelector('input[type="radio"]:checked'))) {
                alert('Пожалуйста, заполните все обязательные поля');
                return false;
            }
        }
        
        return true;
    }
    
    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        const progressBar = document.querySelector('.calculator__progress-bar::before');
        const progressSteps = document.querySelectorAll('.calculator__progress-step');
        
        // Update progress bar
        document.documentElement.style.setProperty('--progress-width', `${progress}%`);
        
        // Update step indicators
        progressSteps.forEach((step, index) => {
            if (index < this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    calculateTotal() {
        // Get service price
        const serviceInput = document.querySelector('input[name="service"]:checked');
        if (!serviceInput) return;
        
        const servicePrice = parseInt(serviceInput.dataset.price) || 0;
        
        // Get area
        const areaInput = document.querySelector('input[name="area"]');
        const area = parseInt(areaInput?.value) || 0;
        
        if (area === 0) return;
        
        // Get additional options
        let additionalCost = 0;
        const checkboxes = document.querySelectorAll('.calculator__checkbox input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            additionalCost += parseInt(checkbox.value) || 0;
        });
        
        // Calculate total
        const total = (servicePrice + additionalCost) * area;
        
        // Update result
        const resultElement = document.querySelector('.calculator__result-amount');
        if (resultElement) {
            resultElement.textContent = window.utils.formatNumber(total);
        }
        
        // Update breakdown
        this.updateBreakdown(servicePrice, area, additionalCost, total);
    }
    
    updateBreakdown(servicePrice, area, additionalCost, total) {
        const breakdownElement = document.getElementById('calculatorBreakdown');
        if (!breakdownElement) return;
        
        const serviceName = document.querySelector('input[name="service"]:checked')?.parentElement.querySelector('h4')?.textContent || 'Услуга';
        
        breakdownElement.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--color-text-light);">
                <div style="display: flex; justify-content: space-between;">
                    <span>${serviceName}:</span>
                    <span>${window.utils.formatNumber(servicePrice)} ₽/м²</span>
                </div>
                ${additionalCost > 0 ? `
                <div style="display: flex; justify-content: space-between;">
                    <span>Доп. опции:</span>
                    <span>${window.utils.formatNumber(additionalCost)} ₽/м²</span>
                </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between;">
                    <span>Площадь:</span>
                    <span>${area} м²</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 600; padding-top: 0.5rem; border-top: 1px solid var(--color-border);">
                    <span>Итого:</span>
                    <span>${window.utils.formatNumber(total)} ₽</span>
                </div>
            </div>
        `;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would send data to your backend
        console.log('Form submitted:', data);
        
        // Show success modal
        const successModal = document.getElementById('successModal');
        if (successModal) {
            window.modalManager?.openModal('successModal');
        }
        
        // Reset form after delay
        setTimeout(() => {
            this.form.reset();
            this.goToStep(1);
        }, 3000);
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
    
    // Add CSS variable for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .calculator__progress-bar::before {
            width: var(--progress-width, 25%);
        }
    `;
    document.head.appendChild(style);
});