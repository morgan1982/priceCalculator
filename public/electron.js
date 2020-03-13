const electron = require('electron');
const contextMenu = require('electron-context-menu');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

contextMenu({
    prepend: (defaultActions, params, browserWindow) => [
        {
            label: 'Rainbow',
            visible: params.mediaType === 'image'
        },
    ],
    showInspectElement: true
})

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 880,
        height: 612
    })
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open devtools
        mainWindow.webContents.openDevTools();
    }
    mainWindow.setResizable(false);
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});