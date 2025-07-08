"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "../../assets/css/detail.module.css";
import { useAppContext } from '../../../context/AppContext';
import { IProduct } from '@/app/(site)/cautrucdata';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useAppContext();

  const productId = params.id as string;

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) html.classList.add(styles['dark-mode']);
    else html.classList.remove(styles['dark-mode']);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!productId) {
          setError("ID sản phẩm không hợp lệ");
          return;
        }

        // Gọi API để lấy chi tiết sản phẩm
        const response = await fetch(`http://localhost:3000/api/admin/product/${product._id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError(data.message || "Không tìm thấy sản phẩm");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Có lỗi xảy ra khi tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleGoBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (product) {
      router.push(`/admin/products/edit/${product._id}`);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    
    const confirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/api/admin/product/${product._id}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        alert('Sản phẩm đã được xóa thành công!');
        router.push('/admin/products');
      } else {
        throw new Error('Không thể xóa sản phẩm');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi xóa sản phẩm');
      console.error("Error deleting product:", err);
    }
  };

  const formatCurrency = (num: number) => {
    return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  // Calculate discount percentage
  const getDiscountPercent = () => {
    if (!product || product.price <= product.sale_price) return 0;
    return Math.round(((product.price - product.sale_price) / product.price) * 100);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Lỗi</h2>
          <p>{error}</p>
          <button onClick={handleGoBack} className={styles.returnButton}>
            <ArrowLeft size={16} />
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Không tìm thấy sản phẩm</h2>
          <p>Sản phẩm với ID {productId} không tồn tại.</p>
          <button onClick={handleGoBack} className={styles.returnButton}>
            <ArrowLeft size={16} />
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const discountPercent = getDiscountPercent();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chi tiết sản phẩm #{product.sku}</h1>
        <button className={styles.returnButton} onClick={handleGoBack}>
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      <div className={styles.form}>
        {/* Product Header */}
        <div className={styles.productHeader}>
          <div className={styles.productInfo}>
            <h2 className={styles.productName}>{product.name}</h2>
            <div className={styles.productBrand}>{product.brand_id}</div>

            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>
                {formatCurrency(product.sale_price)}
              </span>
              {product.price !== product.sale_price && (
                <>
                  <span className={styles.originalPrice}>
                    {formatCurrency(product.price)}
                  </span>
                  {discountPercent > 0 && (
                    <span className={styles.discount}>-{discountPercent}%</span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.productImage}>
            {product.img && product.img.length > 0 ? (
              <img 
                src={product.img[0]} 
                alt={product.name}
                className={styles.imagePreview}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="' + styles.imagePreview + '"><span>Không có ảnh</span></div>';
                  }
                }}
              />
            ) : (
              <div className={styles.imagePreview}>
                <span>Không có ảnh sản phẩm</span>
              </div>
            )}
            <div className={styles.imageName}>
              {product.img && product.img.length > 0 ? `${product.img.length} ảnh` : 'Chưa có ảnh'}
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>Mô tả sản phẩm</h3>
            <div 
              className={styles.descriptionText}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Product Details */}
        <div className={styles.productDetails}>
          {/* Basic Information */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>
            
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>SKU:</span>
              <span className={styles.detailValue}>{product.sku}</span>
            </div>
            
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Thương hiệu:</span>
              <span className={styles.detailValue}>{product.brand_id}</span>
            </div>
            
            {product.category_id && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Danh mục:</span>
                <span className={styles.detailValue}>{product.category_id}</span>
              </div>
            )}
            
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Số lượng:</span>
              <span className={styles.detailValue}>
                {product.quantity} sản phẩm
              </span>
            </div>
            
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Đã bán:</span>
              <span className={styles.detailValue}>
                {product.sold} sản phẩm
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Lượt xem:</span>
              <span className={styles.detailValue}>
                {product.view || 0} lượt
              </span>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.technical_specifications && Object.keys(product.technical_specifications).length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>Thông số kỹ thuật</h3>
              {Object.entries(product.technical_specifications).map(([key, value]) => (
                <div key={key} className={styles.detailRow}>
                  <span className={styles.detailLabel}>{key}:</span>
                  <span className={styles.detailValue}>{value as string}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>Thẻ tag</h3>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Tags:</span>
                <span className={styles.detailValue}>
                  {product.tags.join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>Thông tin thời gian</h3>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ngày tạo:</span>
              <span className={styles.detailValue}>
                {new Date(product.createdAt).toLocaleString('vi-VN')}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Cập nhật lần cuối:</span>
              <span className={styles.detailValue}>
                {new Date(product.updatedAt).toLocaleString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={styles.statusSection}>
          <div className={styles.statusLabel}>Trạng thái sản phẩm</div>
          <span
            className={`${styles.statusBadge} ${
              product.status === 1
                ? styles.statusActive
                : styles.statusInactive
            }`}
          >
            {product.status === 1 ? 'Còn hàng' : 'Hết hàng'}
          </span>
        </div>

        {/* Actions */}
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.createButton}
            onClick={handleEdit}
          >
            Chỉnh sửa
          </button>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={handleDelete}
          >
            Xóa sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;