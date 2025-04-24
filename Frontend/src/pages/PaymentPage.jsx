import React, { useState, useEffect } from 'react';
import { Button, message, Upload, Space, Radio, Typography, Divider, Card } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadOutlined, CheckCircleOutlined, DollarCircleOutlined, CarOutlined, ShopOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const PaymentPage = () => {
    const { orderId } = useParams(); // Get orderId from URL
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('home');
    const [totalAmount, setTotalAmount] = useState(0); // Store totalAmount in state
    const [cartItems, setCartItems] = useState([]); // Store cartItems

    const userId = "67ddfc9755c1bec1fb5cf57f";
    // Calculate the total amount whenever cartItems or deliveryOption changes
    // const calculateTotalAmount = () => {
    //     if (cartItems && cartItems.length > 0) {
    //         let total = cartItems.reduce((acc, item) => {
    //             return acc + (item.price && item.quantity ? item.price * item.quantity : 0);
    //         }, 0);
    //         if (deliveryOption === 'home') total += 5;
    //         return total;
    //     }
    //     return 0;
    // };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5080/api/orders/${orderId}`);
                if (response.status === 200) {
                    const order = response.data;
                    setCartItems(order.items || []);
                    setTotalAmount(order.totalAmount || 0);
                    setDeliveryOption(order.deliveryOption || 'home');
                } else {
                    console.error('Error fetching order details');
                }
            } catch (error) {
                console.error('An error occurred while fetching order details');
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    // useEffect(() => {
    //     setTotalAmount(calculateTotalAmount());
    // }, [cartItems, deliveryOption]);

    // Handle upload of payment slip
    const handleUploadSlip = (file) => {
        message.success('Slip uploaded successfully. We will verify it shortly.');
        setPaymentOption('Upload Slip');
        return false;
    };

    const handleCODPayment = () => {
        message.success('Cash on Delivery selected.');
        setPaymentOption('COD');
    };


    const proceedToConfirmation = async () => {
        if (!paymentOption) {
            message.error('Please select a payment method.');
            return;
        }

        try {
            // Log the payment data being sent
            console.log("Payment Data: ", {
                paymentMethod: paymentOption === 'Upload Slip' ? 'slip' : 'cod',
                amount: totalAmount,
                verificationStatus: paymentOption === 'Upload Slip' ? 'pending' : 'approved',
                userId,
                orderId
            });

            // Prepare payment data
            const paymentData = {
                paymentMethod: paymentOption === 'Upload Slip' ? 'slip' : 'cod',
                amount: totalAmount,
                verificationStatus: paymentOption === 'Upload Slip' ? 'pending' : 'approved',
                userId,
                orderId
            };

            // Make the POST request to the payment API
            const paymentResponse = await axios.post('http://localhost:5080/api/payments', paymentData);

            // Log the payment response
            console.log('Payment Response:', paymentResponse);

            if (paymentResponse.status === 200) {
                message.success('Payment submitted successfully.');

                const orderUpdateResponse = await axios.put(`http://localhost:5080/api/orders/${orderId}`, {
                    deliveryOption,
                });

                if (orderUpdateResponse.status === 200) {
                    message.success('Payment submitted and delivery option updated successfully!');
                    navigate('/order-confirmation', {
                        state: {
                            cartItems,
                            paymentOption,
                            deliveryOption,
                            totalAmount,
                            orderId
                        }
                    });
                } else {
                    message.error('Payment submitted, but failed to update delivery option.');
                }
            } else {
                message.error('Error submitting the payment.');
            }
        } catch (error) {
            console.error("Error submitting payment:", error);
            message.error('An error occurred while submitting the payment.');
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-start py-10 px-4" style={{
            background: 'linear-gradient(135deg, #e6f7ff 0%, #e6fffa 100%)'
        }}>
            <div className="w-full max-w-3xl">
                <Card
                    className="rounded-lg p-6 shadow-xl"
                    style={{
                        border: '1px solid rgba(0, 128, 128, 0.2)',
                        boxShadow: '0 10px 25px rgba(0, 128, 128, 0.1)'
                    }}
                >
                    <div className="text-center mb-8">
                        <Title level={2} style={{
                            background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            Payment & Delivery
                        </Title>
                        <div className="w-16 h-1 mx-auto mt-2" style={{
                            background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                            borderRadius: '4px'
                        }}></div>
                    </div>

                    {/* Total Amount Section */}
                    <div className="mb-8 p-4 rounded-lg" style={{
                        background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.1), rgba(12, 133, 153, 0.1))'
                    }}>
                        <Title level={4}>
                            <DollarCircleOutlined style={{ color: '#0e9f6e', marginRight: '8px' }} />
                            Total Amount
                        </Title>
                        <Text>Your total amount including delivery charges (if any):</Text>
                        <div className="mt-4 text-xl font-semibold text-center p-3" style={{
                            background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                            color: 'white',
                            borderRadius: '8px'
                        }}>
                            ${isNaN(totalAmount) ? '0.00' : totalAmount.toFixed(2)}  {/* Display total amount here */}
                        </div>
                    </div>

                    <Divider style={{ borderColor: 'rgba(12, 133, 153, 0.2)' }} />

                    {/* Delivery Option Section */}
                    <div className="mb-8">
                        <Title level={4} style={{ color: '#0c8599' }}>
                            <CarOutlined style={{ marginRight: '8px' }} />
                            Choose Delivery Option
                        </Title>
                        <Radio.Group
                            className="mt-4"
                            value={deliveryOption}
                            onChange={(e) => {
                                setDeliveryOption(e.target.value);
                                setPaymentOption(null); // reset payment selection on delivery change
                            }}
                        >
                            <Space direction="vertical" className="w-full">
                                <Radio value="home" style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    backgroundColor: deliveryOption === 'home' ? 'rgba(14, 159, 110, 0.1)' : 'transparent',
                                    width: '100%',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div className="flex items-center">
                                        <CarOutlined style={{ color: '#0e9f6e', marginRight: '8px' }} />
                                        <span>Home Delivery <Text type="secondary">(+ $5.00)</Text></span>
                                    </div>
                                </Radio>
                                <Radio value="pickup" style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    backgroundColor: deliveryOption === 'pickup' ? 'rgba(12, 133, 153, 0.1)' : 'transparent',
                                    width: '100%',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div className="flex items-center">
                                        <ShopOutlined style={{ color: '#0c8599', marginRight: '8px' }} />
                                        <span>Pickup <Text type="secondary">(Free)</Text></span>
                                    </div>
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <Divider style={{ borderColor: 'rgba(14, 159, 110, 0.2)' }} />

                    {/* Payment Option Section */}
                    <div className="mb-8">
                        <Title level={4} style={{ color: '#0e9f6e' }}>
                            <DollarCircleOutlined style={{ marginRight: '8px' }} />
                            Choose Payment Method
                        </Title>
                        <Space direction="vertical" size="middle" className="w-full mt-4">
                            <Button
                                block
                                onClick={handleCODPayment}
                                style={{
                                    height: '50px',
                                    borderRadius: '8px',
                                    border: paymentOption === 'COD' ? 'none' : '1px solid #0e9f6e',
                                    color: paymentOption === 'COD' ? 'white' : '#0e9f6e',
                                    background: paymentOption === 'COD'
                                        ? 'linear-gradient(90deg, #0e9f6e, #0c8599)'
                                        : 'transparent',
                                    fontWeight: 'medium'
                                }}
                                className="hover:shadow-md transition-all duration-300"
                            >
                                Cash on Delivery (COD)
                            </Button>

                            {deliveryOption === 'pickup' && (
                                <Upload
                                    beforeUpload={handleUploadSlip}
                                    showUploadList={false}
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        block
                                        style={{
                                            height: '50px',
                                            borderRadius: '8px',
                                            border: paymentOption === 'Upload Slip' ? 'none' : '1px solid #0c8599',
                                            color: paymentOption === 'Upload Slip' ? 'white' : '#0c8599',
                                            background: paymentOption === 'Upload Slip'
                                                ? 'linear-gradient(90deg, #0e9f6e, #0c8599)'
                                                : 'transparent',
                                            fontWeight: 'medium'
                                        }}
                                    >
                                        Upload Payment Slip
                                    </Button>
                                </Upload>
                            )}
                        </Space>
                    </div>

                    <div className="text-center">
                        <Button
                            type="primary"
                            block
                            size="large"
                            style={{
                                background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                                borderRadius: '8px',
                                color: 'white',
                            }}
                            onClick={proceedToConfirmation}
                        >
                            Proceed to Confirmation
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaymentPage;
