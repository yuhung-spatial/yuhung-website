import React, { useContext, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LanguageContext } from '../App';

export default function Contact() {
  const { t } = useContext(LanguageContext);

  // --- 1. 表單狀態管理 (包含 honeypot 隱藏欄位) ---
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    honeypot: '' // 機器人誘捕欄位
  });
  
  const [loading, setLoading] = useState(false);

  // ★★★ 請將此處替換為您的 Google Apps Script 網址 ★★★
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziwmSL497aLnnrs-NblJmUsKPxQH7w1ciqCnqSa1qjZpHa1YZN65_hrbA6_t7Jbu75UQ/exec"; 

  // --- 2. 處理輸入變更 ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // --- 3. 處理表單送出 ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ★★★ 防呆檢查：驗證手機格式 (台灣 09 開頭 + 8碼) ★★★
    const phoneRegex = /^09\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("請輸入正確的手機號碼格式 (例如：0912345678)");
      return; 
    }

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // 避免跨域錯誤
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert('感謝您的訊息！我們已收到您的聯絡資訊，會盡快與您聯繫。');
      
      // 清空表單
      setFormData({ name: '', phone: '', email: '', message: '', honeypot: '' }); 

    } catch (error) {
      console.error("Error:", error);
      alert('發送失敗，請檢查網路連線或稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* ===== 標題 ===== */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          {t.contact.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t.contact.subtitle}
        </Typography>
      </Box>

      {/* ===== 置中容器：控制整張表單最大寬度 ===== */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} sx={{ width: '100%' }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              width: '100%' // 鎖死 Paper 寬度，避免被全域 CSS 壓縮
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%' }} // 鎖死 form 寬度
            >
              {/* ★★★ 隱藏的捕鼠籠欄位 (防機器人) ★★★ */}
              <div style={{ display: 'none' }}>
                <input 
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex="-1" 
                  autoComplete="off"
                />
              </div>

              <Grid
                container
                spacing={3}
                sx={{ width: '100%', m: 0 }} // 鎖死 Grid container 寬度
              >
                {/* ===== 第一列：姓名 / 電話 / Email ===== */}
                <Grid item xs={12} sm={4} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    sx={{ width: '100%' }}
                    label={t.contact.form.name}
                    variant="outlined"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    sx={{ width: '100%' }}
                    label={t.contact.form.phone}
                    variant="outlined"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="09xxxxxxxx" // 加入提示
                  />
                </Grid>

                <Grid item xs={12} sm={4} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    sx={{ width: '100%' }}
                    label={t.contact.form.email}
                    variant="outlined"
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>

                {/* ===== 第二列：諮詢內容（同寬＝第一列三格總和） ===== */}
                <Grid item xs={12} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    sx={{ width: '100%' }}
                    label={t.contact.form.message}
                    variant="outlined"
                    multiline
                    minRows={6}
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>

                {/* ===== 第三列：發送訊息（置中） ===== */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    width: '100%'
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={loading} // 送出中鎖定按鈕
                    endIcon={loading ? null : <SendIcon />}
                    sx={{
                      borderRadius: 50,
                      px: 8,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: 3,
                      transition: '0.3s',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : t.contact.form.submit}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}