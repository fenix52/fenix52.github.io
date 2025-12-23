// Modal functionality

class Modal {
  constructor() {
    this.modals = document.querySelectorAll('.modal');
    this.openButtons = document.querySelectorAll('[data-modal]');
    this.closeButtons = document.querySelectorAll('[data-modal-close]');
    this.activeModal = null;
    
    this.init();
  }

  init() {
    this.setupOpenButtons();
    this.setupCloseButtons();
    this.setupOverlayClose();
    this.setupEscapeClose();
  }

  setupOpenButtons() {
    this.openButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.dataset.modal;
        this.open(modalId);
      });
    });
  }

  setupCloseButtons() {
    this.closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });
  }

  setupOverlayClose() {
    this.modals.forEach(modal => {
      const overlay = modal.querySelector('.modal__overlay');
      if (overlay) {
        overlay.addEventListener('click', () => {
          this.close();
        });
      }
    });
  }

  setupEscapeClose() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });
  }

  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    this.activeModal = modal;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const content = modal.querySelector('.modal__content');
      if (content) {
        content.style.transform = 'scale(1)';
      }
    }, 10);
  }

  close() {
    if (!this.activeModal) return;

    const content = this.activeModal.querySelector('.modal__content');
    if (content) {
      content.style.transform = 'scale(0.9)';
    }

    setTimeout(() => {
      this.activeModal.classList.remove('active');
      this.activeModal = null;
      document.body.style.overflow = '';
    }, 300);
  }

  showWithContent(title, content) {
    const modalHTML = `
      <div class="modal active" id="tempModal">
        <div class="modal__overlay"></div>
        <div class="modal__content">
          <button class="modal__close" data-modal-close>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <h3>${title}</h3>
          <div>${content}</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('tempModal');
    
    this.activeModal = modal;
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('[data-modal-close]');
    const overlay = modal.querySelector('.modal__overlay');

    closeBtn?.addEventListener('click', () => this.closeTemp(modal));
    overlay?.addEventListener('click', () => this.closeTemp(modal));
  }

  closeTemp(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      modal.remove();
      this.activeModal = null;
    }, 300);
  }
}

let modalInstance;

document.addEventListener('DOMContentLoaded', () => {
  modalInstance = new Modal();
});

function openModal(modalId) {
  if (modalInstance) {
    modalInstance.open(modalId);
  }
}

function closeModal() {
  if (modalInstance) {
    modalInstance.close();
  }
}