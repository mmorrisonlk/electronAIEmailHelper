const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setSubject: (subject) => ipcRenderer.send('set-subject', subject),
  setBody: (body) => ipcRenderer.send('set-body', body)
})