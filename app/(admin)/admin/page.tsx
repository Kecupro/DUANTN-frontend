'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import {
  FaBoxes, FaFileAlt, FaTicketAlt,
  FaClipboardList, FaUsers, FaBuilding, FaNewspaper, FaBox,
} from 'react-icons/fa';

 export default function AdminDashboardPage() {
  const chartData = [
   { name: 'Jan', value: 1500 },
   { name: 'Feb', value: 3000 },
   { name: 'Mar', value: 1500 },
   { name: 'Apr', value: 1000 },
   { name: 'May', value: 3500 },
   { name: 'Jun', value: 2800 },
   { name: 'Jul', value: 4500 },
   { name: 'Aug', value: 5500 },
   { name: 'Sep', value: 3000 },
   { name: 'Oct', value: 2000 },
   { name: 'Nov', value: 1500 },
   { name: 'Dec', value: 1000 },
  ];

  const totalRevenue = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const [showBarChart, setShowBarChart] = useState(true);

  const toggleChart = () => {
    setShowBarChart(prevState => !prevState);
  };  

  const allRecentSales = [
    { customerName: 'Nguyễn Thanh Liêm 1', orderId: '#DH21122004', paymentMethod: 'Thanh toán khi nhận hàng', totalAmount: '12.000.000', status: 'Đã giao hàng' },
    { customerName: 'Nguyễn Thanh Liêm 2', orderId: '#DH21122004', paymentMethod: 'Thanh toán khi nhận hàng', totalAmount: '12.000.000', status: 'Đang xử lý' },
    { customerName: 'Nguyễn Thanh Liêm 3', orderId: '#DH21122004', paymentMethod: 'Thanh toán khi nhận hàng', totalAmount: '12.000.000', status: 'Đã giao hàng' },
    { customerName: 'Nguyễn Thanh Liêm 4', orderId: '#DH21122005', paymentMethod: 'Chuyển khoản', totalAmount: '5.500.000', status: 'Đã giao hàng' },
    { customerName: 'Nguyễn Thanh Liêm 5', orderId: '#DH21122006', paymentMethod: 'Thanh toán khi nhận hàng', totalAmount: '8.000.000', status: 'Thất bại' },
  ];

  const ordersPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allRecentSales.length / ordersPerPage);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const displayRecentSales = allRecentSales.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

  return (
   <Container fluid>
    <h2 className="mb-4">Trang chủ</h2>

    {/* Overview Cards */}
    <Row className="mb-4">

    {/* Quản lý người dùng */}
     <Col md={3}>
      <Nav.Link href="/admin/users" className="card-link">
        <Card className="overview-card">
          <Card.Body className='overview-card-body'>
            <div className="box-overview-card">
              <Card.Title>Tổng người dùng</Card.Title>
              <Card.Text className="value">12</Card.Text>
            </div>
            <div className="icon-overview-card"><FaUsers className="icon" /></div>
          </Card.Body>
        </Card>
      </Nav.Link>
    </Col>

    {/* Quản lý đơn hàng */}
     <Col md={3}>
     <Nav.Link href="/admin/orders" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng đơn hàng</Card.Title>
        <Card.Text className="value">16</Card.Text>
        </div>
        <div className="icon-overview-card"><FaClipboardList className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>

    {/* Quản lý tin tức */}
     <Col md={3}>
     <Nav.Link href="/admin/news" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng bài tin tức</Card.Title>
        <Card.Text className="value">45</Card.Text>
        </div>
        <div className="icon-overview-card"><FaFileAlt className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>

    {/* Quản lý sản phẩm */}
     <Col md={3}>
     <Nav.Link href="/admin/products" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng sản phẩm</Card.Title>
        <Card.Text className="value">50</Card.Text>
        </div>
        <div className="icon-overview-card"><FaBoxes className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>

    {/* Quản lý danh mục sản phẩm*/}
     <Col md={3}>
     <Nav.Link href="/admin/categories-product-list" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng danh mục sản phẩm</Card.Title>
        <Card.Text className="value">5</Card.Text>
        </div>
        <div className="icon-overview-card"><FaBox className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>

    {/* Quản lý danh mục tin tức*/}
     <Col md={3}>
     <Nav.Link href="/admin/categories-news-list" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng danh mục tin tức</Card.Title>
        <Card.Text className="value">6</Card.Text>
        </div>
        <div className="icon-overview-card"><FaNewspaper className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>

    {/* Quản lý thương hiệu */}
     <Col md={3}>
     <Nav.Link href="/admin/brands" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng thương hiệu</Card.Title>
        <Card.Text className="value">14</Card.Text>
        </div>
        <div className="icon-overview-card"><FaBuilding className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>

    {/* Quản lý voucher */}
     <Col md={3}>
     <Nav.Link href="/admin/vouchers" className="card-link">
      <Card className="overview-card">
       <Card.Body className='overview-card-body'>
        <div className="box-overview-card">
        <Card.Title>Tổng mã giảm giá</Card.Title>
        <Card.Text className="value">6</Card.Text>
        </div>
        <div className="icon-overview-card"><FaTicketAlt className="icon" /></div>
       </Card.Body>
      </Card>
      </Nav.Link>
     </Col>
    </Row>

    <Row>
     <Col md={8}>
        <Card className="mb-4 chart-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title>Tổng quan</Card.Title>
              <div className="chart-controls">
                <Button className='buttonChangeChart' size="sm" onClick={toggleChart}>
                  {showBarChart ? 'Xem biểu đồ đường' : 'Xem biểu đồ cột'}
                </Button>
              </div>
            </div>
            <div className="total-revenue-display">
              <h5>Tổng doanh thu: <span>{totalRevenue.toLocaleString("vi-VN")}đ</span></h5>
            </div>
            <div style={{ height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  {showBarChart ? (
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  ) : (
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

     <Col md={4}>
      <Card className="mb-4 recent-sales-card">
          <Card.Body>
              <Card.Title className="mb-2">Đơn hàng gần đây</Card.Title>
              <Card.Text className="text-muted mb-2">
                  Đã có <span>{allRecentSales.length}</span> đơn hàng bán ra gần đây.
              </Card.Text>
              {displayRecentSales.map((order, index) => (
                  <div key={index} className="order-item mb-2">
                      <p className="order-customer-name"><strong>{order.customerName}</strong></p>
                      <p className="mb-0">Mã đơn hàng: <span className="text-muted">{order.orderId}</span></p>
                      <p className="mb-0">Phương thức thanh toán: <span className="text-muted">{order.paymentMethod}</span></p>
                      <p className="mb-0">Tổng tiền: <span className="text-price-order">{order.totalAmount}đ</span></p>
                      <p className="mb-0">Trạng thái:
                          <span
                              className={`order-status-badge ${
                                  order.status === 'Đã giao hàng' ? 'status-delivered' :
                                  order.status === 'Đang xử lý' ? 'status-processing' :
                                  'status-failed'
                              }`}
                          >
                              {order.status}
                          </span>
                      </p>
                      {index < displayRecentSales.length - 1}
                  </div>
              ))}
              <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>Trang {currentPage} trong {totalPages}</span>
                  <div>
                      <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                      >
                          Trước
                      </Button>
                      <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                      >
                          Sau
                      </Button>
                  </div>
              </div>
          </Card.Body>
      </Card>
        </Col>
    </Row>
   </Container>
  );
}