"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import styles from "../assets/css/all.module.css";
import { useAppContext } from "../../context/AppContext";
import { INews } from "@/app/(site)/cautrucdata";
import Link from "next/link";
import Image from "next/image";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blogs, setBlogs] = useState<INews[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles["dark-mode"]);
    else html.classList.remove(styles["dark-mode"]);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/news?page=${currentPage}&limit=${limit}`
        );
        const data = await res.json();
        setBlogs(data.list || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu blog:", error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchTitle = blog.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" || String(blog.news_status) === statusFilter;
    return matchTitle && matchStatus;
  });

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const getStatusClass = (status: string) => {
    if (status === "Bản đề xuất") {
      return `${styles.statusBadge} ${styles.statusInStock}`;
    } else if (status === "Bản nháp") {
      return `${styles.statusBadge} ${styles.statusOutOfStock}`;
    }
    return styles.statusBadge;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tin tức</h1>
        <button className={styles.addButton}>
          <Plus size={16} />
          Thêm tin mới
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tiêu đề</label>
            <div style={{ position: "relative" }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm theo tiêu đề..."
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
              <option value="0">Ẩn</option>
              <option value="1">Hiển</option>
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

      {/* Table */}
      <div className={styles.card}>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Danh mục</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật</th>
                <th>Lượt xem</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <tr key={blog._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className={styles.tableCell}>
                    {blog.image ? (
                      <Image
                        src={`/images/images_DATN/product/${blog.image}`}
                        alt={blog.title}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={`/images/images_DATN/logo/logoV.png`}
                        alt={blog.title}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </td>
                  <td className={styles.tableCell} style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                    {blog.title}
                  </td>
                  <td className={styles.tableCell} style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {blog.content}
                  </td>
                

                  <td className={styles.tableCell}>
                    {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ""}
                  </td>
                  <td className={styles.tableCell}>
                    {blog.updated_at ? new Date(blog.updated_at).toLocaleDateString() : ""}
                  </td>
                  <td className={styles.tableCell}>
                    <span className={getStatusClass(String(blog.views))}>
                      {blog.views}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`${styles.statusBadge} ${blog.news_status == 0 ? styles.statusOutOfStock : styles.statusInStock}`}
                    >
                      {blog.news_status == 0 ? 'Ẩn' : 'Hiển'}
                    </span>
                  </td>

                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <Link href={`news/${blog._id}`}>
                        <button className={styles.actionButton}>
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link href={`news/edit/${blog._id}`}>
                        <button className={styles.actionButton}>
                          <Edit size={16} />
                        </button>
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

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {(currentPage - 1) * limit + 1} đến {Math.min(currentPage * limit, total)} trong {total} tin tức
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
                className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ""}`}
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

export default NewsPage;
