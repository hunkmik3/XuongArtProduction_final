# 📝 BƯỚC 0: CHUẨN BỊ - Hướng Dẫn Chi Tiết

> Hướng dẫn cụ thể để bạn chuẩn bị deploy

---

## ✅ CHECKLIST BƯỚC 0

### 1. Kiểm tra tài khoản (5 phút)

Bạn cần đăng ký 3 tài khoản (miễn phí):

#### A. GitHub Account
- [ ] Nếu chưa có: https://github.com/signup
- [ ] Hoặc bạn đã có rồi → Login

#### B. Vercel Account  
- [ ] Sign up: https://vercel.com/signup
- [ ] **Chọn "Sign up with GitHub"** (dễ nhất)
- [ ] Authorize Vercel access GitHub

#### C. Render Account
- [ ] Sign up: https://render.com/signup  
- [ ] **Chọn "Sign up with GitHub"** (dễ nhất)
- [ ] Authorize Render access GitHub

---

### 2. Generate Strapi Secrets (2 phút)

#### Bạn cần 6 keys cho Strapi. Đã generate sẵn cho bạn:

```
Key 1: 7W274IRRahcLYMQlgtzu/aP0WtHtEw5SqaVRVk08YN5PZJr2ViY+nX3ZwRcxZ1NO

Key 2: ODz6uVpzR+HYlfr6iFfxD5QpJx/jgTIVnqYpBNmZxEz3shq+UBtF3noE3pNRtCc8

Key 3: t+Cfyh0Ha84f2UTUaham7m3gQSSp3U/2StXXyO9Oa8mi38s8c/NkFrEjWHQmLQHH

Key 4: raGUnuQrXq6suYPEI7dNzIJucX2JGhSLUEnuo7i+R+WSR8qunvPNGVW7r2fJOG4l

Key 5: /+yKpjUqCyVOqJEAv8UmbyjuV1MkWYcvrSomyQSsZGQpUHpC86WfcuF8brgA6jk0

Key 6: 28Hg4a0yelk/WBMyshTQNGfJ9TiVswpElHqHsKb0LYROOrLgVC3zItBMw3AoojY/
```

#### ⚠️ LƯU Ý QUAN TRỌNG:
**LƯU LẠI 6 KEYS NÀY VÀO FILE TEXT (Notepad)!**

Gợi ý: Copy paste vào Notepad và save file này lại.

---

### 3. Cloudinary Credentials (Nếu chưa có)

Bạn cần 3 thông tin từ Cloudinary:

#### Vào: https://cloudinary.com/console

1. Vào **Dashboard**
2. Tìm **Product Environment Credentials**:
   - **Cloud name:** `your-cloud-name`
   - **API Key:** `123456789012345`
   - **API Secret:** `abcdefghijklmnopqrstuvwxyz`

#### Nếu chưa có Cloudinary account:
1. Sign up: https://cloudinary.com/users/register/free
2. Tạo cloud name (ví dụ: `xuongart`)
3. Copy credentials từ dashboard

---

### 4. Lấy Cloudinary URL

Từ Cloudinary Dashboard, copy **Cloudinary URL** (dạng):

```
cloudinary://123456789012345:abcdefghijklmnop@your-cloud-name
```

Cấu trúc:
```
cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

---

## 📋 TÓM TẮT THÔNG TIN CẦN CÓ

Sau khi hoàn thành Bước 0, bạn phải có:

| Thông tin | Nguồn | Lưu ý |
|-----------|-------|-------|
| **6 Strapi Keys** | Generated ở trên | Đã có sẵn ✅ |
| **Cloud Name** | Cloudinary Dashboard | Copy từ Cloudinary |
| **API Key** | Cloudinary Dashboard | Copy từ Cloudinary |
| **API Secret** | Cloudinary Dashboard | Copy từ Cloudinary |
| **Cloudinary URL** | Cloudinary Dashboard | Format: `cloudinary://...` |
| **GitHub account** | github.com | Sign up nếu chưa có |
| **Vercel account** | vercel.com | Sign up với GitHub |
| **Render account** | render.com | Sign up với GitHub |

---

## ✅ BẠN ĐÃ SẴN SÀNG KHI:

- [x] Có 6 Strapi keys (đã có ở trên)
- [ ] Có Cloudinary credentials (cloud name, API key, API secret)
- [ ] Có GitHub account
- [ ] Có Vercel account (sign up xong)
- [ ] Có Render account (sign up xong)

---

## 🚀 TIẾP THEO

Khi đã chuẩn bị xong → Chuyển sang:

**BƯỚC 1:** Push code lên GitHub  
→ Xem file `DEPLOY_STEP_BY_STEP.md` phần "BƯỚC 1"

---

## 💡 TIPS

1. **Lưu secrets an toàn:** Không chia sẻ keys cho ai
2. **Cloudinary free tier:** Đủ dùng cho portfolio website nhỏ
3. **GitHub sign in:** Dùng để sign in Vercel & Render sẽ đơn giản hơn

---

**Xong Bước 0 rồi! Bạn đã sẵn sàng bước tiếp theo! 🎉**

Bây giờ bạn có thể:
- Mở file `DEPLOY_STEP_BY_STEP.md`
- Đọc phần **"BƯỚC 1: PUSH CODE LÊN GITHUB"**
- Làm theo hướng dẫn

