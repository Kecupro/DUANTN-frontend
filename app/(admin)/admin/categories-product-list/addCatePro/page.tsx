'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';
import styles from '../../assets/css/add.module.css';

const AddCatePro = () => {
  const [status, setStatus] = useState<'Hoạt động' | 'Dừng hoạt động'>('Hoạt động');
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
        <h1 className={styles.title}>Thêm danh mục sản phẩm</h1>
        <Link href="/admin/categories-product-list" className={styles.returnButton}>
          Quay lại
        </Link>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên danh mục</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập tên danh mục..."
          />
        </div>

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
                onChange={(e) => setStatus(e.target.value as 'Hoạt động' | 'Dừng hoạt động')}
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
                onChange={(e) => setStatus(e.target.value as 'Hoạt động' | 'Dừng hoạt động')}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Dừng hoạt động</span>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Tạo mới
          </button>
          <Link href="/admin/categories" className={styles.cancelButton}>
            Hủy
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AddCatePro;
