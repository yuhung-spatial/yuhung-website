// src/translations.js
export const resources = {
  zh: {
    nav: {
      about: "關於祐鴻",
      services: "服務項目",
      equipment: "儀器介紹",
      projects: "經典案例",
      contact: "聯絡我們",
      langSwitch: "English",
      companySpace: "祐鴻空間資訊有限公司",
      companySurvey: "祐鴻測繪科技有限公司",
    },
    hero: {
      title: "以毫米為單位的空間紀錄者",
      subtitle: "結合傳統測繪與現代科技，提供全方位的空間解決方案",
    },
    about: {
      title: "關於祐鴻",
      subtitle: "ABOUT US",
      desc1: "祐鴻團隊深耕於高雄、台南與金門，以「精準、專業、創新」為核心價值。由經驗豐富的資深測量技師與空間資訊專家領軍。",
      desc2: "我們不僅具備深厚的傳統測量技術底蘊，更積極導入現代化科技，致力於將真實世界的空間數據，轉化為高價值的數位資產。",
      // 已移除統計數據的翻譯
      items: {
        item1: { title: "精密工程測繪", desc: "地形地籍測量、都市計畫樁位、指定建築線及工程放樣。" },
        item2: { title: "先進遙測技術", desc: "運用無人機 (UAV) 攝影、地面三維雷射掃描，快速獲取高密度點雲。" },
        item3: { title: "數位典藏與建模", desc: "古蹟數位化建檔、逆向工程與 BIM 建模，打造數位雙生。" },
        item4: { title: "智慧監測系統", desc: "施工鄰房監測、環境變遷偵測及自動化即時定位。" },
      }
    },
    services: {
      title: "專業服務",
      subtitle: "結合先進儀器與專業技術，提供動態且精準的空間解決方案",
      items: [
        { title: "工程測量", desc: "建築放樣、變位監測、水準測量，確保施工精度與安全。" },
        { title: "3D 雷射掃描", desc: "逆向工程、古蹟數位保存、BIM 模型建置，快速獲取高密度點雲。" },
        { title: "UAV 無人機航測", desc: "大範圍正射影像、傾斜攝影建模、地形測繪，高效率空中作業。" },
        { title: "GIS 空間資訊", desc: "WebGIS 平台建置、圖資數位化、管線資料庫管理系統開發。" },
      ]
    },
    equipment: {
      title: "儀器設備",
      subtitle: "工欲善其事，必先利其器。我們採用業界頂尖測繪儀器。",
      items: [
        { title: "高精度全站儀", desc: "Leica/Topcon 等級測量儀器，確保毫米級精度。" },
        { title: "GNSS 衛星定位儀", desc: "RTK 即時動態定位，支援多星系訊號接收。" },
        { title: "地面三維雷射掃描儀", desc: "每秒百萬點掃描速率，快速建立數位孿生模型。" },
        { title: "測繪級無人機", desc: "搭載高畫質相機與光達 (LiDAR)，大範圍地形測繪首選。" },
      ]
    },
    projects: {
      title: "經典案例",
      subtitle: "累積多年的工程實績，是我們專業能力的最佳證明",
      items: [
        { title: "公共工程測繪", desc: "協助政府機關進行道路、橋樑及公共設施之精密測量。" },
        { title: "古蹟數位保存", desc: "運用雷射掃描技術，完整記錄歷史建築幾何資訊。" },
        { title: "大面積地形測量", desc: "無人機航拍結合地面控制點，產製高精度正射影像。" },
      ]
    },
    contact: {
      title: "聯絡我們",
      subtitle: "有任何測繪需求或疑問，歡迎隨時與我們聯繫",
      form: {
        name: "您的姓名",
        phone: "聯絡電話",
        email: "電子郵件",
        message: "諮詢內容",
        submit: "發送訊息",
      },
      info: {
        kaohsiung: "高雄辦公室",
        kinmen: "金門辦公室",
        mapTitle: "辦公室位置",
      },
      alerts: {
        phoneError: "請輸入正確的手機號碼格式（例如：0912345678）",
        success: "感謝您的訊息！我們已收到您的聯絡資訊，會盡快與您聯繫。",
        networkError: "發送失敗，請檢查網路連線或稍後再試。",
      },
    },
    footer: {
      kaohsiung: "高雄辦公室",
      kinmen: "金門辦公室",
      phone: "聯絡電話",
      address: "服務地址",
      hoursLabel: "營業時間",
      hours: "週一至週五 08:30 - 18:00",
      contact: "聯絡與關注",
      kaohsiungAddr: "高雄市左營區曾子路533號",
      kinmenAddr: "金門縣金寧鄉頂埔下88-8號",
      brandSpace: "祐鴻空間資訊",
      brandSurvey: "祐鴻測繪科技",
      copyright: "祐鴻空間資訊有限公司 | 祐鴻測繪科技有限公司 All Rights Reserved.",
    }
  },
  en: {
    nav: {
      about: "About Us",
      services: "Services",
      equipment: "Equipment",
      projects: "Projects",
      contact: "Contact",
      langSwitch: "中文",
      companySpace: "YuHung Spatial Information Co., Ltd.",
      companySurvey: "YuHung Surveying Technology Co., Ltd.",
    },
    hero: {
      title: "Precision Spatial Recorders",
      subtitle: "Integrating traditional surveying with modern technology to provide comprehensive spatial solutions.",
    },
    about: {
      title: "About YuHung",
      subtitle: "ABOUT US",
      desc1: "Based in Kaohsiung, Tainan and Kinmen, YuHung holds 'Precision, Professionalism, Innovation' as core values.",
      desc2: "We combine deep traditional surveying expertise with modern technology, transforming real-world spatial data into high-value digital assets.",
      // Stats removed
      items: {
        item1: { title: "Engineering Surveying", desc: "Topographic survey, cadastral survey, and precise engineering stakeout." },
        item2: { title: "Advanced Remote Sensing", desc: "UAV photography and terrestrial 3D laser scanning." },
        item3: { title: "Digital Archiving & BIM", desc: "Digital preservation of monuments, reverse engineering, and BIM modeling." },
        item4: { title: "Smart Monitoring", desc: "Construction monitoring and real-time positioning." },
      }
    },
    services: {
      title: "Our Services",
      subtitle: "Dynamic and precise spatial solutions using advanced instruments.",
      items: [
        { title: "Engineering Survey", desc: "Construction stakeout, displacement monitoring, ensuring precision and safety." },
        { title: "3D Laser Scanning", desc: "Reverse engineering, digital preservation, BIM modeling." },
        { title: "UAV Aerial Survey", desc: "Large-scale orthophotos, oblique photography modeling." },
        { title: "GIS Spatial Info", desc: "WebGIS platform construction, map digitization." },
      ]
    },
    equipment: {
      title: "Equipment",
      subtitle: "We use industry-leading surveying instruments to ensure the best results.",
      items: [
        { title: "Total Station", desc: "Leica/Topcon grade instruments ensuring millimeter-level precision." },
        { title: "GNSS Receiver", desc: "Real-time kinematic (RTK) positioning with multi-constellation support." },
        { title: "3D Laser Scanner", desc: "Million points per second scanning for rapid digital twin creation." },
        { title: "Surveying UAV", desc: "Equipped with high-res cameras and LiDAR for large-scale mapping." },
      ]
    },
    projects: {
      title: "Classic Projects",
      subtitle: "Years of engineering achievements are the best proof of our professional capabilities.",
      items: [
        { title: "Public Works Survey", desc: "Precise surveying for roads, bridges, and public facilities." },
        { title: "Heritage Preservation", desc: "Using laser scanning to record historical building geometries." },
        { title: "Large-scale Mapping", desc: "UAV mapping combined with ground control points for orthophotos." },
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Feel free to contact us for any surveying needs or inquiries.",
      form: {
        name: "Your Name",
        phone: "Phone Number",
        email: "Email Address",
        message: "Message",
        submit: "Send Message",
      },
      info: {
        kaohsiung: "Kaohsiung Office",
        kinmen: "Kinmen Office",
        mapTitle: "Office Locations",
      },
      alerts: {
        phoneError: "Please enter a valid phone number (e.g. 0912345678).",
        success: "Thank you! We received your message and will get back to you shortly.",
        networkError: "Failed to send. Please check your connection and try again.",
      },
    },
    footer: {
      kaohsiung: "Kaohsiung Office",
      kinmen: "Kinmen Office",
      phone: "Phone",
      address: "Address",
      hoursLabel: "Hours",
      hours: "Mon-Fri 08:30 - 18:00",
      contact: "Contact Us",
      kaohsiungAddr: "No. 533, Zengzi Rd., Zuoying Dist., Kaohsiung City",
      kinmenAddr: "No. 88-8, Dingpuxia, Jinning Township, Kinmen County",
      brandSpace: "YuHung Spatial Information",
      brandSurvey: "YuHung Surveying Technology",
      copyright: "YuHung Spatial Information Co., Ltd. | YuHung Surveying Technology Co., Ltd. All Rights Reserved.",
    }
  }
};