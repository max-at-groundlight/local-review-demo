const { app, BrowserWindow } = require('electron');

app.on('ready', function() {
  var win = new BrowserWindow({
    fullscreen: true,
  });
  win.loadURL('http://10.44.3.14:3000')

  win.once("ready-to-show", () => {
    win.webContents.setZoomFactor(2);
    win.show()
  });
});