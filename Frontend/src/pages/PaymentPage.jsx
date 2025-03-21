import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Radio, Upload, Button, Descriptions, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createPayment, getOrderById } from "../services/orderService"

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(null); //Fetch total from backend


    useEffect(() => {
        if (order.orderId) {
            fetchOrderDetails();
        }
    }, [order.orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await getOrderById(order.orderId);
            if (response.data.success) {
                setTotalAmount(response.data.order.totalAmount); // Set total amount from backend
            } else {
                message.error("Failed to fetch order details.");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
            message.error("Something went wrong while fetching order details.");
        }
    };

    // Handle payment submission
    const handlePayment = async () => {
        if (!paymentMethod) {
            message.error("Please select a payment method!");
            return;
        }

        if (!order.orderId) {
            message.error("Order ID is missing!");
            return;
        }

        setLoading(true);

        try {
            let paymentData;

            if (paymentMethod === "Upload Slip") {
                if (fileList.length === 0) {
                    message.error("Please upload a payment slip!");
                    setLoading(false);
                    return;
                }

                const formData = new FormData();
                formData.append("orderId", order.orderId);
                formData.append("userId", order.userId);
                formData.append("paymentMethod", paymentMethod);
                formData.append("amount", String(totalAmount));
                formData.append("date", new Date().toISOString());
                formData.append("slip", fileList[0].originFileObj);
                paymentData = formData;
            } else {
                // For COD, send JSON data
                paymentData = {
                    orderId: order.orderId,
                    userId: order.userId,
                    paymentMethod,
                    amount: totalAmount,
                    date: new Date().toISOString(),
                };
            }

            const response = await createPayment(
                paymentData,
                {
                    headers: paymentMethod === "Upload Slip"
                        ? { "Content-Type": "multipart/form-data" }
                        : { "Content-Type": "application/json" },
                }
            );

            console.log("Payment Response:", response.data);

            if (response.data.success) {
                if (paymentMethod === "Upload Slip") {
                    message.info("Your payment slip has been uploaded and is pending verification.");
                } else {
                    message.success("Payment successful!");

                    setTimeout(() => {
                        if (order.deliveryOption === "Home Delivery") {
                            navigate("/delivery-management", { state: { orderId: order.orderId } });
                        } else {
                            navigate("/order-confirmation", { state: { orderId: order.orderId } });
                        }
                    }, 2000);
                }
            }
            else {
                message.error("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            message.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!order.orderId) {
        return <div className="text-center text-red-500 mt-10">No order details found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Card title="Order Payment" className="shadow-md border rounded-lg">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Order ID">{order.orderId}</Descriptions.Item>
                    <Descriptions.Item label="Total Amount">Rs. {totalAmount !== null ? totalAmount : "Loading..."}</Descriptions.Item>
                    <Descriptions.Item label="Delivery Option">{order.deliveryOption}</Descriptions.Item>
                </Descriptions>

                <h3 className="mt-4 font-semibold">Select Payment Method:</h3>
                <Radio.Group className="mt-2" onChange={(e) => setPaymentMethod(e.target.value)}>
                    <Radio value="COD">Cash on Delivery (COD)</Radio>
                    <Radio value="Upload Slip">Upload Bank Slip</Radio>
                </Radio.Group>

                {paymentMethod === "Upload Slip" && (
                    <Upload
                        fileList={fileList}
                        beforeUpload={(file) => {
                            setFileList([file]);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />} className="mt-3">
                            Upload Slip
                        </Button>
                    </Upload>
                )}

                <Button type="primary" className="mt-4 w-full" onClick={handlePayment} loading={loading}>
                    Confirm Payment
                </Button>
            </Card>
        </div>
    );
};

export default PaymentPage;


