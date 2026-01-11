import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    viteSingleFile() // 啟用單檔打包功能
  ],
  base: './', // 設定相對路徑
  build: {
    // 這裡的設定是為了確保圖片等資源也能被轉成 Base64 塞進去
    assetsInlineLimit: 10000000000, // 設定一個很大的數字，強制所有圖片都內嵌
  }
});