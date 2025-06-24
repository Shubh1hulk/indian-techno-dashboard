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
} from "reactstrap";
import { Link } from "react-router-dom";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Charts
import ReactApexChart from "react-apexcharts";

// Icons
import { FaUsers, FaShoppingCart, FaDollarSign, FaTrendingUp } from "react-icons/fa";

const CustomDemo = () => {
  const [modal, setModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 15430,
    orders: 842,
    revenue: 45780,
    growth: 23.5
  });

  // Chart options
  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false }
    },
    colors: ['#556ee6'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    }
  };

  const chartSeries = [
    {
      name: 'Revenue',
      data: [31, 40, 28, 51, 42, 109, 100, 120, 95, 140, 120, 160]
    }
  ];

  // Sample data for table
  const recentOrders = [
    { id: '#SK2540', customer: 'John Doe', product: 'Premium Package', amount: '$299', status: 'Completed', date: '2025-06-23' },
    { id: '#SK2541', customer: 'Jane Smith', product: 'Basic Plan', amount: '$99', status: 'Pending', date: '2025-06-23' },
    { id: '#SK2542', customer: 'Mike Johnson', product: 'Enterprise', amount: '$599', status: 'Processing', date: '2025-06-22' },
    { id: '#SK2543', customer: 'Sarah Wilson', product: 'Pro Plan', amount: '$199', status: 'Completed', date: '2025-06-22' },
  ];

  const toggleModal = () => setModal(!modal);

  const handleAddNew = () => {
    setShowAlert(true);
    setModal(false);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Meta title
  document.title = "Custom Demo | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <Breadcrumbs title="Demo" breadcrumbItem="Custom Demo Dashboard" />

          {/* Alert */}
          {showAlert && (
            <Alert color="success" className="alert-dismissible fade show">
              <i className="mdi mdi-check-all me-2"></i>
              New item added successfully!
            </Alert>
          )}

          {/* Stats Cards */}
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
                          <span>{stats.totalUsers.toLocaleString()}</span>
                        </h4>
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
                          <span>{stats.orders}</span>
                        </h4>
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
                          <span>${stats.revenue.toLocaleString()}</span>
                        </h4>
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
                        <p className="text-muted mb-0">Growth</p>
                        <h4 className="text-dark mt-1">
                          <span>{stats.growth}%</span>
                        </h4>
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
                    <h4 className="card-title mb-4">Revenue Analytics</h4>
                    <div className="ms-auto">
                      <Button color="primary" size="sm" onClick={toggleModal}>
                        <i className="bx bx-plus me-1"></i> Add New
                      </Button>
                    </div>
                  </div>
                  <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height="350"
                  />
                </CardBody>
              </Card>
            </Col>

            {/* Progress Cards */}
            <Col xl={4}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Project Progress</h4>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Website Development</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} color="primary" />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Mobile App</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} color="success" />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>UI/UX Design</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} color="warning" />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Testing</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} color="info" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders Table */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Recent Orders</CardTitle>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Status</th>
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
                            <td>{order.amount}</td>
                            <td>
                              <Badge
                                color={
                                  order.status === "Completed"
                                    ? "success"
                                    : order.status === "Pending"
                                    ? "warning"
                                    : "info"
                                }
                                pill
                              >
                                {order.status}
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
          </Row>

          {/* Modal */}
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add New Item</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="itemName">Item Name</Label>
                  <Input
                    type="text"
                    id="itemName"
                    placeholder="Enter item name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="itemDescription">Description</Label>
                  <Input
                    type="textarea"
                    id="itemDescription"
                    placeholder="Enter description"
                    rows="3"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="itemPrice">Price</Label>
                  <Input
                    type="number"
                    id="itemPrice"
                    placeholder="Enter price"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleAddNew}>
                Add Item
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

export default CustomDemo;
