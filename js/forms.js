// Forms functionality

class Forms {
  constructor() {
    this.forms = document.querySelectorAll('form[data-form]');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      this.setupForm(form);
    });
  }

  setupForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });

    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        e.target.value = this.formatPhoneInput(e.target.value);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.required;

    this.clearError(field);

    if (required && !value) {
      this.showError(field, 'Это поле обязательно для заполнения');
      return false;
    }

    if (type === 'email' && value && !validateEmail(value)) {
      this.showError(field, 'Введите корректный email');
      return false;
    }

    if (type === 'tel' && value && !validatePhone(value)) {
      this.showError(field, 'Введите корректный номер телефона');
      return false;
    }

    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < minLength) {
      this.showError(field, `Минимальная длина: ${minLength} символов`);
      return false;
    }

    return true;
  }

  showError(field, message) {
    field.classList.add('error');
    
    const oldError = field.parentElement.querySelector('.field-error');
    if (oldError) {
      oldError.remove();
    }

    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--spacing-xs)';
    errorElement.style.display = 'block';
    
    field.parentElement.appendChild(errorElement);
  }

  clearError(field) {
    field.classList.remove('error');
    const error = field.parentElement.querySelector('.field-error');
    if (error) {
      error.remove();
    }
  }

  formatPhoneInput(value) {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
      formatted = '+7';
      if (cleaned.length > 1) {
        formatted += ' (' + cleaned.substring(1, 4);
      }
      if (cleaned.length >= 5) {
        formatted += ') ' + cleaned.substring(4, 7);
      }
      if (cleaned.length >= 8) {
        formatted += '-' + cleaned.substring(7, 9);
      }
      if (cleaned.length >= 10) {
        formatted += '-' + cleaned.substring(9, 11);
      }
    }

    return formatted;
  }

  validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    const agreementCheckbox = form.querySelector('input[name="agreement"]');
    if (agreementCheckbox && !agreementCheckbox.checked) {
      this.showNotification('Необходимо согласие на обработку персональных данных', 'error');
      isValid = false;
    }

    return isValid;
  }

  async handleSubmit(form) {
    if (!this.validateForm(form)) {
      return;
    }

    const formType = form.dataset.form;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.saveFormData(formType, data);

      this.showNotification('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.', 'success');
      form.reset();
      
      const modal = form.closest('.modal');
      if (modal && modalInstance) {
        setTimeout(() => closeModal(), 2000);
      }

      this.trackFormSubmit(formType, data);

    } catch (error) {
      console.error('Form submission error:', error);
      this.showNotification('Произошла ошибка. Пожалуйста, попробуйте позже или позвоните нам.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  saveFormData(formType, data) {
    const submissions = getFromLocalStorage('formSubmissions', []);
    submissions.push({
      type: formType,
      data: data,
      timestamp: new Date().toISOString()
    });
    saveToLocalStorage('formSubmissions', submissions);
  }

  trackFormSubmit(formType, data) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'Form',
        event_label: formType
      });
    }

    if (typeof ym !== 'undefined') {
      ym(YANDEX_METRIKA_ID, 'reachGoal', `form_${formType}`);
    }

    console.log('Form submitted:', formType, data);
  }

  showNotification(message, type = 'info') {
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <span>${message}</span>
        <button class="notification__close">&times;</button>
      </div>
    `;

    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      background: type === 'success' ? 'var(--color-success)' : 
                  type === 'error' ? 'var(--color-error)' : 'var(--color-info)',
      color: 'white',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xl)',
      zIndex: '10000',
      maxWidth: '400px',
      animation: 'slideInDown 0.3s ease-out'
    });

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => notification.remove());

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Forms();
});