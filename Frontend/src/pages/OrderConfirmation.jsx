import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Descriptions, Result } from "antd";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state || {};

    if (!order.orderId) {
        return <div className="text-center text-red-500 mt-10">No order details found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Card className="shadow-md border rounded-lg">
                <Result
                    status="success"
                    title="Order Placed Successfully!"
                    subTitle={`Your order (ID: ${order.orderId}) has been placed.`}
                />
                <Descriptions bordered column={1} className="mt-4">
                    <Descriptions.Item label="Order ID">{order.orderId}</Descriptions.Item>
                    <Descriptions.Item label="Total Amount">Rs. {order.totalAmount}</Descriptions.Item>
                    <Descriptions.Item label="Payment Method">{order.paymentMethod}</Descriptions.Item>
                    <Descriptions.Item label="Delivery Option">{order.deliveryOption}</Descriptions.Item>
                </Descriptions>

                <Button
                    type="primary"
                    className="mt-4 w-full"
                    onClick={() => navigate("/order-history")}
                >
                    Go to Order History
                </Button>
            </Card>
        </div>
    );
};

export default OrderConfirmation;
