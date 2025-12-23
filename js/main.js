// Main application file

class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupPreloader();
    this.setupScrollToTop();
    this.setupFloatingButtons();
    this.setupSmoothScrollLinks();
    this.setupLazyLoading();
    this.initPhoneMasks();
    this.initAnalytics();
    this.checkBrowserSupport();
  }

  setupPreloader() {
    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.classList.add('hidden');
        }, 500);
      }
    });
  }

  setupScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;

    const toggleScrollTop = throttle(() => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', toggleScrollTop);

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  setupFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.floating-btn');
    
    floatingButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = button.dataset.action;
        this.handleFloatingButtonClick(action);
        this.trackEvent('floating_button', action);
      });
    });
  }

  handleFloatingButtonClick(action) {
    switch (action) {
      case 'call':
        window.location.href = 'tel:+79957767575';
        break;
      case 'whatsapp':
        window.open('https://wa.me/79957767575', '_blank');
        break;
      case 'telegram':
        window.open('https://t.me/+79957767575', '_blank');
        break;
    }
  }

  setupSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          smoothScrollTo(target);
        }
      });
    });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
  }

  initPhoneMasks() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
      input.addEventListener('focus', () => {
        if (!input.value) {
          input.value = '+7 ';
        }
      });

      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
          if (value[0] === '8') {
            value = '7' + value.slice(1);
          }
          if (value[0] !== '7') {
            value = '7' + value;
          }
        }

        let formattedValue = '+7';
        if (value.length > 1) {
          formattedValue += ' (' + value.substring(1, 4);
        }
        if (value.length >= 5) {
          formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
          formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
          formattedValue += '-' + value.substring(9, 11);
        }

        e.target.value = formattedValue;
      });

      input.addEventListener('keydown', (e) => {
        const value = e.target.value;
        if (e.key === 'Backspace' && value === '+7 ') {
          e.target.value = '';
        }
      });
    });
  }

  initAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    }

    if (typeof ym !== 'undefined') {
      ym(XXXXXXXXX, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    }
  }

  trackEvent(category, action, label = '') {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }

    if (typeof ym !== 'undefined') {
      ym(XXXXXXXXX, 'reachGoal', `${category}_${action}`);
    }

    console.log('Event tracked:', category, action, label);
  }

  checkBrowserSupport() {
    const features = {
      flexbox: CSS.supports('display', 'flex'),
      grid: CSS.supports('display', 'grid'),
      customProperties: CSS.supports('--custom', '0'),
      intersectionObserver: 'IntersectionObserver' in window
    };

    const unsupported = Object.keys(features).filter(key => !features[key]);

    if (unsupported.length > 0) {
      console.warn('Ваш браузер не поддерживает некоторые функции:', unsupported);
      
      if (unsupported.length > 2) {
        this.showBrowserWarning();
      }
    }
  }

  showBrowserWarning() {
    const warning = document.createElement('div');
    warning.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; background: #f39c12; color: white; 
                  padding: 12px; text-align: center; z-index: 99999; font-size: 14px;">
        <strong>Внимание!</strong> Ваш браузер устарел. Для корректной работы сайта обновите браузер.
        <button onclick="this.parentElement.remove()" style="margin-left: 20px; background: white; 
                color: #f39c12; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">
          Закрыть
        </button>
      </div>
    `;
    document.body.insertBefore(warning, document.body.firstChild);
  }

  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.trackEvent('error', 'javascript', event.error?.message || 'Unknown error');
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.trackEvent('error', 'promise', event.reason?.message || 'Unknown error');
    });
  }
}

const devTools = {
  clearStorage: () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ Storage cleared');
  },
  
  showFormData: () => {
    const data = getFromLocalStorage('formSubmissions', []);
    console.table(data);
  },

  testModal: (modalId) => {
    if (typeof openModal !== 'undefined') {
      openModal(modalId);
    }
  },

  version: '1.0.0',
  
  info: () => {
    console.log(`
    🏭 Арзамас Декор
    📦 Version: ${devTools.version}
    🚀 Loaded modules: ${Object.keys(window).filter(k => k.includes('Instance')).join(', ')}
    `);
  }
};

window.devTools = devTools;

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  window.app = app;

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🏭 Арзамас Декор', 'font-size: 24px; color: #E74C3C; font-weight: bold;');
    console.log('%cСайт успешно загружен!', 'font-size: 14px; color: #27AE60;');
    console.log('%cИспользуйте window.devTools для отладки', 'font-size: 12px; color: #6C757D;');
  }
});

window.addEventListener('online', () => {
  console.log('✅ Соединение восстановлено');
});

window.addEventListener('offline', () => {
  console.warn('⚠️ Отсутствует интернет-соединение');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('✅ Service Worker registered'))
    //   .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}