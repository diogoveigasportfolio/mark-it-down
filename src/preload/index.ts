import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

// Custom APIs for renderer
const context = null

try {
  contextBridge.exposeInMainWorld('context', context)
} catch (error) {
  console.error(error)
}
