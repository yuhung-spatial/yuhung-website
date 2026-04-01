import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',   // 相對路徑，讓 Electron file:// 也能正確載入
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,   // 4 KB 以下才 inline（避免影片被 base64）
    copyPublicDir: true,       // 複製 CNAME、favicon 等到 dist
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui:    ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
});
