'use client';
import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import styles from '../assets/css/all.module.css';
import { useAppContext } from '../../context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import { IUser } from '@/app/(site)/cautrucdata';

const UsersPage = () => {
  const { isDarkMode } = useAppContext();
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    document.documentElement.classList.toggle(styles['dark-mode'], isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/user?page=${currentPage}&limit=${limit}`);
        const data = await res.json();
        setUsers(data.list);
        setTotalUsers(data.total);
      } catch (error) {
        console.error('Lỗi khi tải người dùng:', error);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleReset = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleText = user.role === 1 ? 'Quản trị viên' : 'Người dùng';
    const matchesRole = roleFilter === 'all' || roleFilter === roleText;
    return matchesSearch && matchesRole;
  });

  const renderRole = (role: number) => {
    return role === 1 ? 'Quản trị viên' : 'Người dùng';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Người dùng</h1>
        <button className={styles.addButton}>
          <Plus size={16} />
          Thêm người dùng
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tìm kiếm</label>
            <div style={{ position: 'relative' }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterGroupFixed}>
            <label className={styles.label}>Vai trò</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Quản trị viên">Quản trị viên</option>
              <option value="Người dùng">Người dùng</option>
            </select>
          </div>

          <button className={styles.filterButton}>
            <Filter size={16} />
            Bộ lọc
          </button>

          <button className={styles.resetButton} onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Ảnh đại diện</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className={styles.tableCell}>{(currentPage - 1) * limit + index + 1}</td>
                  <td className={styles.tableCell}>
                    {user.addresses?.[0]?.receiver_name ?? 'Không rõ'}
                  </td>
                  <td className={styles.tableCell}>
                    {user.avatar ? (
                      <Image
                        src={`/images/images_DATN/product/${user.avatar}`}
                        alt={user.avatar}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={`/images/images_DATN/logo/logoV.png`}
                        alt={(user.avatar || 'avatar') as string}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </td>
                  <td className={styles.tableCell}>{user.username}</td>
                  <td className={styles.tableCell}>{user.email}</td>
                  <td className={styles.tableCell}>{user.account_status == 0 ? 'Đang hoạt động' : 'Bị khóa'}</td>
                  <td className={styles.tableCell}>{renderRole(user.role)}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <Link href={`users/${user._id}`}>
                        <button className={styles.actionButton}>
                          <Eye size={16} />
                        </button>
                      </Link>
                      <button className={styles.actionButton}>
                        <Edit size={16} />
                      </button>
                      <button className={styles.actionButton}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {filteredUsers.length} trên {totalUsers} người dùng
          </div>
          <div className={styles.paginationButtons}>
            {Array.from({ length: Math.ceil(totalUsers / limit) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${
                  page === currentPage ? styles.paginationButtonActive : styles.paginationButtonInactive
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
