// Компоненты Header и Footer
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 components.js загружен');
    
    // Загрузка Header
    fetch('/components/header.html')
        .then(r => r.text())
        .then(html => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = html;
                initBurgerMenu();
            }
        })
        .catch(err => console.error('❌ Ошибка загрузки header:', err));
    
    // Загрузка Footer
    fetch('/components/footer.html')
        .then(r => r.text())
        .then(html => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) placeholder.innerHTML = html;
        })
        .catch(err => console.error('❌ Ошибка загрузки footer:', err));
});

// Исправленное гамбургер-меню
function initBurgerMenu() {
    // Небольшая задержка для полной отрисовки DOM
    setTimeout(() => {
        const burger = document.querySelector('.header__burger');
        const nav = document.querySelector('.header__nav');
        
        console.log('🍔 Burger:', burger);
        console.log('🧭 Nav:', nav);
        
        if (!burger || !nav) {
            console.error('❌ Элементы не найдены!');
            return;
        }
        
        // Клик по бургеру
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            console.log('🍔 Клик по бургеру, active:', nav.classList.contains('active'));
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // НЕ закрывать при клике внутри nav
        nav.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        console.log('✅ Гамбургер-меню инициализировано');
    }, 100);
}