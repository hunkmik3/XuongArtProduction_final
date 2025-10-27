# ⚡ Quick Setup Guide - XưởngArt Studio

> Hướng dẫn setup nhanh để chạy dự án trong 5 phút!

## 🚀 Setup nhanh (5 phút)

### Bước 1: Chuẩn bị môi trường

```bash
# Clone project (nếu chưa có)
git clone <repo-url>
cd studio-main

# Cài đặt Node.js dependencies
npm install
cd xuongart-new && npm install && cd ..
```

### Bước 2: Tạo file .env.local (Frontend)

Tạo file `.env.local` trong thư mục root với nội dung:

```env
# Strapi API URL
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dwynoncvm
CLOUDINARY_API_KEY=892494726275633
CLOUDINARY_API_SECRET=5Eluv2KY2MvKE4Omv4a0GdeExxc
CLOUDINARY_URL=cloudinary://892494726275633:5Eluv2KY2MvKE4Omv4a0GdeExxc@dwynoncvm
```

⚠️ **Lưu ý**: Các credentials trên là ví dụ. Hãy thay bằng credentials Cloudinary của bạn!

### Bước 3: Tạo file .env (Strapi Backend)

Tạo file `xuongart-new/.env` với nội dung:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets - Tạo mới bằng lệnh: node -p "require('crypto').randomBytes(48).toString('base64')"
APP_KEYS=toAN2d12Qi1AJR/Js7wdJEYZNPjQ1Hb1lPz0gW4mZGM=,Qm45OP8EfI+VXj6aBcDeFgHiJkLmNoPqRsTuVwXyZ=,X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R=,S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6I7J8K9L0M=
API_TOKEN_SALT=aBcDeFgHiJkLmNoPqRsTuVwXyZ123456
ADMIN_JWT_SECRET=xYz123AbC456DeF789GhI012JkL345MnO
TRANSFER_TOKEN_SALT=pQr678StU901VwX234YzA567BcD890EfG
JWT_SECRET=hIj123KlM456NoP789QrS012TuV345WxY

# Database (SQLite for development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Cloudinary (same as frontend)
CLOUDINARY_NAME=dwynoncvm
CLOUDINARY_KEY=892494726275633
CLOUDINARY_SECRET=5Eluv2KY2MvKE4Omv4a0GdeExxc
```

⚠️ **Bảo mật**: Tạo secrets mới bằng lệnh:
```bash
node -p "require('crypto').randomBytes(48).toString('base64')"
```

### Bước 4: Khởi chạy

**Option A: Chạy tự động (Recommended)**

Windows PowerShell:
```powershell
.\start-dev.ps1
```

Windows CMD:
```cmd
start-dev.bat
```

**Option B: Chạy thủ công**

```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Strapi
cd xuongart-new
npm run develop
```

**Option C: Chạy đồng thời (Concurrently)**

```bash
npm run dev:all
```

### Bước 5: Setup Strapi Admin

1. Mở trình duyệt: http://localhost:1337/admin
2. Tạo tài khoản admin đầu tiên (chỉ lần đầu)
3. **Bật Permissions cho Public role:**
   - Settings → Users & Permissions → Roles → Public
   - Tick: `find` và `findOne` cho **Project**
   - Click Save

### Bước 6: Thêm dự án mẫu

1. Vào Content Manager → Project
2. Click "Create new entry"
3. Điền thông tin:
   - **Title**: Samsung Galaxy S23
   - **Client**: Samsung
   - **Category**: Product Video
   - **Tagline**: Mô tả ngắn về dự án
   - **Featured**: ✅ (để hiện trên homepage)
   - **Order**: 1
   - Upload **Media** (video/image)
4. Click Publish

### Bước 7: Xem kết quả

- Homepage: http://localhost:3000
- Portfolio: http://localhost:3000/portfolio
- About: http://localhost:3000/about
- Contact: http://localhost:3000/contact

---

## 🔧 Troubleshooting

### Lỗi: Port 3000 đã được sử dụng

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Lỗi: Port 1337 đã được sử dụng

```bash
# Windows
netstat -ano | findstr :1337
taskkill /PID <PID> /F
```

### Lỗi: Cannot find module '@strapi/strapi'

```bash
cd xuongart-new
rm -rf node_modules
npm install
```

### Lỗi: Images không hiển thị

1. Kiểm tra Cloudinary credentials trong `.env.local`
2. Restart dev server: `Ctrl+C` rồi `npm run dev`
3. Clear browser cache: `Ctrl+Shift+R`

### Lỗi: Video không autoplay

- Videos phải có attribute `muted={true}`
- Check browser console (F12) để xem error
- Đảm bảo video đã upload lên Cloudinary

### Lỗi: Strapi admin không load được

1. Clear Strapi cache:
   ```bash
   cd xuongart-new
   rm -rf .cache build
   npm run develop
   ```

2. Check Strapi logs trong terminal

---

## 📚 Next Steps

1. ✅ Đọc file `README.md` để hiểu rõ về project structure
2. ✅ Thêm nhiều dự án vào Strapi CMS
3. ✅ Customize design trong `src/app/globals.css`
4. ✅ Update company info trong `src/config/site.js`
5. ✅ Setup Cloudinary account riêng (thay credentials)
6. ✅ Test responsive design trên mobile/tablet
7. ✅ Setup database MySQL cho production (optional)

---

## 🆘 Cần trợ giúp?

- 📖 Đọc `README.md` để biết thêm chi tiết
- 🐛 Check browser Console (F12) để xem errors
- 📝 Review Strapi docs: https://docs.strapi.io
- 📝 Review Next.js docs: https://nextjs.org/docs

---

**Happy Coding! 🎨✨**

