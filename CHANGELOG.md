# Changelog

All notable changes to the XưởngArt Studio project will be documented in this file.

## [Unreleased]

### 🔒 Security Improvements
- **CRITICAL**: Removed hardcoded Cloudinary credentials from `next.config.js`
- Added `.env.local` support for sensitive environment variables
- Updated `.gitignore` to prevent committing sensitive files (.env, .env.local, credentials)
- Created `env.example` templates for both frontend and backend
- Protected video files and uploads from being committed to git

### ✨ Features
- Added environment variable checker script (`check-env.js`)
- Created comprehensive documentation:
  - `README.md` - Complete project documentation
  - `SETUP.md` - Quick start guide (5 minutes)
  - `DEPLOYMENT.md` - Production deployment guide
  - `CHANGELOG.md` - Version history
- Added `.gitkeep` for Strapi uploads directory

### 🐛 Bug Fixes
- **Fixed**: Removed broken "Blog" link from navigation (blog page was deleted)
- **Fixed**: Environment variables now properly loaded from `.env.local`
- **Fixed**: Updated `next.config.js` to use dynamic hostname patterns for Cloudinary

### 📝 Configuration Changes
- Updated `.gitignore` with comprehensive rules:
  - Environment files (.env, .env.local)
  - Large media files (videos)
  - Strapi uploads and cache
  - Editor config (.vscode, .idea)
  - OS files (.DS_Store, Thumbs.db)
- Updated `next.config.js`:
  - Removed hardcoded credentials
  - Added dynamic environment variable loading
  - Updated Cloudinary hostname pattern to `**.cloudinary.com`
- Updated `package.json`:
  - Added `check-env` script
  - Added `dev:safe` script (runs env check before starting)

### 🔧 Developer Experience
- Added npm scripts:
  - `npm run check-env` - Validate environment setup
  - `npm run dev:safe` - Check env + start both servers
- Created detailed setup guides for different skill levels
- Added troubleshooting sections in documentation

### 📚 Documentation
- Complete project structure explanation
- Strapi content type schema documentation
- Database migration guide (SQLite → MySQL/PostgreSQL)
- Security best practices
- Performance optimization tips
- Deployment guides for:
  - Vercel (Frontend)
  - Railway (Backend)
  - Render (Alternative)
  - PlanetScale (Database)

### ⚠️ Breaking Changes
- **IMPORTANT**: `.env.local` file is now required for development
- **IMPORTANT**: Strapi `.env` file must be created from template
- Blog functionality has been removed (page deleted)

### 🔄 Migration Guide

If you're updating from a previous version:

1. **Create `.env.local` file:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your credentials
   ```

2. **Create Strapi `.env` file:**
   ```bash
   cp xuongart-new/env.example xuongart-new/.env
   # Edit xuongart-new/.env with your credentials
   ```

3. **Generate new Strapi secrets:**
   ```bash
   node -p "require('crypto').randomBytes(48).toString('base64')"
   # Run 4 times and add to APP_KEYS in xuongart-new/.env
   ```

4. **Verify environment setup:**
   ```bash
   npm run check-env
   ```

5. **Restart development servers:**
   ```bash
   npm run dev:all
   ```

### 📋 TODO / Planned Features

- [ ] Add automated tests (Jest, Playwright)
- [ ] Setup CI/CD pipeline (GitHub Actions)
- [ ] Add error tracking (Sentry integration)
- [ ] Add analytics (Google Analytics / Vercel Analytics)
- [ ] Implement email service for contact form
- [ ] Add sitemap generation
- [ ] Add RSS feed for blog (when re-implemented)
- [ ] Implement search functionality
- [ ] Add dark mode support
- [ ] Optimize images with WebP/AVIF formats
- [ ] Add loading skeletons for better UX
- [ ] Implement infinite scroll for portfolio
- [ ] Add project filtering by multiple categories
- [ ] Add admin dashboard for quick stats

---

## [0.1.0] - 2024-XX-XX

### Initial Release

- ✅ Next.js 13 App Router setup
- ✅ Strapi 4 CMS integration
- ✅ Cloudinary media hosting
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Portfolio gallery with masonry layout
- ✅ Video autoplay on scroll
- ✅ Framer Motion animations
- ✅ Contact form
- ✅ About page
- ✅ Process page

---

## Version Format

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Format: `[MAJOR.MINOR.PATCH] - YYYY-MM-DD`

---

## Categories

- 🔒 **Security**: Security improvements
- ✨ **Features**: New features
- 🐛 **Bug Fixes**: Bug fixes
- 📝 **Configuration**: Configuration changes
- 🔧 **Developer Experience**: DX improvements
- 📚 **Documentation**: Documentation updates
- ⚠️ **Breaking Changes**: Breaking changes
- 🔄 **Migration**: Migration guides
- 📋 **TODO**: Planned features

---

**Last Updated**: 2024-10-21

