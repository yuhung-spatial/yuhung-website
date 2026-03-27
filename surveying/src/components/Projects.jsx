import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { LanguageContext } from '../App';

// ── 影片 ──
import video1 from '../videos/東蕭村蕭顯紀洋樓.mp4';
import video2 from '../videos/東蕭村蕭顯傳洋樓.mp4';
import video3 from '../videos/珠山下三落點雲動畫.mp4';

// ── 地形正射影像 ──
import terrainHosaa  from '../assets/terrain/hosaa.jpg';
import terrainXishan from '../assets/terrain/xishan.jpg';
import terrainNqu    from '../assets/terrain/nqu.jpg';
import terrainLongko from '../assets/terrain/longko.jpg';

// ── 公共工程監測照片 ──
import monitoring1 from '../assets/monitoring/monitoring_1.jpg';
import monitoring2 from '../assets/monitoring/monitoring_2.jpg';
import monitoring3 from '../assets/monitoring/monitoring_3.jpg';
import monitoring4 from '../assets/monitoring/monitoring_4.jpg';
import monitoring5 from '../assets/monitoring/monitoring_5.jpg';

// ── 資料定義 ──
const heritageVideos = [
  { src: video1, label: '蕭顯紀洋樓' },
  { src: video2, label: '蕭顯傳洋樓' },
  { src: video3, label: '珠山下三落' },
];

const terrainSlides = [
  { img: terrainHosaa,  label: '后沙' },
  { img: terrainXishan, label: '西山' },
  { img: terrainNqu,    label: '金大' },
  { img: terrainLongko, label: '嚨口' },
];

const monitoringSlides = [
  { img: monitoring1 },
  { img: monitoring2 },
  { img: monitoring3 },
  { img: monitoring4 },
  { img: monitoring5 },
];

// 第 4 格主題色漸層（文化・保存・傳承）
const CULTURE_BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)';

export default function Projects() {
  const { t } = useContext(LanguageContext);
  const [terrainIndex,    setTerrainIndex]    = useState(0);
  const [heritageIndex,   setHeritageIndex]   = useState(0);
  const [monitoringIndex, setMonitoringIndex] = useState(0);

  // 地形：每 5 秒
  useEffect(() => {
    const id = setInterval(() => setTerrainIndex(p => (p + 1) % terrainSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  // 古蹟影片：每 30 秒
  useEffect(() => {
    const id = setInterval(() => setHeritageIndex(p => (p + 1) % heritageVideos.length), 30000);
    return () => clearInterval(id);
  }, []);

  // 監測照片：每 5 秒
  useEffect(() => {
    const id = setInterval(() => setMonitoringIndex(p => (p + 1) % monitoringSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const items = t.projects.items;

  // ── 選擇器按鈕樣式 ──
  const btnStyle = (active, color) => ({
    px: 1.5, py: 0.5,
    borderRadius: 2,
    bgcolor: active ? color : 'rgba(255,255,255,0.25)',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: active ? 'bold' : 'normal',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(6px)',
    userSelect: 'none',
    '&:hover': { bgcolor: color },
  });

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">

        {/* 標題 */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 4, color: 'text.secondary', fontWeight: 600 }}
          >
            OUR EXPERTISE
          </Typography>
          <Typography variant="h3" fontWeight="bold" mt={1}>
            {t.projects.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            {t.projects.subtitle}
          </Typography>
        </Box>

        {/* 2×2 四宮格 */}
        <Grid container spacing={3}>
          {items.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: { xs: 280, sm: 360, md: 420 },
                  boxShadow: 6,
                  // 第4格用漸層背景
                  background: index === 3 ? CULTURE_BG : 'transparent',
                }}
              >

                {/* ── 格0：公共工程監測幻燈片 ── */}
                {index === 0 && monitoringSlides.map((slide, idx) => (
                  <Box key={idx} sx={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    position: 'absolute', inset: 0,
                    opacity: idx === monitoringIndex ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                  }} />
                ))}

                {/* ── 格1：古蹟影片幻燈片 ── */}
                {index === 1 && heritageVideos.map((v, idx) => (
                  <Box key={idx} component="video" src={v.src}
                    autoPlay muted loop playsInline
                    sx={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      position: 'absolute', inset: 0,
                      opacity: idx === heritageIndex ? 1 : 0,
                      transition: 'opacity 1.5s ease-in-out',
                    }}
                  />
                ))}

                {/* ── 格2：地形正射影像幻燈片 ── */}
                {index === 2 && terrainSlides.map((slide, idx) => (
                  <Box key={idx} sx={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    position: 'absolute', inset: 0,
                    opacity: idx === terrainIndex ? 1 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                  }} />
                ))}

                {/* ── 格3：文化・保存・傳承（裝飾圓圈） ── */}
                {index === 3 && (
                  <>
                    {/* 裝飾性光暈圓圈 */}
                    {[
                      { size: 320, top: -80,  left: -80,  color: 'rgba(83,52,131,0.5)'  },
                      { size: 240, top: 60,   left: '60%', color: 'rgba(15,52,96,0.6)'  },
                      { size: 180, top: '55%',left: 20,   color: 'rgba(83,52,131,0.35)' },
                    ].map((c, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        width: c.size, height: c.size,
                        top: c.top, left: c.left,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${c.color}, transparent 70%)`,
                        filter: 'blur(20px)',
                      }} />
                    ))}
                    {/* 中央主標題 */}
                    <Box sx={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      zIndex: 2, px: 4, textAlign: 'center',
                    }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900, color: 'white', letterSpacing: 6,
                          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                          fontSize: { xs: '1.8rem', md: '2.4rem' },
                          mb: 2,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Box sx={{ width: 60, height: 3, bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 2, mb: 2 }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 360 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </>
                )}

                {/* ── 漸層遮罩 + 文字（格0/1/2） ── */}
                {index !== 3 && (
                  <Box sx={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                    p: { xs: 2.5, md: 4 },
                    pt: { xs: 6, md: 10 },
                    zIndex: 2,
                  }}>
                    <Typography variant="h5" color="white" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' } }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                )}

                {/* ── 格0：監測標籤 ── */}
                {index === 0 && item.badge && (
                  <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3 }}>
                    <Box sx={{
                      px: 1.5, py: 0.5, borderRadius: 2,
                      bgcolor: '#1565c0', color: 'white',
                      fontSize: '0.72rem', fontWeight: 'bold',
                      backdropFilter: 'blur(6px)',
                    }}>
                      {item.badge}
                    </Box>
                  </Box>
                )}

                {/* ── 格1：古蹟影片選擇器 ── */}
                {index === 1 && (
                  <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3, display: 'flex', gap: 1 }}>
                    {heritageVideos.map((v, idx) => (
                      <Box key={idx} onClick={() => setHeritageIndex(idx)} sx={btnStyle(idx === heritageIndex, '#8d6e63')}>
                        {v.label}
                      </Box>
                    ))}
                  </Box>
                )}

                {/* ── 格2：地形地點選擇器 ── */}
                {index === 2 && (
                  <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3, display: 'flex', gap: 1 }}>
                    {terrainSlides.map((slide, idx) => (
                      <Box key={idx} onClick={() => setTerrainIndex(idx)} sx={btnStyle(idx === terrainIndex, '#FF9900')}>
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
    </Box>
  );
}
