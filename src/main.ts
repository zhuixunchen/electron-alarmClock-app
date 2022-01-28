import { app, BrowserWindow, Notification, ipcMain, Menu, Tray, dialog } from 'electron';
import type { App } from 'electron';
import * as path from 'path';

// 全局变量防止垃圾回收托盘消失
let appTray = null;

function createWindow() {
  // Create the browser window.
  const mainWindow: BrowserWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // preload: path.join(__dirname, "preload.js"),
    },
    width: 800
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('minimize', function (event: any) {
    event.preventDefault();
    mainWindow.hide();
  });
  mainWindow.on('close', function (event) {
    event.preventDefault();
    mainWindow.hide();
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../index.html'));
  return mainWindow;
}

function setTray(app: App, mainWindow: BrowserWindow) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: '退出',
      click: () => {
        // quit此处无效，使用exit强制退出
        app.exit();
      }
    }
  ]);
  appTray = new Tray(path.join(__dirname, '../icon.ico'));

  appTray.setToolTip('This is my alarm clock');
  appTray.setContextMenu(contextMenu);

  appTray.on('click', () => {
    mainWindow.show();
  });
}

ipcMain.on('show-notification', (event: any, title: string, body: string) => {
  const notification = new Notification({ title, body });
  notification.show();
  // dialog.showMessageBox({
  //   type: 'info',
  //   title: '干饭时间到了',
  //   message: '记得按时点餐吃饭',
  //   buttons: ['收到']
  // })
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  setTray(app, createWindow());
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
