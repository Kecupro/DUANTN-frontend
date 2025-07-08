// CategoryDetailModal.tsx
"use client";
import React from "react";
// import { X } from "lucide-react";
import styles from "../assets/css/detail.module.css";

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  createdDate: string;
  updatedDate: string;
  status: "Hoạt động" | "Dừng hoạt động";
  productCount?: number;
  parentCategory?: string;
}

interface CategoryDetailModalProps {
  category: Category | null;
  onClose: () => void;
}

const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({ 
  category, 
  onClose, 
}) => {
  if (!category) return null;

  

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

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
       

        <main className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Chi tiết danh mục</h1>
            <button className={styles.returnButton} onClick={onClose}>
              Đóng
            </button>
          </div>

          <div className={styles.form}>
            {/* Category Header */}
            <div className={styles.productHeader}>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{category.name}</h2>
            
              </div>

              <div className={styles.productImage}>
                <div className={styles.imagePreview}>
                  <span>Xem trước ảnh danh mục</span>
                </div>
                <div className={styles.imageName}>
                  {category.image || `${category.name}.jpg`}
                </div>
              </div>
            </div>

            {/* Category Details */}
            <div className={styles.productDetails}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID danh mục:</span>
                  <span className={styles.detailValue}>{category.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Tên danh mục:</span>
                  <span className={styles.detailValue}>{category.name}</span>
                </div>
               
              </div>

              {/* Date Information */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Thông tin thời gian</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày tạo:</span>
                  <span className={styles.detailValue}>
                    {formatDate(category.createdDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày cập nhật:</span>
                  <span className={styles.detailValue}>
                    {formatDate(category.updatedDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className={styles.statusSection}>
              <div className={styles.statusLabel}>Trạng thái danh mục</div>
              <span
                className={`${styles.statusBadge} ${
                  category.status === "Hoạt động"
                    ? styles.statusActive
                    : styles.statusInactive
                }`}
              >
                {category.status}
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
                Xóa danh mục
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryDetailModal;