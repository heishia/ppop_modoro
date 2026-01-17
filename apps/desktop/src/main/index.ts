import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null = null

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    minWidth: 280,
    minHeight: 373,
    resizable: true,
    frame: false,
    transparent: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.setAspectRatio(300 / 400)

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
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

ipcMain.handle('show-notification', (_event, title: string, body: string) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body,
      silent: false,
    })
    notification.show()

    if (mainWindow) {
      mainWindow.setAlwaysOnTop(true)
      mainWindow.show()
      mainWindow.focus()
      setTimeout(() => {
        if (mainWindow) {
          mainWindow.setAlwaysOnTop(false)
        }
      }, 3000)
    }
  }
})

ipcMain.handle('set-always-on-top', (_event, flag: boolean) => {
  if (mainWindow) {
    mainWindow.setAlwaysOnTop(flag)
  }
})
