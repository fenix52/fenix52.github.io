// Header functionality

class Header {
  constructor() {
    this.header = document.getElementById('header');
    this.burger = document.getElementById('burger');
    this.nav = document.getElementById('nav');
    this.menuLinks = document.querySelectorAll('.header__menu-link');
    this.lastScroll = 0;
    
    this.init();
  }

  init() {
    this.setupBurgerMenu();
    this.setupScrollBehavior();
    this.setupActiveLinks();
    this.setupSmoothScroll();
  }

  setupBurgerMenu() {
    if (!this.burger || !this.nav) return;

    this.burger.addEventListener('click', () => {
      this.toggleMenu();
    });

    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.nav.classList.contains('active')) {
          this.toggleMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (this.nav.classList.contains('active') && 
          !this.nav.contains(e.target) && 
          !this.burger.contains(e.target)) {
        this.toggleMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.nav.classList.contains('active')) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    this.burger.classList.toggle('active');
    this.nav.classList.toggle('active');
    document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
  }

  setupScrollBehavior() {
    if (!this.header) return;

    const handleScroll = throttle(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      this.lastScroll = currentScroll;
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = throttle(() => {
      const scrollY = window.pageYOffset;
      const headerHeight = this.header?.offsetHeight || 0;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          this.menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }

  setupSmoothScroll() {
    this.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            smoothScrollTo(target);
          }
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Header();
});