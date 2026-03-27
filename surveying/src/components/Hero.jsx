import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../App';

// 1. 引入您的本機圖片
import Hero1 from '../assets/Hero1.webp';
import Hero2 from '../assets/Hero2.jpg';
import Hero3 from '../assets/Hero3.jpg';
import Hero4 from '../assets/Hero4.jpg';

// 2. 定義每一張投影片的圖片與對應文案 (中英文)
const heroSlides = [
  {
    image: Hero1,
    content: {
      zh: {
        title: "疆界之外・精準定位",
        subtitle: "克服潮汐與地形限制，為您捕捉大自然的每一寸真實樣貌"
      },
      en: {
        title: "Boundless Precision",
        subtitle: "Overcoming tides and terrain to capture the true face of nature."
      }
    }
  },
  {
    image: Hero2,
    content: {
      zh: {
        title: "堅實基礎・工程之眼",
        subtitle: "以毫米級的堅持，守護重大建設的品質與安全"
      },
      en: {
        title: "Engineering Vision",
        subtitle: "Safeguarding construction quality with millimeter-level persistence."
      }
    }
  },
  {
    image: Hero3,
    content: {
      zh: {
        title: "城市脈動・數據為本",
        subtitle: "深耕港灣與都會基礎建設，提供決策最可靠的後盾"
      },
      en: {
        title: "Urban Pulse, Data Driven",
        subtitle: "Cultivating harbor and urban infrastructure with reliable decision support."
      }
    }
  },
  {
    image: Hero4,
    content: {
      zh: {
        title: "智慧水域・探索未知",
        subtitle: "導入無人船自動化技術，高效建構水下3D地形資訊"
      },
      en: {
        title: "Smart Hydrography",
        subtitle: "Deploying autonomous USVs to efficiently map underwater 3D terrain."
      }
    }
  }
];

export default function Hero() {
  // 從 Context 取得目前的語言 (lang)
  const { lang } = useContext(LanguageContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 設定自動輪播計時器
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000); // 每 5 秒切換一張

    return () => clearInterval(interval); // 清除計時器
  }, []);

  // 取得目前要顯示的文字資料
  const currentSlide = heroSlides[currentImageIndex];
  const currentText = currentSlide.content[lang]; // 根據 lang ('zh' 或 'en') 取得對應文字

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      {/* --- 背景輪播層 --- */}
      {heroSlides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentImageIndex ? 1 : 0, // 只顯示當前圖片
            transition: 'opacity 1.5s ease-in-out', // 淡入淡出效果
            zIndex: 0,
          }}
        />
      ))}

      {/* --- 遮罩層 (Overlay) --- */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0, 51, 102, 0.5), rgba(0, 30, 60, 0.4))', // 稍微調淡一點點遮罩，讓照片更清楚
          zIndex: 1,
        }}
      />

      {/* --- 輪播指示點 --- */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1.5,
          zIndex: 2,
        }}
      >
        {heroSlides.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            sx={{
              width: idx === currentImageIndex ? 28 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: idx === currentImageIndex ? '#FF9900' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': { bgcolor: '#FF9900', opacity: 0.8 },
            }}
          />
        ))}
      </Box>

      {/* --- 文字內容層 --- */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        {/* 使用 key={currentImageIndex} 觸發文字切換時的動畫重播 */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImageIndex} // 關鍵：當 index 改變時，React 會重新渲染這個區塊並觸發動畫
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              fontWeight="900" 
              sx={{ 
                mb: 3, 
                letterSpacing: { xs: 2, md: 4 }, 
                fontSize: { xs: '2rem', md: '3.5rem' }, 
                textShadow: '0px 4px 20px rgba(0,0,0,0.6)'
              }}
            >
              {currentText.title}
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 0,
                opacity: 0.95, 
                fontWeight: 300,
                fontSize: { xs: '0.9rem', md: '1.25rem' },
                letterSpacing: 1,
                maxWidth: '800px',
                mx: 'auto',
                textShadow: '0px 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {currentText.subtitle}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
}