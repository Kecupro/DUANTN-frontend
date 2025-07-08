"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import styles from "../assets/css/all.module.css";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
import { IVoucher } from "@/app/(site)/cautrucdata";

const VouchersPage = () => {
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 17;

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles["dark-mode"]);
    else html.classList.remove(styles["dark-mode"]);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/voucher?page=${currentPage}&limit=${limit}`);
        const data = await res.json();
        setVouchers(data.list || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu voucher:", err);
      }
    };
    fetchVouchers();
  }, [currentPage]);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const getStatus = (voucher: IVoucher) => {
    const now = new Date();
    return new Date(voucher.end_date) >= now ? "Còn hạn" : "Hết hạn";
  };

  const formatDiscount = (voucher: IVoucher) =>
    voucher.discount_type === "Giảm tiền"
      ? `${voucher.discount_value.toLocaleString("vi-VN")} đ`
      : `${voucher.discount_value}%`;

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch =
      voucher.voucher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.voucher_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || getStatus(voucher) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mã Khuyến Mãi</h1>
        <button className={styles.addButton}>
          <Plus size={16} />
          Thêm mới
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tìm kiếm</label>
            <div style={{ position: "relative" }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc mã..."
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
              <option value="Còn hạn">Còn hạn</option>
              <option value="Hết hạn">Hết hạn</option>
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
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>STT</th>
                <th>Tên mã</th>
                <th>Mã</th>
                <th>Loại</th>
                <th>Giá trị</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map((voucher, index) => (
                <tr key={voucher._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className={styles.tableCell}>{voucher.voucher_name}</td>
                  <td className={styles.tableCell}>{voucher.voucher_code}</td>
                  <td className={styles.tableCell}>{voucher.discount_type}</td>
                  <td className={styles.tableCell}>{formatDiscount(voucher)}</td>
                  <td className={styles.tableCell}>{voucher.start_date
                  ? new Date(voucher.start_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
                  : '---'}</td>

                  <td className={styles.tableCell}>{voucher.end_date
                  ? new Date(voucher.end_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
                  : '---'}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${
                        getStatus(voucher) === "Còn hạn"
                          ? styles.statusInStock
                          : styles.statusOutOfStock
                      }`}
                    >
                      {getStatus(voucher)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <Link href={`vouchers/${voucher._id}`}>
                        <button className={styles.actionButton}><Eye size={16} /></button>
                      </Link>
                      <button className={styles.actionButton}><Edit size={16} /></button>
                      <button className={styles.actionButton}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVouchers.length === 0 && (
                <tr>
                  <td colSpan={9} className={styles.tableCell}>
                    Không có mã khuyến mãi nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {filteredVouchers.length > 0 ? (currentPage - 1) * limit + 1 : 0}
            &nbsp;đến&nbsp;
            {(currentPage - 1) * limit + filteredVouchers.length} trong {total} voucher
          </div>
          <div className={styles.paginationButtons}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={styles.paginationButton}
            >
              &laquo;
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${
                  currentPage === page ? styles.paginationButtonActive : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={styles.paginationButton}
            >
              &raquo;
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              className={styles.paginationButton}
            >
              Trang cuối
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VouchersPage;
