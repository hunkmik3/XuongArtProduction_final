# 🚀 Deployment Guide - XưởngArt Studio

> Hướng dẫn deploy lên production cho Next.js Frontend và Strapi Backend

---

## 📋 Checklist trước khi deploy

### Bảo mật

- [ ] ✅ Tạo APP_KEYS mới cho production
- [ ] ✅ Thay đổi tất cả JWT secrets
- [ ] ✅ Enable SSL cho database
- [ ] ✅ Setup CORS policy trong Strapi
- [ ] ✅ Review Strapi permissions (Public role chỉ read-only)
- [ ] ✅ Thay Cloudinary credentials production
- [ ] ✅ Enable rate limiting

### Performance

- [ ] ✅ Optimize images (WebP format)
- [ ] ✅ Enable caching headers
- [ ] ✅ Setup CDN cho static assets
- [ ] ✅ Compress responses (gzip/brotli)

### Database

- [ ] ✅ Backup database trước khi migrate
- [ ] ✅ Switch từ SQLite sang MySQL/PostgreSQL
- [ ] ✅ Setup database replication (optional)
- [ ] ✅ Enable automated backups

---

## 🎯 Deployment Strategy

```
Frontend (Next.js)  →  Vercel / Netlify
Backend (Strapi)    →  Railway / Render / DigitalOcean
Database            →  PlanetScale / Railway / AWS RDS
Media Storage       →  Cloudinary (already configured)
```

---

## 1️⃣ Deploy Frontend (Next.js) lên Vercel

### Option A: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Option B: Deploy qua Vercel Dashboard (Recommended)

1. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import vào Vercel:**
   - Vào https://vercel.com/new
   - Import repository từ GitHub
   - Framework Preset: **Next.js**
   - Root Directory: `./`

3. **Thêm Environment Variables:**

   ```env
   NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_URL=cloudinary://key:secret@cloud_name
   ```

4. **Deploy:**
   - Click "Deploy"
   - Đợi 2-3 phút
   - Access tại: `https://your-app.vercel.app`

### Custom Domain (Optional)

1. Settings → Domains → Add Domain
2. Input: `xuongart.com`
3. Update DNS records theo hướng dẫn Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 2️⃣ Deploy Backend (Strapi) lên Railway

### Bước 1: Chuẩn bị Strapi

**Cập nhật `xuongart-new/config/database.js`:**

```javascript
module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: env.bool('DATABASE_SSL', false) ? {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
        } : false,
      },
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10) 
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
```

**Cập nhật `xuongart-new/config/server.js`:**

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'), // Important for production
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

**Cập nhật `xuongart-new/config/middlewares.js`:**

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
            '*.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
            '*.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'https://your-app.vercel.app',
        'https://xuongart.com',
        'https://www.xuongart.com',
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### Bước 2: Deploy lên Railway

1. **Tạo account Railway:**
   - Vào https://railway.app
   - Sign up với GitHub

2. **Tạo project mới:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway access GitHub
   - Select repository `studio-main`

3. **Add PostgreSQL Database:**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway tự động tạo DATABASE_URL

4. **Configure Strapi Service:**
   - Click vào Strapi service
   - Settings → Root Directory: `xuongart-new`
   - Settings → Start Command: `npm run start`
   - Settings → Build Command: `npm run build`

5. **Thêm Environment Variables:**

   ```env
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337
   PUBLIC_URL=https://your-app.up.railway.app
   
   # APP_KEYS (4 keys separated by commas)
   APP_KEYS=key1,key2,key3,key4
   API_TOKEN_SALT=your_salt_here
   ADMIN_JWT_SECRET=your_secret_here
   TRANSFER_TOKEN_SALT=your_salt_here
   JWT_SECRET=your_secret_here
   
   # Database (Railway auto-provides DATABASE_URL)
   DATABASE_CLIENT=postgres
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   
   # Cloudinary
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   ```

   **Generate secrets:**
   ```bash
   node -p "require('crypto').randomBytes(48).toString('base64')"
   ```

6. **Deploy:**
   - Click "Deploy"
   - Đợi 3-5 phút build
   - Access admin: `https://your-app.up.railway.app/admin`

7. **Tạo admin user mới:**
   - First time access sẽ yêu cầu tạo admin
   - **LƯU Ý**: Không dùng credentials từ local!

