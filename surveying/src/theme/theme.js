import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003366', // 穩重的深藍色 (主色)
      light: '#335c8d',
      dark: '#001f42',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF9900', // 活力的亮橘色 (強調色/按鈕)
      contrastText: '#fff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      neutral: '#F4F6F8', // 淺灰背景，用於區隔區塊
    },
    text: {
      primary: '#1A2027', // 深灰黑，比純黑柔和
      secondary: '#505F6F', // 次要文字
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", sans-serif',
    h2: { fontWeight: 800, letterSpacing: -0.5 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontSize: '1.1rem', lineHeight: 1.6 },
    button: { fontWeight: 700, borderRadius: 8 },
  },
  shape: {
    borderRadius: 8, // 現代化的微圓角 (不是膠囊，也不是直角)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        },
        containedPrimary: {
          '&:hover': { backgroundColor: '#002244' },
        },
        containedSecondary: {
          color: '#fff',
          '&:hover': { backgroundColor: '#e68a00' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // 非常柔和的陰影
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;