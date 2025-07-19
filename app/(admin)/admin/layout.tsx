'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';

import {
  FaTachometerAlt, FaBoxes, FaFileAlt, FaTicketAlt,
  FaClipboardList, FaStar, FaUsers, FaBuilding, FaDoorOpen, FaNewspaper, FaBox,
  FaUserCircle, FaChevronDown, FaChevronUp, FaMoon, FaSun, FaSearch,
  FaBars,
} from 'react-icons/fa';
// FaShoppingCart, FaBell

import { AppProvider, useAppContext } from '../context/AppContext';
import { AdminAuthProvider, useAdminAuth } from '@/app/(admin)/context/AdminAuthContext'
import './globals.css';

function LayoutWithSidebarAndHeader({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading, isAuthorized } = useAdminAuth();

  // ! Lấy trạng thái hiện tại sửa bên folder context
  const {
    isSidebarCollapsed,
    toggleSidebar,
    isDarkMode,
    toggleDarkMode,
  } = useAppContext();

  // ! Lưu trạng thái dropmenu
  const [openCategoriesMenu, setOpenCategoriesMenu] = useState(false);
  const [openCategoriesBlogMenu, setOpenCategoriesBlogMenu] = useState(false);
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [openBlogMenu, setOpenBlogMenu] = useState(false);
  const [openVoucherMenu, setOpenVoucherMenu] = useState(false);
  const [openOrderMenu, setOpenOrderMenu] = useState(false);
  const [openReviewMenu, setOpenReviewMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openBrandMenu, setOpenBrandMenu] = useState(false);

  const handleCollapsedLinkClick = (e: React.MouseEvent, href: string) => {
    if (isSidebarCollapsed) {
      e.preventDefault(); 
      window.location.href = href;
    }
  };

  useEffect(() => {
  console.log("isDarkMode:", isDarkMode);
  const html = document.documentElement;
  if (isDarkMode) {
    html.classList.add('dark-mode');
  } else {
    html.classList.remove('dark-mode');
  }
}, [isDarkMode]);

  // Hiển thị loading
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Hiển thị unauthorized
  if (!isAuthorized) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <h2 className="text-danger mb-3">Không có quyền truy cập</h2>
          <p className="mb-3">Bạn không có quyền truy cập trang quản trị.</p>
          <Link href="/" className="btn btn-primary">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* SideBar */}
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!isSidebarCollapsed ? (
          <img src={isDarkMode ? "logoVClockDark.png" : "logoVClockWhite.png"} alt="Logo" />
        ) : (
          <img src="logoV.png" alt="Collapsed Logo" />
        )}
        </div>

        <Nav className="flex-column pb-2 px-2">
          <div className="sidebar-category mt-0">
            {/* Trang chủ */}
            {!isSidebarCollapsed && <div className="fw-bold mb-2 category-title">TRANG CHỦ</div>}
            {/* Trang chủ Link */}
            <Nav.Link as={Link} href="/admin" className="sidebar-item">
              <FaTachometerAlt className="me-2" />
              {!isSidebarCollapsed && <span className="nav-link-text">Dashboard</span>}
            </Nav.Link>

            {/* Quản lý */}
            {!isSidebarCollapsed && <div className="fw-bold mb-2 category-title">QUẢN LÝ</div>}

            {/* Quản lý sản phẩm */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/products');
                  } else {
                    setOpenProductMenu(!openProductMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openProductMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/products' : undefined}
              >
                <div>
                  <FaBoxes className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý sản phẩm</span>}
                </div>
                {!isSidebarCollapsed && (openProductMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openProductMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/products" className="submenu-item mt-1">
                  Danh sách sản phẩm
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/products/addProduct" className="submenu-item">
                  Thêm sản phẩm
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý danh mục sản phẩm*/}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/categories-product-list');
                  } else {
                    setOpenCategoriesMenu(!openCategoriesMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openCategoriesMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/categories-product-list' : undefined}
              >
                <div>
                  <FaBox className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Danh mục sản phẩm</span>}
                </div>
                {!isSidebarCollapsed && (openCategoriesMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openCategoriesMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/categories-product-list" className="submenu-item mt-1">
                  Danh sách danh mục sản phẩm
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/categories-product-list/addCatePro" className="submenu-item">
                  Thêm danh mục sản phẩm
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý danh mục tin tức*/}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/categories-news-list');
                  } else {
                    setOpenCategoriesBlogMenu(!openCategoriesBlogMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openCategoriesBlogMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/categories-news-list' : undefined}
              >
                <div>
                  <FaNewspaper className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Danh mục tin tức</span>}
                </div>
                {!isSidebarCollapsed && (openCategoriesBlogMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openCategoriesBlogMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/categories-news-list" className="submenu-item mt-1">
                  Danh sách danh mục tin tức
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/categories-news-list/addCateNew" className="submenu-item">
                  Thêm danh mục tin tức
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý tin tức */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/news');
                  } else {
                    setOpenBlogMenu(!openBlogMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openBlogMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/news' : undefined}
              >
                <div>
                  <FaFileAlt className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý tin tức</span>}
                </div>
                {!isSidebarCollapsed && (openBlogMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openBlogMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/news" className="submenu-item mt-1">
                  Danh sách tin tức
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/news/addNew" className="submenu-item">
                  Thêm tin tức
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý voucher */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/vouchers');
                  } else {
                    setOpenVoucherMenu(!openVoucherMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openVoucherMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/vouchers' : undefined}
              >
                <div>
                  <FaTicketAlt className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý voucher</span>}
                </div>
                {!isSidebarCollapsed && (openVoucherMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openVoucherMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/vouchers" className="submenu-item mt-1">
                  Danh sách voucher
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/vouchers/addVoucher" className="submenu-item">
                  Thêm voucher
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý đơn hàng */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/orders');
                  } else {
                    setOpenOrderMenu(!openOrderMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openOrderMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/orders' : undefined}
              >
                <div>
                  <FaClipboardList className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý đơn hàng</span>}
                </div>
                {!isSidebarCollapsed && (openOrderMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openOrderMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/orders" className="submenu-item mt-1">
                  Danh sách đơn hàng
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý đánh giá */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/reviews');
                  } else {
                    setOpenReviewMenu(!openReviewMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openReviewMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/reviews' : undefined}
              >
                <div>
                  <FaStar className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý đánh giá</span>}
                </div>
                {!isSidebarCollapsed && (openReviewMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openReviewMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/reviews" className="submenu-item mt-1">
                  Danh sách đánh giá
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý người dùng */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/users');
                  } else {
                    setOpenUserMenu(!openUserMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openUserMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/users' : undefined}
              >
                <div>
                  <FaUsers className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý người dùng</span>}
                </div>
                {!isSidebarCollapsed && (openUserMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openUserMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/users" className="submenu-item mt-1">
                  Danh sách người dùng
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/users/addUser" className="submenu-item">
                  Thêm người dùng
                </Nav.Link>
              </div>
            </div>

            {/* Quản lý thương hiệu */}
            <div className="sidebar-item-with-dropdown">
              <Nav.Link
                onClick={(e: React.MouseEvent) => {
                  if (isSidebarCollapsed) {
                    handleCollapsedLinkClick(e, '/admin/brands');
                  } else {
                    setOpenBrandMenu(!openBrandMenu);
                  }
                }}
                className="d-flex justify-content-between align-items-center"
                aria-expanded={openBrandMenu}
                as={isSidebarCollapsed ? Link : 'div'}
                href={isSidebarCollapsed ? '/admin/brands' : undefined}
              >
                <div>
                  <FaBuilding className="me-2" />
                  {!isSidebarCollapsed && <span className="nav-link-text">Quản lý thương hiệu</span>}
                </div>
                {!isSidebarCollapsed && (openBrandMenu ? <FaChevronUp /> : <FaChevronDown />)}
              </Nav.Link>

              <div className={`submenu ${openBrandMenu ? 'show' : ''} ${isSidebarCollapsed ? 'hidden-collapsed' : ''}`}>
                <Nav.Link as={Link} href="/admin/brands" className="submenu-item mt-1">
                  Danh sách thương hiệu
                </Nav.Link>
                <Nav.Link as={Link} href="/admin/brands/addBrand" className="submenu-item">
                  Thêm thương hiệu
                </Nav.Link>
              </div>
            </div>

            {/* Tài khoản */}
            {!isSidebarCollapsed && <div className="fw-bold mb-2 category-title">THÔNG TIN</div>}
            <Nav.Link as={Link} href="/admin/account" className="sidebar-item">
              <FaUserCircle className="me-2" />
              {!isSidebarCollapsed && <span className="nav-link-text">Tài khoản</span>}
            </Nav.Link>

            {/* Tới trang chủ (client) */}
            <Nav.Link as={Link} href="/" className="bg-dark sidebar-item mt-3 d-flex align-items-center justify-content-center go-home-button">
              <FaDoorOpen className="me-2" />
              {!isSidebarCollapsed && <span className="nav-link-text">ĐI TỚI TRANG CHỦ</span>}
            </Nav.Link>
          </div>
        </Nav>
      </div>

      {/* Nội dung chính */}
      <div className="main-content flex-grow-1" style={{ marginLeft: isSidebarCollapsed ? '80px' : '300px' }}>
        <Navbar className={`header px-3 pb-2 pt-0 ${isDarkMode ? 'dark-mode' : ''}`} expand="lg" style={{ left: isSidebarCollapsed ? '80px' : '300px', width: isSidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 300px)'}}>
          {/* Toggle Menu */}
          <button className="toggle-btn btn btn-sm" onClick={toggleSidebar}>
            <FaBars />
          </button>

          <Form className="search-form me-auto d-flex align-items-center">
          <FaSearch className="search-icon" />
          <FormControl
            type="text"
            placeholder="Tìm kiếm..."
            className="search-input"
          />
          </Form>

          {/* Item bên phải thanh nav header */}
          <Nav>
            <Nav.Link onClick={toggleDarkMode} style={{ paddingBottom: '5px'}}>
              {isDarkMode ? <FaSun className="text-warning" /> : <FaMoon />}
            </Nav.Link>

            {/* Thông báo tạm thời không sài */}
            {/* <Nav.Link href="#notifications">
              <FaBell />
            </Nav.Link> */}

            <Dropdown align="end">
            <Dropdown.Toggle as={Nav.Link} id="dropdown-basic" className="profile-dropdown-toggle" style={{ paddingBottom: '0'}}>
              <FaUserCircle />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <p>V-Clock</p>
              <p><span>{user?.email || 'danhthaidoanbui@gmail.com'}</span></p>
              <Dropdown.Divider />
              <Dropdown.Item href="/admin/account">Cài đặt tài khoản</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

          </Nav>
        </Navbar>

        <div className="dashboard-content py-2 px-2" style={{marginTop: '50px'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AdminAuthProvider>
      <html lang="vi">
        <head>
          <title>Admin</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        </head>
        <body>
          <LayoutWithSidebarAndHeader>{children}</LayoutWithSidebarAndHeader>
        </body>
      </html>
      </AdminAuthProvider>
    </AppProvider>
  );
}