# Hướng Dẫn Setup Dữ Liệu Giả cho Sản Phẩm Sale

## ✅ Đã hoàn thành:

### 1. **ProductSale.tsx**
- Đã thêm 4 sản phẩm giả với dữ liệu đầy đủ
- Hiển thị giá sale và phần trăm giảm giá
- Tích hợp với AddToCart và WishlistButton

### 2. **Trang Chi Tiết Sản Phẩm**
- Đã cập nhật để xử lý sản phẩm giả
- Hiển thị đầy đủ thông tin sản phẩm
- Gallery ảnh với zoom và navigation
- Thông số kỹ thuật chi tiết

## 📋 Sản Phẩm Giả Đã Tạo:

### 1. **Rolex Submariner Date 126610LN**
- ID: `mock_sale_1`
- Giá gốc: 85,000,000đ
- Giá sale: 72,000,000đ (Giảm 15%)
- URL: `/product/mock_sale_1`

### 2. **Omega Seamaster Planet Ocean**
- ID: `mock_sale_2`
- Giá gốc: 65,000,000đ
- Giá sale: 52,000,000đ (Giảm 20%)
- URL: `/product/mock_sale_2`

### 3. **Cartier Tank Solo Automatic**
- ID: `mock_sale_3`
- Giá gốc: 45,000,000đ
- Giá sale: 36,000,000đ (Giảm 20%)
- URL: `/product/mock_sale_3`

### 4. **Longines Heritage Classic**
- ID: `mock_sale_4`
- Giá gốc: 28,000,000đ
- Giá sale: 22,400,000đ (Giảm 20%)
- URL: `/product/mock_sale_4`

## 🖼️ Ảnh Đã Sử Dụng:

Đã sử dụng các ảnh có sẵn trong thư mục `public/upload/product/`:

### Sản phẩm 1 - Rolex Submariner (Breguet):
- `breguet-classique-quantieme-perpetuel-7327br-11-9vu-39mm.jpg.webp`
- `breguet-classique-7145br-15-9wu-snake-limited-40mm1.png.webp`
- `breguet-classique-7145br-15-9wu-snake-limited-40mm2.png.webp`
- `breguet-classique-7145br-15-9wu-snake-limited-40mm3.png.webp`

### Sản phẩm 2 - Omega Seamaster (Bulova):
- `bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp`
- `bulova-accu-swiss-tellaro-automatic-watch-43mm3.jpg_980_980.webp`
- `bulova-accu-swiss-a-15-mechanical-watch-40mm1.jpg_980_980.webp`

### Sản phẩm 3 - Cartier Tank (Baume & Mercier):
- `baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp`
- `baume--mercier-hampton-10709-blue-watch-35-x-22mm2.png.webp`
- `baume--mercier-hampton-10709-blue-watch-35-x-22mm.png.webp`

### Sản phẩm 4 - Longines Heritage (Bulova):
- `bulova-sutton-automatic-34-5mm1.png.webp`
- `bulova-sutton-automatic-34-5mm2.png.webp`
- `bulova-sutton-automatic-34-5mm.png.webp`

## 📋 Sản Phẩm Liên Quan (SPLienQuan.tsx):

### 1. **Patek Philippe Nautilus 5711/1A**
- ID: `related_1`
- Giá: 120,000,000đ (Không giảm giá)
- Ảnh: `breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm1.jpg.webp`

### 2. **Audemars Piguet Royal Oak 15500ST**
- ID: `related_2`
- Giá gốc: 95,000,000đ
- Giá sale: 76,000,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-2es8a001-accutron-dna-watch-45mm1.png.webp`

### 3. **Vacheron Constantin Overseas 4500V**
- ID: `related_3`
- Giá: 88,000,000đ (Không giảm giá)
- Ảnh: `bulova-surveyor-watch-41mm1.png.webp`

### 4. **IWC Portugieser Chronograph**
- ID: `related_4`
- Giá gốc: 65,000,000đ
- Giá sale: 52,000,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp`

### 5. **Jaeger-LeCoultre Reverso Classic**
- ID: `related_5`
- Giá: 75,000,000đ (Không giảm giá)
- Ảnh: `bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp`

### 6. **Breguet Classique 7147**
- ID: `related_6`
- Giá gốc: 110,000,000đ
- Giá sale: 88,000,000đ (Giảm 20%)
- Ảnh: `breguet-reine-de-naples-9835-limited-edition-36-5x28-45mm.png_980_980.webp`

## 🚀 Cách Test:

1. **Khởi động frontend:**
   ```bash
   cd duantn
   npm run dev
   ```

2. **Truy cập trang chủ** - sẽ thấy 4 sản phẩm sale

3. **Click vào sản phẩm** - sẽ chuyển đến trang chi tiết

4. **Test các tính năng:**
   - Xem gallery ảnh
   - Zoom ảnh
   - Thêm vào giỏ hàng
   - Thêm vào wishlist
   - Xem thông số kỹ thuật

## 📝 Lưu ý:

- Dữ liệu giả chỉ hoạt động khi không có backend
- Khi có backend thực, sẽ tự động chuyển sang fetch từ API
- Các tính năng AddToCart và WishlistButton vẫn hoạt động bình thường
- Responsive design đã được tối ưu cho mobile và desktop

## 🔧 Tùy Chỉnh:

Để thêm sản phẩm giả mới:
1. Thêm vào `mockProducts` trong `ProductSale.tsx`
2. Thêm vào `mockProducts` trong `product/[id]/page.tsx`
3. Thêm ảnh tương ứng vào `public/upload/product/` 