'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/add.module.css';

const EditUser = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeImageTab, setActiveImageTab] = useState('preview');
  
  // Form data state with pre-populated values
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    password: '',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    currentImage: 'avatar.jpg' // Tên file ảnh hiện tại
  });

  useEffect(() => {
    // Simulate existing image file
    if (formData.currentImage) {
      // Create a mock file object to represent existing image
      const mockFile = new File([''], formData.currentImage, { type: 'image/jpeg' });
      setSelectedFile(mockFile);
      setActiveImageTab('preview');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setActiveImageTab('preview');
    }
  };

  const handleImageTabClick = (tab) => {
    setActiveImageTab(tab);
    if (tab === 'upload') {
      // Trigger file input click when upload tab is clicked
      document.getElementById('userFileInput').click();
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Kiểm tra xem có phải vai trò người dùng không
  const isUserRole = selectedRole === 'user';
  const isAdminRole = selectedRole === 'admin';

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa người dùng</h1>
        <button className={styles.returnButton}>Quay lại</button>
      </div>

      <div className={styles.form}>
        {/* Các trường bắt buộc cho cả User và Admin */}
        <div className={styles.formGroup}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Vai trò</label>
            <select 
              className={styles.select}
              value={selectedRole}
              onChange={handleRoleChange}
              style={{ marginBottom: '10px' }}
            >
              <option value="">--- Chọn vai trò ---</option>
              <option value="user">Khách hàng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
          
          <label className={styles.label}>Tên</label>
          <input 
            type="text" 
            name="name"
            className={styles.input}
            placeholder="Nhập tên người dùng..."
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input 
            type="email" 
            name="email"
            className={styles.input}
            placeholder="Nhập email..."
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mật khẩu</label>
          <input 
            type="password" 
            name="password"
            className={styles.input}
            placeholder="Để trống nếu không muốn thay đổi..."
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Các trường chỉ hiển thị khi chọn vai trò "Người dùng" */}
        {isUserRole && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Số điện thoại</label>
              <input 
                type="tel" 
                name="phone"
                className={styles.input}
                placeholder="Nhập số điện thoại..."
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Địa chỉ</label>
              <textarea 
                name="address"
                className={styles.textarea}
                placeholder="Nhập địa chỉ..."
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Ảnh</label>
              <div className={styles.imageSection}>
                <div className={styles.imageTabs}>
                  <button 
                    style={{ backgroundColor: '#eee', height: '45px'}}
                    type="button"
                    className={`${styles.imageTab} ${activeImageTab === 'upload' ? styles.imageTabActive : ''}`}
                    onClick={() => handleImageTabClick('upload')}
                  >
                    Chọn tệp mới
                  </button>
                
                </div>
                
                {/* Preview section for existing image */}
                {activeImageTab === 'preview' && selectedFile && (
                  <div className={styles.imagePreview} style={{ margin: '0px 0 0 5px' }}
 >
                    <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                     {selectedFile.name}
                    </p>
                    {selectedFile.size && (
                      <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
                        Kích thước: {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    )}
                  </div>
                )}
                
                {/* Hidden file input */}
                <input 
                  id="userFileInput"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </>
        )}

        {/* Hiển thị nút action chỉ khi đã chọn vai trò */}
        {(isUserRole || isAdminRole) && (
          <div className={styles.formActions}>
            <button type="submit" className={styles.createButton}>
              Cập nhật
            </button>
            <button type="button" className={styles.cancelButton}>
              Hủy
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default EditUser;