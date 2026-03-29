import React, { useContext, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

// 引入本機圖片
import Hero2 from '../assets/Hero2.jpg';
import laserScan from '../assets/service_laser_scan_new.jpg';
import serviceUav from '../assets/service_uav.webp';
import gisMap from '../assets/service_gis_kinmen.jpg';

export default function Services() {
  const { t } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(4).fill(false));

  const serviceImages = [
    Hero2,
    laserScan,
    serviceUav,
    gisMap,
  ];

  const servicesData = t.services.items.map((item, index) => ({
    ...item,
    image: serviceImages[index]
  }));

  return (
    <Container>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold">
          {t.services.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          {t.services.subtitle}
        </Typography>
      </Box>

<<<<<<< HEAD
      {/* 四宮格卡片 - 置中且固定尺寸 */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 960, mx: 'auto' }}>
        {servicesData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: 420,
                height: 440,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: '1px solid #eee',
                overflow: 'hidden',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  borderColor: '#FF9900'
                }
              }}
            >
              <Box sx={{ position: 'relative', height: 260, flexShrink: 0, bgcolor: '#f0f0f0' }}>
                {!imgLoaded[index] && (
                  <Skeleton variant="rectangular" width="100%" height={260} animation="wave" sx={{ position: 'absolute', top: 0, left: 0 }} />
=======
      {/* 服務卡片：四宮格（任何螢幕尺寸皆兩欄兩列） */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {servicesData.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: { xs: 2, md: 4 },
                border: '1px solid #eee',
                overflow: 'hidden',
                height: '100%',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  borderColor: '#FF9900',
                },
              }}
            >
              {/* 上方：圖片 16:9 */}
              <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
                {!imgLoaded[index] && (
                  <Skeleton
                    variant="rectangular"
                    sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    animation="wave"
                  />
>>>>>>> cfaef25962634b6188883aabd25b7d49af14c527
                )}
                <Box
                  component="img"
                  src={item.image}
                  alt={`${item.title} - 祐鴻測繪服務`}
                  sx={{
                    position: 'absolute',
<<<<<<< HEAD
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
=======
                    top: 0, left: 0,
                    width: '100%', height: '100%',
>>>>>>> cfaef25962634b6188883aabd25b7d49af14c527
                    objectFit: 'cover',
                    opacity: imgLoaded[index] ? 1 : 0,
                    transition: 'opacity 0.4s',
                  }}
                  onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[index] = true; return n; })}
                />
              </Box>
<<<<<<< HEAD
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
=======

              {/* 下方：文字內容 */}
              <Box sx={{ p: { xs: 1.5, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' } }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, display: { xs: 'none', sm: 'block' } }}
                >
>>>>>>> cfaef25962634b6188883aabd25b7d49af14c527
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
