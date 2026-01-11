import React, { useContext } from 'react';
import { Box, Container, Typography, IconButton, Stack, Link, Tooltip, Grid, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import { FaLine } from "react-icons/fa"; 
import { LanguageContext } from '../App';

const CenterInfoItem = ({ icon, title, content, href }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, color: 'secondary.main' }}>
      {icon}
      <Typography variant="body2" fontWeight="bold" sx={{ opacity: 0.8 }}>{title}</Typography>
    </Stack>
    {href ? (
      <Typography variant="body1" component="a" href={href} target={href.startsWith('http') ? '_blank' : '_self'} sx={{ color: 'white', textDecoration: 'none', fontWeight: 500, textAlign: 'center', transition: '0.3s', '&:hover': { color: 'secondary.main' } }}>
        {content}
      </Typography>
    ) : (
      <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>{content}</Typography>
    )}
  </Box>
);

export default function Footer() {
  const { t } = useContext(LanguageContext);

  return (
    <Box component="footer" sx={{ bgcolor: '#003366', color: 'white', pt: 8, pb: 4 }}>
      <Container maxWidth="md">
        
        {/* 品牌標題 */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h5" fontWeight="900" letterSpacing={2} sx={{ mb: 1 }}>
            祐鴻空間資訊 <Box component="span" sx={{ color: 'secondary.main', mx: 1 }}>|</Box> 祐鴻測繪科技
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>{t.hero.title}</Typography>
        </Box>

        {/* 雙據點資訊 */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          {/* 高雄 */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 3, borderRadius: 4, textAlign: 'center', height: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'secondary.main', mb: 2 }}>{t.footer.kaohsiung}</Typography>
              <CenterInfoItem icon={<PhoneIcon fontSize="small" />} title={t.footer.phone} content="(07) 350-2272" href="tel:073502272" />
              <CenterInfoItem icon={<PlaceIcon fontSize="small" />} title={t.footer.address} content={t.footer.kaohsiungAddr} href="https://goo.gl/maps/PLACEHOLDER_KH" />
            </Box>
          </Grid>
          {/* 金門 */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 3, borderRadius: 4, textAlign: 'center', height: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'secondary.main', mb: 2 }}>{t.footer.kinmen}</Typography>
              <CenterInfoItem icon={<PhoneIcon fontSize="small" />} title={t.footer.phone} content="(082) 316-016" href="tel:082316016" />
              <CenterInfoItem icon={<PlaceIcon fontSize="small" />} title={t.footer.address} content={t.footer.kinmenAddr} href="https://goo.gl/maps/PLACEHOLDER_KM" />
            </Box>
          </Grid>
        </Grid>

        {/* 共同資訊 (修改處) */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
           <Grid container spacing={2} justifyContent="center" alignItems="center">
             
             {/* 營業時間 */}
             <Grid item xs={12} sm="auto">
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <AccessTimeIcon color="secondary" fontSize="small" />
                  <Typography variant="body2">{t.footer.hours}</Typography>
                </Stack>
             </Grid>

             {/* 兩個 Email */}
             <Grid item xs={12} sm="auto" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                {/* 電腦版分隔線 */}
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, mx: 2, opacity: 0.3 }}>|</Box>
                
                {/* Email 堆疊顯示 */}
                <Stack spacing={1} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon color="secondary" fontSize="small" />
                    <Link href="mailto:yh.geomatics@gmail.com" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>yh.geomatics@gmail.com</Link>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon color="secondary" fontSize="small" />
                    <Link href="mailto:yh.surveying@gmail.com" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>yh.surveying@gmail.com</Link>
                  </Stack>
                </Stack>
             </Grid>

           </Grid>
        </Box>

        {/* 社群按鈕 */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Tooltip title="Facebook"><IconButton component={Link} href="https://www.facebook.com/..." target="_blank" sx={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', '&:hover': { bgcolor: '#1877F2', borderColor: '#1877F2' } }}><FacebookIcon /></IconButton></Tooltip>
          <Tooltip title="Instagram"><IconButton component={Link} href="https://www.instagram.com/..." target="_blank" sx={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', '&:hover': { bgcolor: '#E4405F', borderColor: '#E4405F' } }}><InstagramIcon /></IconButton></Tooltip>
          <Tooltip title="LINE"><IconButton component={Link} href="https://lin.ee/..." target="_blank" sx={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', '&:hover': { bgcolor: '#00C300', borderColor: '#00C300' } }}><FaLine size={20} /></IconButton></Tooltip>
        </Stack>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />
        <Box textAlign="center">
          <Typography variant="caption" sx={{ opacity: 0.5 }}>&copy; {new Date().getFullYear()} {t.footer.copyright}</Typography>
        </Box>
      </Container>
    </Box>
  );
}