### Bước 3: Cập nhật Frontend

**Update `NEXT_PUBLIC_STRAPI_API_URL` trong Vercel:**

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Update: `NEXT_PUBLIC_STRAPI_API_URL=https://your-app.up.railway.app`
3. Redeploy: Deployments → Latest → ... → Redeploy

---

## 3️⃣ Alternative: Deploy Strapi lên Render

### Setup

1. **Tạo account Render:** https://render.com
2. **New Web Service:**
   - Connect GitHub repository
   - Root Directory: `xuongart-new`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

3. **Add PostgreSQL Database:**
   - New → PostgreSQL
   - Copy DATABASE_URL

4. **Environment Variables:** (giống Railway)

5. **Deploy:**
   - Click "Create Web Service"
   - Access: `https://your-app.onrender.com`

---

## 4️⃣ Database Backup & Migration

### Backup từ SQLite

```bash
# Export data từ Strapi
cd xuongart-new
npm run strapi export -- --file backup.tar.gz

# Giữ file backup.tar.gz an toàn!
```

### Import vào PostgreSQL

```bash
# Upload file backup lên server
scp backup.tar.gz user@server:/path/

# SSH vào server
ssh user@server

# Import
cd /path/to/strapi
npm run strapi import -- --file backup.tar.gz
```

### Automated Backups (Railway)

Railway tự động backup PostgreSQL database mỗi ngày.

Access backups: Dashboard → Database → Backups

---

## 5️⃣ Post-Deployment Checklist

### Testing

- [ ] ✅ Test homepage load time < 3s
- [ ] ✅ Test all pages (about, portfolio, contact)
- [ ] ✅ Test responsive design (mobile, tablet)
- [ ] ✅ Test image loading từ Cloudinary
- [ ] ✅ Test video autoplay
- [ ] ✅ Test form submission (contact form)
- [ ] ✅ Test Strapi API endpoints
- [ ] ✅ Test admin panel access

### Monitoring

- [ ] ✅ Setup error tracking (Sentry)
- [ ] ✅ Setup analytics (Google Analytics)
- [ ] ✅ Setup uptime monitoring (UptimeRobot)
- [ ] ✅ Setup performance monitoring (Vercel Analytics)

### SEO

- [ ] ✅ Submit sitemap to Google Search Console
- [ ] ✅ Verify meta tags (title, description, og:image)
- [ ] ✅ Check mobile-friendly test
- [ ] ✅ Setup robots.txt
- [ ] ✅ Setup SSL certificate (auto in Vercel/Railway)

---

## 🔒 Security Best Practices

### Strapi

```javascript
// xuongart-new/config/plugins.js
module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      ratelimit: {
        enabled: true,
        max: 5,
        duration: 60000,
      },
    },
  },
});
```

### Environment Variables

**NEVER commit:**
- ❌ `.env`
- ❌ `.env.local`
- ❌ `.env.production`

**Always use:**
- ✅ Platform environment variables (Vercel, Railway)
- ✅ Secrets management tools
- ✅ `.env.example` for templates

---

## 📊 Performance Optimization

### Next.js

```javascript
// next.config.js
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },
  
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### Strapi

```javascript
// xuongart-new/config/middlewares.js
module.exports = [
  // ... existing config
  {
    name: 'strapi::cache',
    config: {
      enabled: true,
      maxAge: 3600000, // 1 hour
    },
  },
];
```

---

## 🆘 Troubleshooting

### Build fails trên Vercel

```bash
# Check Node version
# Vercel uses Node 18 by default

# Add to package.json:
"engines": {
  "node": ">=18.0.0 <=20.x.x"
}
```

### Strapi database migration fails

```bash
# Force rebuild database (CAUTION: Deletes all data!)
cd xuongart-new
npm run strapi admin:reset-user-password
```

### Images không load trên production

1. Check Cloudinary credentials
2. Verify `next.config.js` remotePatterns
3. Check browser console for CORS errors
4. Verify Strapi public permissions

---

## 📚 Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Strapi Deployment: https://docs.strapi.io/dev-docs/deployment
- Next.js Optimization: https://nextjs.org/docs/app/building-your-application/optimizing

---

**Good luck with your deployment! 🚀✨**

