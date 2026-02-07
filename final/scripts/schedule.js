/**
 * Meetings / Events pages: load data, render 15+ items (4+ props), grid/list view (localStorage), modal details.
 * ES Module – DOM manipulation, array methods, template literals.
 */

import { loadSchedule } from './dataLoader.js';
import { initModal } from './modals.js';

const STORAGE_VIEW_KEY = 'hoophub-schedule-view';

function getPageType() {
  const path = window.location.pathname || '';
  return path.includes('events') ? 'event' : 'meeting';
}

function getStoredView() {
  try {
    return localStorage.getItem(STORAGE_VIEW_KEY) || 'grid';
  } catch {
    return 'grid';
  }
}

function setStoredView(view) {
  try {
    localStorage.setItem(STORAGE_VIEW_KEY, view);
  } catch (_) {}
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatItemCard(item) {
  return `
    <article class="card" data-id="${escapeHtml(item.id)}" tabindex="0" role="button">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="card-meta"><strong>Date:</strong> ${escapeHtml(item.date)}</p>
      <p class="card-meta"><strong>Time:</strong> ${escapeHtml(item.time)}</p>
      <p class="card-meta"><strong>Location:</strong> ${escapeHtml(item.location)}</p>
    </article>
  `;
}

function formatModalBody(item) {
  return `
    <p><strong>Title:</strong> ${escapeHtml(item.title)}</p>
    <p><strong>Date:</strong> ${escapeHtml(item.date)}</p>
    <p><strong>Time:</strong> ${escapeHtml(item.time)}</p>
    <p><strong>Location:</strong> ${escapeHtml(item.location)}</p>
    <p><strong>Description:</strong> ${escapeHtml(item.description || '—')}</p>
  `;
}

async function run() {
  const container = document.getElementById('schedule-list');
  const modalEl = document.getElementById('detail-modal');
  if (!container) return;

  const pageType = getPageType();
  const data = await loadSchedule();
  const items = (data.items || []).filter((item) => item.type === pageType);

  const view = getStoredView();
  container.classList.toggle('list-layout', view === 'list');
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  if (gridBtn) gridBtn.classList.toggle('active', view === 'grid');
  if (listBtn) listBtn.classList.toggle('active', view === 'list');

  container.innerHTML = items
    .map((item) => formatItemCard(item))
    .join('');

  let modalOpen = null;
  if (modalEl) {
    const modalTitle = modalEl.querySelector('#modal-title');
    const modalBody = modalEl.querySelector('#modal-body');
    modalOpen = initModal('detail-modal', 'modal-close', (item) => {
      if (modalTitle) modalTitle.textContent = item.title || 'Details';
      if (modalBody) modalBody.innerHTML = formatModalBody(item);
    });
  }

  container.querySelectorAll('.card').forEach((card) => {
    const id = card.getAttribute('data-id');
    const item = items.find((i) => i.id === id);
    if (!item || !modalOpen) return;
    card.addEventListener('click', () => modalOpen.open(item));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        modalOpen.open(item);
      }
    });
  });

  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      container.classList.remove('list-layout');
      gridBtn.classList.add('active');
      if (listBtn) listBtn.classList.remove('active');
      setStoredView('grid');
    });
  }
  if (listBtn) {
    listBtn.addEventListener('click', () => {
      container.classList.add('list-layout');
      listBtn.classList.add('active');
      if (gridBtn) gridBtn.classList.remove('active');
      setStoredView('list');
    });
  }
}

document.addEventListener('DOMContentLoaded', run);
