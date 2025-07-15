const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');


// Prevent background throttling and occlusion-related rendering stops
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-low-res-tiling');

app.commandLine.appendSwitch('force-color-profile', 'sRGB');
app.commandLine.appendSwitch('enable-features', 'CoreGraphicsCapture');

let overlayWindow;
let controlWindow;
let tasks = [];

// Path for storing tasks
const tasksPath = path.join(__dirname, 'tasks.json');

// Sample tasks
const sampleTasks = [
  { title: "Review code changes", description: "Check pull request #142 for security issues", priority: "high" },
  { title: "Update documentation", description: "Add API endpoints to the developer guide", priority: "medium" },
  { title: "Fix responsive design", description: "Mobile layout breaks on screens < 768px", priority: "high" },
  { title: "Optimize database queries", description: "Reduce load time for dashboard analytics", priority: "medium" },
  { title: "Schedule team meeting", description: "Discuss Q4 roadmap and sprint planning", priority: "low" },
  { title: "Write unit tests", description: "Cover new authentication module", priority: "high" },
  { title: "Update dependencies", description: "Upgrade React to latest stable version", priority: "medium" },
  { title: "Deploy to staging", description: "Test new features before production release", priority: "high" },
  { title: "Client feedback review", description: "Analyze user feedback from beta testing", priority: "low" },
  { title: "Security audit", description: "Run penetration testing on API endpoints", priority: "high" },
];

function saveTasks() {
  try {
    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
    console.log('✅ Saved tasks to:', tasksPath);
  } catch (error) {
    console.error('❌ Error saving tasks:', error);
  }
}

function loadTasks() {
  try {
    if (fs.existsSync(tasksPath)) {
      const data = fs.readFileSync(tasksPath, 'utf8');
      tasks = JSON.parse(data);
    } else {
      // Initialize with sample tasks if no saved tasks exist
      sampleTasks.forEach((task, index) => {
        tasks.push({
          id: index + 1,
          ...task,
          completed: Math.random() > 0.7,
          createdAt: new Date().toLocaleString()
        });
      });
      saveTasks();
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
    tasks = [];
  }
}

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 400,
    height: 800,
    x: 100,
    y: 100,
    frame: false,
    movable: true,
    transparent: true,
    alwaysOnTop: false,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    backgroundColor: '#0d0d0d00',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false
    }
  });

  overlayWindow.loadFile('overlay.html');
  overlayWindow.webContents.setVisualEffectState?.('active');
  overlayWindow.setAlwaysOnTop(false); // Ensure it's allowed to be covered
  overlayWindow.setIgnoreMouseEvents(false);
}

function createControlWindow() {
  controlWindow = new BrowserWindow({
    width: 600,
    height: 700,
    x: 600,
    y: 100,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  controlWindow.loadFile('control.html');
  
  controlWindow.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  loadTasks();
  createOverlayWindow();
  createControlWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('get-tasks', () => {
  return tasks;
});

ipcMain.handle('add-task', (event, task) => {
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    ...task,
    completed: false,
    createdAt: new Date().toLocaleString()
  };
  tasks.push(newTask);
  saveTasks();
  
  // Update overlay
  if (overlayWindow) {
    overlayWindow.webContents.send('tasks-updated', tasks);
  }
  
  return tasks;
});

ipcMain.handle('update-task', (event, taskId, updates) => {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    saveTasks();
  }
  
  // Update overlay
  if (overlayWindow) {
    overlayWindow.webContents.send('tasks-updated', tasks);
  }
  
  return tasks;
});

ipcMain.handle('delete-task', (event, taskId) => {
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks();
  
  // Update overlay
  if (overlayWindow) {
    overlayWindow.webContents.send('tasks-updated', tasks);
  }
  
  return tasks;
});

ipcMain.handle('clear-tasks', () => {
  tasks = [];
  saveTasks();
  
  // Update overlay
  if (overlayWindow) {
    overlayWindow.webContents.send('tasks-updated', tasks);
  }
  
  return tasks;
});

ipcMain.handle('generate-random-tasks', () => {
  const randomTasks = sampleTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
  randomTasks.forEach(task => {
    tasks.push({
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      ...task,
      title: task.title + ` (${Date.now()})`,
      completed: Math.random() > 0.8,
      createdAt: new Date().toLocaleString()
    });
  });
  
  saveTasks();
  
  // Update overlay
  if (overlayWindow) {
    overlayWindow.webContents.send('tasks-updated', tasks);
  }
  
  return tasks;
});

ipcMain.handle('update-speed', (event, speed) => {
  if (overlayWindow) {
    overlayWindow.webContents.send('speed-updated', speed);
  }
});

ipcMain.handle('toggle-overlay', () => {
  if (overlayWindow) {
    if (overlayWindow.isVisible()) {
      overlayWindow.hide();
    } else {
      overlayWindow.show();
    }
  }
});
