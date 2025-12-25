/**
 * 🖼️ Lazy Loading для изображений
 * Автоматически загружает изображения при появлении в области видимости
 * Использование: добавьте data-src вместо src в img тегах
 */

(function() {
    'use strict';

    // Проверка поддержки IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver не поддерживается, используем fallback');
        loadAllImages();
        return;
    }

    // Конфигурация observer
    const config = {
        root: null, // viewport
        rootMargin: '50px', // Загружать за 50px до появления
        threshold: 0.01 // 1% видимости
    };

    // Placeholder SVG (серый фон)
    const placeholderSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EЗагрузка...%3C/text%3E%3C/svg%3E';

    // Функция загрузки изображения
    function loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (!src) return;

        // Preload image
        const tempImg = new Image();
        
        tempImg.onload = function() {
            img.src = src;
            if (srcset) img.srcset = srcset;
            img.classList.add('loaded');
            img.classList.remove('lazy');
            
            // Анимация появления
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.3s ease-in-out';
                img.style.opacity = '1';
            }, 10);
        };

        tempImg.onerror = function() {
            console.error('Ошибка загрузки изображения:', src);
            img.classList.add('error');
        };

        tempImg.src = src;
        if (srcset) tempImg.srcset = srcset;
    }

    // Callback для observer
    function onIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }

    // Создаём observer
    const observer = new IntersectionObserver(onIntersection, config);

    // Инициализация
    function initLazyLoading() {
        // Находим все изображения с data-src
        const lazyImages = document.querySelectorAll('img[data-src]');

        lazyImages.forEach(img => {
            // Добавляем placeholder
            if (!img.src || img.src === window.location.href) {
                img.src = placeholderSVG;
            }
            img.classList.add('lazy');
            observer.observe(img);
        });

        console.log(`🖼️ Lazy loading: найдено ${lazyImages.length} изображений`);
    }

    // Fallback для старых браузеров
    function loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(loadImage);
    }

    // Автозапуск при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoading);
    } else {
        initLazyLoading();
    }

    // Переинициализация при динамическом добавлении контента
    window.reinitLazyLoading = initLazyLoading;

    // CSS для lazy loading
    const style = document.createElement('style');
    style.textContent = `
        img.lazy {
            filter: blur(5px);
            transition: filter 0.3s;
        }
        img.lazy.loaded {
            filter: blur(0);
        }
        img.lazy.error {
            filter: none;
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);

})();

/**
 * Пример использования в HTML:
 * 
 * <img data-src="/images/photo.jpg" 
 *      data-srcset="/images/photo-400.jpg 400w, /images/photo-800.jpg 800w"
 *      alt="Описание"
 *      width="800" 
 *      height="600">
 * 
 * При динамическом добавлении контента:
 * window.reinitLazyLoading();
 */