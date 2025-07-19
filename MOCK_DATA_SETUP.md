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

## 🛍️ Trang Shop (shop/page.tsx):

### 📋 **Categories (Danh mục):**
- Tất cả
- Đồng hồ nam
- Đồng hồ nữ
- Đồng hồ thể thao
- Đồng hồ cổ điển
- Đồng hồ chronograph
- Đồng hồ lặn
- Đồng hồ bỏ túi
- Đồng hồ smartwatch
- Đồng hồ luxury

### 🏷️ **Brands (Thương hiệu):**
1. **Rolex** - `rolex-luxshopping.webp`
2. **Omega** - `omega-luxshopping.webp`
3. **Cartier** - `cartier-luxshopping.webp`
4. **Patek Philippe** - `patek-philippe-logo.webp`
5. **Audemars Piguet** - `audemars-piguet-logo.webp`
6. **Breguet** - `breguet-luxshopping.webp`
7. **Longines** - `logo-longines-full.webp`
8. **IWC** - `iwc-logo.webp`
9. **Jaeger-LeCoultre** - `jaeger-lecoultre-luxshopping.webp`
10. **Vacheron Constantin** - `vacheron-constantin-luxshopping.webp`
11. **Hublot** - `hublot-luxshopping.webp`
12. **Tag Heuer** - `tag-heuer-9.webp`
13. **Tissot** - `tissot-logo.webp`
14. **Seiko** - `seiko-logo.webp`
15. **Citizen** - `citizen-logo.webp`

### 📦 **Products (Sản phẩm):**

#### 1. **Rolex Submariner Date 126610LN**
- ID: `shop_1`
- Giá gốc: 85,000,000đ
- Giá sale: 72,000,000đ (Giảm 15%)
- Ảnh: `breguet-classique-quantieme-perpetuel-7327br-11-9vu-39mm.jpg.webp`

#### 2. **Omega Seamaster Planet Ocean**
- ID: `shop_2`
- Giá gốc: 65,000,000đ
- Giá sale: 52,000,000đ (Giảm 20%)
- Ảnh: `bulova-accu-swiss-tellaro-automatic-watch-43mm4.jpg.webp`

#### 3. **Cartier Tank Solo Automatic**
- ID: `shop_3`
- Giá gốc: 45,000,000đ
- Giá sale: 36,000,000đ (Giảm 20%)
- Ảnh: `baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp`

#### 4. **Longines Heritage Classic**
- ID: `shop_4`
- Giá gốc: 28,000,000đ
- Giá sale: 22,400,000đ (Giảm 20%)
- Ảnh: `bulova-sutton-automatic-34-5mm1.png.webp`

#### 5. **Patek Philippe Nautilus 5711/1A**
- ID: `shop_5`
- Giá: 120,000,000đ (Không giảm giá)
- Ảnh: `breguet-tradition-dame-7038bb-1t-9v6-d00d-watch-37mm1.jpg.webp`

#### 6. **Audemars Piguet Royal Oak 15500ST**
- ID: `shop_6`
- Giá gốc: 95,000,000đ
- Giá sale: 76,000,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-2es8a001-accutron-dna-watch-45mm1.png.webp`

#### 7. **IWC Portugieser Chronograph**
- ID: `shop_7`
- Giá gốc: 65,000,000đ
- Giá sale: 52,000,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp`

#### 8. **Breguet Classique 7147**
- ID: `shop_8`
- Giá gốc: 110,000,000đ
- Giá sale: 88,000,000đ (Giảm 20%)
- Ảnh: `breguet-reine-de-naples-9835-limited-edition-36-5x28-45mm.png_980_980.webp`

#### 9. **Vacheron Constantin Overseas 4500V**
- ID: `shop_9`
- Giá: 88,000,000đ (Không giảm giá)
- Ảnh: `bulova-surveyor-watch-41mm1.png.webp`

#### 10. **Jaeger-LeCoultre Reverso Classic**
- ID: `shop_10`
- Giá: 75,000,000đ (Không giảm giá)
- Ảnh: `bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp`

#### 11. **Hublot Big Bang Unico**
- ID: `shop_11`
- Giá gốc: 55,000,000đ
- Giá sale: 44,000,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp`

#### 12. **Tag Heuer Carrera Chronograph**
- ID: `shop_12`
- Giá gốc: 35,000,000đ
- Giá sale: 28,000,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-masella-diamond-markers-watch-31mm1.jpg.webp`

