import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTop() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 300 });
  return (
    <Zoom in={trigger}>
      <Fab color="primary" size="medium" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           sx={{ position: 'fixed', bottom: 40, right: 20, bgcolor: 'primary.main', color: 'white', boxShadow: 3, '&:hover': { bgcolor: 'secondary.main' } }}>
        <KeyboardArrowUpIcon fontSize="large" />
      </Fab>
    </Zoom>
  );
}