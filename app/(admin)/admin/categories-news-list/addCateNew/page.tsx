'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';
import styles from '../../assets/css/add.module.css';

const AddCateNew = () => {
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
        <h1 className={styles.title}>Thêm danh mục tin tức</h1>
        <Link href="/admin/categories-news-list" className={styles.returnButton}>
          Quay lại
        </Link>
      </div>

      <div className={styles.form}>
        {/* Tên danh mục */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên danh mục</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Nhập tên danh mục..."
          />
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
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
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
                onChange={(e) => setStatus(e.target.value as 'Công khai' | 'Bản nháp')}
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
                onChange={(e) => setStatus(e.target.value as 'Công khai' | 'Bản nháp')}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Bản nháp</span>
            </label>
          </div>
        </div>

        {/* Nút Thao tác */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Tạo mới
          </button>
          <Link href="/admin/news-categories" className={styles.cancelButton}>
            Hủy
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AddCateNew;
