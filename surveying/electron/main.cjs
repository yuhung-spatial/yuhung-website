/**
 * Electron 主進程 – 祐鴻測繪科技 單機版
 */
const { app, BrowserWindow, protocol, net } = require('electron');
const path  = require('path');
const url   = require('url');

// ── 必須在 app ready 之前註冊自訂 scheme ──
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true,
    supportFetchAPI: true,
    stream: true,          // 支援大型影片的 range request（拖拉進度條）
  },
}]);

// ── 是否為開發模式（未打包時） ──
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width:    1440,
    height:   900,
    minWidth: 960,
    minHeight: 640,
    title: '祐鴻測繪科技',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // ── 自訂 app:// 協定 ──
  // 正式包裝後：dist/ 放在 asar 裡，影片放在 Resources/videos/（extraResources）
  const distPath    = path.resolve(__dirname, '../dist');
  const videosPath  = app.isPackaged
    ? path.join(process.resourcesPath, 'videos')   // 打包後
    : path.resolve(__dirname, '../src/videos');     // 開發模式

  protocol.handle('app', (request) => {
    const reqUrl  = new URL(request.url);
    const pathname = decodeURIComponent(reqUrl.pathname);

    let filePath;
    if (pathname.startsWith('/videos/')) {
      // 大型影片 → 從 resources/videos/ 或 src/videos/ 提供
      filePath = path.join(videosPath, path.basename(pathname));
    } else {
      // 一般靜態資源 → dist/
      filePath = path.join(distPath, pathname === '/' ? 'index.html' : pathname);
    }

    return net.fetch(url.pathToFileURL(filePath).toString());
  });

  if (isDev) {
    // 開發模式：讀取 Vite dev server
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    // 正式模式：讀取打包後的 index.html（透過 app:// 協定）
    win.loadURL('app://localhost/');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
