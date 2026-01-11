import { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItemButton, ListItemText, Container, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate'; 
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { LanguageContext } from '../App'; // 引入 Context

import logoSpace from '../assets/祐鴻空間.png'; 
import logoSurvey from '../assets/祐鴻測繪.png'; 

export default function Navbar() {
  // 1. 多解構 'lang' 出來，用於判斷當前語言
  const { t, toggleLang, lang } = useContext(LanguageContext); 
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const brandColor = '#FF9900'; 

  // 選單項目
  const navItems = [
    { label: t.nav.about, target: 'about' },
    { label: t.nav.services, target: 'services' },
    { label: t.nav.equipment, target: 'equipment' }, 
    { label: t.nav.projects, target: 'projects' },
    { label: t.nav.contact, target: 'contact' }
  ];

  // 滾動監聽與跳轉邏輯
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const section = document.getElementById(item.target);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.target);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 90;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
      setDrawerOpen(false);
    }
  };

  const companyTitleSx = {
    color: 'primary.main',
    fontWeight: 800, 
    fontSize: { xs: '0.7rem', md: '0.85rem' }, 
    lineHeight: 1.2,
    letterSpacing: 0.5
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #eee', height: 90, justifyContent: 'center' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* Logo 區塊 */}
          <Box onClick={() => handleScrollTo('hero')} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={logoSpace} alt="Logo" sx={{ height: 28, width: 'auto' }} />
              <Typography variant="subtitle2" sx={companyTitleSx}>
                祐鴻空間資訊有限公司
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={logoSurvey} alt="Logo" sx={{ height: 28, width: 'auto' }} />
              <Typography variant="subtitle2" sx={companyTitleSx}>
                祐鴻測繪科技有限公司
              </Typography>
            </Box>
          </Box>

          {/* 電腦版選單 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleScrollTo(item.target)}
                  sx={{ 
                    fontSize: '0.95rem',
                    fontWeight: activeSection === item.target ? 700 : 500, 
                    color: activeSection === item.target ? brandColor : '#555',
                    position: 'relative',
                    px: 1.5,
                    minWidth: 'auto',
                    '&:hover': { color: brandColor, bgcolor: 'transparent' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* 2. 電腦版語言切換按鈕 (修改處) */}
              <Button 
                onClick={toggleLang}
                variant="outlined"
                sx={{ 
                  ml: 2, 
                  borderRadius: 20, 
                  px: 2, 
                  minWidth: 'auto', // 讓按鈕緊湊一點
                  borderColor: '#ddd', 
                  color: 'primary.main',
                  fontFamily: 'Roboto, sans-serif',
                  '&:hover': { borderColor: brandColor, color: brandColor }
                }}
              >
                <TranslateIcon sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2" fontWeight="bold" sx={{ pt: 0.2 }}>
                   {/* 判斷：如果是 zh 顯示 '中'，否則顯示 'EN' */}
                   {lang === 'zh' ? '中' : 'EN'}
                </Typography>
              </Button>
            </Box>
          )}

          {/* 手機版區塊 */}
          {isMobile && (
            <Box display="flex" alignItems="center">
               
               {/* 3. 手機版語言切換按鈕 (修改處) */}
               <IconButton onClick={toggleLang} sx={{ color: 'primary.main', mr: 0.5 }}>
                 {/* 用一個圓圈框住文字，取代原本的圖示，更直覺 */}
                 <Box sx={{ 
                   border: '2px solid', 
                   borderColor: 'primary.main', 
                   borderRadius: '50%', 
                   width: 30, 
                   height: 30, 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   fontSize: '0.8rem',
                   fontWeight: 'bold'
                 }}>
                    {lang === 'zh' ? '中' : 'EN'}
                 </Box>
              </IconButton>

              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'primary.main' }} size="large">
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* 手機側邊選單 */}
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 280, pt: 4 }}>
              <List>
                {navItems.map((item) => (
                  <ListItemButton key={item.label} onClick={() => handleScrollTo(item.target)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Drawer>

        </Toolbar>
      </Container>
    </AppBar>
  );
}