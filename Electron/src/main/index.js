'use strict'

import { app, BrowserWindow, ipcMain, screen, Menu, Tray } from 'electron'
import opts from 'opts'
import path from 'path'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 380,
    show: false
  })
  const { x, y } = screen.getCursorScreenPoint()
  const currentDisplay = screen.getDisplayNearestPoint({ x, y })
  mainWindow.setPosition(currentDisplay.workArea.x, currentDisplay.workArea.y)
  mainWindow.center()
  let argTime = 60
  const options = [
    {
      short: 't',
      long: 'time',
      value: true,
      description: 'Set time in seconds',
      callback: (value) => { argTime = parseInt(value) }
    }
  ]
  opts.parse(options, true)

  const appIcon = new Tray(path.join(__static, '/icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: 'Quit',
      click: () => {
        mainWindow.close()
      }
    }
  ])
  appIcon.on('double-click', (event) => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
  appIcon.setContextMenu(contextMenu)

  ipcMain.on('getArgs', (event, arg) => {
    event.returnValue = argTime
  })

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    appIcon.setHighlightMode('selection')
    mainWindow.show()
  })

  mainWindow.on('minimize', function (event) {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
