# ✅ Deployment Checklist - XưởngArt Studio

> Checklist đơn giản để follow khi deploy

---

## 📋 CHUẨN BỊ (10 phút)

- [ ] Generate 6 Strapi secrets bằng lệnh: `node -p "require('crypto').randomBytes(48).toString('base64')"`
- [ ] Lưu 6 keys vào file text (dán vào đây khi cần):
  - Key 1: _________________________
  - Key 2: _________________________
  - Key 3: _________________________
  - Key 4: _________________________
  - Key 5: _________________________
  - Key 6: _________________________
- [ ] Có Cloudinary credentials sẵn sàng
- [ ] Push code lên GitHub

---

## 🌐 FRONTEND - VERCEL (15 phút)

- [ ] Truy cập https://vercel.com và sign in
- [ ] Import repository `studio-main`
- [ ] Deploy project (để mặc định tất cả settings)
- [ ] Đợi build xong (~2-3 phút)
- [ ] Lấy URL Vercel: _________________________
- [ ] Test website load được không

**URL Vercel của bạn:** https://_______________

---

## 🔧 BACKEND - RENDER (20 phút)

### Tạo PostgreSQL Database

- [ ] Vào https://render.com và sign in
- [ ] New → PostgreSQL
- [ ] Tạo database với config:
  - Name: `xuongart-db`
  - Region: Singapore
  - Plan: Free
- [ ] Copy Internal Database URL: _________________________
- [ ] Database status = Available

### Tạo Strapi Web Service

- [ ] New → Web Service
- [ ] Connect GitHub repository
- [ ] Cấu hình:
  - Name: `xuongart-strapi`
  - Root Directory: **`xuongart-new`** ⚠️
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`
  - Plan: Free
- [ ] Thêm Environment Variables (12 variables) - Xem file DEPLOY_STEP_BY_STEP.md
- [ ] Save và deploy
- [ ] Đợi build xong (~5-10 phút)
- [ ] Lấy URL Render: _________________________

**URL Backend của bạn:** https://_______________

---

## 📝 ADMIN SETUP (5 phút)

- [ ] Truy cập admin URL (đợi 30-60s sleep lần đầu)
- [ ] Tạo admin account mới
- [ ] Login vào admin panel
- [ ] Test upload ảnh vào Media Library
- [ ] Test tạo Project mới

**Admin Email:** _________________________  
**Admin Password:** _________________________ (lưu lại!)

---

## 🔗 KẾT NỐI (10 phút)

### Cập nhật CORS

- [ ] Mở file: `xuongart-new/config/middlewares.js`
- [ ] Uncomment dòng 37 và thêm Vercel URL
- [ ] Commit và push lên GitHub:
  ```bash
  git add xuongart-new/config/middlewares.js
  git commit -m "Update CORS for production"
  git push origin main
  ```
- [ ] Đợi Render rebuild (~3-5 phút)

### Cập nhật Vercel Environment

- [ ] Vào Vercel Dashboard
- [ ] Settings → Environment Variables
- [ ] Update `NEXT_PUBLIC_STRAPI_API_URL` = Render URL
- [ ] Redeploy Frontend

---

## ✅ KIỂM TRA (10 phút)

### Frontend

- [ ] Homepage load OK
- [ ] Portfolio page có projects
- [ ] Images hiển thị từ Cloudinary
- [ ] Videos autoplay works
- [ ] Không có lỗi trong Console (F12)

### Backend API

- [ ] Test endpoint: `https://your-strapi.onrender.com/api/projects`
- [ ] Trả về JSON data
- [ ] Có projects trong response

### Admin Panel

- [ ] Login được
- [ ] Content Manager works
- [ ] Media Library upload được
- [ ] CRUD Projects OK

---

## 🐛 TROUBLESHOOTING (nếu cần)

### Nếu có lỗi CORS

- [ ] Check Console logs (F12)
- [ ] Add Vercel URL vào middlewares.js
- [ ] Push và đợi rebuild

### Nếu backend bị sleep

- [ ] Setup Uptime Robot (free)
- [ ] Monitor interval = 5 minutes
- [ ] Hoặc upgrade Render Starter ($7/tháng)

### Nếu images không hiển thị

- [ ] Check Cloudinary credentials
- [ ] Test upload trong Strapi admin
- [ ] Check next.config.js

---

## 🎉 HOÀN THÀNH!

### URLs cuối cùng:

- **Website:** https://_______________
- **Admin:** https://_______________

### Tips bảo quản:

- [ ] Backup data định kỳ từ Strapi admin
- [ ] Monitor logs trong Render dashboard
- [ ] Setup Uptime Robot để keep-alive

---

**Chúc bạn deploy thành công! 🚀**

*Lưu file này lại và tick off khi làm xong từng bước nhé!*

