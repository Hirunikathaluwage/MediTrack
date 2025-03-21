import React from "react";
import { Card, Tag } from "antd";

const OrderCard = ({ order }) => {
    return (
        <Card className="shadow-md border rounded-lg mb-4">
            <p className="text-lg font-semibold">Order ID: {order.orderId}</p>
            <p>Total Amount: Rs. {order.amount}</p>
            <p>Delivery: {order.deliveryOption}</p>
            <Tag color={order.paymentStatus === "Paid" ? "green" : "red"}>{order.paymentStatus}</Tag>
            <Tag color={order.orderStatus === "Completed" ? "blue" : "orange"}>{order.orderStatus}</Tag>
        </Card>
    );
};

export default OrderCard;
