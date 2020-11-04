const { app, BrowserWindow, Menu } = require('electron')
const reload = require('electron-reload')
const path = require('path')
const fs = require('fs')
const url = require('url')
const debug = /--debug/.test(process.argv[2])
const electron = require('electron')
// const dialog = require('electron').remote.dialog;

let mainWindow
app.setPath("userData", __dirname + "/saved_recordings")
if (debug) reload(path.join(__dirname, 'dist'))

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1010,
        height: 700,
        minWidth: 1010,
        minHeight: 700,
    })
    // mainWindow.setContentProtection(true)

    mainWindow.setMenu(null)
    mainWindow.setTitle(require('./package.json').name)
    if (debug) mainWindow.openDevTools()

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.on('closed', () => mainWindow = null)
}


const template = [
    {
       role: 'help',
       submenu: [
          {
             label: 'Learn More'
          }
       ]
    }
 ]
 
 const menu = Menu.buildFromTemplate(template)
 Menu.setApplicationMenu(menu)


app.on('ready', createWindow)

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
