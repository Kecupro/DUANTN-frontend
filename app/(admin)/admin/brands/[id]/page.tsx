// app/admin/brand/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import styles from "../../assets/css/detail.module.css";
import { useAppContext } from "../../../context/AppContext";

interface IBrand {
  _id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  brand_status: number;
  created_at: string;
  updated_at: string;
}

const BrandDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useAppContext();
  const [brand, setBrand] = useState<IBrand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles["dark-mode"]);
    else html.classList.remove(styles["dark-mode"]);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchBrandDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching brand with ID:", params.id);
        const res = await fetch(
          `http://localhost:3000/api/admin/brand/${params.id}`
        );

        console.log("Response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", errorText);
          throw new Error(
            `Không thể tải thông tin thương hiệu (${res.status}): ${errorText}`
          );
        }

        const data = await res.json();
        console.log("Brand data received:", data);

        setBrand(data);
        setImageError(false); // Reset image error when new data is loaded
      } catch (error) {
        console.error("Lỗi khi fetch brand detail:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Không thể tải thông tin thương hiệu"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      console.log("Params ID:", params.id);
      fetchBrandDetail();
    } else {
      console.log("No params ID found");
      setError("Không tìm thấy ID thương hiệu");
      setLoading(false);
    }
  }, [params.id]);

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

  // Get proper image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;

    // If it's already a full URL (starts with http/https)
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it starts with '/', use as is
    if (imagePath.startsWith("/")) {
      return imagePath;
    }

    // Otherwise, prepend with '/'
    return `/${imagePath}`;
  };

  const handleEdit = () => {
    router.push(`/admin/brand/edit/${params.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/brand/${params.id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          alert("Xóa thương hiệu thành công");
          router.push("/admin/brand");
        } else {
          alert("Có lỗi xảy ra khi xóa thương hiệu");
        }
      } catch (error) {
        console.error("Lỗi khi xóa brand:", error);
        alert("Có lỗi xảy ra khi xóa thương hiệu");
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "red" }}>
            {error || "Không tìm thấy thương hiệu"}
          </p>
          <button onClick={handleBack} className={styles.returnButton}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(brand.image);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chi tiết thương hiệu</h1>
        <button className={styles.returnButton} onClick={handleBack}>
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      <div className={styles.form}>
        {/* Brand Details */}
        <div className={styles.productDetails} style={{display: "grid",gridTemplateColumns: "none",gap: "none"}}>
          {/* Image Section */}
          <div className={styles.detailSection}>
            <div className={styles.detailRow}>
              <div className={styles.detailValue}>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  {imageUrl && !imageError ? (
                    <Image
                      src={imageUrl}
                      alt={brand.alt || brand.name}
                      width={200}
                      height={200}
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                      }}
                      onError={handleImageError}
                      priority
                    />
                  ) : (
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                        color: "#666",
                        fontSize: "14px",
                        margin: "0 auto",
                      }}
                    >
                      {imageError ? "Lỗi tải ảnh" : "Không có ảnh"}
                    </div>
                  )}
                </div>
                {/* Status Badge */}
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor:
                        brand.brand_status === 1 ? "#10b981" : "#ef4444",
                      color: "white",
                    }}
                  >
                    {brand.brand_status === 1 ? "Hoạt động" : "Dừng hoạt động"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className={styles.detailSection}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID:</span>
              <span className={styles.detailValue}>{brand._id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Mô tả:</span>
              <span className={styles.detailValue}>
                {brand.description || "Không có mô tả"}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tên thương hiệu:</span>
              <span className={styles.detailValue}>{brand.name}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Đường dẫn ảnh:</span>
              <span
                className={styles.detailValue}
                style={{ wordBreak: "break-all" }}
              >
                {brand.image || "Không có"}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Alt text:</span>
              <span className={styles.detailValue}>
                {brand.alt || "Không có"}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Trạng thái:</span>
              <span className={styles.detailValue}>
                {brand.brand_status === 1
                  ? "Hoạt động (1)"
                  : "Dừng hoạt động (0)"}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày tạo:</span>
              <span className={styles.detailValue}>
                {formatDate(brand.created_at)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày cập nhật:</span>
              <span className={styles.detailValue}>
                {formatDate(brand.updated_at)}
              </span>
            </div>
          </div>
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
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDetailPage;
