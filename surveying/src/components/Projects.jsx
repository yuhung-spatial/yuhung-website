import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

import video1 from '../videos/東蕭村蕭顯紀洋樓.mp4';
import video2 from '../videos/東蕭村蕭顯傳洋樓.mp4';
import banner1 from '../assets/banner.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const heritageVideos = [
  { src: video1, label: '東蕭村蕭顯紀洋樓' },
  { src: video2, label: '東蕭村蕭顯傳洋樓' },
];

const terrainSlides = [banner1, banner2, banner3];

export default function Projects() {
  const { t, lang } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(3).fill(false));
  const [terrainIndex, setTerrainIndex] = useState(0);

  // 大面積地形測量幻燈片：每 10 秒切換
  useEffect(() => {
    const interval = setInterval(() => {
      setTerrainIndex(prev => (prev + 1) % terrainSlides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const projectImages = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop", // 公共工程
    null, // 古蹟數位保存：改用影片
    null, // 大面積地形測量：改用幻燈片
  ];

  return (
    <Container>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>{t.projects.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{t.projects.subtitle}</Typography>
      </Box>

      {/* 縱向排列，每個案例佔全寬 */}
      <Grid container spacing={5} direction="column">
        {t.projects.items.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                height: { xs: 320, md: 480 },
                boxShadow: 4,
              }}
            >
              {/* ── 公共工程：單張圖片 ── */}
              {index === 0 && (
                <>
                  {!imgLoaded[0] && (
                    <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
                  )}
                  <Box
                    component="img"
                    src={projectImages[0]}
                    alt={`${item.title} - 祐鴻測繪案例`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: imgLoaded[0] ? 1 : 0,
                      transition: 'opacity 0.3s, transform 0.5s ease',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onLoad={() => setImgLoaded(prev => { const n = [...prev]; n[0] = true; return n; })}
                  />
                </>
              )}

              {/* ── 古蹟數位保存：自動播放影片 ── */}
              {index === 1 && (
                <Box
                  component="video"
                  src={heritageVideos[0].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}

              {/* ── 大面積地形測量：幻燈片 ── */}
              {index === 2 && terrainSlides.map((slide, idx) => (
                <Box
                  key={idx}
                  sx={{
                    backgroundImage: `url(${slide})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    opacity: idx === terrainIndex ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                  }}
                />
              ))}

              {/* 漸層遮罩與文字 */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  p: { xs: 3, md: 5 },
                  pt: { xs: 6, md: 10 },
                  zIndex: 2,
                }}
              >
                <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="rgba(255,255,255,0.85)" sx={{ maxWidth: 700 }}>
                  {item.desc}
                </Typography>
              </Box>

              {/* 地形測量幻燈片指示點 */}
              {index === 2 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20, right: 24,
                    display: 'flex',
                    gap: 1,
                    zIndex: 3,
                  }}
                >
                  {terrainSlides.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setTerrainIndex(idx)}
                      sx={{
                        width: idx === terrainIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: idx === terrainIndex ? '#FF9900' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Box>
              )}
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
