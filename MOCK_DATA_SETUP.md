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

## 🖼️ Ảnh Cần Thêm:

Để hiển thị ảnh sản phẩm, bạn cần thêm các file ảnh vào thư mục `public/upload/product/`:

```
public/upload/product/
├── rolex-submariner-sale.jpg
├── rolex-submariner-2.jpg
├── rolex-submariner-3.jpg
├── rolex-submariner-4.jpg
├── omega-seamaster-sale.jpg
├── omega-seamaster-2.jpg
├── omega-seamaster-3.jpg
├── cartier-tank-sale.jpg
├── cartier-tank-2.jpg
├── cartier-tank-3.jpg
├── longines-heritage-sale.jpg
├── longines-heritage-2.jpg
└── longines-heritage-3.jpg
```

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