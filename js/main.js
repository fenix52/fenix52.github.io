/**
 * Main JavaScript - Основная логика сайта
 * Арзамас Декор
 */

// Глобальные переменные
const APP = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  scrollPosition: 0,
  isScrolling: false
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

// Инициализация приложения
function initApp() {
  detectDevice();
  initPreloader();
  initScrollTop();
  initFloatingButtons();
  initSmoothScroll();
  initLazyLoading();
  initScrollAnimations();
  handleScrollEvents();
  
  console.log('✅ Приложение инициализировано');
}

// Определение типа устройства
function detectDevice() {
  const width = window.innerWidth;
  APP.isMobile = width < 768;
  APP.isTablet = width >= 768 && width < 1024;
  APP.isDesktop = width >= 1024;
  
  // Добавляем классы к body
  document.body.classList.toggle('is-mobile', APP.isMobile);
  document.body.classList.toggle('is-tablet', APP.isTablet);
  document.body.classList.toggle('is-desktop', APP.isDesktop);
}

// Обработка изменения размера окна
window.addEventListener('resize', debounce(function() {
  detectDevice();
}, 250));

// Прелоадер
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }, 500);
  });
}

// Кнопка "Наверх"
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Плавающие кнопки связи
function initFloatingButtons() {
  const floatingButtons = document.querySelectorAll('.floating-btn');
  
  floatingButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('tel:') || href.startsWith('https://wa.me') || href.startsWith('https://t.me')) {
        // Разрешаем переход по ссылке
        return true;
      }
      e.preventDefault();
    });
  });
}

// Плавная прокрутка к якорям
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Закрываем мобильное меню если открыто
        const nav = document.querySelector('.header__nav');
        const burger = document.querySelector('.header__burger');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          burger?.classList.remove('active');
        }
      }
    });
  });
}

// Ленивая загрузка изображений
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Анимации при скролле
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// Обработка событий скролла
function handleScrollEvents() {
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    APP.scrollPosition = window.pageYOffset;
    
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateScrollElements();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Обновление элементов при скролле
function updateScrollElements() {
  const scrollTop = window.pageYOffset;
  
  // Хедер
  const header = document.querySelector('.header');
  if (header) {
    header.classList.toggle('scrolled', scrollTop > 50);
  }
  
  // Кнопка "Наверх"
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', scrollTop > 500);
  }
}

// Утилиты

// Debounce функция
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle функция
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Форматирование чисел
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Валидация email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Валидация телефона
function isValidPhone(phone) {
  const re = /^[\d\s\+\-\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Получение параметров из URL
function getUrlParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const queries = queryString.split('&');
  
  queries.forEach(query => {
    const [key, value] = query.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
}

// Показать уведомление
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Копирование в буфер обмена
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Скопировано в буфер обмена!', 'success');
    });
  } else {
    // Fallback для старых браузеров
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('Скопировано в буфер обмена!', 'success');
  }
}

// Экспорт функций для использования в других модулях
window.APP = APP;
window.showNotification = showNotification;
window.formatNumber = formatNumber;
window.isValidEmail = isValidEmail;
window.isValidPhone = isValidPhone;
window.copyToClipboard = copyToClipboard;
window.debounce = debounce;
window.throttle = throttle;