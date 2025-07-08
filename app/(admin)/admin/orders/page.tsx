'use client';
import React, { useEffect, useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import styles from '../assets/css/all.module.css';
import { useAppContext } from '../../context/AppContext';
import { IOrder } from '@/app/(site)/cautrucdata';
import Link from 'next/link';

const OrdersPage = ({ isSidebarCollapsed = false }) => {
  const { isDarkMode } = useAppContext();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const statusOptions = ['Đã giao hàng', 'Chờ xác nhận', 'Đã hủy', 'Đang vận chuyển'];

  useEffect(() => {
    document.documentElement.classList.toggle(styles['dark-mode'], isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/order?page=${currentPage}&limit=${limit}`);
        const data = await res.json();
        setOrders(data.list);
        setTotalOrders(data.total);
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const mapStatus = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đang vận chuyển';
      case 'shipped':
        return 'Đã giao hàng';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không rõ';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || mapStatus(order.order_status || '') === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className={`${styles.container} ${isSidebarCollapsed ? styles.containerExpanded : ''}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Đơn hàng</h1>
      </div>

      <div className={`${styles.filters} ${isSidebarCollapsed ? styles.filtersExpanded : ''}`}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tìm kiếm</label>
            <div style={{ position: 'relative' }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm theo mã đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterGroupFixed}>
            <label className={styles.label}>Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Tất cả trạng thái</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
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

      <div className={`${styles.card} ${isSidebarCollapsed ? styles.cardExpanded : ''}`}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>STT</th>
                <th className={styles.tableHeaderCell}>Khách hàng</th>
                <th className={styles.tableHeaderCell}>Số điện thoại</th>
                <th className={styles.tableHeaderCell}>Địa chỉ</th>
                <th className={styles.tableHeaderCell}>Voucher</th>
                <th className={styles.tableHeaderCell}>Giảm giá</th>
                <th className={styles.tableHeaderCell}>Phương thức</th>
                <th className={styles.tableHeaderCell}>Phí ship</th>
                <th className={styles.tableHeaderCell}>Tổng</th>
                <th className={styles.tableHeaderCell}>Ghi chú</th>
                <th className={styles.tableHeaderCell}>Ngày mua</th>
                <th className={styles.tableHeaderCell}>Trạng thái</th>
                <th className={styles.tableHeaderCell}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{(currentPage - 1) * limit + index + 1}</td>
                  <td className={styles.tableCell}>
                    {typeof order.user_id === 'string'
                      ? order.user_id
                      : order.user_id?.addresses?.[0]?.receiver_name ?? 'Không rõ'}
                  
                  </td>
                  <td className={styles.tableCell}>
                    {typeof order.user_id === 'string'
                      ? order.user_id
                      : order.user_id?.addresses?.[0]?.phone ?? 'Không rõ'}
                  </td>

                  <td className={styles.tableCell} style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {typeof order.user_id === 'string'
                      ? order.user_id
                      : order.user_id?.addresses?.[0]?.address ?? 'Không rõ'}
                  </td>

                  <td className={styles.tableCell}>
                    {typeof order.voucher_id === 'string'
                      ? order.voucher_id
                      : order.voucher_id?.voucher_name ?? 'Không rõ'}
                  </td>

                  <td className={styles.tableCell}>
                    {typeof order.voucher_id === 'string'
                      ? order.voucher_id
                      : order.voucher_id
                        ? order.voucher_id.discount_type === 'percentage'
                          ? `${order.voucher_id.discount_value}%`
                          : `${order.voucher_id.discount_value.toLocaleString('vi-VN')} đ`
                        : 'Không rõ'}
                  </td>

                  <td className={styles.tableCell}>
                    {typeof order.payment_method_id === 'string'
                      ? order.payment_method_id
                      : order.payment_method_id?.name ?? 'Không rõ'}
                  </td>

                  <td className={styles.tableCell}>
                    {order.shipping_fee?.toLocaleString('vi-VN') ?? '0'}đ
                  </td>
                  <td className={styles.tableCell}>
                    {order.total_amount?.toLocaleString('vi-VN') ?? '0'}đ 
                  </td>
                  <td className={styles.tableCell} style={{ maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{order.note ?? 'Không có ghi chú'}</td>
                  <td className={styles.tableCell}>
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString('vi-VN')
                      : 'Không rõ'}
                  </td>
                  <td className={styles.tableCell}>{mapStatus(order.order_status || '')}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`products/${order._id}`}>
                        <button className={styles.actionButton}><Eye size={16} /></button>
                      </Link>
                      <Link href={`products/edit`}>
                        <button className={styles.actionButton}><Edit size={16} /></button>
                      </Link>
                      <Link href={`products/delete/${order._id}`}>
                        <button className={styles.actionButton}><Trash2 size={16} /></button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={12} style={{ textAlign: 'center', padding: '12px' }}>
                    Không có đơn hàng nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {filteredOrders.length > 0 ? (currentPage - 1) * limit + 1 : 0} đến{' '}
            {(currentPage - 1) * limit + filteredOrders.length} trong tổng {totalOrders} đơn hàng
          </div>
          <div className={styles.paginationButtons}>
            {Array.from({ length: Math.ceil(totalOrders / limit) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${
                  page === currentPage
                    ? styles.paginationButtonActive
                    : styles.paginationButtonInactive
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

export default OrdersPage;
