"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../assets/css/all.module.css";
import { useAppContext } from "../../context/AppContext";
import { IBrand } from "@/app/(site)/cautrucdata";

const BrandPage = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [totalBrands, setTotalBrands] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle(styles["dark-mode"], isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: limit.toString(),
          search: searchTerm,
          status: statusFilter,
        });

        const res = await fetch(`http://localhost:3000/api/admin/brand?${params}`);
        const data = await res.json();
        setBrands(data.list);
        setTotalBrands(data.total);
      } catch (error) {
        console.error("Lỗi khi fetch brand:", error);
      }
    };

    fetchBrands();
  }, [searchTerm, statusFilter, currentPage]);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalBrands / limit);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Thương hiệu</h1>
        <button className={styles.addButton}>
          <Plus size={16} />
          Thêm thương hiệu
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tên</label>
            <div style={{ position: "relative" }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm thương hiệu"
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
              <option value="all">Tất cả</option>
              <option value="0">Hoạt động</option>
              <option value="1">Dừng hoạt động</option>
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
                <th style={{ width: "50px" }}>STT</th>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Alt</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={brand._id} className={styles.tableRow}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{brand.name}</td>
                  <td className={styles.tableCell}>
                    {brand.image ? (
                      <Image
                        src={`/upload/brand/${brand.image}`}
                        alt={brand.image}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={`/images/images_DATN/logo/logoV.png`}
                        alt={(brand.image || 'avatar') as string}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </td>
                  <td>{brand.alt || "Không có alt"}</td>
                  <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{brand.description || "Không có mô tả"}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        brand.brand_status === 1
                          ? styles.statusActive
                          : styles.statusInactive
                      }`}
                    >
                      {brand.brand_status === 1 ? "Hoạt động" : "Dừng hoạt động"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`brands/${brand._id}`}>
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
              {brands.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Không có dữ liệu phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {(currentPage - 1) * limit + 1} đến{" "}
            {Math.min(currentPage * limit, totalBrands)} trong {totalBrands} thương hiệu
          </div>
          <div className={styles.paginationButtons}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

export default BrandPage;
