// ==========================================
// ARЗАМАС ДЕКОР - MAIN JAVASCRIPT
// Performance-optimized, vanilla JS
// ==========================================

// === UTILITY FUNCTIONS ===
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};

// === NAVIGATION ===
class Navigation {
    constructor() {
        this.header = $('#header');
        this.burger = $('#burger');
        this.navMenu = $('#navMenu');
        this.navLinks = $$('.nav-link');
        
        this.init();
    }
    
    init() {
        this.burger?.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        window.addEventListener('scroll', debounce(() => this.handleScroll()));
        this.handleScroll();
    }
    
    toggleMenu() {
        this.navMenu?.classList.toggle('active');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        this.scrollToSection(targetId.replace('#', ''));
        this.navMenu?.classList.remove('active');
        
        this.navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
    }
    
    scrollToSection(id) {
        const element = $(`#${id}`);
        if (element) {
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.header?.classList.add('scrolled');
        } else {
            this.header?.classList.remove('scrolled');
        }
    }
}

// === CALCULATOR ===
class Calculator {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.data = {
            serviceType: null,
            servicePrice: 0,
            area: 0,
            options: [],
            totalPrice: 0
        };
        
        this.init();
    }
    
    init() {
        // Service type selection
        $$('input[name="serviceType"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.data.serviceType = e.target.value;
                this.data.servicePrice = parseInt(e.target.dataset.price);
            });
        });
        
        // Area input
        $('#area')?.addEventListener('input', debounce((e) => {
            this.data.area = parseInt(e.target.value) || 0;
        }));
        
        // Options selection
        $$('input[name="option"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const price = parseInt(e.target.dataset.price);
                const value = e.target.value;
                
                if (e.target.checked) {
                    this.data.options.push({ value, price });
                } else {
                    this.data.options = this.data.options.filter(opt => opt.value !== value);
                }
            });
        });
    }
    
    nextStep() {
        if (!this.validateStep()) {
            return;
        }
        
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
            
            if (this.currentStep === this.totalSteps) {
                this.calculateTotal();
            }
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }
    
    validateStep() {
        switch(this.currentStep) {
            case 1:
                if (!this.data.serviceType) {
                    alert('Пожалуйста, выберите тип работ');
                    return false;
                }
                break;
            case 2:
                if (!this.data.area || this.data.area <= 0) {
                    alert('Пожалуйста, укажите площадь');
                    return false;
                }
                break;
        }
        return true;
    }
    
    updateUI() {
        // Update steps indicator
        $$('.step').forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Show/hide step content
        $$('.calculator-step').forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });
        
        // Update navigation buttons
        const prevBtn = $('#prevBtn');
        const nextBtn = $('#nextBtn');
        
        if (this.currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }
        
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }
    }
    
    calculateTotal() {
        const basePrice = this.data.servicePrice * this.data.area;
        const optionsPrice = this.data.options.reduce((sum, opt) => sum + (opt.price * this.data.area), 0);
        this.data.totalPrice = basePrice + optionsPrice;
        
        this.displayResult();
    }
    
    displayResult() {
        const serviceNames = {
            'flexible-brick': 'Гибкий кирпич',
            'thermo-panels': 'Термопанели',
            'insulation': 'Утепление фасадов',
            'turnkey': 'Под ключ'
        };
        
        $('#resultService').textContent = serviceNames[this.data.serviceType] || '-';
        $('#resultArea').textContent = this.data.area + ' м²';
        $('#resultBase').textContent = formatPrice(this.data.servicePrice * this.data.area);
        
        if (this.data.options.length > 0) {
            const optionsPrice = this.data.options.reduce((sum, opt) => sum + (opt.price * this.data.area), 0);
            $('#resultOptions').textContent = formatPrice(optionsPrice);
            $('#resultOptionsRow').style.display = 'flex';
        } else {
            $('#resultOptionsRow').style.display = 'none';
        }
        
        $('#resultTotal').textContent = formatPrice(this.data.totalPrice);
        
        // Save calculation data for estimate
        const calculationData = JSON.stringify(this.data);
        $('#calculationData')?.setAttribute('value', calculationData);
    }
    
    setArea(value) {
        const areaInput = $('#area');
        if (areaInput) {
            areaInput.value = value;
            this.data.area = value;
        }
    }
}

