const DATA_URL = './data/schedule.json';

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
