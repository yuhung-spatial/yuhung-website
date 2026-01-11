import React, { useContext } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { LanguageContext } from '../App';

export default function Projects() {
  const { t } = useContext(LanguageContext);

  const projectImages = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", // 公共工程
    "https://images.unsplash.com/photo-1599587428723-5778844855d0?q=80&w=800&auto=format&fit=crop", // 古蹟
    "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=800&auto=format&fit=crop", // 地形測量
  ];

  return (
    <Container>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>{t.projects.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{t.projects.subtitle}</Typography>
      </Box>

      <Grid container spacing={4}>
        {t.projects.items.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box 
              sx={{ 
                position: 'relative', 
                borderRadius: 4, 
                overflow: 'hidden', 
                height: 300,
                group: 'true', // 用於 CSS hover
                cursor: 'pointer',
                boxShadow: 3
              }}
            >
              {/* 背景圖 */}
              <Box 
                component="img"
                src={projectImages[index]}
                alt={item.title}
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.1)' } // 圖片放大效果
                }}
              />
              
              {/* 漸層遮罩與文字 */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '100%', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
                  p: 3,
                  pt: 8
                }}
              >
                <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>{item.title}</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">{item.desc}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}