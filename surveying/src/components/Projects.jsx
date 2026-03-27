import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { LanguageContext } from '../App';

// ── 影片（只播放當前那支，其餘不載入）──
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
  monitoring1, monitoring2, monitoring3, monitoring4, monitoring5,
];

// 選擇器按鈕
const Btn = ({ active, color, onClick, children }) => (
  <Box
    onClick={onClick}
    sx={{
      px: 1.5, py: 0.5,
      borderRadius: 2,
      bgcolor: active ? color : 'rgba(255,255,255,0.25)',
      color: 'white',
      fontSize: '0.7rem',
      fontWeight: active ? 'bold' : 'normal',
      cursor: 'pointer',
      backdropFilter: 'blur(6px)',
      transition: 'background 0.3s',
      userSelect: 'none',
      '&:hover': { bgcolor: color },
    }}
  >
    {children}
  </Box>
);

export default function Projects() {
  const { t } = useContext(LanguageContext);
  const [terrainIdx,    setTerrainIdx]    = useState(0);
  const [heritageIdx,   setHeritageIdx]   = useState(0);
  const [monitoringIdx, setMonitoringIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTerrainIdx(p => (p + 1) % terrainSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setHeritageIdx(p => (p + 1) % heritageVideos.length), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMonitoringIdx(p => (p + 1) % monitoringSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const items = t.projects.items;

  // 共用卡片外框樣式
  const cardBox = {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    height: { xs: 280, sm: 360, md: 420 },
    boxShadow: 6,
    bgcolor: '#111',
  };

  // 背景圖片層樣式
  const bgLayer = (img, visible) => ({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: visible ? 1 : 0,
    transition: 'opacity 1.5s ease-in-out',
  });

  // 下方文字遮罩
  const overlay = {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
    p: { xs: 2.5, md: 3.5 },
    pt: { xs: 6, md: 8 },
    zIndex: 2,
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">

        {/* 標題 */}
        <Box textAlign="center" mb={6}>
          <Typography variant="overline" sx={{ letterSpacing: 4, color: 'text.secondary', fontWeight: 600 }}>
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

          {/* ── 格 0：公共工程測繪（監測幻燈片）── */}
          <Grid item xs={12} md={6}>
            <Box sx={cardBox}>
              {monitoringSlides.map((img, idx) => (
                <Box key={idx} sx={bgLayer(img, idx === monitoringIdx)} />
              ))}
              <Box sx={overlay}>
                <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                  {items[0]?.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {items[0]?.desc}
                </Typography>
              </Box>
              {/* 標籤 */}
              <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3 }}>
                <Box sx={{
                  px: 1.5, py: 0.5, borderRadius: 2,
                  bgcolor: '#1565c0', color: 'white',
                  fontSize: '0.7rem', fontWeight: 'bold',
                  backdropFilter: 'blur(6px)',
                }}>
                  {items[0]?.badge}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* ── 格 1：古蹟數位保存（一次只播一支影片）── */}
          <Grid item xs={12} md={6}>
            <Box sx={cardBox}>
              {/* 只渲染當前影片，key 改變時觸發重新載入 */}
              <Box
                key={heritageIdx}
                component="video"
                src={heritageVideos[heritageIdx].src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
              />
              <Box sx={overlay}>
                <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                  {items[1]?.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {items[1]?.desc}
                </Typography>
              </Box>
              {/* 影片選擇器 */}
              <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3, display: 'flex', gap: 1 }}>
                {heritageVideos.map((v, idx) => (
                  <Btn key={idx} active={idx === heritageIdx} color="#8d6e63" onClick={() => setHeritageIdx(idx)}>
                    {v.label}
                  </Btn>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* ── 格 2：大面積地形測量（正射影像幻燈片）── */}
          <Grid item xs={12} md={6}>
            <Box sx={cardBox}>
              {terrainSlides.map((slide, idx) => (
                <Box key={idx} sx={bgLayer(slide.img, idx === terrainIdx)} />
              ))}
              <Box sx={overlay}>
                <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
                  {items[2]?.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {items[2]?.desc}
                </Typography>
              </Box>
              {/* 地點選擇器 */}
              <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3, display: 'flex', gap: 1 }}>
                {terrainSlides.map((slide, idx) => (
                  <Btn key={idx} active={idx === terrainIdx} color="#FF9900" onClick={() => setTerrainIdx(idx)}>
                    {slide.label}
                  </Btn>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* ── 格 3：文化・保存・傳承（深藍漸層）── */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              ...cardBox,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
            }}>
              {/* 裝飾圓圈 */}
              {[
                { size: 280, top: -60,  left: -60,   color: 'rgba(83,52,131,0.55)'  },
                { size: 200, top: 50,   left: '58%', color: 'rgba(15,52,96,0.65)'   },
                { size: 160, top: '55%',left: 10,    color: 'rgba(83,52,131,0.4)'   },
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
              {/* 主文字 */}
              <Box sx={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                zIndex: 2, px: 4, textAlign: 'center',
              }}>
                <Typography variant="h3" sx={{
                  fontWeight: 900, color: 'white',
                  letterSpacing: { xs: 4, md: 6 },
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.6rem', md: '2.2rem' },
                  mb: 2,
                }}>
                  {items[3]?.title}
                </Typography>
                <Box sx={{ width: 60, height: 3, bgcolor: 'rgba(255,255,255,0.45)', borderRadius: 2, mb: 2 }} />
                <Typography variant="body1" sx={{
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.8,
                  maxWidth: 340,
                }}>
                  {items[3]?.desc}
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
