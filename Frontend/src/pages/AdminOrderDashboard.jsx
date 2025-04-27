import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Table, Tag, Button, Space, Select, Modal, message } from "antd";
import { ShoppingCartOutlined, FileSearchOutlined, ApartmentOutlined } from "@ant-design/icons";
import { getAllOrders, handleUpdateOrderStatus, deleteOrder } from "../services/adminOrderService";
import VerifyPayments from '../pages/VerifyPaymentsPage';
import ManageReservationsPage from '../pages/ManageReservationsPage';


const { Option } = Select;
const { Header, Sider, Content } = Layout;

const AdminOrderDashboard = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeMenuKey, setActiveMenuKey] = useState("1");

    const handleMenuClick = (key) => {
        setActiveMenuKey(key);
    };

    useEffect(() => {
        fetchOrdersData();
    }, []);

    const fetchOrdersData = async () => {
        try {
            const ordersData = await getAllOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            message.error("Failed to load orders");
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        const orderToUpdate = orders.find(order => order._id === orderId);

        const newPaymentStatus = (newStatus === 'Completed' && orderToUpdate?.paymentMethod === 'cod') ? 'Completed' : orderToUpdate.paymentStatus;

        handleUpdateOrderStatus(orderId, newStatus, newPaymentStatus)
            .then((updatedOrder) => {

                const updatedOrders = orders.map(order =>
                    order._id === orderId
                        ? { ...order, status: updatedOrder.status, paymentStatus: updatedOrder.paymentStatus }
                        : order
                );
                setOrders(updatedOrders);
                message.success("Status and Payment Status updated successfully.");
            })
            .catch(() => message.error("Failed to update status"));
    };

    const handleDeleteOrder = (orderId) => {
        deleteOrder(orderId)
            .then(() => {
                const filteredOrders = orders.filter(order => order._id !== orderId);
                setOrders(filteredOrders);
                message.success("Order deleted successfully.");
            })
            .catch(() => message.error("Failed to delete order"));
    };

    const filteredOrders =
        filterStatus === "All"
            ? orders
            : orders.filter(order => order.status === filterStatus);

    const showOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" style={{ color: "white", textAlign: "center", padding: "16px 0" }}>
                    Admin Panel
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[activeMenuKey]} onClick={({ key }) => handleMenuClick(key)}>
                    <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
                        Orders
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileSearchOutlined />}>
                        Verify Payments
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ApartmentOutlined />}>
                        Reservations
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ background: "#fff", paddingLeft: 24 }}>
                    <h2>{activeMenuKey === "2" ? "Verify Payments" : activeMenuKey === "3" ? "Reservations" : "Order Dashboard"}</h2>
                </Header>
                <Content style={{ margin: "24px 16px" }}>
                    {/* If "Verify Payments" is selected, render the VerifyPayments component */}
                    {activeMenuKey === "2" ? (
                        <VerifyPayments />
                    ) : activeMenuKey === "3" ? (
                        <ManageReservationsPage />

                    ) : (
                        <>
                            <Select
                                className="mb-4"
                                value={filterStatus}
                                onChange={setFilterStatus}
                                style={{ width: 200, marginBottom: 16 }}
                            >
                                <Option value="All">All Orders</Option>
                                <Option value="Requested">Requested</Option>
                                <Option value="Approved">Approved</Option>
                                <Option value="Completed">Completed</Option>
                                <Option value="Cancelled">Cancelled</Option>
                            </Select>

                            {/* Order Table */}
                            <Table dataSource={filteredOrders} rowKey="_id">
                                <Table.Column title="Order ID" dataIndex="_id" key="_id" />
                                <Table.Column
                                    title="User"
                                    dataIndex="userId"
                                    key="userId"
                                    render={(userId) => userId?.name || 'N/A'}
                                />
                                <Table.Column
                                    title="Branch"
                                    dataIndex="branchId"
                                    key="branchId"
                                    render={(branchId) => branchId?.branchName || 'N/A'}
                                />

                                <Table.Column title="Total Amount" dataIndex="totalAmount" key="totalAmount" render={(amount) => `Rs. ${amount}`} />
                                <Table.Column title="Payment Status" dataIndex="paymentStatus" key="paymentStatus" />

                                {/*Payment Method */}
                                <Table.Column
                                    title="Payment Method"
                                    dataIndex="paymentMethod"
                                    key="paymentMethod"
                                    render={(method) => (
                                        method ? (
                                            <Tag color={method === "slip" ? "orange" : "green"}>
                                                {method.toUpperCase()}
                                            </Tag>
                                        ) : (
                                            <Tag color="default">N/A</Tag>
                                        )
                                    )}
                                />

                                <Table.Column title="Delivery Option" dataIndex="deliveryOption" key="deliveryOption" />
                                <Table.Column
                                    title="Status"
                                    dataIndex="status"
                                    key="status"
                                    render={(status) => (
                                        <Tag color={status === "Completed" ? "green"
                                            : status === "Requested" ? "orange"
                                                : status === "Cancelled" ? "red"
                                                    : "blue"}>
                                            {status || "Requested"}
                                        </Tag>
                                    )}
                                />
                                <Table.Column
                                    title="Actions"
                                    key="actions"
                                    render={(_, order) => (
                                        <Space>
                                            <Button onClick={() => showOrderDetails(order)}>View</Button>
                                            <Select
                                                defaultValue={order.status}
                                                onChange={(value) => handleStatusChange(order._id, value)}
                                                style={{ width: 120 }}
                                            >
                                                <Option value="Requested">Requested</Option>
                                                <Option value="Approved">Approved</Option>
                                                <Option value="Completed">Completed</Option>
                                                <Option value="Cancelled">Cancelled</Option>
                                            </Select>
                                            <Button danger onClick={() => handleDeleteOrder(order._id)}>Delete</Button>
                                        </Space>
                                    )}
                                />
                            </Table>

                            {/* Order Details Modal */}
                            <Modal
                                title="Order Details"
                                open={isModalVisible}
                                onCancel={() => setIsModalVisible(false)}
                                footer={null}
                            >
                                {selectedOrder && (
                                    <div>
                                        <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                                        <p><strong>User:</strong> {selectedOrder.userId?.name || "Unknown"}</p>
                                        <p><strong>Branch:</strong> {selectedOrder.branchId?.branchName || "N/A"}</p>

                                        <p><strong>Total Amount:</strong> Rs. {selectedOrder.totalAmount}</p>
                                        <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                                        <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                                        <p><strong>Delivery Option:</strong> {selectedOrder.deliveryOption}</p>
                                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                                    </div>
                                )}
                            </Modal>
                        </>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminOrderDashboard;










