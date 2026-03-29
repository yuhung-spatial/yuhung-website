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
                )}
                <Box
                  component="img"
                  src={item.image}
                  alt={`${item.title} - 祐鴻測繪服務`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: imgLoaded[index] ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                  onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[index] = true; return n; })}
                />
              </Box>
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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
