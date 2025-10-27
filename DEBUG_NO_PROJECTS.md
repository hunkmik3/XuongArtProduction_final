# 🐛 DEBUG: API có data nhưng website không hiển thị

## ✅ Đã xác nhận:
- API Strapi trả về: `{"data": [{"id": 3, ...}], "total": 1}` ✅
- Permissions OK ✅
- Project đã Published ✅

## ❌ Vấn đề:
- Website hiển thị trống
- Console log: `data: []`

---

## 🔍 Nguyên nhân có thể:

### 1. Vercel đang cache API route `/api/image-projects`

**Giải pháp:**
- Redeploy Vercel để clear cache
- Hoặc add timestamp vào API call để force fresh

### 2. Frontend đang call từ Strapi cũ

**Check:**
- Console log URL của API call
- Environment variable `NEXT_PUBLIC_STRAPI_API_URL` trên Vercel

### 3. Code đang filter data

**Check:**
- `formatImageProject()` có return data không?
- Component có render condition không?

---

## 🔧 CÁC BƯỚC DEBUG:

### Bước 1: Check Console logs chi tiết

Trong Incognito:
1. Open Console (F12)
2. Xem log: `📊 Image Projects response:`
3. Expand xem có data không?

**Nếu có data:**
→ Frontend code có vấn đề

**Nếu `data: []`:**
→ Vercel API route đang cache

### Bước 2: Check Network tab

1. F12 → **Network** tab
2. Refresh trang
3. Tìm request: `/api/image-projects`
4. Click vào → Xem **Response**

**Nếu Response có data:**
→ Frontend code có vấn đề

**Nếu Response là `[]`:**
→ Vercel API route đang cache

### Bước 3: Force clear Vercel cache

1. Vercel Dashboard → Deployments
2. Latest → "..." → **Redeploy**
3. Đợi 2-3 phút
4. Test lại

---

## 💡 GIẢI PHÁP TẠM THỜI:

Add timestamp vào API call để bypass cache:

```javascript
const response = await fetch(`/api/image-projects?t=${Date.now()}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
});
```

---

## ✅ NEXT STEPS:

1. Check Console logs trong Incognito
2. Check Network tab → Response của `/api/image-projects`
3. Gửi screenshots để tôi xem

