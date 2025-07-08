"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import styles from "../assets/css/all.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import { IProduct, ICategory } from "@/app/(site)/cautrucdata";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  // ! Cate
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<ICategory[]>([]);

  const limit = 7;
  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles["dark-mode"]);
    else html.classList.remove(styles["dark-mode"]);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/product?page=${currentPage}&limit=${limit}`
        );
        const data = await res.json();
        setProducts(data.list || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const filteredProducts = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "Còn hàng" && product.quantity != 0) ||
      (statusFilter === "Hết hàng" && product.quantity == 0);
    return matchName && matchStatus;
  });

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/admin/categoryProduct`);
          const data = await res.json();
          setCategories(data.list || []);
        } catch (err) {
          console.error('Lỗi khi tải danh mục:', err);
        }
      };
  
      fetchCategories();
    },);
  
    const uniqueCategories = [...new Set(categories.map((c) => c.name))];

  const formatCurrency = (num: number) => {
    return num.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  const handleReset = () => {
    setSearchTerm("");
    setBrandFilter("all");
    setStatusFilter("all");
  };

  const totalPages = Math.ceil(total / limit);
  const maxPagesToShow = 5;
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Sản phẩm</h1>
        <button className={styles.addButton}>
          <Plus size={16} />
          Thêm sản phẩm
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tên</label>
            <div style={{ position: "relative" }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
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
            <label className={styles.label}>Thương hiệu</label>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Tất cả thương hiệu</option>
              <option value="6831eb9c5c1a8be3463e4603">Breguet</option>
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
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
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
                <th>Tên</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Giảm Giá</th>
                <th>Số lượng</th>
                <th>Lượt xem</th>
                <th>Thương hiệu</th>
                <th>Danh mục</th>
                <th>Đã bán</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{(currentPage - 1) * limit + index + 1}</td>
                  <td className={styles.tableCell}>{product.name}</td>
                  <td className={styles.tableCell}>
                    {product.mainImage ? (
                      <Image
                        src={`/images/images_DATN/product/${product.mainImage}`}
                        alt={product.name}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      "null"
                    )}
                  </td>
                  <td className={styles.tableCell}>{formatCurrency(product.price)}</td>
                  <td className={styles.tableCell}>{formatCurrency(product.sale_price)}</td>
                  <td className={styles.tableCell}>{product.quantity}</td>
                  <td className={styles.tableCell}>{product.views}</td>
                  <td className={styles.tableCell}>
                    {typeof product.brand_id === "object" && "name" in product.brand_id
                      ? product.brand_id.name
                      : "null"}
                  </td>
                  <td>
                    {Array.isArray(product.categories) && product.categories.length > 0
                      ? product.categories.map((c) => c.name).join(', ')
                      : 'null'}
                  </td>
                  <td>{product.sold ?? 0}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${product.quantity == 0 ? styles.statusOutOfStock : styles.statusInStock}`}
                    >
                      {product.quantity == 0 ? 'Hết hàng' : 'Còn hàng'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`products/${product._id}`}>
                        <button className={styles.actionButton}><Eye size={16} /></button>
                      </Link>
                      <Link href={`products/edit`}>
                        <button className={styles.actionButton}><Edit size={16} /></button>
                      </Link>
                      <Link href={`products/delete/${product._id}`}>
                        <button className={styles.actionButton}><Trash2 size={16} /></button>
                      </Link>
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
            {Math.min(currentPage * limit, total)} trong {total} sản phẩm
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

export default ProductsPage;
