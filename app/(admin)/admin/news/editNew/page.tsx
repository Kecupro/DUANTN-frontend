'use client';
import React, { useState } from 'react';
import styles from '../../assets/css/add.module.css';

const EditNews = () => {
  // Dữ liệu mẫu đã có sẵn (thường sẽ được load từ API)
  const [formData, setFormData] = useState({
    title: 'Đồng hồ giá rẻ nhất 2025',
    description: 'Mô tả chi tiết về Đồng hồ giá rẻ nhất 2025 và những cập nhật mới nhất ',
    category: 'Đồng hồ giá rẻ	',
    status: 'Công khai',
    publishDate: '2024-12-01',
    updateDate: '2024-12-15'
  });
  
  const [selectedFile, setSelectedFile] = useState({
    name: 'existing-image.jpg'
  });
  const [activeTab, setActiveTab] = useState('preview');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
    // Xử lý cập nhật dữ liệu
    console.log('Updated data:', formData);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa tin tức</h1>
        <button className={styles.returnButton}>Quay lại</button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tiêu đề</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập tiêu đề..."
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mô tả</label>
           <textarea 
            className={styles.textarea}
            placeholder="Nhập mô tả..."
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Danh mục</label>
          <select 
            className={styles.select}
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value="">Đồng hồ giá rẻ</option>
            <option value="Đồng-hồ-giá-rẻ	">Đồng hồ giá rẻ 1</option>
            <option value="category2">--- Chọn danh mục ---</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày xuất bản</label>
          <input 
            type="date" 
            className={styles.input}
            value={formData.publishDate}
            onChange={(e) => handleInputChange('publishDate', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày cập nhật</label>
          <input 
            type="date" 
            className={styles.input}
            value={formData.updateDate}
            onChange={(e) => handleInputChange('updateDate', e.target.value)}
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
              <button 
                className={`${styles.imageTab} ${activeTab === 'preview' ? styles.imageTabActive : ''}`}
                onClick={() => handleTabClick('preview')}
                type="button"
              >
                {selectedFile ? selectedFile.name : 'Chưa có tệp nào được chọn'}
              </button>
            </div>
            
            {/* Input ẩn để chọn file mới */}
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
                value="Công khai"
                checked={formData.status === 'Công khai'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Công khai</span>
            </label>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="status" 
                value="Bản nháp"
                checked={formData.status === 'Bản nháp'}
                onChange={(e) => handleInputChange('status', e.target.value)}
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

export default EditNews;