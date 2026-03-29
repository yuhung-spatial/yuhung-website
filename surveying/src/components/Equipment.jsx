import React, { useContext, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

import equipTotalStation from '../assets/equip_total_station.jpg';
import equipGnss from '../assets/equip_gnss.webp';
import equipLaserScanner from '../assets/equip_laser_scanner.webp';
import equipUav from '../assets/equip_uav.jpg';

export default function Equipment() {
  const { t } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(4).fill(false));

  // 圖片與對應的 objectPosition（讓主角置中）
  const equipmentData = [
    { image: equipTotalStation, position: 'center 65%' },   // 全站儀在圖片偏下
    { image: equipGnss,         position: 'center 50%' },   // GNSS 桿在圖片中央
    { image: equipLaserScanner, position: 'center 55%' },   // 掃描儀在圖片中偏下
    { image: equipUav,          position: 'center 35%' },   // 無人機在圖片偏上
  ];

  return (
    <Container>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>{t.equipment.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{t.equipment.subtitle}</Typography>
      </Box>

      {/* 四宮格卡片 - 置中且固定尺寸 */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 960, mx: 'auto' }}>
        {t.equipment.items.map((item, index) => (
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
                <CardMedia
                  component="img"
                  height="260"
                  image={equipmentData[index].image}
                  alt={`${item.title} - 祐鴻測繪儀器設備`}
                  sx={{ objectFit: 'cover', objectPosition: equipmentData[index].position, opacity: imgLoaded[index] ? 1 : 0, transition: 'opacity 0.3s' }}
                  onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[index] = true; return n; })}
                />
              </Box>
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
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
