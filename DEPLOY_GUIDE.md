# 🚀 Hướng dẫn Deploy - XưởngArt Studio

> Hướng dẫn chi tiết để deploy website và admin lên Vercel + Render

---

## ✅ Checklist: Đã sẵn sàng deploy!

### Files đã được cập nhật:
- ✅ `xuongart-new/config/middlewares.js` - CORS + Security config
- ✅ `xuongart-new/config/server.js` - PUBLIC_URL added
- ✅ `src/lib/imageProjects.js` - Environment variable fixed
- ✅ `src/app/api/image-projects/route.js` - Environment variable fixed

---

## 📋 BƯỚC 1: CHUẨN BỊ SECRETS

### 1. Generate Strapi Secrets

Mở terminal và chạy lệnh này **6 lần** để tạo secrets (mỗi lần sẽ tạo một key ngẫu nhiên):

```bash
node -p "require('crypto').randomBytes(48).toString('base64')"
```

**LƯU Ý:** Lưu lại 6 keys này vào file text để dùng sau!

Ví dụ output mẫu:
```
key1: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890abcdefghijklmn
key2: xYzAbCdEfGhIjKlMnOqRsTuVw1234567890abcdefghijklmnopq
... (copy 6 keys)
```

---

## 📦 BƯỚC 2: DEPLOY FRONTEND LÊN VERCEL

### 1. Push code lên GitHub (nếu chưa push)

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Deploy lên Vercel

1. **Vào:** https://vercel.com/new
2. **Sign in** bằng GitHub
3. **Import** repository: `studio-main`
4. **Cấu hình:**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Click "Deploy"**

### 3. Thêm Environment Variables (QUAN TRỌNG!)

Sau khi deploy xong, vào **Settings → Environment Variables** và thêm:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-app.onrender.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

**LƯU Ý:** Sẽ cập nhật `NEXT_PUBLIC_STRAPI_API_URL` sau khi deploy Strapi xong!

6. **Redeploy:** Deployments → Latest → ... → Redeploy

---

## 🔧 BƯỚC 3: DEPLOY BACKEND LÊN RENDER

### 1. Tạo Render Account

- Vào: https://render.com
- Sign up với GitHub

### 2. Tạo PostgreSQL Database

1. **New → PostgreSQL**
2. **Cấu hình:**
   - Name: `xuongart-db`
   - Database: `xuongart`
   - User: `xuongart`
   - Password: Tạo password mới (lưu lại!)
   - Region: Singapore (gần VN nhất)
   - Plan: **Free**
3. **Click "Create Database"**
4. **Copy Internal Database URL** (sẽ dùng sau)

### 3. Tạo Web Service (Strapi)

1. **New → Web Service**
2. **Connect GitHub repository**
3. **Select:** `studio-main`
4. **Cấu hình:**
   - Name: `xuongart-strapi`
   - Environment: **Node**
   - Region: Singapore
   - Branch: `main`
   - Root Directory: **`xuongart-new`** (quan trọng!)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: **Free**

### 4. Thêm Environment Variables

Trong trang cấu hình Strapi Web Service, scroll xuống **Environment Variables**:

```env
# Server
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://xuongart-strapi.onrender.com

# Strapi Secrets (dùng 6 keys đã generate ở bước 1)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=key5_from_generate
ADMIN_JWT_SECRET=key6_from_generate
TRANSFER_TOKEN_SALT=key7_from_generate
JWT_SECRET=key8_from_generate

# Database
DATABASE_CLIENT=postgres
DATABASE_URL=<paste_from_postgresql_internal_url>

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

**LƯU Ý QUAN TRỌNG:**
- `APP_KEYS`: Paste 4 keys đầu, cách nhau bởi dấu phẩy
- `DATABASE_URL`: Copy từ Internal Database URL của PostgreSQL
- Các keys khác: Dùng 4 keys còn lại đã generate

### 5. Deploy

1. **Click "Create Web Service"**
2. **Đợi 5-10 phút** để build
3. **Access URL:** `https://xuongart-strapi.onrender.com`

### 6. Tạo Admin Account

1. Mở: `https://xuongart-strapi.onrender.com/admin`
2. **Đợi 30-60 giây** (free tier sleep)
3. Tạo admin account mới (KHÔNG dùng credentials từ local)
4. Lưu thông tin đăng nhập!

---

## 🔗 BƯỚC 4: KẾT NỐI FRONTEND VỚI BACKEND

### 1. Cập nhật CORS trên Strapi

Sau khi có URL Vercel, sửa file `xuongart-new/config/middlewares.js`:

Uncomment và thêm URL production:

```javascript
origin: [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://your-app.vercel.app', // URL Vercel của bạn
  'https://xuongart.com',        // Domain custom (nếu có)
  'https://www.xuongart.com',
],
```

Commit và push:
```bash
git add xuongart-new/config/middlewares.js
git commit -m "Update CORS for production"
git push origin main
```

Render sẽ tự động rebuild.

### 2. Cập nhật Environment Variable trên Vercel

1. Vào Vercel Dashboard
2. **Settings → Environment Variables**
3. Update: `NEXT_PUBLIC_STRAPI_API_URL=https://xuongart-strapi.onrender.com`
4. **Redeploy** (Deployments → Latest → ... → Redeploy)

---

## ✅ BƯỚC 5: KIỂM TRA

### Checklist kiểm tra:

- [ ] Frontend: `https://your-app.vercel.app` load được
- [ ] Backend Admin: `https://your-strapi.onrender.com/admin` login được
- [ ] API works: Test `/api/projects` endpoint
- [ ] Images từ Cloudinary hiển thị OK
- [ ] Không có CORS errors trong console
- [ ] Portfolio page load projects thành công

---

## 🐛 TROUBLESHOOTING

### Frontend không load được dữ liệu

**Nguyên nhân:** CORS chưa được cập nhật

**Giải pháp:**
1. Mở `xuongart-new/config/middlewares.js`
2. Thêm URL Vercel vào `origin` array
3. Commit và push
4. Đợi Render rebuild

---

### Backend bị sleep mỗi lần vào

**Nguyên nhân:** Render free tier tự động sleep sau 15 phút

**Giải pháp tạm thời (miễn phí):**
- Setup Uptime Robot: https://uptimerobot.com
- Ping URL backend mỗi 5 phút
- Keep-alive để tránh sleep

**Giải pháp tốt (trả phí $7/tháng):**
- Upgrade Render plan lên Starter
- Không còn sleep

---

### Images không hiển thị

**Kiểm tra:**
1. Cloudinary credentials có đúng không?
2. Browser console có lỗi CORS không?
3. `next.config.js` có allow Cloudinary subdomains không?

---

## 📊 GIÁ CHÍ PHÍ

### Free Tier (Hiện tại):
- **Vercel:** $0
- **Render Web Service:** $0 (có sleep)
- **Render PostgreSQL:** $0 (giới hạn 1GB)
- **Cloudinary:** $0 (25GB storage, 25GB bandwidth)

**Tổng:** $0/tháng ✅

### Nếu muốn upgrade (tùy chọn):
- **Render Starter:** $7/tháng (không còn sleep)
- **Custom Domain:** ~$10/năm

---

## 🎉 Xong rồi!

Website của bạn đã live tại: `https://your-app.vercel.app`  
Admin panel tại: `https://your-strapi.onrender.com/admin`

**Tips:**
- Thường xuyên backup data từ Strapi admin
- Monitor Render logs nếu có vấn đề
- Sử dụng Cloudinary analytics để theo dõi traffic

---

**Chúc bạn deploy thành công! 🚀**

