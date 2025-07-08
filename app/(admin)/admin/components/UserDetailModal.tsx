// UserDetailModal.tsx
"use client";
import React from "react";
// import { X } from "lucide-react";
import styles from "../assets/css/detail.module.css";

interface User {
  id: number;
  avatar: string;
  username: string;
  password: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
  createdDate: string;
  updatedDate: string;
}

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  if (!user) return null;

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
        style={{ width: "470px" }}
      >
        <main className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Chi tiết người dùng</h1>
            <button className={styles.returnButton} onClick={onClose}>
              Đóng
            </button>
          </div>

          <div className={styles.form}>
            {/* User Details */}
            <div className={styles.productDetails}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                {/* Avatar Section */}
                <div className={styles.detailSection} >
                  <div className={styles.detailRow}>
                    <div className={styles.detailValue}>
                      <img
                        src={user.avatar}
                        alt="Avatar người dùng"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "100%",
                          objectFit: "cover",
                          marginLeft: "60px",
                        }}
                      />
                      <div className={styles.detailRow}>
                        <span className={styles.detailValue}style={{
                          marginLeft: "115px",
                        }}
                        >{user.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID:</span>
                  <span className={styles.detailValue}>{user.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Tên người dùng:</span>
                  <span className={styles.detailValue}>{user.username}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Mật khẩu:</span>
                  <span className={styles.detailValue}>
                    {"*".repeat(user.password.length)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Email:</span>
                  <span className={styles.detailValue}>{user.email}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Địa chỉ:</span>
                  <span className={styles.detailValue}>{user.address}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Số điện thoại:</span>
                  <span className={styles.detailValue}>{user.phoneNumber}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày tạo:</span>
                  <span className={styles.detailValue}>
                    {formatDate(user.createdDate)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Ngày cập nhật:</span>
                  <span className={styles.detailValue}>
                    {formatDate(user.updatedDate)}
                  </span>
                </div>
              </div>
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

export default UserDetailModal;
