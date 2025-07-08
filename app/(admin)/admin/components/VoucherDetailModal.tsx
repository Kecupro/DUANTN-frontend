// VoucherDetailModal.tsx
"use client";
import React from "react";
// import { X } from "lucide-react";
import styles from "../assets/css/detail.module.css";

interface Voucher {
  id: number;
  name: string;
  code: string;
  discountType: "Phần trăm" | "Số tiền cố định";
  discountValue: number;
  startDate: string;
  endDate: string;
  maxDiscount?: number;
  minOrderValue: number;
  status: "Hết hạn" | "Còn hạn";
  createdDate: string;
  updatedDate: string;
}

interface VoucherDetailModalProps {
  voucher: Voucher | null;
  onClose: () => void;
}

const VoucherDetailModal: React.FC<VoucherDetailModalProps> = ({ 
  voucher, 
  onClose, 
}) => {
  if (!voucher) return null;

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format discount value
  const formatDiscountValue = (type: string, value: number) => {
    if (type === "Phần trăm") {
      return `${value}%`;
    } else {
      return formatCurrency(value);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <main className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Chi tiết mã khuyến mãi</h1>
            <button className={styles.returnButton} onClick={onClose}>
              Đóng
            </button>
          </div>

          <div className={styles.form}>
       
            {/* Voucher Details */}
            <div className={styles.productDetails}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID:</span>
                  <span className={styles.detailValue}>{voucher.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Tên mã khuyến mãi:</span>
                  <span className={styles.detailValue}>{voucher.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Mã khuyến mãi:</span>
                  <span className={styles.detailValue}>{voucher.code}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Loại giảm giá:</span>
                  <span className={styles.detailValue}>{voucher.discountType}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Giá trị giảm giá:</span>
                  <span className={styles.detailValue}>
                    {formatDiscountValue(voucher.discountType, voucher.discountValue)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày bắt đầu:</span>
                  <span className={styles.detailValue}>
                    {formatDate(voucher.startDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày hết hạn:</span>
                  <span className={styles.detailValue}>
                    {formatDate(voucher.endDate)}
                  </span>
                </div>
                {voucher.maxDiscount && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Giảm giá tối đa:</span>
                    <span className={styles.detailValue}>
                      {formatCurrency(voucher.maxDiscount)}
                    </span>
                  </div>
                )}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Giá trị tối thiểu đơn hàng:</span>
                  <span className={styles.detailValue}>
                    {formatCurrency(voucher.minOrderValue)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày tạo:</span>
                  <span className={styles.detailValue}>
                    {formatDate(voucher.createdDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày cập nhật:</span>
                  <span className={styles.detailValue}>
                    {formatDate(voucher.updatedDate)}
                  </span>
                </div>
              </div>
             
            </div>

            {/* Status */}
            <div className={styles.statusSection}>
              <div className={styles.statusLabel}>Trạng thái mã khuyến mãi</div>
              <span
                className={`${styles.statusBadge} ${
                  voucher.status === "Còn hạn"
                    ? styles.statusActive
                    : styles.statusInactive
                }`}
              >
                {voucher.status}
              </span>
            </div>

            {/* Actions */}
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.createButton}
              >
                Chỉnh sửa
              </button>
              <button 
                type="button" 
                className={styles.cancelButton}
              >
                Xóa mã khuyến mãi
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VoucherDetailModal;