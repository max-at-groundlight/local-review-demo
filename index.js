// const prepareRenderer = require('electron-next')
// prepareRenderer("./", 3000)

// const { app, BrowserWindow } = require('electron')

// const path = require('path')

// const createWindow = () => {
//     const win = new BrowserWindow({
//       width: 800,
//       height: 600,
//       webPreferences: {
//         preload: path.join(__dirname, 'preload.js')
//       }
//     })
  
//     win.loadURL('http://localhost:3000')
//   }

// // createWindow()

// app.whenReady().then(() => {
  //     createWindow()
  //   })
  
  const { app, BrowserWindow } = require('electron');
  
  console.log("Hello World")
  
  app.on('ready', function() {
    var mainWindow = new BrowserWindow({
      // show: false,
      fullscreen: true,
    });
    // mainWindow.maximize();
    // mainWindow.loadFile('index.html');
    win.loadURL('http://localhost:3000')
    // mainWindow.show();
});