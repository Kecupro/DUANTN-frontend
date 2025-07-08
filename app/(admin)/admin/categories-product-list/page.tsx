'use client';
import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import styles from '../assets/css/all.module.css';
import { useAppContext } from '../../context/AppContext';
import { ICategory } from '@/app/(site)/cautrucdata';
import Link from 'next/link';

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 9;

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add(styles['dark-mode']);
    } else {
      html.classList.remove(styles['dark-mode']);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/categoryProduct?page=${currentPage}&limit=${limit}`);
        const data = await res.json();
        setCategories(data.list || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error('Lỗi khi tải danh mục:', err);
      }
    };

    fetchCategories();
  }, [currentPage]);

  const uniqueCategories = [...new Set(categories.map((c) => c.name))];

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || category.name === categoryFilter;
    const matchesStatus = statusFilter === 'all' || String(category.category_status) === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Danh mục sản phẩm</h1>
        <button className={styles.addButton}>
          <Plus size={16} /> Thêm danh mục
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tên</label>
            <div style={{ position: 'relative' }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm tên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterGroupFixed}>
            <label className={styles.label}>Danh mục</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Tất cả danh mục</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroupFixed}>
            <label className={styles.label}>Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="1"> Dừng hoạt động</option>
              <option value="0">Hoạt động</option>
            </select>
          </div>

          <button className={styles.filterButton}>
            <Filter size={16} /> Bộ lọc
          </button>

          <button className={styles.resetButton} onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>STT</th>
                <th className={styles.tableHeaderCell}>Ảnh</th>
                <th className={styles.tableHeaderCell}>Alt (tên sẽ hiện nếu ảnh lỗi)</th>
                <th className={styles.tableHeaderCell}>Trạng thái</th>
                <th className={styles.tableHeaderCell}>Ngày tạo</th>
                <th className={styles.tableHeaderCell}>Ngày cập nhật gần nhất</th>
                <th className={styles.tableHeaderCell}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category: ICategory, index) => (
                <tr key={category._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{(currentPage - 1) * limit + index + 1}</td>
                  <td className={styles.tableCell}>
                    <Image style={{margin: "0 auto"}}
                      src={
                        category.image?.startsWith('http')
                          ? category.image
                          : `/images/images_DATN/category/${category.image || 'no-image.png'}`
                      }
                      alt={category.alt || category.name}
                      width={60}
                      height={60}
                      className={styles.brandImage}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.brandName}>{category.name}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${category.category_status == 0 ? styles.statusActive : styles.statusInactive}`}
                    >
                      {category.category_status == 0 ? 'Hoạt động' : 'Dừng hoạt động'}
                    </span>
                  </td>

                  <td className={styles.tableCell}>{category.created_at
                  ? new Date(category.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
                  : '---'}</td>

                  <td className={styles.tableCell}>{category.updated_at
                  ? new Date(category.updated_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
                  : '---'}</td>

                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <Link href={`categories-product-list/editCatePro`}>
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

        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {(currentPage - 1) * limit + 1}
            &nbsp;đến&nbsp;
            {Math.min(currentPage * limit, total)} trong {total} danh mục sản phẩm
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

export default CategoryPage;
