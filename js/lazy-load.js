/**
 * Lazy Loading Images
 * Оптимизация загрузки изображений
 */

(function() {
    'use strict';

    // Проверка поддержки IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        // Создаём новое изображение для проверки загрузки
                        const tempImg = new Image();
                        
                        tempImg.onload = () => {
                            img.src = src;
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        };
                        
                        tempImg.onerror = () => {
                            console.error('Failed to load image:', src);
                            img.classList.add('error');
                        };
                        
                        tempImg.src = src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Наблюдаем за всеми изображениями с data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

    } else {
        // Fallback для старых браузеров - загружаем все сразу
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }

    // CSS для плавного появления
    const style = document.createElement('style');
    style.textContent = `
        img[data-src] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img.loaded {
            opacity: 1;
        }
        img.error {
            opacity: 0.3;
        }
    `;
    document.head.appendChild(style);
})();