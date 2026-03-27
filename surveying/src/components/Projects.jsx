import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { LanguageContext } from '../App';

import terrainHosaa  from '../assets/terrain/hosaa.jpg';
import terrainXishan from '../assets/terrain/xishan.jpg';
import terrainNqu    from '../assets/terrain/nqu.jpg';
import terrainLongko from '../assets/terrain/longko.jpg';

import monitoring1 from '../assets/monitoring/monitoring_1.jpg';
import monitoring2 from '../assets/monitoring/monitoring_2.jpg';
import monitoring3 from '../assets/monitoring/monitoring_3.jpg';
import monitoring4 from '../assets/monitoring/monitoring_4.jpg';
import monitoring5 from '../assets/monitoring/monitoring_5.jpg';

const terrainSlides  = [terrainHosaa, terrainXishan, terrainNqu, terrainLongko];
const terrainLabels  = ['后沙', '西山', '金大', '嚨口'];
const monitoringImgs = [monitoring1, monitoring2, monitoring3, monitoring4, monitoring5];

export default function Projects() {
  const { t } = useContext(LanguageContext);
  const [tIdx, setTIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTIdx(p => (p + 1) % terrainSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMIdx(p => (p + 1) % monitoringImgs.length), 5000);
    return () => clearInterval(id);
  }, []);

  const items = t?.projects?.items || [];

  const Card = ({ children, height = { xs: 280, md: 400 } }) => (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height,
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    }}>
      {children}
    </Box>
  );

  const Overlay = ({ title, desc }) => (
    <Box sx={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
      p: 3, zIndex: 5,
    }}>
      <Typography variant="h6" color="white" fontWeight="bold">{title}</Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>{desc}</Typography>
    </Box>
  );

  const SlideBtn = ({ active, color, onClick, label }) => (
    <Box onClick={onClick} sx={{
      px: 1.5, py: 0.5, borderRadius: 2, cursor: 'pointer',
      bgcolor: active ? color : 'rgba(255,255,255,0.2)',
      color: 'white', fontSize: '0.7rem', fontWeight: active ? 700 : 400,
      backdropFilter: 'blur(4px)',
      transition: 'background 0.25s',
      '&:hover': { bgcolor: color },
    }}>
      {label}
    </Box>
  );

  return (
    <Container maxWidth="lg">
      {/* 標題 */}
      <Box textAlign="center" mb={6}>
        <Typography variant="overline" sx={{ letterSpacing: 4, color: 'text.secondary', fontWeight: 600 }}>
          OUR EXPERTISE
        </Typography>
        <Typography variant="h3" fontWeight="bold" mt={1} color="text.primary">
          {t?.projects?.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={1}>
          {t?.projects?.subtitle}
        </Typography>
      </Box>

      {/* 2×2 四宮格 */}
      <Grid container spacing={3}>

        {/* 格 0：公共工程測繪 */}
        <Grid item xs={12} md={6}>
          <Card>
            {monitoringImgs.map((img, i) => (
              <Box key={i} sx={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: i === mIdx ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
              }} />
            ))}
            <Overlay title={items[0]?.title} desc={items[0]?.desc} />
            <Box sx={{ position: 'absolute', bottom: 14, right: 14, zIndex: 6 }}>
              <Box sx={{
                px: 1.5, py: 0.5, borderRadius: 2,
                bgcolor: '#1565c0', color: 'white',
                fontSize: '0.68rem', fontWeight: 700,
                backdropFilter: 'blur(4px)',
              }}>
                {items[0]?.badge}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* 格 1：古蹟數位保存 */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* 用漸層當背景，避免大影片影響渲染 */}
            <Box sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #4e342e 100%)',
            }} />
            <Overlay title={items[1]?.title} desc={items[1]?.desc} />
          </Card>
        </Grid>

        {/* 格 2：大面積地形測量 */}
        <Grid item xs={12} md={6}>
          <Card>
            {terrainSlides.map((img, i) => (
              <Box key={i} sx={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: i === tIdx ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
              }} />
            ))}
            <Overlay title={items[2]?.title} desc={items[2]?.desc} />
            <Box sx={{ position: 'absolute', bottom: 14, right: 14, zIndex: 6, display: 'flex', gap: 1 }}>
              {terrainLabels.map((label, i) => (
                <SlideBtn key={i} active={i === tIdx} color="#e65100" onClick={() => setTIdx(i)} label={label} />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* 格 3：文化・保存・傳承 */}
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 60%, #533483 100%)',
            }} />
            <Box sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              zIndex: 4, px: 4, textAlign: 'center',
            }}>
              <Typography sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 900, color: 'white',
                letterSpacing: 4,
                textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                mb: 2,
              }}>
                {items[3]?.title}
              </Typography>
              <Box sx={{ width: 48, height: 3, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 2, mb: 2 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 320 }}>
                {items[3]?.desc}
              </Typography>
            </Box>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}
