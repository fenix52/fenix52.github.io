/**
 * Animations - Анимации и визуальные эффекты
 * AOS-подобная библиотека для анимаций при скролле
 */

document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
});

function initAnimations() {
  initScrollAnimations();
  initParallaxEffects();
  initCounterAnimations();
  initTypingEffect();
  
  console.log('✅ Анимации инициализированы');
}

// Анимации при скролле (AOS)
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.dataset.aos;
        const delay = element.dataset.aosDelay || 0;
        const duration = element.dataset.aosDuration || 600;
        
        setTimeout(() => {
          element.classList.add('aos-animate');
          element.style.animationDuration = `${duration}ms`;
          
          // Применяем анимацию в зависимости от типа
          applyAnimation(element, animation);
        }, delay);
        
        // Отключаем наблюдение после первой анимации
        if (!element.dataset.aosOnce || element.dataset.aosOnce !== 'false') {
          observer.unobserve(element);
        }
      } else {
        // Если нужно повторять анимацию
        if (entry.target.dataset.aosOnce === 'false') {
          entry.target.classList.remove('aos-animate');
        }
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Применение конкретной анимации
function applyAnimation(element, animationType) {
  const animations = {
    'fade': () => {
      element.style.opacity = '1';
      element.style.transition = 'opacity 0.6s ease';
    },
    'fade-up': () => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      if (!element.style.transform || element.style.transform === 'none') {
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
          element.style.transform = 'translateY(0)';
        }, 10);
      }
    },
    'fade-down': () => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    },
    'fade-left': () => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    },
    'fade-right': () => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    },
    'zoom-in': () => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    },
    'zoom-out': () => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    },
    'flip-left': () => {
      element.style.opacity = '1';
      element.style.transform = 'rotateY(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    },
    'flip-right': () => {
      element.style.opacity = '1';
      element.style.transform = 'rotateY(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  };
  
  const animation = animations[animationType] || animations['fade'];
  animation();
}

// Параллакс эффект
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', throttle(function() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const offset = scrolled * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  }, 10));
}

// Анимация счетчиков
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (!counters.length) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.counter);
  const duration = parseInt(element.dataset.counterDuration) || 2000;
  const step = target / (duration / 16); // 60 FPS
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Эффект печатания
function initTypingEffect() {
  const typingElements = document.querySelectorAll('[data-typing]');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    const speed = parseInt(element.dataset.typingSpeed) || 50;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  });
}

// Анимация появления карточек по очереди
function initStaggeredAnimation() {
  const groups = document.querySelectorAll('[data-stagger-group]');
  
  groups.forEach(group => {
    const items = group.querySelectorAll('[data-stagger-item]');
    const delay = parseInt(group.dataset.staggerDelay) || 100;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('stagger-animate');
            }, index * delay);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(group);
  });
}

// Волновая анимация
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .service-card, .project-card');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// CSS для ripple эффекта
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
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Экспорт функций
window.animateCounter = animateCounter;
window.initStaggeredAnimation = initStaggeredAnimation;
window.initRippleEffect = initRippleEffect;