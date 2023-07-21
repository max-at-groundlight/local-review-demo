// const prepareRenderer = require('electron-next')
// prepareRenderer("./", 3000)

// const { app, BrowserWindow } = require('electron')

// const path = require('path')

// const createWindow = () => {
//     const win = new BrowserWindow({
//       // width: 800,
//       // height: 600,
//       // webPreferences: {
//       //   preload: path.join(__dirname, 'preload.js')
//       // }
//       fullscreen: true,
//     })
  
//     win.loadURL('http://localhost:3000')
//   }

// // createWindow()

// app.whenReady().then(() => {
//       createWindow()
//     })
  
const { app, BrowserWindow, screen } = require('electron');

app.on('ready', function() {
  // screen.getPrimaryDisplay()
  
  var win = new BrowserWindow({
    fullscreen: true,
  });
  win.webContents.setZoomFactor(3);
  win.loadURL('http://localhost:3000')

  win.once("ready-to-show", () => {
    // createTray()
    // if (!isDevelopment) {
    //     //mainWindow.setAlwaysOnTop(true);
    //     mainWindow.setFullScreen(true);
    //     mainWindow.removeMenu();
    //     mainWindow.maximize();


    // } else {
    //     mainWindow.maximize();
    //     mainWindow.setFullScreen(true);
    //     mainWindow.removeMenu();
    //     mainWindow.webContents.openDevTools();
    // }

    //Adjust zoom factor according to DPI or scale factor that we determined before
    console.log("Display with current scale factor: %o", 10);
    win.webContents.setZoomFactor(2);
    win.show()
});
});