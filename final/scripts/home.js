import { loadSchedule } from './dataLoader.js';

const FEATURED_COUNT = 5;

async function renderFeatured() {
  const container = document.getElementById('featured-container');
  if (!container) return;

  const data = await loadSchedule();
  const items = data.items || [];
  const featured = items
    .filter((item) => item.title && item.date)
    .slice(0, FEATURED_COUNT);

  if (featured.length === 0) {
    container.innerHTML = '<p>No upcoming items right now.</p>';
    return;
  }

  container.innerHTML = featured
    .map(
      (item) => `
    <article class="card" data-id="${item.id}">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="card-meta">${escapeHtml(item.date)} · ${escapeHtml(item.time)}</p>
      <p class="card-meta">${escapeHtml(item.location)}</p>
    </article>
  `
    )
    .join('');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', renderFeatured);
