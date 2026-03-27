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

const TERRAIN = [terrainHosaa, terrainXishan, terrainNqu, terrainLongko];
const TERRAIN_LABELS = ['后沙', '西山', '金大', '嚨口'];
const MONITOR = [mon1, mon2, mon3, mon4, mon5];

export default function Projects() {
  const ctx = useContext(LanguageContext);
  const t = ctx?.t;
  const items = t?.projects?.items || [];

  const [ti, setTi] = useState(0);
  const [mi, setMi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTi(p => (p + 1) % TERRAIN.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMi(p => (p + 1) % MONITOR.length), 5000);
    return () => clearInterval(id);
  }, []);

  const CARD_H = { xs: '260px', md: '380px' };

  return (
    <Container maxWidth="lg">
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

      <Grid container spacing={3}>

        {/* 左上：公共工程測繪 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: CARD_H, borderRadius: 3, overflow: 'hidden', boxShadow: 4 }}>
            {MONITOR.map((src, i) => (
              <Box key={i} sx={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: i === mi ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }} />
            ))}
            <Box sx={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              p: 3, zIndex: 10,
            }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                {items[0]?.title || '公共工程測繪'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
                {items[0]?.desc}
              </Typography>
            </Box>
            <Box sx={{
              position: 'absolute', top: 14, right: 14, zIndex: 10,
              bgcolor: '#1565c0', color: '#fff', px: 1.5, py: 0.5,
              borderRadius: '8px', fontSize: '0.68rem', fontWeight: 700,
            }}>
              {items[0]?.badge || '歷史建築監測作業'}
            </Box>
          </Box>
        </Grid>

        {/* 右上：古蹟數位保存 */}
        <Grid item xs={12} md={6}>
          <Box sx={{
            position: 'relative', height: CARD_H, borderRadius: 3, overflow: 'hidden', boxShadow: 4,
            background: 'linear-gradient(135deg, #3e2723 0%, #6d4c41 50%, #4e342e 100%)',
          }}>
            <Box sx={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              p: 3, zIndex: 10,
            }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                {items[1]?.title || '古蹟數位保存'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
                {items[1]?.desc}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 左下：大面積地形測量 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: CARD_H, borderRadius: 3, overflow: 'hidden', boxShadow: 4 }}>
            {TERRAIN.map((src, i) => (
              <Box key={i} sx={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: i === ti ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }} />
            ))}
            <Box sx={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              p: 3, zIndex: 10,
            }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                {items[2]?.title || '大面積地形測量'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
                {items[2]?.desc}
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 14, right: 14, zIndex: 10, display: 'flex', gap: 1 }}>
              {TERRAIN_LABELS.map((label, i) => (
                <Box key={label} onClick={() => setTi(i)} sx={{
                  px: 1.5, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                  bgcolor: i === ti ? '#e65100' : 'rgba(255,255,255,0.22)',
                  color: '#fff', fontSize: '0.68rem', fontWeight: i === ti ? 700 : 400,
                  transition: 'background 0.2s',
                }}>
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* 右下：文化・保存・傳承 */}
        <Grid item xs={12} md={6}>
          <Box sx={{
            position: 'relative', height: CARD_H, borderRadius: 3, overflow: 'hidden', boxShadow: 4,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 60%, #533483 100%)',
          }}>
            <Box sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              px: 4, textAlign: 'center',
            }}>
              <Typography sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 900, color: '#fff',
                letterSpacing: { xs: 3, md: 5 },
                textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                mb: 2,
              }}>
                {items[3]?.title || '文化・保存・傳承'}
              </Typography>
              <Box sx={{ width: 48, height: 3, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 2, mb: 2 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 300 }}>
                {items[3]?.desc || '以數位科技為筆，為下一代留存珍貴的文化記憶與歷史空間。'}
              </Typography>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}
