import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Skeleton } from '@mui/material';
import { LanguageContext } from '../App';

import video1 from '../videos/東蕭村蕭顯紀洋樓.mp4';
import video2 from '../videos/東蕭村蕭顯傳洋樓.mp4';
import terrainHosaa from '../assets/terrain/hosaa.jpg';
import terrainXishan from '../assets/terrain/xishan.jpg';
import terrainNqu from '../assets/terrain/nqu.jpg';
import terrainLongko from '../assets/terrain/longko.jpg';

const heritageVideos = [
  { src: video1, label: '東蕭村蕭顯紀洋樓' },
  { src: video2, label: '東蕭村蕭顯傳洋樓' },
];

const terrainSlides = [
  { img: terrainHosaa,  label: '后沙' },
  { img: terrainXishan, label: '西山' },
  { img: terrainNqu,    label: '金大' },
  { img: terrainLongko, label: '嚨口' },
];

export default function Projects() {
  const { t, lang } = useContext(LanguageContext);
  const [imgLoaded, setImgLoaded] = useState(Array(3).fill(false));
  const [terrainIndex, setTerrainIndex] = useState(0);
  const [heritageIndex, setHeritageIndex] = useState(0);

  // 大面積地形測量幻燈片：每 5 秒切換
  useEffect(() => {
    const interval = setInterval(() => {
      setTerrainIndex(prev => (prev + 1) % terrainSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 古蹟數位保存幻燈片：每 5 秒切換
  useEffect(() => {
    const interval = setInterval(() => {
      setHeritageIndex(prev => (prev + 1) % heritageVideos.length);
    }, 5000);
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

              {/* ── 古蹟數位保存：可選影片幻燈片 ── */}
              {index === 1 && heritageVideos.map((v, idx) => (
                <Box
                  key={idx}
                  component="video"
                  src={v.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0, left: 0,
                    opacity: idx === heritageIndex ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                    zIndex: 0,
                  }}
                />
              ))}

              {/* ── 大面積地形測量：正射影像幻燈片 ── */}
              {index === 2 && terrainSlides.map((slide, idx) => (
                <Box
                  key={idx}
                  sx={{
                    backgroundImage: `url(${slide.img})`,
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

              {/* 古蹟數位保存影片選擇器 */}
              {index === 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20, right: 24,
                    display: 'flex',
                    gap: 1.5,
                    zIndex: 3,
                  }}
                >
                  {heritageVideos.map((v, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setHeritageIndex(idx)}
                      sx={{
                        px: 1.5, py: 0.5,
                        borderRadius: 2,
                        bgcolor: idx === heritageIndex ? '#8d6e63' : 'rgba(255,255,255,0.3)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: idx === heritageIndex ? 'bold' : 'normal',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { bgcolor: '#8d6e63' },
                      }}
                    >
                      {v.label}
                    </Box>
                  ))}
                </Box>
              )}

              {/* 地形測量幻燈片指示點（含地點名稱） */}
              {index === 2 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20, right: 24,
                    display: 'flex',
                    gap: 1.5,
                    zIndex: 3,
                  }}
                >
                  {terrainSlides.map((slide, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setTerrainIndex(idx)}
                      sx={{
                        px: 1.5, py: 0.5,
                        borderRadius: 2,
                        bgcolor: idx === terrainIndex ? '#FF9900' : 'rgba(255,255,255,0.3)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: idx === terrainIndex ? 'bold' : 'normal',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { bgcolor: '#FF9900' },
                      }}
                    >
                      {slide.label}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
