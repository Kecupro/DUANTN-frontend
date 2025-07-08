'use client';
import React, { useState } from 'react';
import styles from '../../assets/css/add.module.css';

const EditCateNew = () => {
  // Dữ liệu mẫu đã có sẵn (giả lập từ database)
  const [categoryName, setCategoryName] = useState('Đồng hồ chính hãng Việt Nam	');
  const [status, setStatus] = useState('Công khai');
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('tech-news.jpg'); // Ảnh hiện tại
  const [activeTab, setActiveTab] = useState('preview');
  const [createdDate] = useState('15/03/2024'); // Ngày xuất bảng (không thể sửa)
  const [updatedDate, setUpdatedDate] = useState('09/06/2025'); // Ngày cập nhật

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setActiveTab('preview');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'upload') {
      // Trigger file input click when upload tab is clicked
      document.getElementById('fileInput').click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cập nhật ngày khi submit
    const now = new Date();
    const formattedDate = now.toLocaleDateString('vi-VN');
    setUpdatedDate(formattedDate);
    
    console.log('Cập nhật danh mục:', {
      categoryName,
      status,
      image: selectedFile || currentImage,
      createdDate,
      updatedDate: formattedDate
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa danh mục tin tức</h1>
        <button className={styles.returnButton}>Quay lại</button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên danh mục</label>
          <input 
            type="text" 
            className={styles.input}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Nhập tên danh mục..."
          />    
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Ảnh</label>
          <div className={styles.imageSection}>
            <div className={styles.imageTabs}>
              <button 
                className={`${styles.imageTab} ${activeTab === 'upload' ? styles.imageTabActive : ''}`}
                onClick={() => handleTabClick('upload')}
                type="button"
              >
                Chọn tệp mới:
              </button>
             
            </div>
            
            {/* Hiển thị ảnh hiện tại hoặc ảnh mới */}
            {activeTab === 'preview' && (
              <div className={styles.imagePreview}>
                {selectedFile ? (
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.currentImagePlaceholder}>
                    <span> {currentImage}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Input file ẩn */}
            <input 
              id="fileInput"
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

      
        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày xuất bản</label>
          <input 
            type="text" 
            className={styles.input}
            value={createdDate}
            disabled
            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
          />    
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày cập nhật</label>
          <input 
            type="text" 
            className={styles.input}
            value={updatedDate}
            disabled
            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
          />    
        </div>
  <div className={styles.formGroup}>
          <label className={styles.label}>Trạng thái</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="status" 
                value="Công khai"
                checked={status === 'Công khai'}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Công khai</span>
            </label>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="status" 
                value="Bản nháp"
                checked={status === 'Bản nháp'}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Bản nháp</span>
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
      </form>
    </main>
  );
};

export default EditCateNew;