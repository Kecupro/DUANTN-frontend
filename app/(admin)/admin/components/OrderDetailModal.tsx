// OrderDetailModal.tsx
"use client";
import React from "react";
// import { X } from "lucide-react";
import styles from "../assets/css/detail.module.css";

interface Order {
  id: number;
  orderCode: string;
  buyer: string;
  address: string;
  paymentMethod: string;
  voucherCode?: string;
  note?: string;
  shippingFee: number;
  purchaseDate: string;
  updatedDate: string;
  discountAmount: number;
  totalAmount: number;
  orderStatus: "Đã giao" | "Đang xử lý" | "Đang giao" | "Đã hủy";
}

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ 
  order, 
  onClose, 
}) => {
  if (!order) return null;

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

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <main className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Chi tiết đơn hàng</h1>
            <button className={styles.returnButton} onClick={onClose}>
              Đóng
            </button>
          </div>

          <div className={styles.form}>
       
            {/* Order Details */}
            <div className={styles.productDetails}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID:</span>
                  <span className={styles.detailValue}>{order.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Mã đơn hàng:</span>
                  <span className={styles.detailValue}>{order.orderCode}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Người mua:</span>
                  <span className={styles.detailValue}>{order.buyer}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Địa chỉ:</span>
                  <span className={styles.detailValue}>{order.address}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Phương thức thanh toán:</span>
                  <span className={styles.detailValue}>{order.paymentMethod}</span>
                </div>
                {order.voucherCode && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Mã giảm giá:</span>
                    <span className={styles.detailValue}>{order.voucherCode}</span>
                  </div>
                )}
                {order.note && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Ghi chú:</span>
                    <span className={styles.detailValue}>{order.note}</span>
                  </div>
                )}
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Phí vận chuyển:</span>
                  <span className={styles.detailValue}>
                    {formatCurrency(order.shippingFee)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày mua:</span>
                  <span className={styles.detailValue}>
                    {formatDate(order.purchaseDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày cập nhật:</span>
                  <span className={styles.detailValue}>
                    {formatDate(order.updatedDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Số tiền giảm giá:</span>
                  <span className={styles.detailValue}>
                    {formatCurrency(order.discountAmount)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Tổng tiền:</span>
                  <span className={styles.detailValue}>
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
             
            </div>

            {/* Status */}
            <div className={styles.statusSection}>
              <div className={styles.statusLabel}>Trạng thái đơn hàng</div>
              <span
                className={`${styles.statusBadge} ${
                  order.orderStatus === "Đã giao"
                    ? styles.statusActive
                    : styles.statusInactive
                }`}
              >
                {order.orderStatus}
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
                Xóa đơn hàng
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetailModal;