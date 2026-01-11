import React, { useState, createContext, useContext } from 'react';
import { Box, Toolbar, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { motion } from 'framer-motion';

// 引入翻譯檔
import { resources } from './translations';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services'; 
import Equipment from './components/Equipment'; // 假設您有這個檔案，若無可先註解
import Projects from './components/Projects';   // 假設您有這個檔案，若無可先註解
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SocialFab from './components/SocialFab';

// 1. 建立語言 Context
export const LanguageContext = createContext();

// 2. 定義全域主題
const theme = createTheme({
  palette: {
    primary: { main: '#003366', contrastText: '#ffffff' },
    secondary: { main: '#FF9900', contrastText: '#ffffff' },
    background: { default: '#ffffff', paper: '#f8f9fa' },
    text: { primary: '#333333', secondary: '#666666' },
  },
  typography: {
    fontFamily: ['"Noto Sans TC"', 'Roboto', 'sans-serif'].join(','),
  },
});

const Section = ({ children, id, bg = 'white' }) => (
  <Box id={id} sx={{ py: { xs: 8, md: 12 }, bgcolor: bg === 'gray' ? 'background.paper' : 'background.default' }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </Box>
);

export default function App() {
  // 語言狀態管理 (預設中文 'zh')
  const [lang, setLang] = useState('zh');
  
  // 切換函式
  const toggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  // 取得目前語言的翻譯物件
  const t = resources[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ overflowX: 'hidden' }}> 
          <Navbar />
          <Toolbar sx={{ minHeight: { xs: 90, md: 90 } }} />
          <Box component="main">
            <Box id="hero"><Hero /></Box>
            <Section id="about"><About /></Section>
            <Section id="services" bg="gray"><Services /></Section>
            {/* 若無以下檔案，請暫時註解 */}
            <Section id="equipment"><Equipment /></Section>
            <Section id="projects" bg="gray"><Projects /></Section>
            <Section id="contact" bg="white"><Contact /></Section>
          </Box>
          <Footer />
          <BackToTop />
          <SocialFab />
        </Box>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}