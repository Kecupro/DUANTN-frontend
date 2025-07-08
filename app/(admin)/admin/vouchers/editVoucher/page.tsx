'use client';
import React, { useState } from 'react';
import styles from '../../assets/css/add.module.css';

const EditVoucher = () => {
  // Dữ liệu mẫu có sẵn
  const [voucherName, setVoucherName] = useState('Giảm giá tới đa 20k');
  const [voucherCode, setVoucherCode] = useState('KMDISCOUNT20');
  const [selectedDiscountType, setSelectedDiscountType] = useState('Giảm tiền');
  const [discountValue, setDiscountValue] = useState('20,000 đ');
  const [startDate, setStartDate] = useState('20225-05-25');
  const [endDate, setEndDate] = useState('2025-05-28');
  const [status, setStatus] = useState('Hết hạn');

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa khuyến mãi</h1>
        <button className={styles.returnButton}>Quay lại</button>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên mã khuyến mãi</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập tên khuyến mãi..."
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mã khuyến mãi</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Nhập mã khuyến mãi..."
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Loại giảm giá</label>
          <select 
            className={styles.select}
            value={selectedDiscountType}
            onChange={(e) => setSelectedDiscountType(e.target.value)}
          >
            <option value="">Giảm theo số tiền cố định (đ)</option>
            <option value="percentage">Giảm theo phần trăm (%)</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Giá trị giảm</label>
          <input 
            type="text" 
            className={styles.input}
            placeholder={selectedDiscountType === 'percentage' ? 'Nhập phần trăm giảm...' : 'Nhập số tiền giảm...'}
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày bắt đầu</label>
          <input 
            type="date" 
            className={styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ngày kết thúc</label>
          <input 
            type="date" 
            className={styles.input}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Trạng thái</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name="status" 
                value="Còn hạn"
                checked={status === 'Còn hạn'}
                onChange={(e) => setStatus(e.target.value)}
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
                onChange={(e) => setStatus(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>Hết hạn</span>
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

export default EditVoucher;