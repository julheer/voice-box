import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from "path";

let window = null;

function createMainWindow() {
    window = new BrowserWindow({
        height: 300, width: 400,
        title: 'Loading — VoiceBox',
        titleBarStyle: 'hidden', frame: false,
        focusable: true,
        webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
    });

    // Working with menu (we need to disable it)
    // while application is loading.
    window.setMenu(null);
    window.setResizable(false); // Also, disable resize of window for loading.

    window.loadFile(join(__dirname, '../views/loader.html'));
    window.webContents.openDevTools();
}

ipcMain.on('get-ver', (event) => {
    event.reply('get-ver', '0.0.1');
});

app.on('ready', async () => { createMainWindow(); });

// This will called when you open a application from
// dock on macOS.
app.on('activate', async () => { createMainWindow(); });

// This required for macOS (when you clicks Command + Q).
app.on('window-all-closed', async () => { app.quit(); });
