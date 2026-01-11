import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTop() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 300 });
  return (
    <Zoom in={trigger}>
      <Fab color="primary" size="medium" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
           sx={{ position: 'fixed', bottom: 40, right: 40, bgcolor: '#00F0FF', color: '#000', boxShadow: '0 0 20px #00F0FF', '&:hover': { bgcolor: '#fff' } }}>
        <KeyboardArrowUpIcon fontSize="large" />
      </Fab>
    </Zoom>
  );
}