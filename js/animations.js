// Animations and effects

class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initCounterAnimations();
    this.initParallaxEffects();
    this.initTypingEffect();
  }

  initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.aosDelay || 0;
          
          setTimeout(() => {
            element.classList.add('aos-animate');
          }, delay);
          
          if (!element.dataset.aosRepeat) {
            observer.unobserve(element);
          }
        } else if (entry.target.dataset.aosRepeat) {
          entry.target.classList.remove('aos-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration) || 2000;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = prefix + Math.floor(target) + suffix;
        clearInterval(timer);
      } else {
        element.textContent = prefix + Math.floor(current) + suffix;
      }
    }, 16);
  }

  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;

    const handleScroll = throttle(() => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const offset = scrolled * speed;
        element.style.transform = `translateY(${offset}px)`;
      });
    }, 10);

    window.addEventListener('scroll', handleScroll);
  }

  initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typingSpeed) || 50;
      element.textContent = '';
      element.style.opacity = '1';

      let index = 0;
      const typeWriter = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(typeWriter, speed);
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
    });
  }

  static staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }

  static rippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  [data-aos] {
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  [data-aos].aos-animate {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  [data-aos="fade-up"] {
    transform: translateY(30px);
  }

  [data-aos="fade-down"] {
    transform: translateY(-30px);
  }

  [data-aos="fade-left"] {
    transform: translateX(30px);
  }

  [data-aos="fade-right"] {
    transform: translateX(-30px);
  }

  [data-aos="zoom-in"] {
    transform: scale(0.9);
  }

  [data-aos="zoom-out"] {
    transform: scale(1.1);
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  new Animations();

  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', Animations.rippleEffect);
  });
});