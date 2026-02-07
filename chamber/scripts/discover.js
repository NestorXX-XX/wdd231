/**
 * Discover page: load places from data/places.mjs, build 8 cards, localStorage visit message.
 */

import { places } from "../data/places.mjs";

const VISIT_KEY = "laspalmas-lastvisit";

function getVisitMessage() {
  const now = Date.now();
  const lastStr = localStorage.getItem(VISIT_KEY);

  if (!lastStr) {
    localStorage.setItem(VISIT_KEY, String(now));
    return "Welcome! Let us know if you have any questions.";
  }

  const last = parseInt(lastStr, 10);
  const diffMs = now - last;
  const oneDay = 24 * 60 * 60 * 1000;

  if (diffMs < oneDay) {
    localStorage.setItem(VISIT_KEY, String(now));
    return "Back so soon! Awesome!";
  }

  const days = Math.floor(diffMs / oneDay);
  localStorage.setItem(VISIT_KEY, String(now));

  if (days === 1) {
    return "You last visited 1 day ago.";
  }
  return `You last visited ${days} days ago.`;
}

function renderVisitMessage() {
  const section = document.getElementById("visit-message");
  const textEl = document.getElementById("visit-text");
  const closeBtn = document.getElementById("visit-close");

  if (!section || !textEl) return;

  textEl.textContent = getVisitMessage();
  section.classList.add("visible");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      section.classList.remove("visible");
    });
  }
}

function buildCards() {
  const container = document.getElementById("discover-cards");
  if (!container) return;

  container.innerHTML = places
    .map(
      (place) => `
    <article class="discover-card" style="grid-area: ${place.gridArea}">
      <h2>${escapeHtml(place.title)}</h2>
      <figure>
        <img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.title)}" width="300" height="200" loading="lazy">
      </figure>
      <address>${escapeHtml(place.address)}</address>
      <p>${escapeHtml(place.description)}</p>
      <button type="button" class="learn-more">Learn more</button>
    </article>
  `
    )
    .join("");
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  renderVisitMessage();
  buildCards();
});
