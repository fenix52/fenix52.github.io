// Projects functionality

class Projects {
  constructor() {
    this.filters = document.querySelectorAll('.projects__filter');
    this.projectCards = document.querySelectorAll('.project-card');
    this.currentFilter = 'all';
    
    this.init();
  }

  init() {
    if (!this.filters.length || !this.projectCards.length) return;

    this.setupFilters();
    this.setupBeforeAfterSliders();
    this.setupLazyLoading();
  }

  setupFilters() {
    this.filters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        const category = filter.dataset.filter;
        this.filterProjects(category);
        this.setActiveFilter(filter);
      });
    });
  }

  filterProjects(category) {
    this.currentFilter = category;

    this.projectCards.forEach((card, index) => {
      const cardCategory = card.dataset.category;
      
      if (category === 'all' || cardCategory === category) {
        setTimeout(() => {
          card.style.display = 'block';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        }, index * 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  setActiveFilter(activeFilter) {
    this.filters.forEach(filter => {
      filter.classList.remove('projects__filter--active');
    });
    activeFilter.classList.add('projects__filter--active');
  }

  setupBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.project-card__slider-input');
    
    sliders.forEach(slider => {
      const card = slider.closest('.project-card');
      const afterImage = card.querySelector('.project-card__img--after');
      
      if (!afterImage) return;

      afterImage.style.clipPath = 'inset(0 50% 0 0)';

      slider.addEventListener('input', (e) => {
        const value = e.target.value;
        afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      });

      if (isTouchDevice()) {
        this.setupTouchSlider(slider, afterImage);
      }
    });
  }

  setupTouchSlider(slider, afterImage) {
    const card = slider.closest('.project-card__before-after');
    let isDragging = false;

    card.addEventListener('touchstart', () => {
      isDragging = true;
    });

    card.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      if (percentage >= 0 && percentage <= 100) {
        slider.value = percentage;
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      }
    });

    card.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('.project-card__img[data-src]');
    
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
}

document.addEventListener('DOMContentLoaded', () => {
  new Projects();
});