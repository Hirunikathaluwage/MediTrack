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













// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Layout, Menu, Table, Tag, Button, Space, Select, Modal, message } from "antd";
// import { ShoppingCartOutlined, FileSearchOutlined, LogoutOutlined } from "@ant-design/icons";
// import { getAllOrders, handleUpdateOrderStatus, deleteOrder } from "../services/adminOrderService";
// import VerifyPayments from '../pages/VerifyPaymentsPage'

// const { Option } = Select;
// const { Header, Sider, Content } = Layout;

// const AdminOrderDashboard = () => {
//     const navigate = useNavigate();
//     const [collapsed, setCollapsed] = useState(false);
//     const [orders, setOrders] = useState([]);
//     const [filterStatus, setFilterStatus] = useState("All");
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [activeMenuKey, setActiveMenuKey] = useState("1"); // Active menu item

//     // Function to handle menu item click
//     const handleMenuClick = (key) => {
//         setActiveMenuKey(key);  // Update active menu
//     };


//     // Fetch orders from backend on mount
//     useEffect(() => {
//         fetchOrdersData();
//     }, []);

//     const fetchOrdersData = async () => {
//         try {
//             const ordersData = await getAllOrders();
//             setOrders(ordersData);
//         } catch (error) {
//             console.error("Failed to fetch orders:", error);
//             message.error("Failed to load orders");
//         }
//     };

//     const handleStatusChange = (orderId, newStatus) => {
//         const orderToUpdate = orders.find(order => order._id === orderId);

//         // Check if the payment method is COD and update payment status accordingly
//         const newPaymentStatus = (newStatus === 'Completed' && orderToUpdate?.paymentMethod === 'cod') ? 'Completed' : orderToUpdate.paymentStatus;

//         // Send both order status and payment status to the backend
//         handleUpdateOrderStatus(orderId, newStatus, newPaymentStatus)
//             .then((updatedOrder) => {
//                 // Update the orders list with the new status and paymentStatus from the backend response
//                 const updatedOrders = orders.map(order =>
//                     order._id === orderId
//                         ? { ...order, status: updatedOrder.status, paymentStatus: updatedOrder.paymentStatus }
//                         : order
//                 );
//                 setOrders(updatedOrders);
//                 message.success("Status and Payment Status updated successfully.");
//             })
//             .catch(() => message.error("Failed to update status"));
//     };




//     const handleDeleteOrder = (orderId) => {
//         deleteOrder(orderId)
//             .then(() => {
//                 // Remove order from the list
//                 const filteredOrders = orders.filter(order => order._id !== orderId);
//                 setOrders(filteredOrders);
//                 message.success("Order deleted successfully.");
//             })
//             .catch(() => message.error("Failed to delete order"));
//     };

//     const filteredOrders =
//         filterStatus === "All"
//             ? orders
//             : orders.filter(order => order.status === filterStatus);

//     const showOrderDetails = (order) => {
//         setSelectedOrder(order);
//         setIsModalVisible(true);
//     };

//     return (
//         <Layout style={{ minHeight: "100vh" }}>
//             <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
//                 <div className="logo" style={{ color: "white", textAlign: "center", padding: "16px 0" }}>
//                     Admin Panel
//                 </div>
//                 <Menu theme="dark" mode="inline" selectedKeys={[activeMenuKey]} onClick={({ key }) => handleMenuClick(key)}>
//                     <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
//                         Orders
//                     </Menu.Item>
//                     <Menu.Item key="2" icon={<FileSearchOutlined />}>
//                         Verify Payments
//                     </Menu.Item>
//                     <Menu.Item key="3" icon={<LogoutOutlined />}>
//                         Logout
//                     </Menu.Item>
//                 </Menu>
//             </Sider>
//             <Layout className="site-layout">
//                 <Header style={{ background: "#fff", paddingLeft: 24 }}>
//                     <h2>{activeMenuKey === "2" ? "Verify Payments" : "Order Dashboard"}</h2>
//                 </Header>
//                 <Content style={{ margin: "24px 16px" }}>
//                     {/* If "Verify Payments" is selected, render the VerifyPayments component */}
//                     {activeMenuKey === "2" ? (
//                         <VerifyPayments />  // This will show VerifyPayments
//                     ) : (
//                         <>
//                             <Select
//                                 className="mb-4"
//                                 value={filterStatus}
//                                 onChange={setFilterStatus}
//                                 style={{ width: 200, marginBottom: 16 }}
//                             >
//                                 <Option value="All">All Orders</Option>
//                                 <Option value="Requested">Requested</Option>
//                                 <Option value="Approved">Approved</Option>
//                                 <Option value="Completed">Completed</Option>
//                                 <Option value="Cancelled">Cancelled</Option>
//                             </Select>

