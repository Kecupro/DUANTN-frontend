"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import styles from "../assets/css/all.module.css";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
import { ICateNews } from "@/app/(site)/cautrucdata";

const CatenewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [cateblogs, setCateblogs] = useState<ICateNews[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles["dark-mode"]);
    else html.classList.remove(styles["dark-mode"]);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchCateblogs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/categoryNews?page=${currentPage}&limit=${limit}`
        );
        const data = await res.json();
        setCateblogs(data.list || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Lỗi khi tải danh mục loại tin:", err);
      }
    };
    fetchCateblogs();
  }, [currentPage]);

  const filteredCateblogs = cateblogs.filter((cateblog) => {
    const matchName = cateblog.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      cateblog.status === (statusFilter === "1" ? 1 : 0);
    return matchName && matchStatus;
  });

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Danh mục loại tin</h1>
        <button className={styles.addButton}>
          <Plus size={16} /> Thêm loại tin
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tên danh mục</label>
            <div style={{ position: "relative" }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm tên danh mục"
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
              <option value="0">Hoạt động</option>
              <option value="1">Không hoạt động</option>
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
                <th>ID</th>
                <th>Tên danh mục tin tức</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật gần nhất</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCateblogs.map((cateblog, index) => (
                <tr key={cateblog._id} className={styles.tableRow}>
                 <td className={styles.tableCell}>{(currentPage - 1) * limit + index + 1}</td>
                  <td className={styles.tableCell}>{cateblog.name}</td>
                  <td className={styles.tableCell}>{cateblog.created_at
                  ? new Date(cateblog.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
                  : '---'}</td>

                  <td className={styles.tableCell}>{cateblog.updated_at
                  ? new Date(cateblog.updated_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
                  : '---'}</td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${cateblog.status == 0 ? styles.statusInStock : styles.statusOutOfStock}`}>
                      {cateblog.status == 0 ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <Link href={`categories-news-list/${cateblog._id}`}>
                        <button className={styles.actionButton}><Eye size={16} /></button>
                      </Link>
                      <Link href={`categories-news-list/editCateNew/${cateblog._id}`}>
                        <button className={styles.actionButton}><Edit size={16} /></button>
                      </Link>
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
            Hiển thị {(currentPage - 1) * limit + 1}
            &nbsp;đến&nbsp;
            {Math.min(currentPage * limit, total)} trong {total} danh mục tin tức
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
                className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ''}`}
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

export default CatenewsPage;
