const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const clipboard = require('electron').clipboard;

const Menu = electron.Menu;
const Tray = electron.Tray;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let appIcon = null;

function createWindow () {


	var windowOptions = {
      width: 1400,
      minWidth: 500,
      height: 900,
	  minHeight: 500,
	  transparent: false,
	  frame: true,
	  fullscreen: false,
	  alwaysOnTop: false,
	  autoHideMenuBar: true
    }

	// Create the browser window.
	mainWindow = new BrowserWindow(windowOptions)

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/index.html')
	//mainWindow.loadURL('vg.no')

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	appIcon = new Tray('H:/Git/ElectronTesting1/icon.png');
	var contextMenu = Menu.buildFromTemplate([
	{ label: 'Item1', type: 'radio' },
	{ label: 'Item2', type: 'radio' },
	{ label: 'Item3', type: 'radio', checked: true },
	{ label: 'Item4', type: 'radio' }
	]);
	appIcon.setToolTip('This is my application.');
	appIcon.setContextMenu(contextMenu);


	//If you want to keep exact same behaviors on all platforms, you should not rely on the click event and always attach a context menu to the tray icon.
	appIcon.on('click', ()=>{
		mainWindow.focus();
	});


	//clipboard.writeText('Success on clipboard');

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
	// Dereference the window object, usually you would store windows
	// in an array if your app supports multi windows, this is the time
	// when you should delete the corresponding element.
	mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