// === PORTFOLIO ===
class Portfolio {
    constructor() {
        this.items = [
            {
                id: 1,
                title: 'Частный дом в Арзамасе',
                description: 'Отделка фасада гибким кирпичом',
                category: 'flexible-brick',
                icon: '🏡'
            },
            {
                id: 2,
                title: 'Коттедж с термопанелями',
                description: 'Утепление и отделка термопанелями',
                category: 'thermo-panels',
                icon: '🏠'
            },
            {
                id: 3,
                title: 'Утепление многоэтажки',
                description: 'Комплексное утепление пенопластом',
                category: 'insulation',
                icon: '🏢'
            },
            {
                id: 4,
                title: 'Дом под ключ',
                description: 'Полный цикл работ по отделке',
                category: 'flexible-brick',
                icon: '🏘️'
            },
            {
                id: 5,
                title: 'Фасад офисного здания',
                description: 'Современное решение с термопанелями',
                category: 'thermo-panels',
                icon: '🏛️'
            },
            {
                id: 6,
                title: 'Загородный дом',
                description: 'Гибкий кирпич + утепление',
                category: 'flexible-brick',
                icon: '🏡'
            }
        ];
        
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.render();
        
        $$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filter(e.target.dataset.filter);
                
                $$('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }
    
    filter(category) {
        this.currentFilter = category;
        this.render();
    }
    
    render() {
        const container = $('#portfolioGrid');
        if (!container) return;
        
        const filtered = this.currentFilter === 'all' 
            ? this.items 
            : this.items.filter(item => item.category === this.currentFilter);
        
        container.innerHTML = filtered.map(item => `
            <div class="portfolio-item" data-category="${item.category}">
                <div class="portfolio-image">${item.icon}</div>
                <div class="portfolio-info">
                    <h4 class="portfolio-title">${item.title}</h4>
                    <p class="portfolio-description">${item.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// === MODAL ===
class Modal {
    openModal(modalId) {
        const modal = $(`#${modalId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modalId) {
        const modal = $(`#${modalId}`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// === FORMS ===
class Forms {
    constructor() {
        this.init();
    }
    
    init() {
        const forms = $$('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', data);
        
        // Здесь должна быть отправка на сервер
        // Для демо просто показываем уведомление
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        
        e.target.reset();
        
        // Закрываем модальное окно если форма в модалке
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// === GLOBAL FUNCTIONS (for inline onclick handlers) ===
let calculator;
let modal;

function nextStep() {
    calculator?.nextStep();
}

function previousStep() {
    calculator?.previousStep();
}

function setArea(value) {
    calculator?.setArea(value);
}

function openModal(modalId) {
    modal?.openModal(modalId);
}

function closeModal(modalId) {
    modal?.closeModal(modalId);
}

function scrollToSection(id) {
    const nav = new Navigation();
    nav.scrollToSection(id);
}

function showServiceDetails(service) {
    const serviceInfo = {
        'flexible-brick': {
            title: 'Гибкий кирпич',
            description: 'Инновационный материал для отделки фасадов и интерьеров. Создает эффект натуральной кирпичной кладки при значительно меньшем весе и стоимости монтажа.'
        },
        'thermo-panels': {
            title: 'Термопанели',
            description: 'Комплексное решение 2 в 1: утепление и декоративная отделка. Снижает теплопотери до 40% и создает привлекательный внешний вид.'
        },
        'insulation': {
            title: 'Утепление фасадов',
            description: 'Профессиональное утепление с использованием современных материалов. Обеспечивает комфорт в доме и снижение затрат на отопление.'
        },
        'turnkey': {
            title: 'Проекты под ключ',
            description: 'Полный цикл работ от проектирования до сдачи объекта. Индивидуальный подход и гарантия качества.'
        }
    };
    
    const info = serviceInfo[service];
    if (info) {
        alert(`${info.title}\n\n${info.description}\n\nЗвоните +7 (995) 776-75-75 для консультации!`);
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    calculator = new Calculator();
    new Portfolio();
    modal = new Modal();
    new Forms();
    
    console.log('🎨 Арзамас Декор - сайт загружен успешно!');
});