//                             {/* Order Table */}
//                             <Table dataSource={filteredOrders} rowKey="_id">
//                                 <Table.Column title="Order ID" dataIndex="_id" key="_id" />
//                                 <Table.Column
//                                     title="User"
//                                     dataIndex="userId"
//                                     key="userId"
//                                     render={(userId) => userId?.name || 'N/A'}
//                                 />
//                                 <Table.Column
//                                     title="Branch"
//                                     dataIndex="branchId"
//                                     key="branchId"
//                                     render={(branchId) => branchId?.branchName || 'N/A'}
//                                 />

//                                 <Table.Column title="Total Amount" dataIndex="totalAmount" key="totalAmount" render={(amount) => `Rs. ${amount}`} />
//                                 <Table.Column title="Payment Status" dataIndex="paymentStatus" key="paymentStatus" />

//                                 {/* NEW COLUMN: Payment Method */}
//                                 <Table.Column
//                                     title="Payment Method"
//                                     dataIndex="paymentMethod"
//                                     key="paymentMethod"
//                                     render={(method) => (
//                                         method ? (
//                                             <Tag color={method === "slip" ? "orange" : "green"}>
//                                                 {method.toUpperCase()}
//                                             </Tag>
//                                         ) : (
//                                             <Tag color="default">N/A</Tag> // or you can show "Unknown"
//                                         )
//                                     )}

//                                 />

//                                 <Table.Column title="Delivery Option" dataIndex="deliveryOption" key="deliveryOption" />
//                                 <Table.Column
//                                     title="Status"
//                                     dataIndex="status"
//                                     key="status"
//                                     render={(status) => (
//                                         <Tag color={
//                                             status === "Completed" ? "green"
//                                                 : status === "Requested" ? "orange"
//                                                     : status === "Cancelled" ? "red"
//                                                         : "blue"
//                                         }>
//                                             {status || "Requested"}
//                                         </Tag>
//                                     )}
//                                 />
//                                 <Table.Column
//                                     title="Actions"
//                                     key="actions"
//                                     render={(_, order) => (
//                                         <Space>
//                                             <Button onClick={() => showOrderDetails(order)}>View</Button>
//                                             <Select
//                                                 defaultValue={order.status}
//                                                 onChange={(value) => handleStatusChange(order._id, value)}
//                                                 style={{ width: 120 }}
//                                             >
//                                                 <Option value="Requested">Requested</Option>
//                                                 <Option value="Approved">Approved</Option>
//                                                 <Option value="Completed">Completed</Option>
//                                                 <Option value="Cancelled">Cancelled</Option>
//                                             </Select>
//                                             <Button danger onClick={() => handleDeleteOrder(order._id)}>Delete</Button>
//                                         </Space>
//                                     )}
//                                 />
//                             </Table>

