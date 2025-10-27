# 🗑️ CÁCH XÓA PROJECTS TRONG STRAPI

## ✅ Kiểm tra trong Strapi Admin:

### Bước 1: Vào Content Manager
1. **https://xuongartproduction-final.onrender.com/admin**
2. Content Manager → **Image Project**

### Bước 2: Xóa tất cả (Cả DRAFT và PUBLISHED)

#### A. Xóa Published Content:
1. Top bar: Click dropdown "Published" → Chọn "Draft"
2. Xem có projects nào không? → Xóa hết

#### B. Xóa Draft Content:
1. Top bar: Click dropdown "Draft" → Chọn "Published" 
2. Unpublish tất cả: Select all → "Unpublish"
3. Sau đó chọn lại "Draft" → Delete tất cả

---

## 🔍 Debug: Kiểm tra API

Mở URL này:
```
https://xuongartproduction-final.onrender.com/api/image-projects?populate=*
```

**Nếu API trả về:**
```json
{"data": [], "meta": {...}}
```
→ Strapi đã trống ✅

**Nếu vẫn có data:**
→ Vẫn còn projects trong Strapi ❌ (cần xóa thêm)

---

## 🧹 Clear Cache

### Sau khi xóa xong:

1. **Hard refresh:** Ctrl + Shift + R
2. **Hoặc Incognito window**
3. **Kiểm tra lại website**

---

## ⚠️ Lưu ý:

Projects có thể tồn tại ở 2 trạng thái:
- Published (đang publish)
- Draft (chưa publish)

Phải xóa cả 2 loại!

