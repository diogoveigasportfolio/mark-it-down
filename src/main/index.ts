import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

import { getTheme, initializeTheme, setTheme, windowStateKeeper } from './utils'

async function createWindow(): Promise<void> {
  const mainWindowStateKeeper = await windowStateKeeper('main')

  const mainWindow = new BrowserWindow({
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    fullscreen: mainWindowStateKeeper.isMaximized,
    show: false,
    title: 'Mark it down!',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.setIcon(icon)

  mainWindowStateKeeper.track(mainWindow)

  initializeTheme()

  ipcMain.handle('theme:get', async () => {
    return await getTheme()
  })

  ipcMain.handle('theme:dark', () => {
    setTheme('dark')
  })

  ipcMain.handle('theme:light', () => {
    setTheme('light')
  })

  ipcMain.handle('theme:system', () => {
    setTheme('system')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Zoom on scroll
  mainWindow.webContents.setZoomFactor(1.0)
  mainWindow.webContents.setVisualZoomLevelLimits(1, 5)
  mainWindow.webContents.on('zoom-changed', (_event, zoomDirection) => {
    const currentZoom = mainWindow.webContents.getZoomFactor()

    if (zoomDirection === 'in') {
      mainWindow.webContents.zoomFactor = currentZoom + 0.2
    }
    if (zoomDirection === 'out' && currentZoom > 0.5) {
      mainWindow.webContents.zoomFactor = currentZoom - 0.2
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
