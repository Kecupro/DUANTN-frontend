'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, User, Mail, MapPin, Calendar, Shield, Eye } from 'lucide-react';
import styles from '../../assets/css/detail.module.css';
import { useAppContext } from '../../../context/AppContext';

interface Address {
  _id: string;
  address_line: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface UserDetail {
  _id: string;
  username: string;
  email: string;
  role: 0 | 1 | 2;
  account_status: 0 | 1;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  addresses?: Address[];
}

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { isDarkMode } = useAppContext();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add(styles['dark-mode']);
    } else {
      html.classList.remove(styles['dark-mode']);
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (id) {
      fetchUserDetail();
    }
  }, [id]);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API để lấy chi tiết user
      const response = await fetch(`/api/admin/user/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setUser(data.data);
      } else {
        setError(data.message || 'Không thể tải thông tin người dùng');
      }
    } catch (error) {
      console.error('Lỗi khi tải chi tiết người dùng:', error);
      setError('Lỗi kết nối, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/user/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success) {
        alert('Xóa người dùng thành công');
        router.push('/admin/users');
      } else {
        alert(data.message || 'Có lỗi xảy ra khi xóa người dùng');
      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
      alert('Lỗi kết nối, vui lòng thử lại');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleText = (role: 0 | 1 | 2) => {
    switch (role) {
      case 0: return 'Khách hàng';
      case 1: return 'Người dùng';
      case 2: return 'Quản trị viên';
      default: return 'Không xác định';
    }
  };

  const getStatusText = (status: 0 | 1) => {
    return status === 1 ? 'Đang hoạt động' : 'Bị khóa';
  };

  const getStatusColor = (status: 0 | 1) => {
    return status === 1 ? '#22c55e' : '#ef4444';
  };

  const getAvatarSrc = (avatar: string | null) => {
    if (!avatar) return '/default-avatar.png';
    // Nếu avatar là URL đầy đủ thì dùng trực tiếp
    if (avatar.startsWith('http')) return avatar;
    // Nếu là path thì thêm domain
    return avatar.startsWith('/') ? avatar : `/${avatar}`;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error || 'Không tìm thấy người dùng'}</p>
          <button 
            onClick={() => router.push('/admin/users')}
            className={styles.returnButton}
          >
            <ArrowLeft size={16} />
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            onClick={() => router.push('/admin/users')}
            className={styles.backButton}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className={styles.title}>Chi tiết người dùng</h1>
        </div>
        <div className={styles.headerActions}>
          <button 
            onClick={() => router.push(`/admin/users/${id}/edit`)}
            className={styles.editButton}
          >
            <Edit size={16} />
            Chỉnh sửa
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className={styles.deleteButton}
          >
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* User Avatar & Basic Info */}
        <div className={styles.card}>
          <div className={styles.userProfile}>
            <div className={styles.avatarSection}>
              <img
                src={getAvatarSrc(user.avatar)}
                alt={`Avatar của ${user.username}`}
                className={styles.avatar}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default-avatar.png';
                }}
              />
              <div className={styles.userBasicInfo}>
                <h2 className={styles.username}>{user.username}</h2>
                <p className={styles.email}>{user.email}</p>
                <div className={styles.statusBadges}>
                  <span 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(user.account_status) }}
                  >
                    {getStatusText(user.account_status)}
                  </span>
                  <span className={styles.roleBadge}>
                    {getRoleText(user.role)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>
            <User size={20} />
            Thông tin chi tiết
          </h3>
          <div className={styles.detailGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <User size={16} />
                ID người dùng:
              </span>
              <span className={styles.detailValue}>{user._id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Mail size={16} />
                Tên đăng nhập:
              </span>
              <span className={styles.detailValue}>{user.username}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Mail size={16} />
                Email:
              </span>
              <span className={styles.detailValue}>{user.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Shield size={16} />
                Vai trò:
              </span>
              <span className={styles.detailValue}>{getRoleText(user.role)}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Eye size={16} />
                Trạng thái tài khoản:
              </span>
              <span 
                className={styles.detailValue}
                style={{ color: getStatusColor(user.account_status) }}
              >
                {getStatusText(user.account_status)}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Calendar size={16} />
                Ngày tạo:
              </span>
              <span className={styles.detailValue}>{formatDate(user.created_at)}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Calendar size={16} />
                Cập nhật lần cuối:
              </span>
              <span className={styles.detailValue}>{formatDate(user.updated_at)}</span>
            </div>
          </div>
        </div>

        {/* Addresses */}
        {user.addresses && user.addresses.length > 0 && (
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>
              <MapPin size={20} />
              Địa chỉ ({user.addresses.length})
            </h3>
            <div className={styles.addressList}>
              {user.addresses.map((address, index) => (
                <div key={address._id} className={styles.addressItem}>
                  <div className={styles.addressHeader}>
                    <span className={styles.addressIndex}>Địa chỉ {index + 1}</span>
                    {address.is_default && (
                      <span className={styles.defaultBadge}>Mặc định</span>
                    )}
                  </div>
                  <div className={styles.addressContent}>
                    <p>{address.address_line}</p>
                    <p>{address.city}, {address.province}</p>
                    <p>{address.postal_code}, {address.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state for addresses */}
        {(!user.addresses || user.addresses.length === 0) && (
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>
              <MapPin size={20} />
              Địa chỉ
            </h3>
            <div className={styles.emptyState}>
              <p>Người dùng chưa có địa chỉ nào.</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa người dùng <strong>{user.username}</strong>?</p>
            <p className={styles.warningText}>Hành động này không thể hoàn tác!</p>
            <div className={styles.modalActions}>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className={styles.cancelButton}
              >
                Hủy
              </button>
              <button 
                onClick={handleDelete}
                className={styles.confirmDeleteButton}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;