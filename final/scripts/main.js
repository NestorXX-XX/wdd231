/**
 * Shared: nav hamburger, current year. ES Module.
 */

const navButton = document.getElementById('nav-button');
const navBar = document.getElementById('nav-bar');

if (navButton && navBar) {
  navButton.addEventListener('click', () => {
    navButton.classList.toggle('open');
    navBar.classList.toggle('open');
    const isOpen = navBar.classList.contains('open');
    navButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

const yearEl = document.getElementById('currentyear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
