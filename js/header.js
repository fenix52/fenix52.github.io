// Header Navigation

class Header {
    constructor() {
        this.header = document.getElementById('header');
        this.burger = document.getElementById('burger');
        this.nav = document.getElementById('nav');
        this.menuLinks = document.querySelectorAll('.header__menu-link');
        this.lastScrollTop = 0;
        
        this.init();
    }
    
    init() {
        // Burger menu toggle
        if (this.burger) {
            this.burger.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu on link click
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.utils.smoothScrollTo(targetSection);
                    this.closeMenu();
                    this.updateActiveLink(link);
                }
            });
        });
        
        // Scroll events
        window.addEventListener('scroll', window.utils.throttle(() => {
            this.handleScroll();
            this.updateActiveOnScroll();
        }, 100));
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.header.contains(e.target) && this.nav.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.burger.classList.toggle('active');
        this.nav.classList.toggle('active');
        
        if (this.nav.classList.contains('active')) {
            window.utils.lockBodyScroll();
        } else {
            window.utils.unlockBodyScroll();
        }
    }
    
    closeMenu() {
        this.burger.classList.remove('active');
        this.nav.classList.remove('active');
        window.utils.unlockBodyScroll();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > 50) {
            this.header.classList.add('header--scrolled');
        } else {
            this.header.classList.remove('header--scrolled');
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    updateActiveLink(activeLink) {
        this.menuLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    updateActiveOnScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.pageYOffset + this.header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Initialize header
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});