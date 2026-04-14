import React, { useContext } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LanguageContext } from '../App';
import aboutVideo from '../assets/about-video.mp4';

export default function About() {
  const { t } = useContext(LanguageContext);

  // 從翻譯檔動態生成服務列表
  const aboutServices = [
    t.about.items.item1,
    t.about.items.item2,
    t.about.items.item3,
    t.about.items.item4,
  ];

  return (
    <Container id="about"> 
      <Grid container spacing={8} alignItems="center">
        
        {/* 左側：文字內容 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ borderLeft: '5px solid #FF9900', pl: 3, mb: 4 }}>
            <Typography variant="h6" color="secondary" fontWeight="bold" letterSpacing={2} gutterBottom>
              {t.about.subtitle}
            </Typography>
            <Typography variant="h3" color="primary.main" fontWeight="800">
              {t.about.title}
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 3 }}>
            {t.about.desc1}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 4 }}>
            {t.about.desc2}
          </Typography>

          {/* 服務細項列表 */}
          <Grid container spacing={3}>
            {aboutServices.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box display="flex" alignItems="flex-start">
                  <CheckCircleIcon color="secondary" sx={{ mr: 1.5, mt: 0.5, fontSize: 24, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ fontSize: '1.1rem', mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* 右側：圖片區域 */}
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              position: 'relative', 
              px: 2, 
              '&::before': { 
                content: '""', 
                position: 'absolute', 
                top: -15, 
                right: 0, 
                width: '100%', 
                height: '100%', 
                border: '4px solid #FF9900', 
                borderRadius: 4, 
                zIndex: 0 
              } 
            }}
          >
            <Box
              component="video"
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: 4,
                position: 'relative',
                zIndex: 1
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}