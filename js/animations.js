// Scroll Animations

class AnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.counters = document.querySelectorAll('[data-counter]');
        this.animatedCounters = new Set();
        
        this.init();
    }
    
    init() {
        // Initial check
        this.checkElements();
        
        // Scroll event
        window.addEventListener('scroll', window.utils.throttle(() => {
            this.checkElements();
        }, 100));
        
        // Resize event
        window.addEventListener('resize', window.utils.debounce(() => {
            this.checkElements();
        }, 250));
    }
    
    checkElements() {
        this.elements.forEach(element => {
            if (window.utils.isInViewport(element, 100)) {
                const delay = element.dataset.aosDelay || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
        
        // Counter animations
        this.counters.forEach(counter => {
            if (window.utils.isInViewport(counter, 100) && !this.animatedCounters.has(counter)) {
                this.animateCounter(counter);
                this.animatedCounters.add(counter);
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = prefix + window.utils.formatNumber(target) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = prefix + window.utils.formatNumber(Math.floor(current)) + suffix;
            }
        }, 16);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});