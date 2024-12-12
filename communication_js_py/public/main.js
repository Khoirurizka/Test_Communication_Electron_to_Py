const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { Console } = require('console');
require('@electron/remote/main').initialize()
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Visual Graph Generaive Planner',
    width: 800,
    height: 450,
    // fullscreen: true,
    webPreferences: {
        nodeIntegration:true,
        enableRemoteModule: true,
        contextIsolation: false

     // preload: path.join(__dirname, 'renderer.js'),
    },
  });

  // Open DevTools for debugging
  mainWindow.webContents.openDevTools();

  // Set startUrl to localhost:3000
  const startUrl = 'http://localhost:3000';
  mainWindow.maximize();
 // mainWindow.loadFile('index.html');
  require('@electron/remote/main').enable(mainWindow.webContents)

  mainWindow.loadURL(startUrl);
}

// Function to set up the Express.js server
function setupExpressServer() {
  const server = express();
  server.use(bodyParser.json());

  // Define POST route to receive data
  server.post('/', (req, res) => {
    console.log('Received data:', req.body);
    res.json({ status: 'success', message: 'Data received successfully p' });
  });

  // Start the server on port 3000
  server.listen(6000, () => {
    console.log('Express server is running on http://localhost:6000');
  });
}

app.whenReady().then(() => {
  setupExpressServer(); // Start the Express server
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('before-quit', () => {
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

//npm install --save-dev electron

