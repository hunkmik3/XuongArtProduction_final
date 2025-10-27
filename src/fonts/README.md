# Font Files Required

## iCiel Samsung Sharp Sans Regular

Để sử dụng font iCiel Samsung Sharp Sans Regular, bạn cần thêm các file font sau vào thư mục `src/fonts/`:

### Files cần có:
- `iCiel-Samsung-Sharp-Sans-Regular.woff2`
- `iCiel-Samsung-Sharp-Sans-Regular.woff` 
- `iCiel-Samsung-Sharp-Sans-Regular.ttf`

### Cách thêm font:

1. **Tải font từ nguồn chính thức**
2. **Chuyển đổi sang các format cần thiết:**
   - WOFF2 (cho trình duyệt hiện đại)
   - WOFF (cho trình duyệt cũ)
   - TTF (fallback)

3. **Đặt file vào thư mục:** `src/fonts/`

### Tools để convert font:
- [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)
- [CloudConvert](https://cloudconvert.com/)

### Sau khi thêm font files:
Website sẽ tự động sử dụng iCiel Samsung Sharp Sans Regular làm font chính.

---

## Fallback fonts:
Nếu font không load được, sẽ fallback về:
1. Mona Sans
2. System fonts (Arial, Helvetica, sans-serif)
