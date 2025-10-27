# 🐛 Debug Strapi Admin Error

## ❌ Lỗi hiện tại:

"There was an unknown error response from the API"

---

## 🔍 Cách debug:

### 1. Check Render Logs

Vào Render Dashboard → Service `xuongart-strapi` → Tab **"Logs"**

**Tìm kiếm:**
- ✅ "Server started successfully" → Backend OK
- ❌ "Database migration error" → Database issue
- ❌ "Cannot connect to database" → DATABASE_URL sai
- ❌ "CORS error" → CORS chưa config
- ❌ "Missing environment variable" → Thiếu env vars

---

### 2. Common Issues & Solutions:

#### A. Database chưa migrate

**Symptom:** Logs hiện "No migrations found"

**Solution:**
Strapi sẽ tự động migrate lần đầu. Đợi thêm 1-2 phút.

---

#### B. DATABASE_URL sai

**Symptom:** Logs hiện "Cannot connect to database"

**Solution:**
1. Render Dashboard → PostgreSQL `xuongart-db` → Info
2. Copy **Internal Database URL** (phải là Internal!)
3. Update trong Environment Variables của Strapi service
4. Redeploy

---

#### C. CORS error

**Symptom:** Browser console hiện "CORS policy blocked"

**Solution:**
Cần update CORS settings trong `xuongart-new/config/middlewares.js`

---

#### D. Missing environment variables

**Symptom:** Logs hiện "Missing: APP_KEYS"

**Solution:**
Check xem đã thêm đủ 12 environment variables chưa (xem file RENDER_ENV_COMPLETE.txt)

---

## 🎯 Checklist kiểm tra:

- [ ] Render Logs có hiện "Server started successfully"?
- [ ] DATABASE_URL đúng format (Internal URL)?
- [ ] Đã thêm hết 12 environment variables?
- [ ] Status = "Live" trên Render?
- [ ] Browser console có lỗi CORS?

---

## 💡 Quick Fix:

Thử refresh trang admin và đợi thêm 30 giây. Đôi khi Strapi cần thêm thời gian để khởi động hoàn toàn.

