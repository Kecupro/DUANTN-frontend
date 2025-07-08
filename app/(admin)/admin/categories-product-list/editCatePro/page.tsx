'use client';
import React, { useState } from 'react';
import styles from '../../assets/css/add.module.css';

const EditCatePro = () => {
  // Dữ liệu mẫu để hiển thị như đã có sẵn
  const [categoryName, setCategoryName] = useState('Đồng hồ dây da');
  const [status, setStatus] = useState('Hoạt động');
  const [selectedFile, setSelectedFile] = useState({
    name: 'category-phone.jpg',
    url: '/images/categories/category-phone.jpg' // URL ảnh mẫu
  });
  const [activeTab, setActiveTab] = useState('preview');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      });
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
    // Xử lý cập nhật danh mục
    console.log('Cập nhật danh mục:', {
      name: categoryName,
      status: status,
      image: selectedFile
    });
  };

  const handleCancel = () => {
    // Xử lý hủy bỏ
    console.log('Hủy chỉnh sửa');
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa danh mục sản phẩm</h1>
        <button className={styles.returnButton}>Quay lại</button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên danh mục</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập tên danh mục..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
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
                Chọn tệp mới
              </button>
            
            </div>
            
            {/* Hiển thị preview ảnh hiện tại */}
            {activeTab === 'preview' && selectedFile && (
              <div className={styles.imagePreview}>
                <img 
                  src={selectedFile.url} 
                  alt="Preview"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginTop: '10px'
                  }}
                />
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  Ảnh hiện tại: {selectedFile.name}
                </p>
              </div>
            )}
            
            {/* Hidden file input */}
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
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Hủy
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditCatePro;