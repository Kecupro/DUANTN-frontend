'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from '../../assets/css/add.module.css';
import Link from 'next/link';

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [status, setStatus] = useState('Hoạt động');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeImageTab, setActiveImageTab] = useState('upload');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedWaterResistance, setSelectedWaterResistance] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMovementType, setSelectedMovementType] = useState('');
  const [selectedStrapMaterial, setSelectedStrapMaterial] = useState('');
  const [selectedCaseMaterial, setSelectedCaseMaterial] = useState('');

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles['dark-mode']);
    else html.classList.remove(styles['dark-mode']);
  }, [isDarkMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setActiveImageTab('preview');
    }
  };

  const handleImageTabClick = (tab: string) => {
    setActiveImageTab(tab);
    if (tab === 'upload') {
      document.getElementById('productFileInput')?.click();
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Thêm sản phẩm</h1>
        <Link href="/admin/products" className={styles.returnButton}>
          Quay lại
        </Link>
      </div>

      <div className={styles.form}>
        {/* Tên sản phẩm */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên sản phẩm</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>

        {/* Danh mục */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Danh mục</label>
          <select 
            className={styles.select}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">--- Chọn danh mục ---</option>
            <option value="category1">Danh mục 1</option>
            <option value="category2">Danh mục 2</option>
          </select>
        </div>

        {/* Thương hiệu */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Thương hiệu</label>
          <select 
            className={styles.select}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">--- Chọn thương hiệu ---</option>
            <option value="brand1">Thương hiệu 1</option>
            <option value="brand2">Thương hiệu 2</option>
          </select>
        </div>

        {/* Giá */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Giá</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập giá sản phẩm..."
          />
        </div>

        {/* Giá giảm */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Giá giảm</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập giá giảm sản phẩm..."
          />
        </div>

        {/* Số lượng */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Số lượng</label>
          <input 
            type="number" 
            className={styles.input}
            placeholder="Nhập số lượng..."
          />
        </div>

        {/* Mô tả */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Mô tả sản phẩm</label>
          <textarea 
            className={styles.textarea}
            placeholder="Nhập mô tả sản phẩm..."
            rows={4}
          />
        </div>

        {/* Giới tính */}
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

        {/* Đường kính */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Đường kính vỏ</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập đường kính vỏ (mm)..."
          />
        </div>

        {/* Phong cách */}
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

        {/* Tính năng */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tính năng</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập tính năng (VD: Chronograph, GMT, Alarm...)..."
          />
        </div>

        {/* Khả năng chống nước */}
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

        {/* Độ dày */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Độ dày</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập độ dày (mm)..."
          />
        </div>

        {/* Màu sắc */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Màu sắc</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            placeholder="Nhập màu sắc..."
          />
        </div>

        {/* Loại máy */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Loại máy</label>
          <input 
            type="text" 
            className={styles.input}
            value={selectedMovementType}
            onChange={(e) => setSelectedMovementType(e.target.value)}
            placeholder="Nhập loại máy..."
          />
        </div>

        {/* Vật liệu dây đeo */}
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

        {/* Vật liệu vỏ */}
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

        {/* Ảnh */}
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
                Xem trước
              </button>
            </div>
            <input 
              id="productFileInput"
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {selectedFile && activeImageTab === 'preview' && (
              <div className={styles.imagePreview}>
                <img 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="Preview"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        </div>

        {/* Trạng thái */}
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

        {/* Action buttons */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Tạo mới
          </button>
          <button type="button" className={styles.cancelButton}>
            Hủy
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
