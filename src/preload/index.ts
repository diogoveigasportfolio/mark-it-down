import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

const theme = {
  dark: () => ipcRenderer.invoke('theme:dark'),
  light: () => ipcRenderer.invoke('theme:light'),
  system: () => ipcRenderer.invoke('theme:system'),
  get: () => ipcRenderer.invoke('theme:get')
}

try {
  contextBridge.exposeInMainWorld('theme', theme)
} catch (error) {
  console.error(error)
}
