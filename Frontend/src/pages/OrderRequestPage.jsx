import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Radio, Button, Table, message } from "antd";
import { createOrder } from "../services/orderService"

const OrderRequestPage = () => {
    const [deliveryOption, setDeliveryOption] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Prescription ID & User ID should be passed from the previous page 
    const { prescriptionId, userId, medicines, branch } = location.state || {};

    const columns = [
        { title: "Medicine", dataIndex: "name", key: "name" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
        { title: "Price", dataIndex: "price", key: "price" }
    ];

    const handlePlaceOrder = async () => {
        if (!deliveryOption) {
            message.error("Please select a delivery option.");
            return;
        }

        try {
            const response = await createOrder({
                userId,
                prescriptionId,
                deliveryOption
            });

            if (response.data.success) {
                message.success("Order placed successfully!");

                // Navigate to Payment Page with Order Details
                navigate("/payment", {
                    state: {
                        orderId: response.data.order._id,
                        deliveryOption
                    }
                });
            } else {
                message.error(response.data.message || "Failed to place order.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            message.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card title="Order Request" className="w-full max-w-2xl shadow-lg">
                <p className="text-lg font-semibold">Branch: {branch || "N/A"}</p>
                <Table dataSource={medicines} columns={columns} rowKey="id" pagination={false} className="my-4" />


                <div className="my-4">
                    <h3 className="text-lg font-semibold mb-2">Select Delivery Option:</h3>
                    <Radio.Group onChange={(e) => setDeliveryOption(e.target.value)}>
                        <Radio value="Home Delivery">Home Delivery</Radio>
                        <Radio value="Pharmacy Pickup">Pharmacy Pickup</Radio>
                    </Radio.Group>
                </div>

                <Button type="primary" block disabled={!deliveryOption} onClick={handlePlaceOrder}>
                    Place Order
                </Button>
            </Card>
        </div>
    );
};

export default OrderRequestPage;





