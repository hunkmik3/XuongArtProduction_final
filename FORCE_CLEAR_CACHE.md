# 🧹 FORCE CLEAR CACHE

## ❌ Vẫn thấy projects sau khi xóa

Có thể do **Vercel cache** (không phải browser cache).

---

## 🔧 GIẢI PHÁP:

### Option 1: Redeploy Vercel (Nhanh nhất)

1. Vào **Vercel Dashboard**: https://vercel.com/dashboard
2. Chọn project **xuong-art-production-final**
3. Tab **Deployments**
4. Click **"..."** → **Redeploy**
5. Đợi 2-3 phút
6. Check lại website

---

### Option 2: Force rebuild bằng Git

Push empty commit để trigger rebuild:

```bash
git commit --allow-empty -m "Force rebuild to clear cache"
git push origin main
```

---

### Option 3: Kiểm tra Vercel Environment Variables

Có thể đang dùng cache environment variable cũ.

1. Vercel Dashboard → Settings → Environment Variables
2. Check `NEXT_PUBLIC_STRAPI_API_URL` có đúng không
3. Save lại → Auto-redeploy

---

## 🔍 Debug: Check Console

1. Mở website trong Incognito
2. **F12** → **Console**
3. Tìm dòng `📊 Image Projects response:`
4. Xem có data không?

**Nếu có data:**
→ Vercel đang cache response

**Nếu API trả về `[]`:**
→ Frontend code có vấn đề

---

## 💡 Tạm thời: Bypass Cache

Thêm timestamp vào API call để force fresh data.

Cần sửa code tạm thời không?

