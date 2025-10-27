# 🚀 BƯỚC TIẾP THEO SAU KHI DEPLOY VERCEL

> Website của bạn đã live: https://xuong-art-production-final.vercel.app/

---

## ✅ ĐÃ HOÀN THÀNH:

1. ✅ Deploy Frontend lên Vercel
2. ✅ Website đã live

---

## ⚠️ VẤN ĐỀ HIỆN TẠI:

Website đang hiện "Đang tải dự án..." vì:
- **Backend (Strapi) chưa được deploy**
- **Chưa có dữ liệu để hiển thị**

---

## 📋 CÁC BƯỚC TIẾP THEO:

### BƯỚC 1: Deploy Backend lên Render (20 phút)

#### 1.1. Truy cập Render

1. Vào: **https://render.com**
2. **Sign in** với GitHub
3. Bạn sẽ thấy dashboard

---

#### 1.2. Tạo PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**

**Cấu hình:**
- **Name:** `xuongart-db`
- **Database:** `xuongart`
- **User:** `xuongart`
- **Password:** Click "Generate Secure Password" → **LƯU LẠI!**
- **Region:** **Singapore** (gần VN nhất)
- **Plan:** **Free**

2. Click **"Create Database"**
3. **Đợi 2-3 phút** để Render setup

---

#### 1.3. Lấy Internal Database URL

1. Click vào database vừa tạo
2. Scroll xuống phần **"Connections"**
3. Copy **"Internal Database URL"**

**Ví dụ:**
```
postgresql://xuongart:abc123@dpg-xyz.a.singapore-postgres.render.com/xuongart
```

4. **Lưu lại!** Bạn sẽ dùng ngay

---

#### 1.4. Tạo Strapi Web Service

1. Click **"New +"** → **"Web Service"**
2. **Connect GitHub repository**
3. Tìm và chọn: **XuongArtProduction_final**
4. Click **"Connect"**

**Cấu hình Web Service:**

| Field | Value |
|-------|-------|
| **Name** | `xuongart-strapi` |
| **Environment** | Node |
| **Region** | Singapore |
| **Branch** | `main` |
| **Root Directory** | **`xuongart-new`** ⚠️ QUAN TRỌNG! |
| **Runtime** | Node 18 |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

5. Click **"Create Web Service"**

---

#### 1.5. Thêm Environment Variables

**QUAN TRỌNG:** Trước khi click "Create Web Service", bạn phải thêm environment variables trước!

Scroll xuống phần **"Environment Variables"** và thêm:

##### A. Server Settings

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

##### B. Strapi App Keys

Mở file `BUOC_0_HUONG_DAN.md` và copy 6 keys đã generate:

```
Key: APP_KEYS
Value: [paste_key1],[paste_key2],[paste_key3],[paste_key4]
```

**Ví dụ:**
```
Key: APP_KEYS
Value: 7W274IRRahcLYMQlgtzu/aP0WtHtEw5SqaVRVk08YN5PZJr2ViY+nX3ZwRcxZ1NO,ODz6uVpzR+HYlfr6iFfxD5QpJx/jgTIVnqYpBNmZxEz3shq+UBtF3noE3pNRtCc8,t+Cfyh0Ha84f2UTUaham7m3gQSSp3U/2StXXyO9Oa8mi38s8c/NkFrEjWHQmLQHH,raGUnuQrXq6suYPEI7dNzIJucX2JGhSLUEnuo7i+R+WSR8qunvPNGVW7r2fJOG4l
```

##### C. Secrets (dùng key5, key6 + generate thêm 2 keys nữa)

```
Key: API_TOKEN_SALT
Value: /+yKpjUqCyVOqJEAv8UmbyjuV1MkWYcvrSomyQSsZGQpUHpC86WfcuF8brgA6jk0
```

```
Key: ADMIN_JWT_SECRET
Value: 28Hg4a0yelk/WBMyshTQNGfJ9TiVswpElHqHsKb0LYROOrLgVC3zItBMw3AoojY/
```

```
Key: TRANSFER_TOKEN_SALT
Value: [generate thêm - chạy lệnh node -p "require('crypto').randomBytes(48).toString('base64')"]
```

```
Key: JWT_SECRET
Value: [generate thêm - chạy lệnh node -p "require('crypto').randomBytes(48).toString('base64')"]
```

##### D. Database

```
Key: DATABASE_CLIENT
Value: postgres
```

```
Key: DATABASE_URL
Value: [paste_internal_database_url_từ_bước_1.3]
```

##### E. Cloudinary

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

---

#### 1.6. Deploy

Sau khi thêm hết environment variables:

1. Scroll lên trên
2. Click **"Create Web Service"**
3. **Đợi 5-10 phút** để Render build Strapi

**Lưu lại URL:** `https://xuongart-strapi.onrender.com`

---

### BƯỚC 2: Tạo Admin Account (5 phút)

1. Mở URL: `https://xuongart-strapi.onrender.com/admin`
2. **Đợi 30-60 giây** (free tier sleep lần đầu)
3. Tạo admin account mới
4. **Lưu credentials lại!**

---

### BƯỚC 3: Kết nối Frontend với Backend (10 phút)

#### 3.1. Cập nhật CORS trên Strapi

1. Mở file: `xuongart-new/config/middlewares.js`
2. Tìm dòng 36-40, uncomment và thêm Vercel URL:

```javascript
origin: [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://xuong-art-production-final.vercel.app', // Thêm dòng này
  // 'https://xuongart.com',
  // 'https://www.xuongart.com',
],
```

3. Push lên GitHub:
```bash
cd "c:\website xuongart\studio-main\studio-main"
git add xuongart-new/config/middlewares.js
git commit -m "Update CORS for production"
git push origin main
```

Render sẽ tự động rebuild (~3-5 phút)

---

#### 3.2. Cập nhật Environment Variable trên Vercel

1. Vào: **https://vercel.com/dashboard**
2. Click vào project **xuong-art-production-final**
3. **Settings** → **Environment Variables**
4. Thêm hoặc update:

```
NEXT_PUBLIC_STRAPI_API_URL=https://xuongart-strapi.onrender.com
```

5. Click **"Save"**
6. **Redeploy**: Deployments → Latest → ... → Redeploy

---

### BƯỚC 4: Test Website (10 phút)

1. Mở: **https://xuong-art-production-final.vercel.app**
2. Kiểm tra:
   - [ ] Homepage load được không?
   - [ ] Portfolio page có projects không?
   - [ ] Images hiển thị không?
   - [ ] Không có lỗi trong Console (F12)

---

## 🎉 HOÀN THÀNH!

Khi đã xong tất cả → Website sẽ:
- ✅ Load dữ liệu từ Strapi
- ✅ Hiển thị projects
- ✅ Images từ Cloudinary
- ✅ Hoàn toàn functional!

---

## 🐛 TROUBLESHOOTING

### Nếu vẫn thấy "Đang tải dự án..."

**Kiểm tra:**
1. Backend đã deploy xong chưa?
2. Vercel environment variable đã update chưa?
3. CORS đã update chưa?
4. Browser console có lỗi CORS không?

**Giải pháp:**
- Kiểm tra browser console (F12)
- Xem logs trên Render dashboard
- Đảm bảo CORS allow Vercel URL

---

Chúc bạn deploy thành công! 🚀

