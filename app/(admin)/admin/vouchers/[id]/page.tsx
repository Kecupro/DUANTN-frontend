"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Tag,
  Percent,
  DollarSign,
} from "lucide-react";
import styles from "../../assets/css/detail.module.css";
import { useAppContext } from "../../../context/AppContext";
import { IVoucher } from "@/app/(site)/cautrucdata";

const VoucherDetailPage = () => {
  const [voucher, setVoucher] = useState<IVoucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add(styles["dark-mode"]);
    } else {
      html.classList.remove(styles["dark-mode"]);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchVoucherDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/admin/voucher/${params.id}`
        );

        if (!res.ok) {
          throw new Error("Không thể tải thông tin voucher");
        }

        const data = await res.json();
        setVoucher(data.voucher);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết voucher:", err);
        setError("Không thể tải thông tin voucher");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchVoucherDetail();
    }
  }, [params.id]);

  // Format date function
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format discount value
  const formatDiscountValue = (type: string, value: number) => {
    if (type === "Phần trăm" || type === "percentage") {
      return `${value}%`;
    } else {
      return formatCurrency(value);
    }
  };

  // Get status
  const getStatus = (voucher: IVoucher) => {
    const now = new Date();
    const endDate = new Date(voucher.end_date);
    const startDate = new Date(voucher.start_date);

    if (now < startDate) {
      return { text: "Chưa bắt đầu", class: "statusPending" };
    } else if (now > endDate) {
      return { text: "Hết hạn", class: "statusExpired" };
    } else {
      return { text: "Còn hạn", class: "statusActive" };
    }
  };

  // Handle edit
  const handleEdit = () => {
    router.push(`/admin/vouchers/edit/${params.id}`);
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã khuyến mãi này?")) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/voucher/${params.id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          alert("Xóa mã khuyến mãi thành công!");
          router.push("/admin/vouchers");
        } else {
          alert("Có lỗi xảy ra khi xóa mã khuyến mãi");
        }
      } catch (err) {
        console.error("Lỗi khi xóa voucher:", err);
        alert("Có lỗi xảy ra khi xóa mã khuyến mãi");
      }
    }
  };

  const handleBack = () => {
    router.push("/admin/vouchers");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  if (error || !voucher) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error || "Không tìm thấy voucher"}</p>
          <button onClick={handleBack} className={styles.returnButton}>
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const voucherStatus = getStatus(voucher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chi tiết mã khuyến mãi</h1>

        <button className={styles.returnButton} onClick={handleBack}>
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      <div className={styles.form}>
        {/* Voucher Details */}
        <div className={styles.productDetails} style={{ display: "grid", gap: "100", gridTemplateColumns: "repeat(2, 1fr)" }}>
          {/* Basic Information */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <Tag size={18} />
              Thông tin cơ bản
            </h3>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID:</span>
              <span className={styles.detailValue}>{voucher._id}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Tên mã khuyến mãi:</span>
              <span className={styles.detailValue}>{voucher.voucher_name}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Mã khuyến mãi:</span>
              <span className={styles.detailValue}>
                <code className={styles.voucherCode}>
                  {voucher.voucher_code}
                </code>
              </span>
            </div>
          </div>

          {/* Discount Information */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <Percent size={18} />
              Thông tin giảm giá
            </h3>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Loại giảm giá:</span>
              <span className={styles.detailValue}>
                {voucher.discount_type}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Giá trị giảm giá:</span>
              <span className={styles.detailValue}>
                {formatDiscountValue(
                  voucher.discount_type,
                  voucher.discount_value
                )}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                Giá trị tối thiểu đơn hàng:
              </span>
              <span className={styles.detailValue}>
                {formatCurrency(voucher.minimum_order_value)}
              </span>
            </div>

            {voucher.max_discount && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Giảm giá tối đa:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(voucher.max_discount)}
                </span>
              </div>
            )}
          </div>

          {/* Date Information */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>
              <Calendar size={18} />
              Thời gian hiệu lực
            </h3>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày bắt đầu:</span>
              <span className={styles.detailValue}>
                {formatDate(voucher.start_date)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày hết hạn:</span>
              <span className={styles.detailValue}>
                {formatDate(voucher.end_date)}
              </span>
            </div>
          </div>

          {/* System Information */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>Thông tin hệ thống</h3>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày tạo:</span>
              <span className={styles.detailValue}>
                {formatDate(voucher.created_at)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày cập nhật:</span>
              <span className={styles.detailValue}>
                {formatDate(voucher.updated_at)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Trạng thái hệ thống:</span>
              <span className={styles.detailValue}>
                {voucher.status === 1 ? "Hoạt động" : "Không hoạt động"}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={styles.statusSection}>
          <div className={styles.statusLabel}>Trạng thái mã khuyến mãi</div>
          <span
            className={`${styles.statusBadge} ${styles[voucherStatus.class]}`}
          >
            {voucherStatus.text}
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
            Xóa mã khuyến mãi
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetailPage;
