import React, { useContext, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

export default function Equipment() {
  const { t } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(4).fill(false));

  // 定義圖片 (不會隨語言改變)
  const equipmentImages = [
    "https://images.unsplash.com/photo-1581094794329-cd8119604f89?q=80&w=600&auto=format&fit=crop", // 全站儀
    "https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?q=80&w=600&auto=format&fit=crop", // GNSS/GPS
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop", // 雷射掃描
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop", // 無人機
  ];

  return (
    <Container>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>{t.equipment.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{t.equipment.subtitle}</Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {t.equipment.items.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%', 
                borderRadius: 4, 
                border: '1px solid #eee',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-10px)', boxShadow: 6 }
              }}
            >
              <Box sx={{ position: 'relative', height: 200, bgcolor: '#f0f0f0' }}>
                {!imgLoaded[index] && (
                  <Skeleton variant="rectangular" width="100%" height={200} animation="wave" sx={{ position: 'absolute', top: 0, left: 0 }} />
                )}
                <CardMedia
                  component="img"
                  height="200"
                  image={equipmentImages[index]}
                  alt={`${item.title} - 祐鴻測繪儀器設備`}
                  sx={{ objectFit: 'cover', opacity: imgLoaded[index] ? 1 : 0, transition: 'opacity 0.3s' }}
                  onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[index] = true; return n; })}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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