"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import styles from "../../assets/css/detail.module.css";
import { useAppContext } from "../../../context/AppContext";

interface ICategoryNews {
  _id: string;
  name: string;
  slug?: string;
  status: number;
  created_at: string;
  updated_at: string;
}

const CategoryNewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useAppContext();
  const [category, setCategory] = useState<ICategoryNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = params.id as string;

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add(styles["dark-mode"]);
    } else {
      html.classList.remove(styles["dark-mode"]);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      if (!categoryId) return;

      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/admin/categoryNews/${categoryId}`
        );

        if (!res.ok) {
          throw new Error("Không thể tải thông tin danh mục");
        }

        const data = await res.json();
        console.log("Category Detail:", data);
        setCategory(data.category || data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết danh mục:", err);
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [categoryId]);

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

  const handleEdit = () => {
    // Navigate to edit page or open edit modal
    router.push(`/admin/categories-news-list/edit/${categoryId}`);
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/categoryNews/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Không thể xóa danh mục");
      }

      alert("Xóa danh mục thành công!");
      router.push("/admin/categories-news-list");
    } catch (err) {
      console.error("Lỗi khi xóa danh mục:", err);
      alert("Có lỗi xảy ra khi xóa danh mục");
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Đang tải...</div>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.error}>
            {error || "Không tìm thấy danh mục"}
          </div>
          <button className={styles.returnButton} onClick={handleBack}>
            <ArrowLeft size={16} />
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chi tiết danh mục loại tin</h1>
         <button className={styles.returnButton} onClick={handleBack}>
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      <div className={styles.form}>
        <div className={styles.newDetails}>
          {/* Basic Information */}
          <div className={styles.detailSection}>
            <h2 className={styles.sectionTitle}>Thông tin cơ bản</h2>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID danh mục:</span>
              <span className={styles.detailValue}>{category._id}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tên danh mục:</span>
              <span className={styles.detailValue}>{category.name}</span>
            </div>

           

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày tạo:</span>
              <span className={styles.detailValue}>
                {formatDate(category.created_at)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày cập nhật:</span>
              <span className={styles.detailValue}>
                {formatDate(category.updated_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className={styles.statusSection}>
          <div className={styles.statusLabel}>Trạng thái danh mục</div>
          <span
            className={`${styles.statusBadge} ${
              category.status === 1
                ? styles.statusActive
                : styles.statusInactive
            }`}
          >
            {category.status === 1 ? "Hoạt động" : "Không hoạt động"}
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
            Chỉnh sửa danh mục
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            Xóa danh mục
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryNewsDetailPage;
