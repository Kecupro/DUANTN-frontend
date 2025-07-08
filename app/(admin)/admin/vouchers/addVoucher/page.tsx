'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';
import styles from '../../assets/css/add.module.css';

const AddVoucher = () => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed' | ''>('');
  const [status, setStatus] = useState<'Còn hạn' | 'Hết hạn'>('Còn hạn');

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles['dark-mode']);
    else html.classList.remove(styles['dark-mode']);
  }, [isDarkMode]);

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Thêm khuyến mãi</h1>
        <Link href="/admin/vouchers" className={styles.returnButton}>
          Quay lại
        </Link>
      </div>

      <div className={styles.form}>
        {/* Tên khuyến mãi */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên mã khuyến mãi</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Nhập tên khuyến mãi..."
          />
        </div>

        {/* Mã khuyến mãi */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Mã khuyến mãi</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Nhập mã khuyến mãi..."
          />
        </div>

        {/* Loại giảm giá */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Loại giảm giá</label>
          <select
            className={styles.select}
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
          >
            <option value="">--- Chọn loại giảm giá ---</option>
            <option value="percentage">Giảm theo phần trăm (%)</option>
            <option value="fixed">Giảm theo số tiền cố định (VNĐ)</option>
          </select>
        </div>

        {/* Giá trị giảm */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Giá trị giảm</label>
          <input
            type="number"
            className={styles.input}
            placeholder={
              discountType === 'percentage'
                ? 'Nhập phần trăm giảm (VD: 10)'
                : discountType === 'fixed'
                ? 'Nhập số tiền giảm (VD: 50000)'
                : 'Chọn loại giảm giá trước'
            }
          />
        </div>

        {/* Ngày bắt đầu */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày bắt đầu</label>
          <input
            type="date"
            className={styles.input}
          />
        </div>

        {/* Ngày kết thúc */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày kết thúc</label>
          <input
            type="date"
            className={styles.input}
          />
        </div>

        {/* Trạng thái */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Trạng thái</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="Còn hạn"
                checked={status === 'Còn hạn'}
                onChange={(e) => setStatus(e.target.value as 'Còn hạn')}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Còn hạn</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="Hết hạn"
                checked={status === 'Hết hạn'}
                onChange={(e) => setStatus(e.target.value as 'Hết hạn')}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Hết hạn</span>
            </label>
          </div>
        </div>

        {/* Hành động */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.createButton}>
            Tạo mới
          </button>
          <Link href="/admin/vouchers" className={styles.cancelButton}>
            Hủy
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AddVoucher;
