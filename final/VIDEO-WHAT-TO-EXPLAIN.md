# What to Explain in Each Part of the Video

Use this as a script: say these ideas in your own words while you show the code/screen.

---

## Part 1 – Introduction (~30 seconds)

**Face on camera.**

- Say your **name**.
- Say this is your **WDD 231 Final Project** video.
- Say the project is **Hoop Hub**, a basketball club site with meetings and events.
- Optional: “I’ll show where we use local JSON data, async code with try/catch, and ES modules.”

**Screen:** Have the live site open (e.g. `https://nestorxx-xx.github.io/wdd231/final/`).

---

## Part 2 – API / Local JSON Data + Output (~1–1.5 min)

**What to explain:**

1. **Where the data lives**
   - Open **`final/data/schedule.json`**.
   - Say: “We use **local JSON** as our data source—no external API. The file has an **items** array.”
   - Say: “Each item has **id, title, date, time, location, description, and type** (meeting or event).”
   - Scroll and point at 2–3 properties so the grader sees the structure.

2. **How we load it**
   - Open **`final/scripts/dataLoader.js`**.
   - Say: “We load this file with the **Fetch API**. The constant **DATA_URL** points to `./data/schedule.json`.”
   - Point at **`await fetch(DATA_URL)`**: “This **fetch** gets the file from the server.”
   - Point at **`await response.json()`**: “We parse the response as **JSON** and return it.”

3. **Where it shows on the site**
   - Open the site in the browser.
   - Go to **Meetings** or **Events**.
   - Say: “This page gets the data from that JSON. The **meetings** page shows only items where type is **meeting**; the **events** page shows only **event**. Each card shows **title, date, time, location**—that’s the JSON data rendered on the page.”

**Key phrases to say:** “local JSON,” “Fetch API,” “items array,” “data is displayed on the page.”

---

## Part 3 – Asynchronous Code + try Block (~1 min)

**Stay in `final/scripts/dataLoader.js`.**

**What to explain:**

1. **Async**
   - Point at **`export async function loadSchedule()`**.
   - Say: “This function is **async** because **fetch** is asynchronous. We don’t block the page while the file loads.”

2. **try block**
   - Point at **`try {`**.
   - Say: “We wrap the **fetch** and **response.json()** in a **try** block.”
   - Say: “If the file is missing or the server returns an error, we **throw** an error when **response.ok** is false.”

3. **catch block**
   - Point at **`} catch (err) {`**.
   - Say: “In the **catch** block we handle any error: we log it to the console and return **`{ items: [] }`** so the page still works and doesn’t crash.”

4. **await (optional)**
   - Say: “Other scripts use **await loadSchedule()** so they wait for the data before building the cards.”  
   - You can briefly open **`home.js`** or **`schedule.js`** and point at **`await loadSchedule()`**.

**Key phrases to say:** “async function,” “try block,” “catch block,” “error handling.”

---

## Part 4 – ES Modules (~1 min)

**What to explain:**

1. **Export (in dataLoader.js)**
   - Open **`final/scripts/dataLoader.js`**.
   - Point at **`export async function loadSchedule()`**.
   - Say: “This file **exports** the function **loadSchedule**. That makes it an **ES module** so other files can import it.”

2. **Import (in schedule.js or home.js)**
   - Open **`final/scripts/schedule.js`** (or **`home.js`**).
   - Point at the very top: **`import { loadSchedule } from './dataLoader.js';`**
   - Say: “This file **imports** **loadSchedule** from **dataLoader.js**. So we’re using **ES modules** to split the code: one file loads data, the others use it.”

3. **type="module" in HTML**
   - Open **`final/meetings.html`** (or **index.html**).
   - Scroll to the bottom and point at: **`<script type="module" src="scripts/schedule.js"></script>`**
   - Say: “The script tag has **type equals module**. That tells the browser to run this as an **ES module**, which allows **import** and **export**. Without it, import would not work.”

**Key phrases to say:** “export,” “import,” “ES module,” “type="module".”

---

## Part 5 – Wrap-Up (~20 seconds)

**Face on camera.**

- Say you showed:
  1. **Local JSON data** and where it’s used on the site (Meetings/Events).
  2. **Asynchronous** loading with **try** and **catch** in **dataLoader.js**.
  3. **ES modules**: **export** in **dataLoader.js**, **import** in **schedule.js** and **home.js**, and **type="module"** in the HTML.
- Say: “The link to this video is in the footer of every page of the site.”

---

## Quick Reference – Files to Show

| Part        | File(s) to show                    | What to point at |
|------------|-------------------------------------|------------------|
| 2 – JSON   | `final/data/schedule.json`         | `items` array, a few properties |
| 2 – Load   | `final/scripts/dataLoader.js`      | `fetch(DATA_URL)`, `response.json()` |
| 2 – Output | Browser: Meetings or Events page   | Cards with title, date, time, location |
| 3 – try    | `final/scripts/dataLoader.js`      | `async`, `try {`, `catch (err) {` |
| 4 – Export | `final/scripts/dataLoader.js`      | `export async function loadSchedule` |
| 4 – Import | `final/scripts/schedule.js` or `home.js` | `import { loadSchedule } from './dataLoader.js'` |
| 4 – Module | `final/meetings.html` or `index.html`   | `<script type="module" src="scripts/...">` |

---

## Rubric Reminder

The video must demonstrate:

1. **API or local JSON data** → You showed **schedule.json** and how it’s fetched and **displayed** on Meetings/Events.
2. **Asynchronous functionality with a try block** → You showed **async**, **try/catch** in **dataLoader.js**.
3. **ES module use** → You showed **export**, **import**, and **type="module"** in the HTML.

Length: **3–5 minutes**. Camera on (face visible) + screen recording.
