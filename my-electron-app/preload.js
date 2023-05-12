const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  makeRequest: (prompt) => ipcRenderer.invoke('ask-chat', prompt),
  sendIt: (recipients, subject, body) => ipcRenderer.invoke('send-mail', recipients, subject, body)
})