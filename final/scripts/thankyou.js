/**
 * Thank you page: display form data from URL search params.
 * ES Module.
 */

function displayFormData() {
  const params = new URLSearchParams(window.location.search);
  const dl = document.getElementById('form-summary');
  if (!dl) return;

  const fields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
  ];

  dl.innerHTML = fields
    .map(({ key, label }) => {
      const value = params.get(key);
      const display = value ? escapeHtml(decodeURIComponent(value)) : '—';
      return `<dt>${escapeHtml(label)}</dt><dd>${display}</dd>`;
    })
    .join('');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', displayFormData);
