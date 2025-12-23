// Main JavaScript

class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Hide preloader
        this.hidePreloader();
        
        // Scroll to top button
        this.initScrollToTop();
        
        // Smooth scroll for all anchor links
        this.initSmoothScroll();
        
        // Track analytics events
        this.initAnalytics();
    }
    
    hidePreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 300);
                }, 500);
            }
        });
    }
    
    initScrollToTop() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (!scrollTopBtn) return;
        
        window.addEventListener('scroll', window.utils.throttle(() => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, 100));
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.utils.smoothScrollTo(target);
                }
            });
        });
    }
    
    initAnalytics() {
        // Track button clicks
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.trackEvent('button_click', action);
            });
        });
        
        // Track form submissions
        document.querySelectorAll('[data-form]').forEach(form => {
            form.addEventListener('submit', () => {
                const formType = form.dataset.form;
                this.trackEvent('form_submit', formType);
            });
        });
    }
    
    trackEvent(category, action) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category
            });
        }
        
        // Yandex Metrika
        if (typeof ym !== 'undefined') {
            ym(window.ymCounterId, 'reachGoal', action);
        }
        
        console.log('Event tracked:', category, action);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Console message
console.log('%cАрзамас Декор', 'color: #E74C3C; font-size: 24px; font-weight: bold;');
console.log('%cПрофессиональная отделка фасадов', 'color: #7F8C8D; font-size: 14px;');