/**
 * Projects - Фильтрация проектов и портфолио
 * Фильтры, сравнение до/после, лайтбокс
 */

document.addEventListener('DOMContentLoaded', function() {
  const projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    initProjects();
  }
});

function initProjects() {
  initProjectFilters();
  initBeforeAfterSliders();
  initProjectCards();
  initLoadMore();
  initLightbox();
  
  console.log('✅ Проекты инициализированы');
}

// Фильтрация проектов
function initProjectFilters() {
  const filters = document.querySelectorAll('.projects__filter');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filters.length || !projectCards.length) return;
  
  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      
      // Убираем активный класс со всех фильтров
      filters.forEach(f => f.classList.remove('projects__filter--active'));
      
      // Добавляем активный класс к текущему
      this.classList.add('projects__filter--active');
      
      // Фильтруем проекты
      filterProjects(filterValue, projectCards);
    });
  });
}

function filterProjects(category, cards) {
  cards.forEach(card => {
    const cardCategory = card.dataset.category;
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = '';
      card.classList.remove('hidden');
      
      // Анимация появления
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        card.style.display = 'none';
        card.classList.add('hidden');
      }, 300);
    }
  });
}

// Слайдеры сравнения до/после
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.project-card__slider-input');
  
  sliders.forEach(slider => {
    const card = slider.closest('.project-card');
    const afterImage = card.querySelector('.project-card__img--after');
    const sliderLine = card.querySelector('.project-card__slider');
    
    if (!afterImage || !sliderLine) return;
    
    slider.addEventListener('input', function() {
      const value = this.value;
      updateSliderPosition(afterImage, sliderLine, value);
    });
    
    // Touch события для мобильных
    let isDragging = false;
    
    sliderLine.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    
    card.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      slider.value = percentage;
      updateSliderPosition(afterImage, sliderLine, percentage);
    });
    
    // Touch events
    sliderLine.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    
    card.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      
      const rect = this.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      
      slider.value = percentage;
      updateSliderPosition(afterImage, sliderLine, percentage);
    });
  });
}

function updateSliderPosition(afterImage, sliderLine, value) {
  afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
  sliderLine.style.left = `${value}%`;
}

// Карточки проектов
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    // Hover эффект
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    // Клик по карточке
    const link = card.querySelector('.btn');
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        openProjectModal(card);
      });
    }
  });
}

// Открытие модального окна проекта
function openProjectModal(card) {
  const projectData = {
    title: card.querySelector('.project-card__title')?.textContent,
    description: card.querySelector('.project-card__description')?.textContent,
    area: card.querySelector('.project-card__area')?.textContent,
    duration: card.querySelector('.project-card__duration')?.textContent,
    images: {
      before: card.querySelector('.project-card__img--before')?.src,
      after: card.querySelector('.project-card__img--after')?.src
    }
  };
  
  console.log('Открытие проекта:', projectData);
  
  // Здесь можно открыть модальное окно с подробной информацией
  showNotification('Подробная информация о проекте', 'info');
}

// Кнопка "Показать еще"
function initLoadMore() {
  const loadMoreBtn = document.querySelector('.projects__load-more .btn');
  const hiddenCards = document.querySelectorAll('.project-card[data-hidden="true"]');
  
  if (!loadMoreBtn || !hiddenCards.length) return;
  
  let visibleCount = 0;
  const cardsPerLoad = 4;
  
  loadMoreBtn.addEventListener('click', function() {
    const cardsToShow = Array.from(hiddenCards).slice(visibleCount, visibleCount + cardsPerLoad);
    
    cardsToShow.forEach((card, index) => {
      setTimeout(() => {
        card.removeAttribute('data-hidden');
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      }, index * 100);
    });
    
    visibleCount += cardsPerLoad;
    
    // Скрываем кнопку если все карточки показаны
    if (visibleCount >= hiddenCards.length) {
      this.style.display = 'none';
    }
  });
}

// Lightbox для изображений
function initLightbox() {
  const images = document.querySelectorAll('.project-card__image');
  
  images.forEach(image => {
    image.style.cursor = 'pointer';
    
    image.addEventListener('click', function(e) {
      // Не открываем если кликнули по слайдеру
      if (e.target.classList.contains('project-card__slider-input')) return;
      
      const imgSrc = this.querySelector('.project-card__img--after')?.src || 
                     this.querySelector('.project-card__img--before')?.src;
      
      if (imgSrc) {
        openLightbox(imgSrc);
      }
    });
  });
}

function openLightbox(imageSrc) {
  // Создаем lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    cursor: zoom-out;
    animation: fadeIn 0.3s ease;
  `;
  
  const img = document.createElement('img');
  img.src = imageSrc;
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 32px;
    cursor: pointer;
    transition: background 0.3s ease;
  `;
  
  closeBtn.addEventListener('mouseenter', function() {
    this.style.background = 'rgba(255, 255, 255, 0.3)';
  });
  
  closeBtn.addEventListener('mouseleave', function() {
    this.style.background = 'rgba(255, 255, 255, 0.2)';
  });
  
  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Закрытие
  const closeLightbox = () => {
    lightbox.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      lightbox.remove();
      document.body.style.overflow = '';
    }, 300);
  };
  
  lightbox.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  
  // Закрытие по Escape
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// Экспорт функций
window.filterProjects = filterProjects;
window.openLightbox = openLightbox;