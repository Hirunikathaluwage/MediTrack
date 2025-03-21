
import React, { useState, useEffect } from "react";
import { Table, Spin, message, Tag } from "antd";
import { getOrderByUserId } from "../services/orderService"

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Fetch from local storage or auth context
                if (!userId) {
                    message.error("User not logged in.");
                    return;
                }

                const response = await getOrderByUserId(userId);
                setOrders(response.data);
            } catch (error) {
                console.error(error);
                message.error("Failed to fetch order history.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const columns = [
        { title: "Order ID", dataIndex: "orderId", key: "orderId" },
        { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
        { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status, record) => {
                if (record.paymentMethod === "Upload Slip") {
                    return (
                        <Tag color={status === "Paid" ? "green" : "orange"}>
                            {status === "Pending" ? "Waiting for verification..." : status}
                        </Tag>
                    );
                }
                return <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>;
            },
        },
        {
            title: "Order Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Completed" ? "blue" : "orange"}>{status}</Tag>
            ),
        },
    ];

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            {loading ? (
                <Spin tip="Loading orders..." />
            ) : (
                <Table dataSource={orders} columns={columns} rowKey="orderId" />
            )}
        </div>
    );
};

export default OrderHistory;



