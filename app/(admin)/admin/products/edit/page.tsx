'use client';
import React, { useState } from 'react';
import styles from '../../assets/css/add.module.css';

const EditProduct = () => {
  // Pre-filled data for editing
  const [selectedCategory, setSelectedCategory] = useState('dongho-dayda');
  const [selectedBrand, setSelectedBrand] = useState('gshock');
  const [status, setStatus] = useState('Hoạt động');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeImageTab, setActiveImageTab] = useState('preview');
  const [selectedGender, setSelectedGender] = useState('nam');
  const [selectedStyle, setSelectedStyle] = useState('Thể thao');
  const [selectedWaterResistance, setSelectedWaterResistance] = useState('200m');
  const [selectedColor, setSelectedColor] = useState('Đen');
  const [selectedMovementType, setSelectedMovementType] = useState('Pin');
  const [selectedStrapMaterial, setSelectedStrapMaterial] = useState('Nhựa');
  const [selectedCaseMaterial, setSelectedCaseMaterial] = useState('Thép không gỉ');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setActiveImageTab('preview');
    }
  };

  const handleImageTabClick = (tab) => {
    setActiveImageTab(tab);
    if (tab === 'upload') {
      // Trigger file input click when upload tab is clicked
      document.getElementById('productFileInput').click();
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa sản phẩm</h1>
        <button className={styles.returnButton}>Quay lại</button>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên sản phẩm</label>
          <input 
            type="text" 
            className={styles.input}
            value="GWG-1000-1A3"
            placeholder="Nhập tên sản phẩm..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Danh mục</label>
          <select 
            className={styles.select}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">--- Chọn danh mục ---</option>
            <option value="dongho-dayda">Đồng hồ dây da</option>
            <option value="dongho-thethao">Đồng hồ thể thao</option>
            <option value="dongho-caocap">Đồng hồ cao cấp</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Thương hiệu</label>
          <select 
            className={styles.select}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">--- Chọn thương hiệu ---</option>
            <option value="gshock">G-Shock</option>
            <option value="casio">Casio</option>
            <option value="citizen">Citizen</option>
            <option value="seiko">Seiko</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Giá</label>
          <input 
            type="text" 
            className={styles.input}
            value="14,999,000 đ"
            placeholder="Nhập giá sản phẩm..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Giá giảm</label>
          <input 
            type="text" 
            className={styles.input}
            value="12,999,000 đ"
            placeholder="Nhập giá giảm sản phẩm..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Số lượng</label>
          <input 
            type="number" 
            className={styles.input}
            value="14"
            placeholder="Nhập số lượng..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mô tả sản phẩm</label>
          <textarea 
            className={styles.textarea}
            value="Sản phẩm được ra đời mới nhất tại Việt Nam, chất lượng khỏi chê. Đồng hồ G-Shock với thiết kế mạnh mẽ, chống sốc và chống nước tuyệt vời, phù hợp cho các hoạt động thể thao và ngoài trời."
            placeholder="Nhập mô tả sản phẩm..."
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Giới tính</label>
          <select 
            className={styles.select}
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">--- Chọn giới tính ---</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Đường kính vỏ</label>
          <input 
            type="text" 
            className={styles.input}
            value="56mm"
            placeholder="Nhập đường kính vỏ (mm)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phong cách</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            placeholder="Nhập phong cách (VD: Cổ điển, Thể thao, Cao cấp...)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tính năng</label>
          <input 
            type="text" 
            className={styles.input}
            value="Vượt trội, hiện đại, tiện lợi khi đi bơi..."
            placeholder="Nhập tính năng (VD: Chronograph, GMT, Alarm...)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Khả năng chống nước</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedWaterResistance}
            onChange={(e) => setSelectedWaterResistance(e.target.value)}
            placeholder="Nhập khả năng chống nước (VD: 30m, 50m, 100m...)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Độ dày</label>
          <input 
            type="text" 
            className={styles.input}
            value="18mm"
            placeholder="Nhập độ dày (mm)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Màu sắc</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            placeholder="Nhập màu sắc (VD: Đen, Trắng, Bạc, Vàng...)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Loại máy</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedMovementType}
            onChange={(e) => setSelectedMovementType(e.target.value)}
            placeholder="Nhập loại máy (VD: Cơ tự động, Pin, Solar...)..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Vật liệu dây đeo</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedStrapMaterial}
            onChange={(e) => setSelectedStrapMaterial(e.target.value)}
            placeholder="Nhập vật liệu dây đeo..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Vật liệu vỏ</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedCaseMaterial}
            onChange={(e) => setSelectedCaseMaterial(e.target.value)}
            placeholder="Nhập vật liệu vỏ..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ảnh</label>
          <div className={styles.imageSection}>
            <div className={styles.imageTabs}>
              <button 
                type="button"
                className={`${styles.imageTab} ${activeImageTab === 'upload' ? styles.imageTabActive : ''}`}
                onClick={() => handleImageTabClick('upload')}
              >
                Chọn tệp
              </button>
              <button 
                type="button"
                className={`${styles.imageTab} ${activeImageTab === 'preview' ? styles.imageTabActive : ''}`}
                onClick={() => handleImageTabClick('preview')}
              >
                {selectedFile ? selectedFile.name : 'Dongho-2025.jpg'}
              </button>
            </div>
            
            {/* Hidden file input */}
            <input 
              id="productFileInput"
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Trạng thái</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="status" 
                value="Hoạt động"
                checked={status === 'Hoạt động'}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Hoạt động</span>
            </label>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="status" 
                value="Dừng hoạt động"
                checked={status === 'Dừng hoạt động'}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Dừng hoạt động</span>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Cập nhật
          </button>
          <button type="button" className={styles.cancelButton}>
            Hủy
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditProduct;