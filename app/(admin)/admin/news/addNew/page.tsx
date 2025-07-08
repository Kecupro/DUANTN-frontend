'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';
import styles from '../../assets/css/add.module.css';

const AddNew = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [status, setStatus] = useState<'Công khai' | 'Bản nháp'>('Công khai');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'preview'>('upload');

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
      setActiveTab('preview');
    }
  };

  const handleTabClick = (tab: 'upload' | 'preview') => {
    setActiveTab(tab);
    if (tab === 'upload') {
      document.getElementById('fileInput')?.click();
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Thêm tin tức</h1>
        <Link href="/admin/news" className={styles.returnButton}>
          Quay lại
        </Link>
      </div>

      <div className={styles.form}>
        {/* Tiêu đề */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tiêu đề</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Nhập tiêu đề..."
          />
        </div>

        {/* Mô tả */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Mô tả</label>
          <textarea
            className={styles.textarea}
            placeholder="Nhập mô tả..."
            rows={4}
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

        {/* Ảnh */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Ảnh</label>
          <div className={styles.imageSection}>
            <div className={styles.imageTabs}>
              <button
                type="button"
                className={`${styles.imageTab} ${activeTab === 'upload' ? styles.imageTabActive : ''}`}
                onClick={() => handleTabClick('upload')}
              >
                Chọn tệp
              </button>
              <button
                type="button"
                className={`${styles.imageTab} ${activeTab === 'preview' ? styles.imageTabActive : ''}`}
                onClick={() => handleTabClick('preview')}
              >
                {selectedFile ? selectedFile.name : 'Chưa có tệp nào được chọn'}
              </button>
            </div>

            {/* Input ảnh ẩn */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {/* Preview ảnh */}
            {selectedFile && activeTab === 'preview' && (
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
                value="Công khai"
                checked={status === 'Công khai'}
                onChange={(e) => setStatus(e.target.value as 'Công khai')}
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
                onChange={(e) => setStatus(e.target.value as 'Bản nháp')}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Bản nháp</span>
            </label>
          </div>
        </div>

        {/* Hành động */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Tạo mới
          </button>
          <Link href="/admin/news" className={styles.cancelButton}>
            Hủy
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AddNew;
