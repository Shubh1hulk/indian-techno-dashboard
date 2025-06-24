import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Badge,
  Progress,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Charts
import ReactApexChart from "react-apexcharts";

// Icons
import { 
  FaUsers, 
  FaShoppingCart, 
  FaRupeeSign,
  FaTrendingUp,
  FaChartLine,
  FaDownload,
  FaFilter,
  FaRefresh,
  FaMobile,
  FaLaptop,
  FaGamepad
} from "react-icons/fa";

// Enhanced Indian utilities
import { 
  formatIndianNumber, 
  formatIndianCurrency, 
  generateRandomData, 
  getStatusColor,
  calculatePercentageChange,
  generateIndianUsers,
  generateIndianSalesData,
  technoColors,
  getTechnoChartOptions,
  indianCities,
  generateIndianOrders
} from "../../utils/indianHelpers";

const IndianTechnoDashboard = () => {
  // Author: Shubhranshu Pandey
  const [modal, setModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'electronics'
  });

  // Indian business stats (in INR)
  const [stats, setStats] = useState({
    totalUsers: 2450000,  // 24.5 Lakh users
    orders: 125420,       // 1.25 Lakh orders
    revenue: 15750000,    // 1.57 Crore revenue
    growth: 34.2
  });

  const [salesData, setSalesData] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Generate Indian sample data
    setSalesData(generateIndianSalesData(12));
    setUsers(generateIndianUsers(6));
    setOrders(generateIndianOrders());
  }, []);

  // Enhanced chart configuration with techno theme
  const revenueChartOptions = {
    ...getTechnoChartOptions('भारतीय Revenue Analytics (₹ Crores)'),
    chart: {
      ...getTechnoChartOptions().chart,
      type: 'area',
      height: 380,
      background: 'transparent'
    },
    colors: [technoColors.neonBlue, technoColors.neonPink, technoColors.neonGreen],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['जन', 'फर', 'मार', 'अप्र', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्त', 'नव', 'दिस']
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return '₹' + (value / 100000).toFixed(1) + 'L';
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return formatIndianCurrency(value);
        }
      }
    }
  };

  const revenueChartSeries = [
    {
      name: 'Revenue (करोड़)',
      data: generateRandomData(12, 8000000, 25000000) // 80L to 2.5Cr
    },
    {
      name: 'Profit (लाभ)',
      data: generateRandomData(12, 3000000, 12000000) // 30L to 1.2Cr
    },
    {
      name: 'Sales (बिक्री)',
      data: generateRandomData(12, 5000000, 18000000) // 50L to 1.8Cr
    }
  ];

  // Indian cities chart
  const cityChartOptions = {
    chart: { 
      type: 'donut', 
      height: 320,
      background: 'transparent'
    },
    labels: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'],
    colors: [
      technoColors.neonBlue, 
      technoColors.neonPink, 
      technoColors.neonGreen,
      technoColors.neonPurple,
      technoColors.neonOrange,
      technoColors.cyberYellow
    ],
    legend: { 
      position: 'bottom',
      labels: {
        colors: '#ffffff'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'कुल शहर',
              color: '#ffffff'
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 250 },
        legend: { position: 'bottom' }
      }
    }]
  };

  const cityChartSeries = [28, 22, 18, 15, 12, 8]; // Percentage distribution

  const toggleModal = () => setModal(!modal);
  const toggleFilter = () => setFilterDropdown(!filterDropdown);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNew = () => {
    setShowAlert(true);
    setModal(false);
    setFormData({ name: '', description: '', price: '', category: 'electronics' });
    setTimeout(() => setShowAlert(false), 4000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh with Indian growth patterns
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10000),
        orders: prev.orders + Math.floor(Math.random() * 500),
        revenue: prev.revenue + Math.floor(Math.random() * 100000)
      }));
      setRefreshing(false);
    }, 1500);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'danger',
      medium: 'warning', 
      low: 'success'
    };
    return colors[priority] || 'primary';
  };

  // Calculate growth percentages (Previous quarter data)
  const previousStats = {
    totalUsers: 1950000,
    orders: 98500,
    revenue: 12200000,
    growth: 28.1
  };

  const userGrowth = calculatePercentageChange(previousStats.totalUsers, stats.totalUsers);
  const orderGrowth = calculatePercentageChange(previousStats.orders, stats.orders);
  const revenueGrowth = calculatePercentageChange(previousStats.revenue, stats.revenue);

  // Meta title
  document.title = "भारतीय Techno Dashboard | Created by Shubhranshu Pandey";

  return (
    <React.Fragment>
      <div className="page-content" style={{ background: 'transparent' }}>
        <Container fluid>
          {/* Breadcrumb */}
          <Breadcrumbs title="भारतीय Dashboard" breadcrumbItem="Techno Dashboard by Shubhranshu Pandey" />

          {/* Alert */}
          {showAlert && (
            <Alert color="success" className="alert-dismissible fade show neon-glow">
              <i className="mdi mdi-check-all me-2"></i>
              नया आइटम "{formData.name}" सफलतापूर्वक जोड़ा गया! 🎉
              <span className="float-end" style={{ fontSize: '12px' }}>
                - Created by Shubhranshu Pandey
              </span>
            </Alert>
          )}

          {/* Control Panel */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="mb-1" style={{ fontFamily: 'Orbitron', color: technoColors.neonBlue }}>
                    🇮🇳 भारतीय Techno Analytics
                  </h2>
                  <p className="text-muted mb-0">Created by Shubhranshu Pandey | Real-time Indian Business Metrics</p>
                </div>
                <div className="d-flex gap-2">
                  <Button 
                    color="primary" 
                    className={refreshing ? 'loading-pulse' : ''}
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <FaRefresh className={refreshing ? 'fa-spin' : ''} /> 
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                  </Button>
                  <Dropdown isOpen={filterDropdown} toggle={toggleFilter}>
                    <DropdownToggle color="secondary" outline caret>
                      <FaFilter /> Filter Cities
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Mumbai & Delhi</DropdownItem>
                      <DropdownItem>South India</DropdownItem>
                      <DropdownItem>North India</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>All India</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button color="success" onClick={toggleModal} className="neon-glow">
                    <i className="bx bx-plus me-1"></i> नया Product जोड़ें
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Enhanced Indian Stats Cards */}
          <Row className="mb-4">
            <Col xl={3} md={6} className="mb-3">
              <Card className="card-h-100 slide-in-left">
                <CardBody>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle bg-light text-primary font-size-24">
                          <FaUsers />
                        </span>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="text-end">
                        <p className="text-muted mb-0">कुल Users</p>
                        <h4 className="text-light mt-1">
                          <span>{formatIndianNumber(stats.totalUsers)}</span>
                        </h4>
                        <p className={`text-${userGrowth.trend === 'up' ? 'success' : 'danger'} mb-0`}>
                          <i className={`bx bx-trending-${userGrowth.trend}`}></i> {userGrowth.percentage}%
                        </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} md={6} className="mb-3">
              <Card className="card-h-100 slide-in-left" style={{ animationDelay: '0.1s' }}>
                <CardBody>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle bg-light text-success font-size-24">
                          <FaShoppingCart />
                        </span>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="text-end">
                        <p className="text-muted mb-0">कुल Orders</p>
                        <h4 className="text-light mt-1">
                          <span>{formatIndianNumber(stats.orders)}</span>
                        </h4>
                        <p className={`text-${orderGrowth.trend === 'up' ? 'success' : 'danger'} mb-0`}>
                          <i className={`bx bx-trending-${orderGrowth.trend}`}></i> {orderGrowth.percentage}%
                        </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} md={6} className="mb-3">
              <Card className="card-h-100 slide-in-right">
                <CardBody>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle bg-light text-warning font-size-24">
                          <FaRupeeSign />
                        </span>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="text-end">
                        <p className="text-muted mb-0">कुल Revenue</p>
                        <h4 className="text-light mt-1">
                          <span>{formatIndianCurrency(stats.revenue)}</span>
                        </h4>
                        <p className={`text-${revenueGrowth.trend === 'up' ? 'success' : 'danger'} mb-0`}>
                          <i className={`bx bx-trending-${revenueGrowth.trend}`}></i> {revenueGrowth.percentage}%
                        </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} md={6} className="mb-3">
              <Card className="card-h-100 slide-in-right" style={{ animationDelay: '0.1s' }}>
                <CardBody>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle bg-light text-info font-size-24">
                          <FaTrendingUp />
                        </span>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="text-end">
                        <p className="text-muted mb-0">Growth Rate</p>
                        <h4 className="text-light mt-1">
                          <span>{stats.growth}%</span>
                        </h4>
                        <p className="text-success mb-0">
                          <i className="bx bx-trending-up"></i> +6.1% vs Last Quarter
                        </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Enhanced Revenue Chart */}
            <Col xl={8} className="mb-4">
              <Card className="fade-in-up">
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">
                      📈 भारतीय Business Analytics Dashboard
                    </h4>
                    <div className="ms-auto">
                      <Button color="primary" size="sm" outline className="me-2">
                        <FaDownload className="me-1" /> Export Data
                      </Button>
                      <small className="text-muted">By Shubhranshu Pandey</small>
                    </div>
                  </div>
                  <ReactApexChart
                    options={revenueChartOptions}
                    series={revenueChartSeries}
                    type="area"
                    height="380"
                  />
                </CardBody>
              </Card>
            </Col>

            {/* Indian Cities Distribution */}
            <Col xl={4} className="mb-4">
              <Card className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                <CardBody>
                  <h4 className="card-title mb-4">🏙️ शहरवार Sales Distribution</h4>
                  <ReactApexChart
                    options={cityChartOptions}
                    series={cityChartSeries}
                    type="donut"
                    height="320"
                  />
                  <div className="text-center mt-3">
                    <small className="text-muted">Data curated by Shubhranshu Pandey</small>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Indian Orders Table */}
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <CardTitle className="h4">🛒 Recent भारतीय Orders</CardTitle>
                    <div className="ms-auto">
                      <Link to="#" className="btn btn-primary btn-sm">
                        सभी Orders देखें
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>ग्राहक Name</th>
                          <th>Product</th>
                          <th>Amount (₹)</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>शहर</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={index}>
                            <td>
                              <Link to="#" className="text-body fw-bold">
                                {order.id}
                              </Link>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-xs me-2">
                                  <span className="avatar-title rounded-circle bg-primary">
                                    {order.customer.charAt(0)}
                                  </span>
                                </div>
                                {order.customer}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {order.product.includes('Smartphone') && <FaMobile className="me-2 text-primary" />}
                                {order.product.includes('Laptop') && <FaLaptop className="me-2 text-success" />}
                                {order.product.includes('Gaming') && <FaGamepad className="me-2 text-warning" />}
                                {order.product}
                              </div>
                            </td>
                            <td>
                              <strong>{formatIndianCurrency(order.amount)}</strong>
                            </td>
                            <td>
                              <Badge
                                color={getStatusColor(order.status)}
                                pill
                                className="neon-glow"
                              >
                                {order.status}
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                color={getPriorityColor(order.priority)}
                                className="badge-soft"
                              >
                                {order.priority}
                              </Badge>
                            </td>
                            <td>
                              <span className="text-primary">{order.city}</span>
                            </td>
                            <td>
                              <Button color="primary" size="sm" outline>
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Recent Indian Users */}
            <Col lg={4} className="mb-4">
              <Card className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                <CardBody>
                  <CardTitle className="h4 mb-4">👥 Recent भारतीय Users</CardTitle>
                  {users.map((user, index) => (
                    <div key={index} className="d-flex align-items-center mb-3 p-2 rounded" style={{ 
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)'
                    }}>
                      <div className="avatar-xs me-3">
                        <img
                          src={user.avatar}
                          alt=""
                          className="img-fluid rounded-circle"
                          style={{ border: '2px solid #00D4FF' }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-light">{user.firstName} {user.lastName}</h6>
                        <p className="text-muted mb-0">
                          {user.department} • {user.city}
                        </p>
                      </div>
                      <div>
                        <Badge
                          color={getStatusColor(user.status)}
                          pill
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-3">
                    <Link to="#" className="btn btn-outline-primary btn-sm">
                      सभी Users देखें
                    </Link>
                    <div className="mt-2">
                      <small className="text-muted">Developed by Shubhranshu Pandey</small>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Enhanced Modal */}
          <Modal isOpen={modal} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>
              🛍️ नया भारतीय Product जोड़ें
              <small className="text-muted ms-2">By Shubhranshu Pandey</small>
            </ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="itemName">Product Name (नाम) *</Label>
                      <Input
                        type="text"
                        id="itemName"
                        name="name"
                        placeholder="उत्पाद का नाम दर्ज करें"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="itemPrice">Price (कीमत) ₹ *</Label>
                      <Input
                        type="number"
                        id="itemPrice"
                        name="price"
                        placeholder="कीमत दर्ज करें"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="category">Category (श्रेणी)</Label>
                      <Input
                        type="select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="electronics">Electronics & Gadgets</option>
                        <option value="fashion">Fashion & Clothing</option>
                        <option value="home">Home & Kitchen</option>
                        <option value="books">Books & Education</option>
                        <option value="sports">Sports & Fitness</option>
                        <option value="beauty">Health & Beauty</option>
                        <option value="automotive">Automotive</option>
                        <option value="groceries">Groceries & Food</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="status">Status (स्थिति)</Label>
                      <Input type="select" id="status" name="status">
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="inactive">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="itemDescription">Description (विवरण)</Label>
                  <Input
                    type="textarea"
                    id="itemDescription"
                    name="description"
                    placeholder="उत्पाद का विवरण दर्ज करें"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="primary" 
                onClick={handleAddNew}
                disabled={!formData.name || !formData.price}
                className="neon-glow"
              >
                Product जोड़ें
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default IndianTechnoDashboard;
