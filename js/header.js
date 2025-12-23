/**
 * Header Navigation - Функционал навигации
 * Управление мобильным меню, активными ссылками
 */

document.addEventListener('DOMContentLoaded', function() {
  initHeaderNavigation();
});

function initHeaderNavigation() {
  initBurgerMenu();
  initActiveMenuLinks();
  initHeaderScroll();
  
  console.log('✅ Навигация инициализирована');
}

// Бургер-меню
function initBurgerMenu() {
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const overlay = document.querySelector('.header__overlay');
  const menuLinks = document.querySelectorAll('.header__menu-link');
  
  if (!burger || !nav) return;
  
  // Открытие/закрытие меню
  burger.addEventListener('click', function() {
    toggleMenu();
  });
  
  // Закрытие при клике на overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      closeMenu();
    });
  }
  
  // Закрытие при клике на ссылку
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 1024) {
        closeMenu();
      }
    });
  });
  
  // Закрытие при нажатии Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });
  
  function toggleMenu() {
    const isActive = nav.classList.contains('active');
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  function openMenu() {
    nav.classList.add('active');
    burger.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    nav.classList.remove('active');
    burger.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Активная ссылка меню
function initActiveMenuLinks() {
  const menuLinks = document.querySelectorAll('.header__menu-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (!menuLinks.length || !sections.length) return;
  
  // Обновление активной ссылки при скролле
  window.addEventListener('scroll', throttle(function() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    menuLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, 100));
}

// Изменение хедера при скролле
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  let isScrollingDown = false;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Добавляем класс при скролле вниз
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Скрываем хедер при скролле вниз (опционально)
    if (currentScroll > lastScroll && currentScroll > 300) {
      // Скроллим вниз
      if (!isScrollingDown) {
        isScrollingDown = true;
        // header.style.transform = 'translateY(-100%)';
      }
    } else {
      // Скроллим вверх
      if (isScrollingDown) {
        isScrollingDown = false;
        // header.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  });
}

// Dropdown меню (если потребуется)
function initDropdownMenus() {
  const dropdowns = document.querySelectorAll('.header__menu-item--dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.header__menu-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!trigger || !menu) return;
    
    // Desktop hover
    if (window.innerWidth >= 1024) {
      dropdown.addEventListener('mouseenter', function() {
        menu.classList.add('active');
      });
      
      dropdown.addEventListener('mouseleave', function() {
        menu.classList.remove('active');
      });
    }
    
    // Mobile click
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        menu.classList.toggle('active');
      }
    });
  });
}

// Липкий хедер при прокрутке вниз
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('sticky', !entry.isIntersecting);
    },
    { threshold: [0] }
  );
  
  // Создаем sentinel элемент
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  document.body.insertBefore(sentinel, document.body.firstChild);
  observer.observe(sentinel);
}