// NewDetailModal.tsx
"use client";
import React from "react";
// import { X } from "lucide-react";
import styles from "../assets/css/detail.module.css";

interface News {
  id: number;
  title: string;
  content: string;
  category: string;
  image?: string;
  publishDate: string;
  updatedDate: string;
  status: "Đã xuất bản" | "Bản nháp";
}

interface NewDetailModalProps {
  news: News | null;
  onClose: () => void;
}

const NewDetailModal: React.FC<NewDetailModalProps> = ({ 
  news, 
  onClose, 
}) => {
  if (!news) return null;

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
            <h1 className={styles.title}>Chi tiết tin tức</h1>
            <button className={styles.returnButton} onClick={onClose}>
              Đóng
            </button>
          </div>

          <div className={styles.form}>
            {/* News Header */}
            <div className={styles.productHeader}>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{news.title}</h2>
              </div>

              <div className={styles.productImage}>
                <div className={styles.imagePreview}>
                  <span>Xem trước ảnh tin tức</span>
                </div>
                <div className={styles.imageName}>
                  {news.image || `${news.title}.jpg`}
                </div>
              </div>
            </div>

            {/* News Details */}
            <div className={styles.productDetails}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                <h4 className={styles.sectionTitle}>Thông tin cơ bản</h4>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID tin tức:</span>
                  <span className={styles.detailValue}>{news.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Tiêu đề:</span>
                  <span className={styles.detailValue}>{news.title}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Danh mục:</span>
                  <span className={styles.detailValue}>{news.category}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Nội dung:</span>
                  <span className={styles.detailValue}>{news.content}</span>
                </div>
                 <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày xuất bản:</span>
                  <span className={styles.detailValue}>
                    {formatDate(news.publishDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày cập nhật:</span>
                  <span className={styles.detailValue}>
                    {formatDate(news.updatedDate)}
                  </span>
                </div>
              </div>
             
            </div>

            {/* Status */}
            <div className={styles.statusSection}>
              <div className={styles.statusLabel}>Trạng thái tin tức</div>
              <span
                className={`${styles.statusBadge} ${
                  news.status === "Đã xuất bản"
                    ? styles.statusActive
                    : styles.statusInactive
                }`}
              >
                {news.status}
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
                Xóa tin tức
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewDetailModal;