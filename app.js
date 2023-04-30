// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  ipcRenderer,
} = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;
const createWindow = () => {
  // Create the browser window.
  const mainWindow_Options = {
    // alwaysOnTop: true,
    width: 250,
    height: 500,
    maxWidth: 250,
    minWidth: 250,
    minHeight: 500,
    frame: false,
    // show: false,
    // transparent:true,
    icon: path.join(__dirname, "/assets/icons/appIconV4.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  };
  const appURL = {
    pathname: path.join(__dirname + "/src/index.html"),
    slashes: true,
    protocal: "file:/",
  };
  // Create mainWindow
  mainWindow = new BrowserWindow(mainWindow_Options);
  // and load the index.html of the app.
  mainWindow.loadURL(url.format(appURL));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  // Disable default Refersh options &   // // Register a 'CommandOrControl+R' shortcut listener.
  app.on("browser-window-focus", function () {
    globalShortcut.register("CommandOrControl+R ", () => {
      // Do stuff when Y and either Command/Control is pressed.
      console.log("CommandOrControl+R command Disabled");
    });
  });
  // Enable refresh options when active application is switched
  app.on("browser-window-blur", function () {
    globalShortcut.unregister("CommandOrControl+R");
  });
});
// Mesaging btw:
ipcMain.on("Update-Application-position", (event, arg) => {
  let posStatus;
  if (mainWindow.movable) {
    posStatus = "fixed";
    mainWindow.movable = false;
  } else {
    posStatus = "float";
    mainWindow.movable = true;
  }
  event.reply("setState", posStatus);
});
ipcMain.on("Update-Application-layer", (event, arg) => {
  mainWindow.isAlwaysOnTop()
    ? mainWindow.setAlwaysOnTop(false)
    : mainWindow.setAlwaysOnTop(true);
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
