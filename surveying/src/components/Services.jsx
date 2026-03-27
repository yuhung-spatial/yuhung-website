import React, { useContext, useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

// 1. 引入您的本機圖片 (用於工程測量，因為這張最真實專業)
import Hero2 from '../assets/Hero2.jpg';
import laserScan from '../assets/service_laser_scan.png';
import gisMap from '../assets/service_gis.png';

export default function Services() {
  const { t } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(4).fill(false));

  // 定義單張精選圖片 (對應四個服務項目)
  const serviceImages = [
    // 1. 工程測量：使用您上傳的真實測量照片 (Hero2)，強調專業現場感
    Hero2,
    
    // 2. 3D 雷射掃描：真實點雲掃描成果圖
    laserScan,
    
    // 3. UAV 無人機航測：無人機飛行特寫 (Unsplash)
    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop',
    
    // 4. GIS 空間資訊：管線竣工圖示意圖
    gisMap,
  ];

  // 合併翻譯文字與圖片
  const servicesData = t.services.items.map((item, index) => ({
    ...item,
    image: serviceImages[index] // 改為單張圖片
  }));

  return (
    <Container>
      {/* 標題區塊 (置中) */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold">
          {t.services.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          {t.services.subtitle}
        </Typography>
      </Box>

      {/* 服務卡片列表 (置中) */}
      <Grid container spacing={4} justifyContent="center">
        {servicesData.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0, 
                display: 'flex', 
                alignItems: 'center', // 垂直置中對齊
                borderRadius: 4, 
                border: '1px solid #eee', 
                overflow: 'hidden', 
                transition: '0.3s', 
                height: '100%', 
                '&:hover': { 
                  transform: 'translateY(-5px)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                  borderColor: '#FF9900' 
                } 
              }}
            >
              {/* 左側：單張圖片 */}
              <Box sx={{ position: 'relative', width: 160, height: 160, flexShrink: 0 }}>
                {!imgLoaded[index] && (
                  <Skeleton variant="rectangular" width={160} height={160} animation="wave" />
                )}
                <Box
                  component="img"
                  src={item.image}
                  alt={`${item.title} - 祐鴻測繪服務`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 160,
                    height: 160,
                    objectFit: 'cover',
                    opacity: imgLoaded[index] ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                  onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[index] = true; return n; })}
                />
              </Box>
              
              {/* 右側：文字內容 */}
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}