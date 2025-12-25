/**
 * Загрузчик HTML компонентов
 * Используется для переиспользования Header и Footer на всех страницах
 */

// Функция загрузки компонента
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            
            // Инициализация скриптов после загрузки
            if (elementId === 'header-placeholder') {
                initHeader();
            }
        }
    } catch (error) {
        console.error(`Ошибка загрузки компонента ${componentPath}:`, error);
    }
}

// Инициализация Header (бургер меню, скролл)
function initHeader() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    const menuLinks = document.querySelectorAll('.header__menu-link');

    // Бургер меню
    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Accessibility
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
        });

        // Закрытие меню при клике на ссылку
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && nav.classList.contains('active')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Скролл эффект для header
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Активная ссылка в меню
    highlightActiveLink();
}

// Подсветка активной ссылки
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.header__menu-link');
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        
        // Главная страница
        if (currentPath === '/' || currentPath === '/index.html') {
            if (link.getAttribute('data-page') === 'home') {
                link.classList.add('active');
            }
        }
        // Калькулятор
        else if (currentPath.includes('calculator')) {
            if (link.getAttribute('data-page') === 'calculator') {
                link.classList.add('active');
            }
        }
    });

    // Подсветка при скролле к секциям
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `/#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Плавный скролл к якорям
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Загрузка компонентов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загрузка Header и Footer
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');
    
    // Инициализация плавного скролла
    setTimeout(() => {
        initSmoothScroll();
    }, 100);
});