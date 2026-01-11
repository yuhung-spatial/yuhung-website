// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import './index.css';
import { HashRouter } from 'react-router-dom'

let theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // 祐鴻深藍：代表專業、精準
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9900', // 祐鴻亮橘：代表測繪儀器、警示、活力
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA', // 淺灰背景，用於區隔區塊
    },
    text: {
      primary: '#1A2027', // 深灰黑，比純黑柔和
      secondary: '#505F6F',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", sans-serif',
    h3: { fontWeight: 700, letterSpacing: 1 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, fontSize: '1rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 溫和的圓角
          padding: '10px 24px',
          textTransform: 'none',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg', // 限制最大寬度，保持閱讀舒適
      },
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. 將外層標籤改成 HashRouter */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);