#### 13. **Tissot T-Touch Connect Solar**
- ID: `shop_13`
- Giá gốc: 18,000,000đ
- Giá sale: 14,400,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-2es8a001-accutron-dna-watch-45mm1.png.webp`

#### 14. **Seiko Prospex Diver**
- ID: `shop_14`
- Giá gốc: 12,000,000đ
- Giá sale: 9,600,000đ (Giảm 20%)
- Ảnh: `bulova-surveyor-watch-41mm1.png.webp`

#### 15. **Citizen Eco-Drive Promaster**
- ID: `shop_15`
- Giá gốc: 8,000,000đ
- Giá sale: 6,400,000đ (Giảm 20%)
- Ảnh: `bulova-accutron-masella-chronograph-black-watch-40mm1.jpg.webp`

#### 16. **Cartier Ballon Bleu**
- ID: `shop_16`
- Giá gốc: 38,000,000đ
- Giá sale: 30,400,000đ (Giảm 20%)
- Ảnh: `baume--mercier-hampton-10709-blue-watch-35-x-22mm1.png.webp`

### 🔥 **Best Sellers (Sản phẩm bán chạy):**
1. **Rolex Submariner Date 126610LN** - `best_1`
2. **Omega Seamaster Planet Ocean** - `best_2`
3. **Cartier Tank Solo Automatic** - `best_3`
4. **Longines Heritage Classic** - `best_4`

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

## 📰 Trang Tin Tức (news/page.tsx):

### 📋 **Categories (Danh mục tin tức):**
1. **Tin tức đồng hồ** (cat_1) - 3 articles
2. **Đánh giá sản phẩm** (cat_2) - 3 articles  
3. **Thương hiệu** (cat_3) - 2 articles
4. **Công nghệ** (cat_4) - 2 articles
5. **Sự kiện** (cat_5) - 2 articles

### 📰 **News Articles (Bài viết):**

#### 1. **Rolex Submariner - Huyền thoại đồng hồ lặn qua 70 năm**
- ID: `news_1`
- Category: Tin tức đồng hồ
- Views: 1,250
- Ảnh: `dive_watch_1.jpg`

#### 2. **Đánh giá chi tiết Omega Seamaster Planet Ocean 600M**
- ID: `news_2`
- Category: Đánh giá sản phẩm
- Views: 890
- Ảnh: `dive_watch_2.jpg`

#### 3. **Patek Philippe - Lịch sử 180 năm của thương hiệu đồng hồ cao cấp**
- ID: `news_3`
- Category: Thương hiệu
- Views: 2,100
- Ảnh: `luxury_watch_1.jpg`

#### 4. **Công nghệ Smartwatch 2024 - Xu hướng mới nhất**
- ID: `news_4`
- Category: Công nghệ
- Views: 680
- Ảnh: `smartwatch_1.jpg`

#### 5. **Baselworld 2024 - Triển lãm đồng hồ lớn nhất thế giới**
- ID: `news_5`
- Category: Sự kiện
- Views: 950
- Ảnh: `luxury_watch_2.jpg`

#### 6. **Cartier Tank - Biểu tượng của sự thanh lịch**
- ID: `news_6`
- Category: Tin tức đồng hồ
- Views: 720
- Ảnh: `dress_watch_1.jpg`

#### 7. **Đánh giá Audemars Piguet Royal Oak - Đồng hồ thể thao cao cấp**
- ID: `news_7`
- Category: Đánh giá sản phẩm
- Views: 1,100
- Ảnh: `sport_watch_1.jpg`

#### 8. **Breguet - Nghệ nhân đồng hồ của các vị vua**
- ID: `news_8`
- Category: Thương hiệu
- Views: 850
- Ảnh: `luxury_watch_3.jpg`

#### 9. **Công nghệ Eco-Drive của Citizen - Năng lượng mặt trời**
- ID: `news_9`
- Category: Công nghệ
- Views: 420
- Ảnh: `smartwatch_2.jpg`

#### 10. **SIHH 2024 - Triển lãm đồng hồ cao cấp Geneva**
- ID: `news_10`
- Category: Sự kiện
- Views: 780
- Ảnh: `luxury_watch_4.jpg`

#### 11. **Longines Heritage - Kết nối quá khứ và hiện tại**
- ID: `news_11`
- Category: Tin tức đồng hồ
- Views: 650
- Ảnh: `dress_watch_2.jpg`

#### 12. **Đánh giá IWC Portugieser - Đồng hồ chronograph cổ điển**
- ID: `news_12`
- Category: Đánh giá sản phẩm
- Views: 920
- Ảnh: `sport_watch_2.jpg`

### 🖼️ **News Images (Ảnh tin tức):**
- **Path**: `/public/upload/new/`
- **Extension**: `.jpg`
- **Types**: 
  - `dive_watch_*.jpg` - Đồng hồ lặn
  - `luxury_watch_*.jpg` - Đồng hồ cao cấp
  - `smartwatch_*.jpg` - Đồng hồ thông minh
  - `sport_watch_*.jpg` - Đồng hồ thể thao
  - `dress_watch_*.jpg` - Đồng hồ dạ hội
- **Total**: 12 articles với ảnh thực tế

### 📄 **Pagination (Phân trang):**
- **Items per page**: 6 articles
- **Total pages**: 2 pages (12 articles total)
- **Filtering**: By category với real-time updates
- **Smooth transitions**: Fade in/out effects

### 🎯 **Features (Tính năng):**
- ✅ Category filtering
- ✅ Pagination
- ✅ Recent articles sidebar
- ✅ Smooth transitions
- ✅ Responsive design
- ✅ Loading skeletons
- ✅ Error handling

## 📄 **Trang Chi Tiết Tin Tức (news/[id]/page.tsx):**

### 📋 **News Detail (Chi tiết bài viết):**
- **File**: `duantn/app/(site)/news/[id]/page.tsx`
- **Articles**: 12 bài viết chi tiết với nội dung đầy đủ
- **Images**: Sử dụng ảnh thực tế từ `/public/upload/new/`
- **View tracking**: Lưu lượt xem trong localStorage

### 📰 **Detailed Articles (Bài viết chi tiết):**

#### 1. **Rolex Submariner - Huyền thoại đồng hồ lặn qua 70 năm**
- **URL**: `/news/news_1`
- **Content**: 8 đoạn văn chi tiết về lịch sử và thiết kế
- **Views**: 1,250
- **Image**: `dive_watch_1.jpg`

#### 2. **Đánh giá chi tiết Omega Seamaster Planet Ocean 600M**
- **URL**: `/news/news_2`
- **Content**: 6 đoạn văn về công nghệ và thiết kế
- **Views**: 890
- **Image**: `dive_watch_2.jpg`

#### 3. **Patek Philippe - Lịch sử 180 năm của thương hiệu đồng hồ cao cấp**
- **URL**: `/news/news_3`
- **Content**: 8 đoạn văn về lịch sử và đóng góp
- **Views**: 2,100
- **Image**: `luxury_watch_1.jpg`

#### 4. **Công nghệ Smartwatch 2024 - Xu hướng mới nhất**
- **URL**: `/news/news_4`
- **Content**: 7 đoạn văn về công nghệ và xu hướng
- **Views**: 680
- **Image**: `smartwatch_1.jpg`

#### 5. **Baselworld 2024 - Triển lãm đồng hồ lớn nhất thế giới**
- **URL**: `/news/news_5`
- **Content**: 8 đoạn văn về sự kiện và kết quả
- **Views**: 950
- **Image**: `luxury_watch_2.jpg`

#### 6. **Cartier Tank - Biểu tượng của sự thanh lịch**
- **URL**: `/news/news_6`
- **Content**: 7 đoạn văn về lịch sử và thiết kế
- **Views**: 720
- **Image**: `dress_watch_1.jpg`

#### 7. **Đánh giá Audemars Piguet Royal Oak - Đồng hồ thể thao cao cấp**
- **URL**: `/news/news_7`
- **Content**: 6 đoạn văn về thiết kế và máy cơ
- **Views**: 1,100
- **Image**: `sport_watch_1.jpg`

#### 8. **Breguet - Nghệ nhân đồng hồ của các vị vua**
- **URL**: `/news/news_8`
- **Content**: 8 đoạn văn về lịch sử và phát minh
- **Views**: 850
- **Image**: `luxury_watch_3.jpg`

#### 9. **Công nghệ Eco-Drive của Citizen - Năng lượng mặt trời**
- **URL**: `/news/news_9`
- **Content**: 8 đoạn văn về công nghệ và ứng dụng
- **Views**: 420
- **Image**: `smartwatch_2.jpg`

#### 10. **SIHH 2024 - Triển lãm đồng hồ cao cấp Geneva**
- **URL**: `/news/news_10`
- **Content**: 7 đoạn văn về sự kiện và thương hiệu
- **Views**: 780
- **Image**: `luxury_watch_4.jpg`

#### 11. **Longines Heritage - Kết nối quá khứ và hiện tại**
- **URL**: `/news/news_11`
- **Content**: 7 đoạn văn về bộ sưu tập và thiết kế
- **Views**: 650
- **Image**: `dress_watch_2.jpg`

#### 12. **Đánh giá IWC Portugieser - Đồng hồ chronograph cổ điển**
- **URL**: `/news/news_12`
- **Content**: 8 đoạn văn về thiết kế và máy chronograph
- **Views**: 920
- **Image**: `sport_watch_2.jpg`

### 🎯 **Features (Tính năng chi tiết):**
- ✅ **Rich content**: Nội dung chi tiết với nhiều đoạn văn
- ✅ **View tracking**: Theo dõi lượt xem trong localStorage
- ✅ **Image display**: Ảnh đại diện chất lượng cao
- ✅ **Category info**: Hiển thị danh mục tin tức
- ✅ **Date formatting**: Định dạng ngày tháng Việt Nam
- ✅ **Back navigation**: Nút quay lại danh sách
- ✅ **Loading state**: Skeleton loading đẹp mắt
- ✅ **Error handling**: Xử lý lỗi khi không tìm thấy bài viết
- ✅ **Responsive design**: Tương thích mobile/desktop