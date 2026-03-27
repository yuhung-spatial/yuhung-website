import { Stack, IconButton, Tooltip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { FaLine } from "react-icons/fa";

export default function SocialFab() {
  return (
    <Stack 
      spacing={1.5} 
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 100,
        zIndex: 9999,
        alignItems: 'end'
      }}
    >
      {/* --- 1. 空間資訊 LINE --- */}
      <Tooltip title="加入「空間資訊」LINE 好友" placement="left" arrow>
        <IconButton 
          href="https://lin.ee/0D2qPhg" 
          target="_blank"
          sx={{ 
            bgcolor: '#06C755', // LINE 官方綠色
            color: 'white',     // 圖示白色
            boxShadow: 3,
            width: 48,          // 固定寬高，確保圓形完美
            height: 48,
            border: '2px solid white',
            '&:hover': { bgcolor: '#05b34c' } 
          }}
        >
          <FaLine size={26} />
        </IconButton>
      </Tooltip>

      {/* --- 3. 一鍵撥話 --- */}
      <Tooltip title="電話 / Phone" placement="left" arrow>
        <IconButton
          href="tel:+88673502272"
          sx={{
            bgcolor: '#003366',
            color: 'white',
            boxShadow: 3,
            width: 48,
            height: 48,
            border: '2px solid white',
            '&:hover': { bgcolor: '#FF9900' }
          }}
        >
          <PhoneIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      {/* --- 2. 測繪科技 LINE --- */}
      <Tooltip title="加入「測繪科技」LINE 好友" placement="left" arrow>
        <IconButton 
          href="https://lin.ee/T1VINXX" 
          target="_blank"
          sx={{ 
            bgcolor: '#06C755', 
            color: 'white',
            boxShadow: 3,
            width: 48,
            height: 48,
            border: '2px solid white', // 加上白框，避免兩顆綠色按鈕黏在一起分不清楚
            '&:hover': { bgcolor: '#05b34c' } 
          }}
        >
           <FaLine size={26} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}