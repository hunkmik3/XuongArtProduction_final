# 🚀 Bắt đầu ngay - 5 phút

> Hướng dẫn siêu nhanh để chạy XưởngArt Studio

## ⚡ Setup 5 phút

### 1️⃣ Cài đặt dependencies

```bash
npm install
cd xuongart-new && npm install && cd ..
```

### 2️⃣ Tạo file .env.local (Frontend)

**Cách 1: Copy từ template**
```bash
cp env.example .env.local
```

**Cách 2: Tạo thủ công**

Tạo file `.env.local` với nội dung:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### 3️⃣ Tạo file .env (Strapi Backend)

**Cách 1: Copy từ template**
```bash
cp xuongart-new/env.example xuongart-new/.env
```

**Cách 2: Tạo thủ công**

Tạo file `xuongart-new/.env` với nội dung:

```env
HOST=0.0.0.0
PORT=1337

# Generate với: node -p "require('crypto').randomBytes(48).toString('base64')"
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
JWT_SECRET=your_secret

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

**Generate secrets:**
```bash
node -p "require('crypto').randomBytes(48).toString('base64')"
```
Chạy 4 lần và copy vào APP_KEYS (cách nhau bởi dấu phẩy)

### 4️⃣ Kiểm tra config

```bash
npm run check-env
```

Nếu thấy ✅ thì OK! Nếu thấy ❌ thì check lại file .env

### 5️⃣ Chạy development server

**Windows PowerShell:**
```powershell
.\start-dev.ps1
```

**Windows CMD:**
```cmd
start-dev.bat
```

**Mac/Linux:**
```bash
npm run dev:all
```

### 6️⃣ Mở trình duyệt

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

---

## 🎨 Setup Strapi lần đầu

1. Mở http://localhost:1337/admin
2. Tạo tài khoản admin:
   - Email: admin@xuongart.com
   - Password: (tự chọn, tối thiểu 8 ký tự)

3. Bật permissions:
   - Settings → Roles → Public
   - ✅ Tick `find` và `findOne` cho **Project**
   - Click **Save**

4. Thêm dự án mẫu:
   - Content Manager → Project → Create new entry
   - Điền thông tin và upload media
   - **Featured**: ✅
   - Click **Publish**

5. Refresh trang http://localhost:3000 → Xem dự án hiển thị!

---

## 🐛 Lỗi thường gặp

### Port đã được sử dụng

```bash
# Kill port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill port 1337
netstat -ano | findstr :1337
taskkill /PID <PID> /F
```

### Cannot find module

```bash
rm -rf node_modules
npm install
```

### Images không hiển thị

1. Check Cloudinary credentials trong `.env.local`
2. Restart: `Ctrl+C` → `npm run dev:all`

---

## 📚 Đọc thêm

- **SETUP.md** - Hướng dẫn chi tiết hơn
- **README.md** - Documentation đầy đủ
- **DEPLOYMENT.md** - Deploy lên production
- **FIXES_SUMMARY.md** - Xem những gì đã được sửa

---

## ✅ Checklist

- [ ] Đã cài đặt Node.js >= 18
- [ ] Đã chạy `npm install`
- [ ] Đã tạo file `.env.local`
- [ ] Đã tạo file `xuongart-new/.env`
- [ ] Đã generate APP_KEYS
- [ ] Đã chạy `npm run check-env` thành công
- [ ] Server chạy không có lỗi
- [ ] Truy cập được http://localhost:3000
- [ ] Truy cập được http://localhost:1337/admin

---

## 🎯 Các bước tiếp theo

1. ✅ Thêm nhiều dự án vào Strapi
2. ✅ Customize colors trong `src/app/globals.css`
3. ✅ Update thông tin công ty
4. ✅ Test responsive design
5. ✅ Đọc DEPLOYMENT.md để deploy

---

**Chúc bạn coding vui vẻ! 🎨✨**

Cần trợ giúp? Check browser console (F12) hoặc terminal logs.

