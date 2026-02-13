# WDD 231 Final Project – Video Demonstration Script

**Length:** 3–5 minutes  
**Requirements:** Show your face (camera on) + screen recording.  
**Upload to:** YouTube or Loom (public link).  
**Link in:** Footer of every project page.

---

## 1. Introduction (about 30 seconds)

- **On camera:** Say your name and that this is your WDD 231 Final Project video for the Hoop Hub basketball club site.
- **Screen:** Have the project open at `https://nestorxx-xx.github.io/wdd231/final/` (or local).

---

## 2. API / Local JSON Data + Output (about 1–1.5 minutes)

**Requirement:** Show how you use API or local JSON and the resulting output.

1. **Screen:** Open your repo in the editor (or GitHub).
2. **Show the data file:** Navigate to **`final/data/schedule.json`**.
   - Say: “Schedule data is stored in a local JSON file. It has an `items` array with meetings and events.”
   - Scroll to show a few items (id, title, date, time, location, description, type).
3. **Show how it’s loaded:** Open **`final/scripts/dataLoader.js`**.
   - Say: “The Fetch API loads this file. The function `loadSchedule` fetches the JSON and returns the parsed data.”
   - Point to the `fetch(DATA_URL)` and `response.json()`.
4. **Show the output in the browser:**
   - Go to **Meetings** or **Events**.
   - Say: “The meetings page filters by type ‘meeting’ and the events page by ‘event’. The cards are built from this data—title, date, time, location—so we’re displaying the JSON data on the page.”

---

## 3. Asynchronous Functionality with a try Block (about 1 minute)

**Requirement:** Show asynchronous code and a try block.

1. **Screen:** Stay in **`final/scripts/dataLoader.js`**.
2. **Point out:**
   - The **async** function: “`loadSchedule` is an async function.”
   - The **try block:** “We use try/catch around the fetch and JSON parsing.”
   - Say: “If the file is missing or the response isn’t OK, we throw or handle the error. In the catch block we log the error and return an empty items array so the page doesn’t break.”
3. **Optional:** Briefly show **`final/scripts/schedule.js`** or **`home.js`** and say: “These scripts use `await loadSchedule()` so the rest of the code runs after the data is loaded.”

---

## 4. ES Module Use (about 1 minute)

**Requirement:** Show ES module import/export.

1. **Screen:** Open **`final/scripts/dataLoader.js`**.
   - Point to: **`export async function loadSchedule()`**.
   - Say: “This file exports `loadSchedule` as an ES module.”
2. Open **`final/scripts/schedule.js`** (or **`home.js`**).
   - Point to the top: **`import { loadSchedule } from './dataLoader.js';`**
   - Say: “Schedule and home pages import `loadSchedule` from the dataLoader module.”
3. **Screen:** Open **`final/meetings.html`** (or any page that uses the schedule).
   - Point to: **`<script type="module" src="scripts/schedule.js"></script>`**.
   - Say: “The script is loaded with `type="module"` so the browser treats it as an ES module and allows import/export.”

---

## 5. Wrap-Up (about 20 seconds)

- **On camera:** Briefly say you’ve shown (1) local JSON data and where it appears on the site, (2) async fetch with try/catch, and (3) ES modules with export and import.
- Remind viewers that the video link is in the footer of the site.

---

## Checklist Before Recording

- [ ] Camera on (face visible).
- [ ] Screen recording includes: repo/files and live site (or local).
- [ ] You actually say or point to: **JSON file**, **fetch/try/catch**, **export/import**, and **type="module"**.
- [ ] Total length between 3 and 5 minutes.
- [ ] After uploading, put the video URL in the footer of **index.html**, **meetings.html**, **events.html**, **join.html**, and **thankyou.html** (replace the placeholder).

---

## Where to Put the Video Link

In each of these files, find the footer line that says:

`WDD 231 Project Video Demonstration ... (replace with your video link)`

Replace `https://youtube.com` (or the current href) with your real video URL, and remove the “(replace with your video link)” text once it’s added.