//                             {/* Order Details Modal */}
//                             <Modal
//                                 title="Order Details"
//                                 open={isModalVisible}
//                                 onCancel={() => setIsModalVisible(false)}
//                                 footer={null}
//                             >
//                                 {selectedOrder && (
//                                     <div>
//                                         <p><strong>Order ID:</strong> {selectedOrder._id}</p>
//                                         <p><strong>User:</strong> {selectedOrder.userId?.name || "Unknown"}</p>
//                                         <p><strong>Branch:</strong> {selectedOrder.branchId?.branchName || "N/A"}</p>

//                                         <p><strong>Total Amount:</strong> Rs. {selectedOrder.totalAmount}</p>
//                                         <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
//                                         <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
//                                         <p><strong>Delivery Option:</strong> {selectedOrder.deliveryOption}</p>
//                                         <p><strong>Status:</strong> {selectedOrder.status}</p>
//                                     </div>
//                                 )}
//                             </Modal>
//                         </>
//                     )}
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default AdminOrderDashboard;





































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//     Layout,
//     Menu,
//     Table,
//     Tag,
//     Button,
//     Space,
//     Select,
//     Modal,
//     message,
// } from "antd";
// import {
//     ShoppingCartOutlined,
//     FileSearchOutlined,
//     LogoutOutlined,
// } from "@ant-design/icons";

// const { Option } = Select;
// const { Header, Sider, Content } = Layout;

// const dummyOrders = [
//     {
//         _id: "ORD001",
//         user: { name: "Alice" },
//         branch: { branchName: "Colombo" },
//         totalAmount: 2500,
//         paymentStatus: "Paid",
//         paymentMethod: "slip",
//         deliveryOption: "Pickup",
//         status: "Requested",
//     },
//     {
//         _id: "ORD002",
//         user: { name: "Bob" },
//         branch: { branchName: "Kandy" },
//         totalAmount: 1800,
//         paymentStatus: "Pending",
//         paymentMethod: "cod",
//         deliveryOption: "Delivery",
//         status: "Approved",
//     },
//     {
//         _id: "ORD003",
//         user: { name: "Charlie" },
//         branch: { branchName: "Galle" },
//         totalAmount: 3200,
//         paymentStatus: "Paid",
//         paymentMethod: "slip",
//         deliveryOption: "Delivery",
//         status: "Completed",
//     },
// ];


