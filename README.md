# Infinite Task Overlay

A transparent, draggable, auto-scrolling task overlay built with Electron — designed for streamers, students, and anyone who wants a visual to-do list on screen.

---

## Who is this for?

Anyone who downloaded this project and wants to run it on their own machine. No coding required.

This guide includes:
- Step-by-step setup for **Windows users**
- Step-by-step setup for **macOS users**
- How to use the overlay and control panel
- How to customize appearance and behavior

---

## How to Download This Project

1. Download the .zip file for your system
2. Extract the folder somewhere you can find it (e.g., your Desktop)  
3. Follow the setup instructions below for your operating system

---

## For Windows Users

### Requirements:
- Windows 10 or 11
- Node.js installed

### 1. Install Node.js

Go to https://nodejs.org  
Download the **LTS version** for Windows (`.msi`) and install it.

After installing, open **Command Prompt** and type:

```
node -v
npm -v
```

If you see version numbers, you're ready.

### 2. Set up the overlay

1. Extract the downloaded .zip folder
2. Open **Command Prompt,** type `cd ` (with a space), then drag the project folder into the Command Prompt window → Press **Enter**.
3. Then type and enter:

```
npm install
```

### 3. Run the app

```
npm start
```

This will launch:
- The scrolling overlay window
- The control panel to manage tasks

### 4. Add to OBS (Optional)

1. Open Task List overlay and control panel → enable OBS mode
2. Open OBS
3. Add a **Window Capture** source
4. Select the Electron overlay window
5. Crop/resize as you like

### 5. How to Launch Again

1. Open Command Prompt, then type `cd ` (with a space), and drag the project folder again into the Command Prompt window. Press **Enter**
2. Start the overlay by typing: `npm start`

---

## For macOS Users

### Requirements
- macOS Ventura or newer
- [Node.js (LTS)](https://nodejs.org) installed

### Step 1: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS version for macOS (.pkg)**
3. Install it using the default settings

Then open **Terminal** and check:

```bash
node -v
npm -v
```

If you see version numbers, you're good to go.

---

### Step 2: Set Up the Project

1. Extract the folder you downloaded.
2. Open **Terminal**
3. Type `cd ` (with a space), then drag the extracted folder into the Terminal window. Press **Enter**.
4. Run:

```bash
npm install
```

---

### Step 3: Run the App

```bash
npm start
```

This opens:
- **The overlay** — scrolling transparent task window
- **The control panel** — where you manage tasks

---

### Optional: Add to OBS


1. Open Task List overlay and control panel → enable OBS mode
2. Open OBS
3. Add a **Window Capture** source
4. Select the overlay window
5. Resize or crop as needed

---

### To Run Again Later

1. Open **Terminal**
2. Navigate to the folder:

```bash
cd path-to-folder
```
(You can drag the folder again to autofill the path.)

3. Run:

```bash
npm start
```

---


## Using the App (All Platforms)
<img width="1057" height="846" alt="Screenshot 2025-07-15 at 1 36 56 PM" src="https://github.com/user-attachments/assets/985be4bd-6ea6-47d4-83fc-761c83464047" />

### The Overlay

- Displays your tasks scrolling upward
- Percentage bar to show your progress
- Transparent background
- Draggable by the top header

### The Control Panel

- Add new tasks
- Edit titles, descriptions, and priority
- Mark tasks as done
- Delete tasks
- Adjust scroll speed

Changes apply instantly, no restart needed.

---

## Customization

### Using the Control Panel (Recommended)

The control panel lets you:
- Add new tasks
- Edit task titles, descriptions, and priorities (high, medium, low)
- Mark tasks as complete
- Delete individual or all tasks
- Adjust scroll speed with a live input

All changes apply immediately.

### Optional: Customizing Layout, Style, and Speed (Advanced)

Open `overlay.html` in a text editor.

#### Fonts & Colors

In the `<style>` tag:

```
body {
  font-family: 'JetBrains Mono', monospace;
}

.priority-high {
  background: rgba(255, 255, 255, 0.1);
  color: #e45757;
}
```

#### Scroll Speed

In the `<script>` section:

```
let scrollSpeed = 30;
```

Lower = faster scroll.

#### Overlay Size

In `main.js`:

```
width: 400,
height: 800,
```

---

## Task Storage

Tasks are saved in `tasks.json` inside the folder. A sample entry:

```
{
  "id": 1,
  "title": "Study Chemistry",
  "description": "Go over thermodynamics",
  "priority": "high",
  "completed": false,
  "createdAt": "2025-07-11 10:00 AM"
}
```

You can also edit tasks using the control panel.

---

## Troubleshooting

**Command not found: node or npm**  
→ Reinstall Node.js from https://nodejs.org

**App opens then closes**  
→ Make sure you ran `npm install` before running `npx electron .`

**Tasks not saving**  
→ Ensure app folder has write permission

**Overlay won’t drag**  
→ Make sure `.stream-header` has:
```
-webkit-app-region: drag;
pointer-events: auto;
```

---

## License

MIT License — free to use, modify, and share.

---

This project is free to use, modify, and share. I just ask that you consider giving credit. :)

**Support Me on Ko-fi**

If you found this project helpful and want to support my work, you can buy me a coffee on Ko-fi:

https://ko-fi.com/carocim

I’m a student who built this while studying for my board exam. Coding this helped me stay focused, and now I’m sharing it in case it helps you too.
Every donation helps me keep creating tools for fellow learners and streamers!
