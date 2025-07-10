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

1. Click the green **“Code”** button on this page  
2. Select **“Download ZIP”**  
3. Extract the folder somewhere you can find it (e.g., your Desktop)  
4. Follow the setup instructions below for your operating system

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

1. Extract the folder you downloaded from GitHub
2. Right-click the folder > “Open in Terminal” or "Open PowerShell"
3. Run:

```
npm install
```

### 3. Run the app

```
npx electron .
```

This will launch:
- The overlay window (scrolling task list)
- The control panel window (edit tasks)

### 4. Add to OBS (Optional)

1. Open OBS
2. Click ➕ and choose **Window Capture**
3. Select the Electron overlay window
4. Enable “Allow Transparency” (if needed)
5. Crop/resize as you like

---

## For macOS Users

### Requirements:
- macOS Ventura or newer (recommended)
- Node.js installed

### 1. Install Node.js

Go to https://nodejs.org  
Download the **LTS version** for macOS (`.pkg`) and install it.

Then open **Terminal** and type:

```
node -v
npm -v
```

You should see version numbers.

### 2. Set up the overlay

1. Open Finder and locate the extracted folder
2. Open Terminal, then type `cd ` (with a space), and drag the project folder into the Terminal window.  
It will autofill the path. Press **Enter** to move into the folder.
3. Run this in the terminal:

```
npm install
```

### 3. Run the app

```
npx electron .
```

This will launch:
- The transparent overlay window
- The task control panel window

### 4. Add to OBS (Optional)

1. Open OBS
2. Add a **Window Capture** source
3. Select the Electron overlay window
4. Enable “Allow Transparency”
5. Crop and position as needed

---

## Using the App (All Platforms)
<img width="1041" height="845" alt="Screenshot 2025-07-11 at 6 44 36 AM" src="https://github.com/user-attachments/assets/0294a63b-d578-46cc-8655-c5b9f5a1496e" />

### The Overlay

- Displays your tasks scrolling upward
- Transparent background
- Draggable by the top header

### The Control Panel

- Add new tasks
- Edit titles, descriptions, and priority
- Mark tasks as done
- Delete tasks
- Adjust scroll speed

Changes apply instantly — no restart needed.

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
