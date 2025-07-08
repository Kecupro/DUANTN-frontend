// BrandDetailModal.tsx
"use client";
import React from "react";
// import { X } from "lucide-react";
import styles from "../assets/css/detail.module.css";

interface Brand {
  id: number;
  name: string;
  image?: string;
  alt?: string;
  content?: string;
  publishedDate: string;
  updatedDate: string;
  status: "Hoạt động" | "Dừng hoạt động";
}

interface BrandDetailModalProps {
  brand: Brand | null;
  onClose: () => void;
}

const BrandDetailModal: React.FC<BrandDetailModalProps> = ({
  brand,
  onClose,
}) => {
  if (!brand) return null;

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <main className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Chi tiết thương hiệu</h1>
            <button className={styles.returnButton} onClick={onClose}>
              Đóng
            </button>
          </div>

          <div className={styles.form}>
            {/* Brand Header */}
            <div className={styles.productHeader}>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{brand.name}</h2>
              </div>

              <div className={styles.productImage}>
                <div className={styles.imagePreview}>
                  <span>Xem trước ảnh thương hiệu</span>
                </div>
                <div className={styles.imageName}>
                  {brand.image || `${brand.name}.jpg`}
                </div>
              </div>
            </div>

            {/* Brand Details */}
            <div className={styles.productDetails}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID thương hiệu:</span>
                  <span className={styles.detailValue}>{brand.id}</span>
                </div>
               
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Tên thương hiệu:</span>
                  <span className={styles.detailValue}>{brand.name}</span>
                </div>
                 {brand.content && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Mô tả:</span>
                    <span className={styles.detailValue}>{brand.content}</span>
                  </div>
                )}

                {brand.alt && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Alt text:</span>
                    <span className={styles.detailValue}>{brand.alt}</span>
                  </div>
                )}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày xuất bản:</span>
                  <span className={styles.detailValue}>
                    {formatDate(brand.publishedDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày cập nhật:</span>
                  <span className={styles.detailValue}>
                    {formatDate(brand.updatedDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className={styles.statusSection}>
              <div className={styles.statusLabel}>Trạng thái thương hiệu</div>
              <span
                className={`${styles.statusBadge} ${
                  brand.status === "Hoạt động"
                    ? styles.statusActive
                    : styles.statusInactive
                }`}
              >
                {brand.status}
              </span>
            </div>

            {/* Actions */}
            <div className={styles.formActions}>
              <button type="button" className={styles.createButton}>
                Chỉnh sửa
              </button>
              <button type="button" className={styles.cancelButton}>
                Xóa
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandDetailModal;
