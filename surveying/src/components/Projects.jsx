import React, { useContext, useState } from 'react';
import { Box, Container, Typography, Grid, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

import video1 from '../videos/東蕭村蕭顯紀洋樓.mp4';
import video2 from '../videos/東蕭村蕭顯傳洋樓.mp4';

const heritageVideos = [
  { src: video1, label: '東蕭村蕭顯紀洋樓' },
  { src: video2, label: '東蕭村蕭顯傳洋樓' },
];

export default function Projects() {
  const { t, lang } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(3).fill(false));

  const projectImages = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", // 公共工程
    null, // 古蹟數位保存：改用影片
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
              {/* 背景：古蹟案例用影片，其餘用圖片 */}
              {index === 1 ? (
                <Box
                  component="video"
                  src={heritageVideos[0].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  {!imgLoaded[index] && (
                    <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
                  )}
                  <Box
                    component="img"
                    src={projectImages[index]}
                    alt={`${item.title} - 祐鴻測繪案例`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imgLoaded[index] ? 1 : 0,
                      transition: 'opacity 0.3s, transform 0.5s ease',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                    onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[index] = true; return n; })}
                  />
                </>
              )}
              
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
      {/* ===== 古蹟數位保存影片展示 ===== */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" textAlign="center" gutterBottom>
          {lang === 'en' ? 'Heritage Digital Preservation — Featured Videos' : '古蹟數位保存 — 影片展示'}
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 1 }}>
          {heritageVideos.map((v) => (
            <Grid item xs={12} md={5} key={v.label}>
              <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" textAlign="center" gutterBottom>
                {v.label}
              </Typography>
              <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
                <Box
                  component="video"
                  src={v.src}
                  controls
                  playsInline
                  sx={{ width: '100%', display: 'block', maxHeight: 320, objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}