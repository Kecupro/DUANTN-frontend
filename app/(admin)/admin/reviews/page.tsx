'use client';
import React, { useEffect, useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import styles from '../assets/css/all.module.css';
import { useAppContext } from '../../context/AppContext';
import { IReview } from '@/app/(site)/cautrucdata';

const RatingPage = () => {
  const { isDarkMode } = useAppContext();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    document.documentElement.classList.toggle(styles['dark-mode'], isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin/review?page=${currentPage}&limit=${limit}`);
        const data = await res.json();
        setReviews(data.list);
        setTotalReviews(data.total);
      } catch (error) {
        console.error('Lỗi khi tải đánh giá:', error);
      }
    };
    fetchReviews();
  }, [currentPage]);

  const handleReset = () => {
    setSearchTerm('');
    setRatingFilter('all');
    setCurrentPage(1);
  };

  const renderStars = (rating: number) => (
    <div className={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className={star <= rating ? styles.starFilled : styles.starEmpty} />
      ))}
    </div>
  );

  const filteredRatings = reviews.filter((review) => {
    const matchesSearch = (review.comment || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const totalPages = Math.ceil(totalReviews / limit);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Đánh giá</h1>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Tìm kiếm</label>
            <div style={{ position: 'relative' }}>
              <Search className={styles.searchIcon} size={16} />
              <input
                type="text"
                placeholder="Tìm theo bình luận..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterGroupFixed}>
            <label className={styles.label}>Đánh giá</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Tất cả sao</option>
              {[5, 4, 3, 2, 1].map((rate) => (
                <option key={rate} value={rate.toString()}>{rate} sao</option>
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

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>STT</th>
                <th className={styles.tableHeaderCell}>Sản phẩm</th>
                <th className={styles.tableHeaderCell}>Khách hàng</th>
                <th className={styles.tableHeaderCell}>Sao</th>
                <th className={styles.tableHeaderCell}>Bình luận</th>
                <th className={styles.tableHeaderCell}>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {filteredRatings.map((review, index) => (
                <tr key={review._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className={styles.tableCell} style={{ maxWidth: "200px", wordBreak: "break-word" }}>{review.order_detail_id.product_id.name}</td>
                  <td className={styles.tableCell}>{review.user?.username || 'Ẩn danh'}</td>
                  <td className={styles.tableCell}>{renderStars(review.rating)}</td>
                  <td className={styles.tableCell} style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                    <div className={styles.commentText} title={review.comment || ''}>
                      {review.comment || 'Không có bình luận'}
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    {review.created_at
                      ? new Date(review.created_at).toLocaleString('vi-VN')
                      : ''}
                  </td>
                </tr>
              ))}
              {filteredRatings.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.tableCell}>Không có đánh giá phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Hiển thị {filteredRatings.length} trong tổng {totalReviews} đánh giá
          </div>
          <div className={styles.paginationButtons}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${
                  currentPage === page ? styles.paginationButtonActive : styles.paginationButtonInactive
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

export default RatingPage;
