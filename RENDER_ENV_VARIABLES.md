# 🔧 RENDER - STRAPI ENVIRONMENT VARIABLES

## 📋 Danh sách 12 environment variables cần thêm vào Render Strapi Web Service:

---

### 1️⃣ SERVER SETTINGS (4 variables)

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `HOST` | `0.0.0.0` |
| `PORT` | `1337` |
| `PUBLIC_URL` | `https://xuongart-strapi.onrender.com` |

---

### 2️⃣ STRAPI APP KEYS (1 variable)

| Key | Value |
|-----|-------|
| `APP_KEYS` | `7W274IRRahcLYMQlgtzu/aP0WtHtEw5SqaVRVk08YN5PZJr2ViY+nX3ZwRcxZ1NO,ODz6uVpzR+HYlfr6iFfxD5QpJx/jgTIVnqYpBNmZxEz3shq+UBtF3noE3pNRtCc8,t+Cfyh0Ha84f2UTUaham7m3gQSSp3U/2StXXyO9Oa8mi38s8c/NkFrEjWHQmLQHH,raGUnuQrXq6suYPEI7dNzIJucX2JGhSLUEnuo7i+R+WSR8qunvPNGVW7r2fJOG4l` |

---

### 3️⃣ SECRETS (4 variables)

Bạn cần generate thêm 2 keys nữa bằng lệnh:
```bash
node -p "require('crypto').randomBytes(48).toString('base64')"
```

| Key | Value |
|-----|-------|
| `API_TOKEN_SALT` | `/+yKpjUqCyVOqJEAv8UmbyjuV1MkWYcvrSomyQSsZGQpUHpC86WfcuF8brgA6jk0` |
| `ADMIN_JWT_SECRET` | `28Hg4a0yelk/WBMyshTQNGfJ9TiVswpElHqHsKb0LYROOrLgVC3zItBMw3AoojY/` |
| `TRANSFER_TOKEN_SALT` | `[generate_more_key_1]` ⚠️ Cần generate |
| `JWT_SECRET` | `[generate_more_key_2]` ⚠️ Cần generate |

---

### 4️⃣ DATABASE (2 variables)

| Key | Value |
|-----|-------|
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | `[paste_internal_database_url_ở_trên]` ⚠️ Copy từ PostgreSQL Info |

---

### 5️⃣ CLOUDINARY (3 variables)

| Key | Value |
|-----|-------|
| `CLOUDINARY_NAME` | `dwynoncvm` |
| `CLOUDINARY_KEY` | `892494726275633` |
| `CLOUDINARY_SECRET` | `5Eluv2KY2MvKE4Omv4a0GdeExxc` |

---

## 🎯 CÁCH THÊM VÀO RENDER:

1. Trong form Create Web Service
2. Scroll xuống phần **"Environment Variables"**
3. Click **"+ Add Environment Variable"**
4. Thêm từng biến như bảng trên
5. Sau khi thêm hết 12 biến
6. Scroll lên trên
7. Click **"Create Web Service"**

---

## ⚠️ QUAN TRỌNG:

- Trước khi Click "Create Web Service" → Phải thêm hết 12 environment variables!
- Nếu thiếu → Deployment sẽ fail
- DATABASE_URL phải copy từ PostgreSQL Connections Info

---

## 🚀 SAU KHI DEPLOY:

1. Render sẽ build Strapi (~5-10 phút)
2. URL sẽ là: `https://xuongart-strapi.onrender.com`
3. Truy cập `/admin` để tạo admin account