// const AdminOrderDashboard = () => {
//     const navigate = useNavigate();
//     const [collapsed, setCollapsed] = useState(false);
//     const [orders, setOrders] = useState(dummyOrders);
//     const [filterStatus, setFilterStatus] = useState("All");
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const handleStatusChange = (orderId, newStatus) => {
//         const updatedOrders = orders.map(order =>
//             order._id === orderId ? { ...order, status: newStatus } : order
//         );
//         setOrders(updatedOrders);
//         message.success("Status changed (frontend only)");
//     };

//     const handleDeleteOrder = (orderId) => {
//         const filtered = orders.filter(order => order._id !== orderId);
//         setOrders(filtered);
//         message.success("Order deleted (frontend only)");
//     };

//     const filteredOrders =
//         filterStatus === "All"
//             ? orders
//             : orders.filter(order => order.status === filterStatus);

//     const showOrderDetails = (order) => {
//         setSelectedOrder(order);
//         setIsModalVisible(true);
//     };

//     return (
//         <Layout style={{ minHeight: "100vh" }}>
//             <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
//                 <div className="logo" style={{ color: "white", textAlign: "center", padding: "16px 0" }}>
//                     Admin Panel
//                 </div>
//                 <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//                     <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
//                         Orders
//                     </Menu.Item>
//                     <Menu.Item key="2" icon={<FileSearchOutlined />} onClick={() => navigate("/verify-payments")}>
//                         Verify Payments
//                     </Menu.Item>
//                     <Menu.Item key="3" icon={<LogoutOutlined />}>
//                         Logout
//                     </Menu.Item>
//                 </Menu>
//             </Sider>
//             <Layout className="site-layout">
//                 <Header style={{ background: "#fff", paddingLeft: 24 }}>
//                     <h2>Order Dashboard</h2>
//                 </Header>
//                 <Content style={{ margin: "24px 16px" }}>
//                     {/* Status Filter Dropdown */}
//                     <Select
//                         className="mb-4"
//                         value={filterStatus}
//                         onChange={setFilterStatus}
//                         style={{ width: 200, marginBottom: 16 }}
//                     >
//                         <Option value="All">All Orders</Option>
//                         <Option value="Requested">Requested</Option>
//                         <Option value="Approved">Approved</Option>
//                         <Option value="Completed">Completed</Option>
//                         <Option value="Cancelled">Cancelled</Option>
//                     </Select>

//                     {/* Order Table */}
//                     <Table dataSource={filteredOrders} rowKey="_id">
//                         <Table.Column title="Order ID" dataIndex="_id" key="_id" />
//                         <Table.Column title="User" dataIndex="user" key="user" render={(user) => user?.name || "Unknown"} />
//                         <Table.Column title="Branch" dataIndex="branch" key="branch" render={(branch) => branch?.branchName || "N/A"} />
//                         <Table.Column title="Total Amount" dataIndex="totalAmount" key="totalAmount" render={(amount) => `Rs. ${amount}`} />
//                         <Table.Column title="Payment Status" dataIndex="paymentStatus" key="paymentStatus" />

//                         {/* NEW COLUMN: Payment Method */}
//                         <Table.Column
//                             title="Payment Method"
//                             dataIndex="paymentMethod"
//                             key="paymentMethod"
//                             render={(method) => (
//                                 <Tag color={method === "slip" ? "orange" : "green"}>
//                                     {method.toUpperCase()}
//                                 </Tag>
//                             )}
//                         />


//                         <Table.Column title="Delivery Option" dataIndex="deliveryOption" key="deliveryOption" />
//                         <Table.Column
//                             title="Status"
//                             dataIndex="status"
//                             key="status"
//                             render={(status) => (
//                                 <Tag color={
//                                     status === "Completed" ? "green"
//                                         : status === "Requested" ? "orange"
//                                             : status === "Cancelled" ? "red"
//                                                 : "blue"
//                                 }>
//                                     {status}
//                                 </Tag>
//                             )}
//                         />
//                         <Table.Column
//                             title="Actions"
//                             key="actions"
//                             render={(_, order) => (
//                                 <Space>
//                                     <Button onClick={() => showOrderDetails(order)}>View</Button>
//                                     <Select
//                                         defaultValue={order.status}
//                                         onChange={(value) => handleStatusChange(order._id, value)}
//                                         style={{ width: 120 }}
//                                     >
//                                         <Option value="Requested">Requested</Option>
//                                         <Option value="Approved">Approved</Option>
//                                         <Option value="Completed">Completed</Option>
//                                         <Option value="Cancelled">Cancelled</Option>
//                                     </Select>
//                                     <Button danger onClick={() => handleDeleteOrder(order._id)}>Delete</Button>
//                                 </Space>
//                             )}
//                         />
//                     </Table>

//                     {/* Order Details Modal */}
//                     <Modal
//                         title="Order Details"
//                         open={isModalVisible}
//                         onCancel={() => setIsModalVisible(false)}
//                         footer={null}
//                     >
//                         {selectedOrder && (
//                             <div>
//                                 <p><strong>Order ID:</strong> {selectedOrder._id}</p>
//                                 <p><strong>User:</strong> {selectedOrder.user?.name || "Unknown"}</p>
//                                 <p><strong>Branch:</strong> {selectedOrder.branch?.branchName || "N/A"}</p>
//                                 <p><strong>Total Amount:</strong> Rs. {selectedOrder.totalAmount}</p>
//                                 <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
//                                 <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
//                                 <p><strong>Delivery Option:</strong> {selectedOrder.deliveryOption}</p>
//                                 <p><strong>Status:</strong> {selectedOrder.status}</p>
//                             </div>
//                         )}
//                     </Modal>
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default AdminOrderDashboard;
