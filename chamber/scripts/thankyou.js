/**
 * Thank you page: display form data from URL query string (GET)
 */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const setDisplay = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      const value = params.get(key);
      el.textContent = value ? decodeURIComponent(value) : '—';
    }
  };

  setDisplay('display-firstname', 'firstname');
  setDisplay('display-lastname', 'lastname');
  setDisplay('display-email', 'email');
  setDisplay('display-phone', 'phone');
  setDisplay('display-organization', 'organization');

  const timestampEl = document.getElementById('display-timestamp');
  if (timestampEl) {
    const raw = params.get('timestamp');
    if (raw) {
      try {
        const date = new Date(decodeURIComponent(raw));
        timestampEl.textContent = date.toLocaleString();
      } catch {
        timestampEl.textContent = decodeURIComponent(raw);
      }
    } else {
      timestampEl.textContent = '—';
    }
  }
});
