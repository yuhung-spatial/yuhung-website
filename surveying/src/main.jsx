// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css';
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. 將外層標籤改成 HashRouter */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);