# 🎨 XưởngArt Studio - Agency Portfolio Website

> Nơi nghệ thuật gặp công nghệ. XưởngArt Production là studio sáng tạo chuyên về sản xuất video và nội dung hình ảnh.

![Next.js](https://img.shields.io/badge/Next.js-13.4-black?logo=next.js)
![Strapi](https://img.shields.io/badge/Strapi-4.25-blueviolet?logo=strapi)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwind-css)

## ✨ Tính năng

- 🎬 **Portfolio Gallery** với masonry layout động
- 🎥 **Video autoplay** khi scroll vào viewport
- 📱 **Responsive Design** hoàn chỉnh (mobile, tablet, desktop)
- ⚡ **Performance tối ưu** với Next.js 13 App Router
- 🎨 **Framer Motion animations** mượt mà
- 📦 **Strapi CMS** quản lý nội dung dễ dàng
- ☁️ **Cloudinary Integration** cho media hosting
- 🔍 **SEO Optimized**

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13.4 (App Router)
- **Styling**: TailwindCSS 3.3
- **Animations**: Framer Motion
- **UI Components**: Custom components với Radix UI patterns
- **Icons**: React Icons
- **Image Optimization**: Next.js Image component + Cloudinary

### Backend (CMS)
- **CMS**: Strapi 4.25
- **Database**: SQLite (development) / MySQL (production recommended)
- **Media Storage**: Cloudinary
- **API**: REST API với populate relations

## 📋 Yêu cầu hệ thống

- **Node.js**: >= 18.0.0 <= 20.x.x
- **npm**: >= 6.0.0
- **Database**: SQLite (dev) hoặc MySQL (production)

## 🚀 Cài đặt & Chạy dự án

### 1. Clone repository

```bash
git clone <your-repo-url>
cd studio-main
```

### 2. Setup Frontend (Next.js)

```bash
# Cài đặt dependencies
npm install

# Copy file env example và điền thông tin
cp env.example .env.local

# Edit .env.local với thông tin của bạn:
# - NEXT_PUBLIC_STRAPI_API_URL
# - CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET
```

**Lưu ý quan trọng**: File `.env.local` không được commit vào git vì chứa thông tin nhạy cảm!

### 3. Setup Backend (Strapi)

```bash
# Di chuyển vào thư mục Strapi
cd xuongart-new

# Cài đặt dependencies
npm install

# Copy file env example và điền thông tin
cp env.example .env

# Generate secrets cho Strapi (chạy trong terminal):
node -p "require('crypto').randomBytes(48).toString('base64')"
# Copy output và paste vào APP_KEYS trong .env (tạo 4 keys, cách nhau bởi dấu phẩy)

# Edit .env với thông tin database và Cloudinary của bạn
```

### 4. Chạy Development Server

**Cách 1: Chạy đồng thời cả Frontend và Backend**

```bash
# Từ thư mục root
npm run dev:all
```

**Cách 2: Chạy riêng từng server**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run dev:strapi
```

**Cách 3: Sử dụng script tự động (Windows)**

```bash
# PowerShell
.\start-dev.ps1

# hoặc Command Prompt
start-dev.bat
```

### 5. Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

### 6. Setup Strapi lần đầu

1. Mở http://localhost:1337/admin
2. Tạo tài khoản admin đầu tiên
3. Vào **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
4. Bật permissions cho **Project**:
   - `find` (GET /api/projects)
   - `findOne` (GET /api/projects/:id)
5. Vào **Content Manager** → **Project** và thêm dự án mẫu
6. Upload media lên Cloudinary thông qua Strapi Media Library

## 📁 Cấu trúc dự án

```
studio-main/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.jsx           # Homepage
│   │   ├── portfolio/         # Portfolio page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── api/               # API routes
│   ├── components/            # React components
│   ├── lib/                   # Utility functions (Strapi client)
│   ├── constants/             # App constants
│   └── images/                # Static images
├── xuongart-new/              # Strapi CMS
│   ├── src/api/              # API endpoints & content types
│   ├── config/               # Strapi configuration
│   └── public/               # Public assets
├── public/                    # Static files
├── .env.local                 # Environment variables (Frontend) - GIT IGNORED
├── env.example               # Template for .env.local
└── package.json
```

## 🎨 Content Types trong Strapi

### Project

| Field              | Type      | Description                          |
|--------------------|-----------|--------------------------------------|
| title              | Text      | Tên dự án                           |
| slug               | UID       | URL-friendly identifier              |
| client             | Text      | Tên khách hàng                      |
| category           | Text      | Loại dự án (Video, Design, Web...)   |
| tagline            | Text      | Mô tả ngắn                          |
| description        | Rich Text | Mô tả chi tiết                      |
| fullDescription    | Rich Text | Mô tả đầy đủ cho modal              |
| media              | Media     | Video/Image chính                    |
| thumbnail          | Media     | Thumbnail cho gallery                |
| featured           | Boolean   | Hiển thị trên homepage              |
| order              | Number    | Thứ tự hiển thị                     |
| duration           | Text      | Thời lượng video                    |

## 🔒 Bảo mật

### Quan trọng trước khi deploy:

1. ✅ **Đã xóa hardcoded credentials** từ `next.config.js`
2. ✅ **File `.env.local` đã được gitignore**
3. ⚠️ **Tạo APP_KEYS mới** cho Strapi production
4. ⚠️ **Thay đổi database** từ SQLite sang MySQL/PostgreSQL
5. ⚠️ **Enable SSL** cho database connection
6. ⚠️ **Setup CORS** properly trong Strapi
7. ⚠️ **Review Strapi permissions** (Public role chỉ có find/findOne)

## 🚢 Deploy Production

### Frontend (Next.js)

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Backend (Strapi)

**Railway / Render / DigitalOcean**

1. Setup MySQL/PostgreSQL database
2. Update `.env` với production credentials:
   ```env
   DATABASE_CLIENT=mysql
   DATABASE_HOST=your-db-host
   DATABASE_PORT=3306
   DATABASE_NAME=your-db-name
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   DATABASE_SSL=true
   ```
3. Build & deploy:
   ```bash
   npm run build
   NODE_ENV=production npm start
   ```

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Windows: Tìm và kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Strapi không kết nối được

- Kiểm tra MySQL đang chạy: `mysql -u root -p`
- Verify DATABASE_* variables trong `.env`
- Check Strapi logs: `cd xuongart-new && npm run develop`

### Images không hiển thị

- Verify Cloudinary credentials trong `.env.local`
- Check image hostname trong `next.config.js` remotePatterns
- Inspect browser console cho CORS errors

### Video không autoplay

- Đảm bảo video có attribute `muted={true}`
- Check browser autoplay policy
- Videos phải được host trên CDN với proper CORS headers

## 📝 Scripts

```bash
npm run dev              # Start Next.js dev server
npm run dev:strapi      # Start Strapi dev server
npm run dev:all         # Start both (concurrently)
npm run build           # Build Next.js for production
npm run start           # Start Next.js production server
npm run lint            # Run ESLint
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE.md` for more information.

## 📞 Contact

XưởngArt Studio
- Website: [https://xuongart.com](https://xuongart.com)
- Email: contact@xuongart.com

---

**Made with ❤️ by XưởngArt Production Team**
