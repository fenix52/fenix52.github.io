// Modal Management

class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.openButtons = document.querySelectorAll('[data-modal]');
        this.closeButtons = document.querySelectorAll('[data-modal-close]');
        
        this.init();
    }
    
    init() {
        // Open modal buttons
        this.openButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.dataset.modal;
                const serviceType = btn.dataset.service;
                
                this.openModal(modalId, serviceType);
            });
        });
        
        // Close buttons
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });
        
        // Close on overlay click
        this.modals.forEach(modal => {
            const overlay = modal.querySelector('.modal__overlay');
            if (overlay) {
                overlay.addEventListener('click', () => this.closeModal(modal));
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    openModal(modalId, serviceType = null) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Load service details if needed
        if (serviceType && modalId === 'serviceModal') {
            this.loadServiceDetails(serviceType);
        }
        
        modal.classList.add('active');
        window.utils.lockBodyScroll();
        
        // Animate modal
        setTimeout(() => {
            const content = modal.querySelector('.modal__content');
            if (content) {
                content.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }
        }, 10);
    }
    
    closeModal(modal) {
        const content = modal.querySelector('.modal__content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'scale(0.95)';
        }
        
        setTimeout(() => {
            modal.classList.remove('active');
            window.utils.unlockBodyScroll();
        }, 200);
    }
    
    closeAllModals() {
        this.modals.forEach(modal => this.closeModal(modal));
    }
    
    loadServiceDetails(serviceType) {
        const contentElement = document.getElementById('serviceModalContent');
        if (!contentElement) return;
        
        // Service data (in real app, this would come from API)
        const serviceData = {
            brick: {
                title: 'Гибкий кирпич',
                description: 'Подробное описание услуги по установке гибкого кирпича...',
                features: ['Срок службы до 50 лет', 'Устойчив к влаге', 'Простой монтаж']
            },
            thermopanel: {
                title: 'Термопанели',
                description: 'Подробное описание услуги по установке термопанелей...',
                features: ['Утепление + отделка', 'Экономия на отоплении', 'Быстрый монтаж']
            },
            insulation: {
                title: 'Утепление фасада',
                description: 'Подробное описание услуги по утеплению фасада...',
                features: ['Различные материалы', 'Защита от холода', 'Профессиональный монтаж']
            },
            complex: {
                title: 'Комплексное решение',
                description: 'Подробное описание комплексного решения...',
                features: ['Полный цикл работ', 'Единая гарантия', 'Оптимальная цена']
            }
        };
        
        const service = serviceData[serviceType];
        if (!service) return;
        
        contentElement.innerHTML = `
            <h3 style="font-size: 2rem; margin-bottom: 1rem;">${service.title}</h3>
            <p style="color: var(--color-text-light); margin-bottom: 2rem;">${service.description}</p>
            <ul style="list-style: none; padding: 0;">
                ${service.features.map(feature => `
                    <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--color-success);">✓</span>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

// Initialize modal manager
document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});