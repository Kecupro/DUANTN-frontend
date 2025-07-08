"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import styles from "../../assets/css/detail.module.css";
import { useAppContext } from "../../../context/AppContext";
import { INews } from "@/app/(site)/cautrucdata";

const NewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useAppContext();
  const [news, setNews] = useState<INews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add(styles["dark-mode"]);
    } else {
      html.classList.remove(styles["dark-mode"]);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!params.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/admin/news/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Không thể tải thông tin tin tức');
        }
        
        const data = await response.json();
        setNews(data.news || data); // Tùy thuộc vào cấu trúc response từ API
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải chi tiết tin tức:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [params.id]);

  // Format date function
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "Chưa có thông tin";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status text and class
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: "Bản nháp", class: styles.statusInactive };
      case 1:
        return { text: "Đã xuất bản", class: styles.statusActive };
      default:
        return { text: "Không xác định", class: styles.statusInactive };
    }
  };

  const handleEdit = () => {
    router.push(`/admin/news/edit/${params.id}`);
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin tức này?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/admin/news/${params.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Xóa tin tức thành công!');
        router.push('/admin/news');
      } else {
        throw new Error('Không thể xóa tin tức');
      }
    } catch (err) {
      console.error('Lỗi khi xóa tin tức:', err);
      alert('Có lỗi xảy ra khi xóa tin tức');
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Đang tải...</h1>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Lỗi</h1>
          <button className={styles.returnButton} onClick={handleBack}>
            <ArrowLeft size={16} />
            Quay lại
          </button>
        </div>
        <div className={styles.form}>
          <p>Không thể tải thông tin tin tức: {error}</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(news.news_status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chi tiết tin tức</h1>
        <button className={styles.returnButton} onClick={handleBack}>
          <ArrowLeft size={16} />
          Quay lại
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
              {news.image ? (
                <img 
                  src={news.image} 
                  alt={news.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              ) : (
                <span>Xem trước ảnh tin tức</span>
              )}
            </div>
            <div className={styles.imageName}>
              {news.image ? news.image.split('/').pop() : `${news.title}.jpg`}
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
              <span className={styles.detailValue}>{news._id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tiêu đề:</span>
              <span className={styles.detailValue}>{news.title}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Danh mục ID:</span>
              <span className={styles.detailValue}>{news.categorynews_id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Lượt xem:</span>
              <span className={styles.detailValue}>{news.views || 0}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày tạo:</span>
              <span className={styles.detailValue}>
                {formatDate(news.created_at)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày cập nhật:</span>
              <span className={styles.detailValue}>
                {formatDate(news.updated_at)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.detailSection}>
            <h4 className={styles.sectionTitle}>Nội dung</h4>
            <div className={styles.contentBox}>
              <p className={styles.contentText}>{news.content}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={styles.statusSection}>
          <div className={styles.statusLabel}>Trạng thái tin tức</div>
          <span className={`${styles.statusBadge} ${statusInfo.class}`}>
            {statusInfo.text}
          </span>
        </div>

        {/* Actions */}
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.createButton}
            onClick={handleEdit}
          >
            <Edit size={16} />
            Chỉnh sửa
          </button>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            Xóa tin tức
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;