/**
 * Load schedule data from local JSON (async, try/catch).
 * ES Module – used by home.js and schedule.js.
 */

const DATA_URL = './data/schedule.json';

/**
 * Fetches and parses schedule data.
 * @returns {Promise<{ items: Array<{ id: string, title: string, date: string, time: string, location: string, description: string, type: string }> }>}
 */
export async function loadSchedule() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to load schedule:', err);
    return { items: [] };
  }
}
