  // ProductDetailModal.tsx
  "use client";
  import React from "react";
  // import { X } from "lucide-react";
  import styles from "../assets/css/detail.module.css";

  interface Product {
    id: number;
    name: string;
    brand: string;
    price: string;
    discountPrice: string;
    quantity: number;
    sold: number;
    status: string;
    category?: string;
    description?: string;
    gender?: string;
    caseDiameter?: string;
    style?: string;
    features?: string;
    waterResistance?: string;
    thickness?: string;
    color?: string;
    movementType?: string;
    strapMaterial?: string;
    caseMaterial?: string;
    productStatus?: string;
    image?: string;
  }

  interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
    onEdit?: (product: Product) => void;
    onDelete?: (productId: number) => void;
  }

  const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
    product, 
    onClose, 
    onEdit,
    onDelete 
  }) => {
    if (!product) return null;

    // Calculate discount percentage
    const originalPrice = parseInt(product.price.replace(/[^0-9]/g, ""));
    const discountPrice = parseInt(product.discountPrice.replace(/[^0-9]/g, ""));
    const discountPercent = originalPrice > discountPrice ? 
      Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;

    const handleEdit = () => {
      if (onEdit) {
        onEdit(product);
      }
      onClose();
    };

    const handleDelete = () => {
      if (onDelete && confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        onDelete(product.id);
        onClose();
      }
    };

    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        

          <main className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.title}>Chi tiết sản phẩm</h1>
              <button className={styles.returnButton} onClick={onClose}>
                Đóng
              </button>
            </div>

            <div className={styles.form}>
              {/* Product Header */}
              <div className={styles.productHeader}>
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <div className={styles.productBrand}>{product.brand}</div>

                  <div className={styles.priceSection}>
                    <span className={styles.currentPrice}>
                      {product.discountPrice}
                    </span>
                    {originalPrice !== discountPrice && (
                      <>
                        <span className={styles.originalPrice}>{product.price}</span>
                        {discountPercent > 0 && (
                          <span className={styles.discount}>-{discountPercent}%</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.productImage}>
                  <div className={styles.imagePreview}>
                    <span>Xem trước ảnh sản phẩm</span>
                  </div>
                  <div className={styles.imageName}>
                    {product.image || `${product.name}.jpg`}
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Mô tả sản phẩm</h3>
                  <p className={styles.descriptionText}>{product.description}</p>
                </div>
              )}

              {/* Product Details */}
              <div className={styles.productDetails}>
                {/* Basic Information */}
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>
                  {product.category && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Danh mục:</span>
                      <span className={styles.detailValue}>{product.category}</span>
                    </div>
                  )}
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Thương hiệu:</span>
                    <span className={styles.detailValue}>{product.brand}</span>
                  </div>
                  {product.gender && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Giới tính:</span>
                      <span className={styles.detailValue}>{product.gender}</span>
                    </div>
                  )}
                  {product.style && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Phong cách:</span>
                      <span className={styles.detailValue}>{product.style}</span>
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
                </div>

                {/* Technical Specifications */}
                {(product.caseDiameter || product.thickness || product.waterResistance || 
                  product.movementType || product.color) && (
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Thông số kỹ thuật</h3>
                    {product.caseDiameter && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Đường kính vỏ:</span>
                        <span className={styles.detailValue}>{product.caseDiameter}</span>
                      </div>
                    )}
                    {product.thickness && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Độ dày:</span>
                        <span className={styles.detailValue}>{product.thickness}</span>
                      </div>
                    )}
                    {product.waterResistance && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Chống nước:</span>
                        <span className={styles.detailValue}>{product.waterResistance}</span>
                      </div>
                    )}
                    {product.movementType && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Loại máy:</span>
                        <span className={styles.detailValue}>{product.movementType}</span>
                      </div>
                    )}
                    {product.color && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Màu sắc:</span>
                        <span className={styles.detailValue}>{product.color}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Materials */}
                {(product.caseMaterial || product.strapMaterial) && (
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Chất liệu</h3>
                    {product.caseMaterial && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Vật liệu vỏ:</span>
                        <span className={styles.detailValue}>{product.caseMaterial}</span>
                      </div>
                    )}
                    {product.strapMaterial && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Vật liệu dây:</span>
                        <span className={styles.detailValue}>{product.strapMaterial}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                {product.features && (
                  <div className={styles.detailSection}>
                    <h3 className={styles.sectionTitle}>Tính năng</h3>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Đặc điểm nổi bật:</span>
                      <span className={styles.detailValue}>{product.features}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className={styles.statusSection}>
                <div className={styles.statusLabel}>Trạng thái sản phẩm</div>
                <span
                  className={`${styles.statusBadge} ${
                    product.status === "Còn hàng"
                      ? styles.statusActive
                      : styles.statusInactive
                  }`}
                >
                  {product.status}
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
          </main>
        </div>
      </div>
    );
  };

  export default ProductDetailModal;