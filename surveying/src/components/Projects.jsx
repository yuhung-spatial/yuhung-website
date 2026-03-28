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
// 古蹟影片：以字串路徑動態決定（避免 Vite 2 GiB 打包限制）
// Electron 打包後透過 app:// 協定提供；瀏覽器開發模式透過 Vite public/ 提供
const IS_ELECTRON = typeof window !== 'undefined' &&
  window.navigator.userAgent.toLowerCase().includes('electron');
const VP = (name) => IS_ELECTRON ? `app://localhost/videos/${name}` : `/videos/${name}`;
const heritageV1 = VP('東蕭村蕭顯紀洋樓.mp4');
const heritageV2 = VP('東蕭村蕭顯傳洋樓.mp4');
const heritageV3 = VP('珠山下三落點雲動畫.mp4');

const TERRAIN        = [terrainHosaa, terrainXishan, terrainNqu, terrainLongko];
const TERRAIN_LABELS = ['后沙', '西山', '金大', '嚨口'];
const MONITOR        = [mon1, mon2, mon3, mon4, mon5];
const CULTURE_VIDS   = [culture1, culture2];
const HERITAGE_VIDS  = [
  { src: heritageV1, label: '蕭顯紀洋樓' },
  { src: heritageV2, label: '蕭顯傳洋樓' },
  { src: heritageV3, label: '珠山下三落' },
];

export default function Projects() {
  const ctx   = useContext(LanguageContext);
  const t     = ctx?.t;
  const items = t?.projects?.items || [];

  const [ti, setTi] = useState(0); // 地形
  const [mi, setMi] = useState(0); // 監測
  const [ci, setCi] = useState(0); // 文化影片（自動）
  const [hi, setHi] = useState(0); // 古蹟（手動）

  // 地形：每 5 秒
  useEffect(() => {
    const id = setInterval(() => setTi(p => (p + 1) % TERRAIN.length), 5000);
    return () => clearInterval(id);
  }, []);

  // 監測：每 5 秒
  useEffect(() => {
    const id = setInterval(() => setMi(p => (p + 1) % MONITOR.length), 5000);
    return () => clearInterval(id);
  }, []);

  // 文化傳承：每 5 秒自動輪播
  useEffect(() => {
    const id = setInterval(() => setCi(p => (p + 1) % CULTURE_VIDS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const CARD = { borderRadius: 3, overflow: 'hidden', boxShadow: '0 6px 28px rgba(0,0,0,0.18)', height: '100%' };
  const H    = { xs: 220, sm: 280, md: 360 };

  // 下方文字遮罩
  const TextOverlay = ({ title, desc }) => (
    <Box sx={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.82))',
      p: { xs: 1.5, md: 3 }, zIndex: 5,
    }}>
      <Typography sx={{ color: '#fff', fontWeight: 700, mb: 0.3, fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' } }}>{title}</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.95rem' }, display: { xs: 'none', sm: 'block' } }}>{desc}</Typography>
    </Box>
  );

  // 選擇器按鈕
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

      {/* 四宮格 Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }}>

        {/* ── 01 公共工程測繪 ── */}
        <Grid item xs={6}>
          <Box sx={{ ...CARD, position: 'relative', height: H }}>
            {MONITOR.map((src, i) => (
              <Box key={i} component="img" src={src} alt=""
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'cover', opacity: i === mi ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
            ))}
            <TextOverlay title={items[0]?.title || '公共工程測繪'} desc={items[0]?.desc} />
            <Box sx={{ position: 'absolute', top: { xs: 8, md: 16 }, right: { xs: 8, md: 16 }, zIndex: 6,
              bgcolor: '#1565c0', color: '#fff', px: 1, py: 0.4,
              borderRadius: 2, fontSize: { xs: '0.6rem', md: '0.72rem' }, fontWeight: 700 }}>
              {items[0]?.badge || '歷史建築監測作業'}
            </Box>
          </Box>
        </Grid>

        {/* ── 02 古蹟數位保存 ── */}
        <Grid item xs={6}>
          <Box sx={{ ...CARD, position: 'relative', height: H, bgcolor: '#000' }}>
            <Box key={hi} component="video"
              src={HERITAGE_VIDS[hi].src}
              autoPlay muted loop playsInline
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)', zIndex: 2 }} />
            <TextOverlay title={items[1]?.title || '古蹟數位保存'} desc={items[1]?.desc} />
            <Box sx={{ position: 'absolute', bottom: { xs: 48, md: 68 }, right: { xs: 6, md: 16 }, zIndex: 6, display: 'flex', gap: 0.5 }}>
              {HERITAGE_VIDS.map((v, i) => (
                <Btn key={i} label={v.label} active={i === hi} color="#8d6e63" onClick={() => setHi(i)} />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* ── 03 大面積地形測量 ── */}
        <Grid item xs={6}>
          <Box sx={{ ...CARD, position: 'relative', height: H }}>
            {TERRAIN.map((src, i) => (
              <Box key={i} component="img" src={src} alt=""
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'cover', opacity: i === ti ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
            ))}
            <TextOverlay title={items[2]?.title || '大面積地形測量'} desc={items[2]?.desc} />
            <Box sx={{ position: 'absolute', bottom: { xs: 48, md: 68 }, right: { xs: 6, md: 16 }, zIndex: 6, display: 'flex', gap: 0.5 }}>
              {TERRAIN_LABELS.map((label, i) => (
                <Btn key={label} label={label} active={i === ti} color="#e65100" onClick={() => setTi(i)} />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* ── 04 文化・保存・傳承 ── */}
        <Grid item xs={6}>
          <Box sx={{ ...CARD, position: 'relative', height: H, bgcolor: '#000' }}>
            <Box key={ci} component="video"
              src={CULTURE_VIDS[ci]}
              autoPlay muted loop playsInline
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%)', zIndex: 2 }} />
            <TextOverlay
              title={items[3]?.title || '文化・保存・傳承'}
              desc={items[3]?.desc || '以數位科技為筆，為下一代留存珍貴的文化記憶與歷史空間。'}
            />
            <Box sx={{ position: 'absolute', bottom: { xs: 48, md: 68 }, right: { xs: 6, md: 16 }, zIndex: 6, display: 'flex', gap: 0.5 }}>
              {CULTURE_VIDS.map((_, i) => (
                <Box key={i} onClick={() => setCi(i)} sx={{
                  width: { xs: 7, md: 10 }, height: { xs: 7, md: 10 }, borderRadius: '50%', cursor: 'pointer',
                  bgcolor: i === ci ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'background 0.3s',
                }} />
              ))}
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}
