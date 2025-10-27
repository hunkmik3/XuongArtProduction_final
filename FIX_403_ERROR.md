# 🔧 SỬA LỖI 403 FORBIDDEN

## ❌ Vấn đề hiện tại:

Website không load được projects từ Strapi vì lỗi **403 Forbidden**.

**Logs từ Vercel:**
```
❌ Error fetching image projects: Error: HTTP error! status: 403
```

---

## ✅ Giải pháp: Setup Strapi Permissions

### Bước 1: Vào Strapi Admin

1. Mở: **https://xuongartproduction-final.onrender.com/admin**
2. Login vào admin account

---

### Bước 2: Mở Permissions Settings

1. **Settings** (icon bánh răng ở cuối sidebar trái)
2. **Users & Permissions Plugin**
3. Click tab **"Roles"**
4. Click vào **"Public"** (role đầu tiên)

---

### Bước 3: Bật Permissions cho Projects

Scroll xuống tìm **"Project"** (Content Types)

**Bật các quyền sau:**
- ✅ **find** (GET /api/projects)
- ✅ **findOne** (GET /api/projects/:id)

**Các quyền khác giữ mặc định (không check):**
- ❌ create
- ❌ update
- ❌ delete

---

### Bước 4: Bật Permissions cho Image Project (nếu có)

Nếu thấy **"Image Project"** trong danh sách:

**Bật các quyền sau:**
- ✅ **find**
- ✅ **findOne**

---

### Bước 5: Save

1. Scroll xuống cuối trang
2. Click **"Save"**
3. Đợi 2-3 giây

---

### Bước 6: Test

1. Mở: **https://xuong-art-production-final.vercel.app/portfolio**
2. Refresh trang (F5)
3. **Nếu còn lỗi:** Đợi thêm 1-2 phút (cache delay)

---

## ✅ KẾT QUẢ:

Sau khi setup permissions:
- ✅ Không còn lỗi 403
- ✅ Projects từ Strapi hiển thị
- ✅ Sample images biến mất, thay bằng projects thật

---

## 🔍 Kiểm tra nhanh:

Mở URL này trong browser:
```
https://xuongartproduction-final.onrender.com/api/projects
```

**Nếu thành công:**
- Sẽ thấy JSON data với projects

**Nếu vẫn lỗi:**
- Sẽ thấy `{"error": "Forbidden"}` → Cần check lại permissions

