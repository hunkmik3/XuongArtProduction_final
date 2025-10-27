# 🚀 Hướng Dẫn Deploy Từng Bước - XưởngArt Studio

> Hướng dẫn chi tiết, dễ hiểu nhất để deploy website lên Vercel + Render

---

## 📋 TỔNG QUAN

Bạn cần deploy:
1. **Frontend (Next.js)** → Vercel (miễn phí)
2. **Backend (Strapi CMS)** → Render (miễn phí)
3. **Database** → PostgreSQL trên Render
4. **Media** → Cloudinary (đã setup sẵn)

**Thời gian:** ~30-60 phút  
**Chi phí:** $0/tháng (hoàn toàn miễn phí!)

---

## 📝 BƯỚC 0: CHUẨN BỊ (10 phút)

### 0.1. Kiểm tra tài khoản cần có

- [ ] GitHub account (https://github.com)
- [ ] Vercel account (https://vercel.com) - Sign up bằng GitHub
- [ ] Render account (https://render.com) - Sign up bằng GitHub  
- [ ] Cloudinary account với credentials (đã có sẵn)

### 0.2. Generate Strapi Secrets

Mở PowerShell hoặc CMD và chạy:

```bash
node -p "require('crypto').randomBytes(48).toString('base64')"
```

**Chạy lệnh này 6 lần** để tạo 6 keys khác nhau. Mỗi lần sẽ cho output dạng:
```
aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890abcdefghijklmnopqrstuvwxyz
```

**Lưu 6 keys này vào file text** (Notepad hoặc file nào đó), đánh số key1, key2, key3... key6

**LƯU Ý:** Giữ file này AN TOÀN! Bạn sẽ dùng cho bước sau.

---

## 🎯 BƯỚC 1: PUSH CODE LÊN GITHUB (5 phút)

### 1.1. Kiểm tra code đã sẵn sàng

Mở terminal (PowerShell hoặc CMD) trong thư mục project:

```bash
cd "c:\website xuongart\studio-main\studio-main"
git status
```

Nếu thấy có thay đổi, bạn cần commit:

```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

**Hoặc nếu bạn muốn dùng nhánh khác:**

```bash
git checkout -b production
git push origin production
```

---

## 🌐 BƯỚC 2: DEPLOY FRONTEND LÊN VERCEL (15 phút)

### 2.1. Truy cập Vercel

1. Vào: https://vercel.com
2. **Sign in** với GitHub
3. Bạn sẽ thấy dashboard

### 2.2. Import Project

1. Click **"+ Add New..."** → **"Project"**
2. **Import Git Repository**
3. Tìm repository `studio-main` trong danh sách
4. Click **"Import"**

### 2.3. Cấu hình Build

Trong trang cấu hình, bạn sẽ thấy:

- **Framework Preset:** Next.js (auto detect)
- **Root Directory:** `./` (để mặc định)
- **Build Command:** `npm run build` (để mặc định)
- **Output Directory:** `.next` (để mặc định)

**Không cần thay đổi gì!** Click **"Deploy"**

### 2.4. Đợi Build

- Đợi 2-3 phút để Vercel build
- Bạn sẽ thấy logs build đang chạy
- Khi xong, sẽ hiện: **"Building Completed"**

### 2.5. Lấy URL Vercel

Sau khi deploy xong, bạn sẽ thấy:
- **Preview URL:** `https://your-app-abc123.vercel.app`

**Copy URL này!** Bạn sẽ dùng cho bước sau.

---

## 🔧 BƯỚC 3: DEPLOY BACKEND LÊN RENDER (20 phút)

### 3.1. Truy cập Render

1. Vào: https://render.com
2. **Sign up** với GitHub (nếu chưa có)
3. Click **"New +"** → **"PostgreSQL"**

### 3.2. Tạo PostgreSQL Database

**Cấu hình PostgreSQL:**

- **Name:** `xuongart-db`
- **Database:** `xuongart`  
- **User:** `xuongart`
- **Password:** Click "Generate Secure Password" và **lưu lại!**
- **Region:** Singapore (gần VN nhất)
- **PostgreSQL Version:** 15 (mặc định)
- **Plan:** **Free**

Click **"Create Database"**

**Đợi 2-3 phút** để Render setup database.

### 3.3. Lấy Internal Database URL

1. Click vào database vừa tạo
2. Scroll xuống phần **"Connections"**
3. Copy **"Internal Database URL"** (dạng `postgresql://user:pass@...`)
4. **Lưu lại!** Bạn sẽ dùng trong bước sau

**VÍ DỤ:**
```
postgresql://xuongart:abc123@dpg-xyz.a.singapore-postgres.render.com/xuongart
```

### 3.4. Tạo Strapi Web Service

1. Click **"New +"** → **"Web Service"**
2. **Connect** repository `studio-main` từ GitHub
3. Click **"Connect"**

**Cấu hình Web Service:**

- **Name:** `xuongart-strapi`
- **Environment:** Node
- **Region:** Singapore
- **Branch:** `main`
- **Root Directory:** **`xuongart-new`** ⚠️ QUAN TRỌNG!
- **Runtime:** Node 18 (hoặc 20)
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** **Free**

Click **"Create Web Service"**

### 3.5. Thêm Environment Variables

Trong trang cấu hình Strapi (chưa deploy), scroll xuống phần **"Environment Variables"**.

Click **"+ Add Environment Variable"** và thêm từng biến sau:

#### 1) Server Settings

```
Key: NODE_ENV
Value: production
```

```
Key: HOST
Value: 0.0.0.0
```

```
Key: PORT
Value: 1337
```

```
Key: PUBLIC_URL
Value: https://xuongart-strapi.onrender.com
```

#### 2) Strapi App Keys (dùng key1-key4 từ bước 0.2)

```
Key: APP_KEYS
Value: [paste_key1],[paste_key2],[paste_key3],[paste_key4]
```

**LƯU Ý:** Cách nhau bởi dấu phẩy, KHÔNG có space!

**Ví dụ:**
```
abc123def456,xyz789ghi012,jkl345mno678,pqr901stu234
```

#### 3) Secrets (dùng key5-key6 từ bước 0.2)

```
Key: API_TOKEN_SALT
Value: [paste_key5]
```

```
Key: ADMIN_JWT_SECRET
Value: [paste_key6]
```

```
Key: TRANSFER_TOKEN_SALT
Value: [paste_new_generated_key]
```

```
Key: JWT_SECRET
Value: [paste_new_generated_key]
```

#### 4) Database

```
Key: DATABASE_CLIENT
Value: postgres
```

```
Key: DATABASE_URL
Value: [paste_internal_database_url_từ_bước_3.3]
```

**LƯU Ý:** Đây là Internal Database URL bạn đã copy!

#### 5) Cloudinary

```
Key: CLOUDINARY_NAME
Value: [your_cloudinary_cloud_name]
```

```
Key: CLOUDINARY_KEY
Value: [your_cloudinary_api_key]
```

```
Key: CLOUDINARY_SECRET
Value: [your_cloudinary_api_secret]
```

### 3.6. Deploy

Sau khi thêm hết environment variables:

1. Scroll lên trên
2. Click **"Save Changes"**
3. Render sẽ **tự động deploy**

**Đợi 5-10 phút** để build Strapi.

Bạn sẽ thấy logs:
```
✓ Build successful
✓ Starting service
```

**Lưu lại URL:** `https://xuongart-strapi.onrender.com`

---

## 📝 BƯỚC 4: TẠO ADMIN ACCOUNT (5 phút)

### 4.1. Truy cập Admin

1. Mở URL: `https://xuongart-strapi.onrender.com/admin`
2. **Đợi 30-60 giây** (free tier bị sleep lần đầu)

### 4.2. Tạo Admin Account

Lần đầu vào sẽ thấy form đăng ký:

- **First name:** (tên của bạn)
- **Last name:** (họ của bạn)  
- **Email:** (email muốn dùng)
- **Password:** Tạo password mạnh
- **Confirm password:** Nhập lại password

Click **"Let's start"**

**LƯU Ý:** 
- **ĐỢI 1-2 phút** nếu trang không load ngay (free tier thường chậm lần đầu)
- Đây là tài khoản admin cho production, KHÔNG dùng credentials từ local!

### 4.3. Login vào Admin

Sau khi tạo xong, login với email/password vừa tạo.

---

## 🔗 BƯỚC 5: KẾT NỐI FRONTEND VỚI BACKEND (10 phút)

### 5.1. Cập nhật CORS trên Strapi

**Mục đích:** Cho phép Frontend (Vercel) gọi API đến Backend (Render).

#### Sửa file local:

1. Mở file: `xuongart-new/config/middlewares.js`
2. Tìm dòng 36-40 (origin array)
3. Uncomment và thêm URL Vercel:

```javascript
origin: [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://your-app-abc123.vercel.app', // URL Vercel của bạn
  // 'https://xuongart.com',        // Uncomment nếu có domain
  // 'https://www.xuongart.com',    // Uncomment nếu có domain
],
```

4. Lưu file

#### Push code lên GitHub:

```bash
cd "c:\website xuongart\studio-main\studio-main"
git add xuongart-new/config/middlewares.js
git commit -m "Update CORS for production"
git push origin main
```

#### Đợi Render rebuild:

- Render sẽ tự động rebuild khi detect code mới
- Đợi 3-5 phút
- Kiểm tra logs để đảm bảo deploy thành công

### 5.2. Cập nhật Environment Variable trên Vercel

#### Thêm Strapi URL:

1. Vào: https://vercel.com/dashboard
2. Click vào project `studio-main`
3. **Settings** → **Environment Variables**
4. Tìm `NEXT_PUBLIC_STRAPI_API_URL`
5. Click **"Edit"**
6. Update value thành: `https://xuongart-strapi.onrender.com`
7. Click **"Save"**

#### Redeploy:

1. Vào tab **"Deployments"**
2. Click **"..."** (3 chấm) ở deployment mới nhất
3. Click **"Redeploy"**
4. Đợi 2-3 phút

---

## ✅ BƯỚC 6: KIỂM TRA (10 phút)

### 6.1. Test Frontend

Mở URL Vercel của bạn: `https://your-app-abc123.vercel.app`

**Kiểm tra:**
- [ ] Homepage load được
- [ ] Navigation works
- [ ] Portfolio page có projects không?
- [ ] Images từ Cloudinary hiển thị
- [ ] Video autoplay works (nếu có)

### 6.2. Test Backend API

Mở URL: `https://your-strapi.onrender.com/api/projects`

**Kiểm tra:**
- [ ] Trả về JSON data
- [ ] Có projects data trong response

### 6.3. Test Admin Panel

Mở: `https://your-strapi.onrender.com/admin`

**Kiểm tra:**
- [ ] Login vào được
- [ ] Content Manager works
- [ ] Media Library có thể upload images
- [ ] Projects có thể CRUD

### 6.4. Kiểm tra Console Errors

1. Mở website Vercel
2. Press **F12** để mở Developer Tools
3. Tab **Console**
4. **Không nên có** lỗi CORS như:
   - `Access to fetch at ... from origin ... has been blocked by CORS policy`
   - `CORS: Cannot use wildcard in Access-Control-Allow-Origin`

Nếu có lỗi CORS → Xem Troubleshooting bên dưới.

---

## 🐛 TROUBLESHOOTING

### ❌ Frontend không load data từ Backend

**Nguyên nhân:** CORS chưa được cập nhật

**Giải pháp:**

1. Kiểm tra Console logs (F12)
2. Nếu thấy lỗi CORS → Backend chưa allow Frontend URL
3. Thêm Frontend URL vào `xuongart-new/config/middlewares.js`
4. Commit và push:
```bash
git add xuongart-new/config/middlewares.js
git commit -m "Fix CORS"
git push origin main
```
5. Đợi Render rebuild
6. Redeploy Vercel

---

### ❌ Backend bị sleep mỗi lần vào

**Hiện tượng:** Lần đầu vào admin phải đợi 30-60 giây

**Nguyên nhân:** Render free tier tự động sleep sau 15 phút không dùng

**Giải pháp miễn phí (Keep-alive):**

1. Vào: https://uptimerobot.com
2. Sign up (miễn phí)
3. **Add New Monitor:**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `XưởngArt Strapi`
   - URL: `https://your-strapi.onrender.com`
   - Monitoring Interval: **5 minutes**
4. Click **"Create Monitor"**

**Kết quả:** Uptime Robot sẽ ping backend mỗi 5 phút → không bị sleep

**Giải pháp trả phí:** Upgrade Render Starter ($7/tháng) → không còn sleep

---

### ❌ Build fails trên Render

**Nguyên nhân:** Thiếu dependencies hoặc build command sai

**Kiểm tra:**

1. Render Dashboard → Logs
2. Xem error message cụ thể
3. Common issues:
   - **"Module not found"** → Thiếu package trong `package.json`
   - **"Build command failed"** → Check Build Command
   - **"Root directory not found"** → Root Directory phải là `xuongart-new`

**Giải pháp:**

1. Vào: `xuongart-new/package.json`
2. Check `build` script:
```json
"scripts": {
  "build": "strapi build"
}
```
3. Commit và push lại

---

### ❌ Images không hiển thị

**Nguyên nhân:** Cloudinary credentials sai hoặc CORS

**Kiểm tra:**

1. Vercel Dashboard → Environment Variables
2. Verify: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` đúng
3. Check Console logs (F12) xem có lỗi CORS không

**Giải pháp:**

1. Verify Cloudinary credentials trong Strapi admin
2. Test upload image trong Strapi Media Library
3. Nếu upload thành công → Cloudinary OK
4. Nếu vẫn không hiển thị → Check `next.config.js` remotePatterns

---

### ❌ Cannot connect to database

**Nguyên nhân:** DATABASE_URL sai hoặc PostgreSQL chưa ready

**Kiểm tra:**

1. Render Dashboard → Database
2. Check status: Phải **Available**
3. Copy Internal Database URL mới
4. Update trong Strapi Web Service Environment Variables
5. Redeploy Strapi

---

## 🎉 HOÀN THÀNH!

Nếu không có lỗi gì → Website của bạn đã live!

### URLs của bạn:

- **Frontend:** `https://your-app-abc123.vercel.app`
- **Backend API:** `https://your-strapi.onrender.com/api`
- **Admin Panel:** `https://your-strapi.onrender.com/admin`

### Tips:

✅ Thường xuyên backup data từ Strapi admin  
✅ Monitor Render logs nếu có vấn đề  
✅ Sử dụng Cloudinary analytics để theo dõi traffic  
✅ Setup Uptime Robot để tránh backend sleep  

---

## 📊 TÓM TẮT CHI PHÍ

### Free Tier:
- **Vercel:** $0
- **Render Web Service:** $0 (có sleep)
- **Render PostgreSQL:** $0
- **Cloudinary:** $0 (25GB storage)

**Tổng:** $0/tháng ✅

### Optional (nếu muốn):
- **Render Starter:** $7/tháng (không còn sleep)
- **Custom Domain:** ~$10/năm

---

**Chúc bạn deploy thành công! 🚀**

Còn thắc mắc gì không? Comment bên dưới nhé!

