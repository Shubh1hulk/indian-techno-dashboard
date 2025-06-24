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
  FaDollarSign,
  FaChartLine,
  FaDownload,
  FaFilter,
  FaSync as FaRefresh
} from "react-icons/fa";
import { FaArrowTrendUp as FaTrendingUp } from "react-icons/fa6";

// Utilities
import { 
  formatNumber, 
  formatCurrency, 
  generateRandomData, 
  getStatusColor,
  calculatePercentageChange,
  generateSampleUsers,
  generateSalesData,
  chartColors,
  getDefaultChartOptions
} from "../../utils/helpers";

const EnhancedDemo = () => {
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

  // Sample data
  const [stats, setStats] = useState({
    totalUsers: 15430,
    orders: 842,
    revenue: 45780,
    growth: 23.5
  });

  const [salesData, setSalesData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Generate sample data on component mount
    setSalesData(generateSalesData(12));
    setUsers(generateSampleUsers(5));
  }, []);

  // Chart configuration
  const revenueChartOptions = {
    ...getDefaultChartOptions('Revenue Analytics'),
    chart: {
      ...getDefaultChartOptions().chart,
      type: 'area',
      height: 350
    },
    colors: [chartColors.primary, chartColors.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const revenueChartSeries = [
    {
      name: 'Revenue',
      data: generateRandomData(12, 20000, 80000)
    },
    {
      name: 'Profit',
      data: generateRandomData(12, 10000, 40000)
    }
  ];

  // Pie chart for categories
  const categoryChartOptions = {
    chart: { type: 'donut', height: 300 },
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    colors: [chartColors.primary, chartColors.success, chartColors.warning, chartColors.info, chartColors.danger],
    legend: { position: 'bottom' },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }]
  };

  const categoryChartSeries = [44, 55, 13, 43, 22];

  // Recent orders with enhanced data
  const recentOrders = [
    { 
      id: '#SK2540', 
      customer: 'John Doe', 
      product: 'Premium Package', 
      amount: 299, 
      status: 'Completed', 
      date: '2025-06-23',
      priority: 'high'
    },
    { 
      id: '#SK2541', 
      customer: 'Jane Smith', 
      product: 'Basic Plan', 
      amount: 99, 
      status: 'Pending', 
      date: '2025-06-23',
      priority: 'medium'
    },
    { 
      id: '#SK2542', 
      customer: 'Mike Johnson', 
      product: 'Enterprise', 
      amount: 599, 
      status: 'Processing', 
      date: '2025-06-22',
      priority: 'high'
    },
    { 
      id: '#SK2543', 
      customer: 'Sarah Wilson', 
      product: 'Pro Plan', 
      amount: 199, 
      status: 'Completed', 
      date: '2025-06-22',
      priority: 'low'
    },
  ];

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
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 100),
        orders: prev.orders + Math.floor(Math.random() * 20),
        revenue: prev.revenue + Math.floor(Math.random() * 1000)
      }));
      setRefreshing(false);
    }, 1000);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'danger',
      medium: 'warning',
      low: 'success'
    };
    return colors[priority] || 'primary';
  };

  // Calculate growth percentages
  const previousStats = {
    totalUsers: 14200,
    orders: 780,
    revenue: 42300,
    growth: 18.2
  };

  const userGrowth = calculatePercentageChange(previousStats.totalUsers, stats.totalUsers);
  const orderGrowth = calculatePercentageChange(previousStats.orders, stats.orders);
  const revenueGrowth = calculatePercentageChange(previousStats.revenue, stats.revenue);

  // Meta title
  document.title = "Enhanced Demo | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <Breadcrumbs title="Demo" breadcrumbItem="Enhanced Demo Dashboard" />

          {/* Alert */}
          {showAlert && (
            <Alert color="success" className="alert-dismissible fade show">
              <i className="mdi mdi-check-all me-2"></i>
              New item "{formData.name}" added successfully!
            </Alert>
          )}

          {/* Control Panel */}
          <Row className="mb-3">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Dashboard Overview</h4>
                <div className="d-flex gap-2">
                  <Button 
                    color="primary" 
                    outline 
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <FaRefresh className={refreshing ? 'fa-spin' : ''} /> Refresh
                  </Button>
                  <Dropdown isOpen={filterDropdown} toggle={toggleFilter}>
                    <DropdownToggle color="secondary" outline caret>
                      <FaFilter /> Filter
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Last 7 Days</DropdownItem>
                      <DropdownItem>Last 30 Days</DropdownItem>
                      <DropdownItem>Last 3 Months</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Custom Range</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button color="success" onClick={toggleModal}>
                    <i className="bx bx-plus me-1"></i> Add New
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Enhanced Stats Cards */}
          <Row>
            <Col xl={3} md={6}>
              <Card className="card-h-100">
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
                        <p className="text-muted mb-0">Total Users</p>
                        <h4 className="text-dark mt-1">
                          <span>{formatNumber(stats.totalUsers)}</span>
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

            <Col xl={3} md={6}>
              <Card className="card-h-100">
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
                        <p className="text-muted mb-0">Orders</p>
                        <h4 className="text-dark mt-1">
                          <span>{formatNumber(stats.orders)}</span>
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

            <Col xl={3} md={6}>
              <Card className="card-h-100">
                <CardBody>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle bg-light text-warning font-size-24">
                          <FaDollarSign />
                        </span>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="text-end">
                        <p className="text-muted mb-0">Revenue</p>
                        <h4 className="text-dark mt-1">
                          <span>{formatCurrency(stats.revenue)}</span>
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

            <Col xl={3} md={6}>
              <Card className="card-h-100">
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
                        <h4 className="text-dark mt-1">
                          <span>{stats.growth}%</span>
                        </h4>
                        <p className="text-success mb-0">
                          <i className="bx bx-trending-up"></i> +5.3%
                        </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Revenue Chart */}
            <Col xl={8}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Revenue & Profit Analytics</h4>
                    <div className="ms-auto">
                      <Button color="primary" size="sm" outline>
                        <FaDownload className="me-1" /> Export
                      </Button>
                    </div>
                  </div>
                  <ReactApexChart
                    options={revenueChartOptions}
                    series={revenueChartSeries}
                    type="area"
                    height="350"
                  />
                </CardBody>
              </Card>
            </Col>

            {/* Category Distribution */}
            <Col xl={4}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Sales by Category</h4>
                  <ReactApexChart
                    options={categoryChartOptions}
                    series={categoryChartSeries}
                    type="donut"
                    height="300"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders Table */}
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <CardTitle className="h4">Recent Orders</CardTitle>
                    <div className="ms-auto">
                      <Link to="#" className="btn btn-primary btn-sm">
                        View All Orders
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={index}>
                            <td>
                              <Link to="#" className="text-body fw-bold">
                                {order.id}
                              </Link>
                            </td>
                            <td>{order.customer}</td>
                            <td>{order.product}</td>
                            <td>{formatCurrency(order.amount)}</td>
                            <td>
                              <Badge
                                color={getStatusColor(order.status)}
                                pill
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
                            <td>{order.date}</td>
                            <td>
                              <Button color="primary" size="sm" outline>
                                View
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

            {/* Recent Users */}
            <Col lg={4}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Recent Users</CardTitle>
                  {users.map((user, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="avatar-xs me-3">
                        <img
                          src={user.avatar}
                          alt=""
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{user.firstName} {user.lastName}</h6>
                        <p className="text-muted mb-0">{user.department}</p>
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
                  <div className="text-center">
                    <Link to="#" className="btn btn-outline-primary btn-sm">
                      View All Users
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Enhanced Modal */}
          <Modal isOpen={modal} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>Add New Product</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="itemName">Product Name *</Label>
                      <Input
                        type="text"
                        id="itemName"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="itemPrice">Price *</Label>
                      <Input
                        type="number"
                        id="itemPrice"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="category">Category</Label>
                      <Input
                        type="select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="home-garden">Home & Garden</option>
                        <option value="sports">Sports</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input type="select" id="status" name="status">
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="inactive">Inactive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="itemDescription">Description</Label>
                  <Input
                    type="textarea"
                    id="itemDescription"
                    name="description"
                    placeholder="Enter product description"
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
              >
                Add Product
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

export default EnhancedDemo;
