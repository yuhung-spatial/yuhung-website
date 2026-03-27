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

const TERRAIN = [terrainHosaa, terrainXishan, terrainNqu, terrainLongko];
const TERRAIN_LABELS = ['后沙', '西山', '金大', '嚨口'];
const MONITOR = [mon1, mon2, mon3, mon4, mon5];
const CULTURE_VIDEOS = [culture1, culture2];

export default function Projects() {
  const ctx = useContext(LanguageContext);
  const t = ctx?.t;
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

  // 通用：圖片幻燈片卡片
  const ImgCard = ({ imgs, idx, title, desc, topBadge, bottomBtns }) => (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 260, md: 380 },
      borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
      {/* 圖片層：用 <img> 確保顯示 */}
      {imgs.map((src, i) => (
        <Box key={i} component="img" src={src} alt=""
          sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
      {/* 深色遮罩 */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        zIndex: 2,
      }} />
      {/* 文字 */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, zIndex: 3 }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.82)' }}>{desc}</Typography>
      </Box>
      {/* 上方標籤 */}
      {topBadge && (
        <Box sx={{ position: 'absolute', top: 14, right: 14, zIndex: 4,
          bgcolor: '#1565c0', color: '#fff', px: 1.5, py: 0.5,
          borderRadius: 2, fontSize: '0.68rem', fontWeight: 700 }}>
          {topBadge}
        </Box>
      )}
      {/* 下方選擇器按鈕（覆蓋在文字上方） */}
      {bottomBtns}
    </Box>
  );

  // 通用：漸層卡片（無圖片）
  const GradCard = ({ bg, title, desc, center }) => (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 260, md: 380 },
      borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      background: bg }}>
      {center ? (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          px: 4, textAlign: 'center' }}>
          <Typography sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 900,
            color: '#fff', letterSpacing: 4, textShadow: '0 2px 16px rgba(0,0,0,0.5)', mb: 2 }}>
            {title}
          </Typography>
          <Box sx={{ width: 48, height: 3, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 2, mb: 2 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 300 }}>
            {desc}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>{title}</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.82)' }}>{desc}</Typography>
        </Box>
      )}
    </Box>
  );

  const terrainBtns = (
    <Box sx={{ position: 'absolute', bottom: 56, right: 14, zIndex: 4, display: 'flex', gap: 1 }}>
      {TERRAIN_LABELS.map((label, i) => (
        <Box key={label} onClick={() => setTi(i)} sx={{
          px: 1.5, py: 0.5, borderRadius: 2, cursor: 'pointer',
          bgcolor: i === ti ? '#e65100' : 'rgba(255,255,255,0.25)',
          color: '#fff', fontSize: '0.68rem', fontWeight: i === ti ? 700 : 400,
          transition: 'background 0.2s',
        }}>
          {label}
        </Box>
      ))}
    </Box>
  );

  return (
    <Container maxWidth="lg">
      {/* 標題 */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
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

      {/* 2×2 四宮格 */}
      <Grid container spacing={3}>

        {/* 左上：公共工程測繪 */}
        <Grid item xs={12} md={6}>
          <ImgCard
            imgs={MONITOR} idx={mi}
            title={items[0]?.title || '公共工程測繪'}
            desc={items[0]?.desc}
            topBadge={items[0]?.badge || '歷史建築監測作業'}
          />
        </Grid>

        {/* 右上：古蹟數位保存 */}
        <Grid item xs={12} md={6}>
          <GradCard
            bg="linear-gradient(135deg, #3e2723 0%, #6d4c41 50%, #4e342e 100%)"
            title={items[1]?.title || '古蹟數位保存'}
            desc={items[1]?.desc}
          />
        </Grid>

        {/* 左下：大面積地形測量 */}
        <Grid item xs={12} md={6}>
          <ImgCard
            imgs={TERRAIN} idx={ti}
            title={items[2]?.title || '大面積地形測量'}
            desc={items[2]?.desc}
            bottomBtns={terrainBtns}
          />
        </Grid>

        {/* 右下：文化・保存・傳承（影片） */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 260, md: 380 },
            borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', bgcolor: '#000' }}>
            {/* 影片層：一次只播一支 */}
            <Box
              key={ci}
              component="video"
              src={CULTURE_VIDEOS[ci]}
              autoPlay muted loop playsInline preload="auto"
              sx={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* 深色遮罩 */}
            <Box sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
              zIndex: 2,
            }} />
            {/* 文字 */}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, zIndex: 3 }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
                {items[3]?.title || '文化・保存・傳承'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.82)' }}>
                {items[3]?.desc || '以數位科技為筆，為下一代留存珍貴的文化記憶與歷史空間。'}
              </Typography>
            </Box>
            {/* 影片切換按鈕 */}
            <Box sx={{ position: 'absolute', bottom: 56, right: 14, zIndex: 4, display: 'flex', gap: 1 }}>
              {['新郎燈 01', '新郎燈 03'].map((label, i) => (
                <Box key={i} onClick={() => setCi(i)} sx={{
                  px: 1.5, py: 0.5, borderRadius: 2, cursor: 'pointer',
                  bgcolor: i === ci ? '#7b1fa2' : 'rgba(255,255,255,0.25)',
                  color: '#fff', fontSize: '0.68rem', fontWeight: i === ci ? 700 : 400,
                  transition: 'background 0.2s',
                }}>
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}
