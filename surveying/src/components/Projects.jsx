import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { LanguageContext } from '../App';

import terrainHosaa  from '../assets/terrain/hosaa.jpg';
import terrainXishan from '../assets/terrain/xishan.jpg';
import terrainNqu    from '../assets/terrain/nqu.jpg';
import terrainLongko from '../assets/terrain/longko.jpg';
import mon1 from '../assets/monitoring/monitoring_1.jpg';
import mon2 from '../assets/monitoring/monitoring_2.jpg';
import mon3 from '../assets/monitoring/monitoring_3.jpg';
import mon4 from '../assets/monitoring/monitoring_4.jpg';
import mon5 from '../assets/monitoring/monitoring_5.jpg';
import culture1 from '../assets/culture/culture_1.mp4';
import culture2 from '../assets/culture/culture_2.mp4';

const TERRAIN       = [terrainHosaa, terrainXishan, terrainNqu, terrainLongko];
const TERRAIN_LABELS = ['后沙', '西山', '金大', '嚨口'];
const MONITOR       = [mon1, mon2, mon3, mon4, mon5];
const CULTURE_VIDS  = [culture1, culture2];

export default function Projects() {
  const ctx  = useContext(LanguageContext);
  const t    = ctx?.t;
  const items = t?.projects?.items || [];

  const [ti, setTi] = useState(0);
  const [mi, setMi] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTi(p => (p + 1) % TERRAIN.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMi(p => (p + 1) % MONITOR.length), 5000);
    return () => clearInterval(id);
  }, []);

  const CARD = { borderRadius: 3, overflow: 'hidden', boxShadow: '0 6px 28px rgba(0,0,0,0.18)', mb: 4 };
  const H    = { xs: 280, md: 460 };

  const TextOverlay = ({ title, desc }) => (
    <Box sx={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.82))',
      p: { xs: 3, md: 4 }, zIndex: 5,
    }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>{title}</Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>{desc}</Typography>
    </Box>
  );

  const Btn = ({ label, active, color, onClick }) => (
    <Box onClick={onClick} sx={{
      px: 1.5, py: 0.5, borderRadius: 2, cursor: 'pointer',
      bgcolor: active ? color : 'rgba(255,255,255,0.22)',
      color: '#fff', fontSize: '0.72rem', fontWeight: active ? 700 : 400,
      backdropFilter: 'blur(4px)', transition: 'background 0.2s',
      '&:hover': { bgcolor: color },
    }}>{label}</Box>
  );

  return (
    <Container maxWidth="md">

      {/* 標題 */}
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography variant="overline" sx={{ letterSpacing: 4, color: 'text.secondary', fontWeight: 600 }}>
          OUR EXPERTISE
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
          {t?.projects?.title || '經典案例'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          {t?.projects?.subtitle}
        </Typography>
      </Box>

      {/* ── 01 公共工程測繪 ── */}
      <Box sx={{ ...CARD, position: 'relative', height: H }}>
        {MONITOR.map((src, i) => (
          <Box key={i} component="img" src={src} alt=""
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: i === mi ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
        ))}
        <TextOverlay title={items[0]?.title || '公共工程測繪'} desc={items[0]?.desc} />
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 6,
          bgcolor: '#1565c0', color: '#fff', px: 1.5, py: 0.5,
          borderRadius: 2, fontSize: '0.72rem', fontWeight: 700 }}>
          {items[0]?.badge || '歷史建築監測作業'}
        </Box>
      </Box>

      {/* ── 02 古蹟數位保存 ── */}
      <Box sx={{ ...CARD, position: 'relative', height: H,
        background: 'linear-gradient(135deg, #3e2723 0%, #6d4c41 50%, #4e342e 100%)' }}>
        <TextOverlay title={items[1]?.title || '古蹟數位保存'} desc={items[1]?.desc} />
      </Box>

      {/* ── 03 大面積地形測量 ── */}
      <Box sx={{ ...CARD, position: 'relative', height: H }}>
        {TERRAIN.map((src, i) => (
          <Box key={i} component="img" src={src} alt=""
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', opacity: i === ti ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
        ))}
        <TextOverlay title={items[2]?.title || '大面積地形測量'} desc={items[2]?.desc} />
        <Box sx={{ position: 'absolute', bottom: 68, right: 16, zIndex: 6, display: 'flex', gap: 1 }}>
          {TERRAIN_LABELS.map((label, i) => (
            <Btn key={label} label={label} active={i === ti} color="#e65100" onClick={() => setTi(i)} />
          ))}
        </Box>
      </Box>

      {/* ── 04 文化・保存・傳承 ── */}
      <Box sx={{ ...CARD, position: 'relative', height: H, bgcolor: '#000' }}>
        <Box key={ci} component="video" src={CULTURE_VIDS[ci]}
          autoPlay muted loop playsInline
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
          zIndex: 2,
        }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: { xs: 3, md: 4 }, zIndex: 5 }}>
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
            {items[3]?.title || '文化・保存・傳承'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            {items[3]?.desc || '以數位科技為筆，為下一代留存珍貴的文化記憶與歷史空間。'}
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 68, right: 16, zIndex: 6, display: 'flex', gap: 1 }}>
          {['新郎燈 01', '新郎燈 03'].map((label, i) => (
            <Btn key={i} label={label} active={i === ci} color="#7b1fa2" onClick={() => setCi(i)} />
          ))}
        </Box>
      </Box>

    </Container>
  );
}
