const electron = require('electron');
const contextMenu = require('electron-context-menu');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require('path');
const isDev = require('electron-is-dev');

require('update-electron-app')({
    repo: 'https://github.com/morgan1982/priceCalculator',
}) 


contextMenu({
    prepend: (defaultActions, params, browserWindow) => [
        {
            label: 'Rainbow',
            visible: params.mediaType === 'image'
        },
    ],
    showInspectElement: isDev ? true : false
})


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 880,
        height: 600,
        backgroundColor: '#333',
        icon: __dirname + '/pig.ico'
    })
    // mainWindow.setMenuBarVisibility(false)
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open devtools
        mainWindow.webContents.openDevTools();
    }
    mainWindow.setResizable(false);
    mainWindow.center();


    Menu.setApplicationMenu(null);


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