const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  makeRequest: (prompt) => ipcRenderer.invoke('ask-chat', prompt)
})