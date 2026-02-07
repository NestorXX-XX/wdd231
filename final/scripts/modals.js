/**
 * Modal dialog open/close. Accessible and keyboard-friendly.
 * ES Module.
 */

/**
 * Initialize modal: open on trigger, close on button/overlay/Escape.
 * @param {string} modalId - ID of the modal element
 * @param {string} closeBtnClass - Class of the close button inside the modal
 * @param { (item: object) => void } [onOpen] - Optional callback when opening (e.g. to fill content)
 */
export function initModal(modalId, closeBtnClass, onOpen) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const content = modal.querySelector('.modal-content');
  const closeBtn = modal.querySelector(`.${closeBtnClass}`);

  function open(item) {
    if (typeof onOpen === 'function') onOpen(item);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', close);
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  return { open, close };
}
