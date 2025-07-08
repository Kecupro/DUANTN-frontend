// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useAppContext } from '../../../context/AppContext';
// import styles from '../../assets/css/add.module.css';

// const EditBrand = () => {
//   // Dữ liệu mẫu cho việc edit
//   const [brandName, setBrandName] = useState('G-Shock');
//   const [brandDescription, setBrandDescription] = useState('Dòng đồng hồ trứ danh của thương hiệu Casio đến từ Nhật Bản. Tại Việt Nam, G-Shock chính hãng cũng là một trong những lựa chọn hàng đầu...');
//   const [status, setStatus] = useState('Hoạt động');
//   const [selectedFile, setSelectedFile] = useState({ name: 'dong-ho-G-shock.jpg' }); // Giả lập file đã có
//   const [activeTab, setActiveTab] = useState('preview'); // Bắt đầu với preview tab vì đã có file

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//       setActiveTab('preview');
//     }
//   };

//   const { isDarkMode } = useAppContext();

//   useEffect(() => {
//     const html = document.documentElement;
//     if (isDarkMode) html.classList.add(styles['dark-mode']);
//     else html.classList.remove(styles['dark-mode']);
//   }, [isDarkMode]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     if (tab === 'upload') {
//       // Trigger file input click when upload tab is clicked
//       document.getElementById('fileInput').click();
//     }
//   };

//   return (
//     <main className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Chỉnh sửa thương hiệu</h1>
//         <button className={styles.returnButton}>Quay lại</button>
//       </div>

//       <div className={styles.form}>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Tên thương hiệu</label>
//           <input 
//             type="text" 
//             className={styles.input}
//             placeholder="Nhập tên thương hiệu..."
//             value={brandName}
//             onChange={(e) => setBrandName(e.target.value)}
//           />    
//         </div>
        
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Mô tả thương hiệu</label>
//           <textarea 
//             className={styles.input}
//             placeholder="Nhập mô tả thương hiệu..."
//             rows={4}
//             value={brandDescription}
//             onChange={(e) => setBrandDescription(e.target.value)}
//           />    
//         </div>
        
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Ảnh</label>
//           <div className={styles.imageSection}>
//             <div className={styles.imageTabs}>
//               <button 
//                 className={`${styles.imageTab} ${activeTab === 'upload' ? styles.imageTabActive : ''}`}
//                 onClick={() => handleTabClick('upload')}
//                 type="button"
//               >
//                 Chọn tệp
//               </button>
             
//             </div>
            
//             {/* Preview existing image */}
//             {activeTab === 'preview' && selectedFile && (
//               <div className={styles.imagePreview}>
//                 <img 
//                   src="/images/nike-logo.jpg" 
//                   alt="Brand logo preview" 
//                   style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }}
//                 />
//               </div>
//             )}
            
//             {/* Hidden file input */}
//             <input 
//               id="fileInput"
//               type="file" 
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//             />
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label className={styles.label}>Trạng thái</label>
//           <div className={styles.radioGroup}>
//             <label className={styles.radioLabel}>
//               <input 
//                 type="radio" 
//                 name="status" 
//                 value="Hoạt động"
//                 checked={status === 'Hoạt động'}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className={styles.radioInput}
//               />
//               <span className={styles.radioText}>Hoạt động</span>
//             </label>
//             <label className={styles.radioLabel}>
//               <input 
//                 type="radio" 
//                 name="status" 
//                 value="Dừng hoạt động"
//                 checked={status === 'Dừng hoạt động'}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className={styles.radioInput}
//               />
//               <span className={styles.radioText}>Dừng hoạt động</span>
//             </label>
//           </div>
//         </div>

//         <div className={styles.formActions}>
//           <button type="submit" className={styles.createButton}>
//             Cập nhật
//           </button>
//           <button type="button" className={styles.cancelButton}>
//             Hủy
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default EditBrand;