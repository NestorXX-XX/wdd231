/**
 * Join page: timestamp, modals, membership card animation
 */

// Set hidden timestamp when form loads (when page loads)
document.addEventListener('DOMContentLoaded', () => {
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();
  }

  // Membership card entrance animation (runs once on load, not on hover)
  const cards = document.querySelectorAll('.membership-card');
  cards.forEach((card, index) => {
    card.classList.add('card-animate');
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // Modal open/close
  const modalLinks = document.querySelectorAll('.card-link[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('modal-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalEl) {
    if (modalEl) {
      modalEl.classList.remove('modal-open');
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    modals.forEach((modal) => closeModal(modal));
  }

  modalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
});
