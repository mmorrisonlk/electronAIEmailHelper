const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store');

const store = new Store();

function handleSetSubject (event, subject) {
    const webContents = event.sender
    const window = BrowserWindow.fromWebContents(webContents)
    window.setSubject(subject)
}

function handleSetBody (event, body) {
    const webContents = event.sender
    const window = BrowserWindow.fromWebContents(webContents)
    window.setBody(body)
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

//   ipcMain.on('set-subject', (event, subject) => {
//     const webContents = event.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setSubject(subject)
//   })

//   ipcMain.on('set-body', (event, body) => {
//     const webContents = event.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setBody(body)
//   })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.on('set-subject', handleSetSubject)
    ipcMain.on('set-body', handleSetBody)
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })