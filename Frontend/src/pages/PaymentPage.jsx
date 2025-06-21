import React, { useState, useEffect } from 'react';
import { Button, message, Upload, Space, Radio, Typography, Divider, Card, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadOutlined, CheckCircleOutlined, DollarCircleOutlined, CarOutlined, ShopOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const URL = "http://localhost:5080/payment";
const { Title, Text } = Typography;

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [paymentOption, setPaymentOption] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('home');
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [baseAmount, setBaseAmount] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const [fileList, setFileList] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [slipImage, setSlipImage] = useState(null);

    const userId = "680b51cc9304025f19b2d7d1";

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5080/api/orders/${orderId}`);
                const order = response.data;
                setCartItems(order.items || []);
                setBaseAmount(order.totalAmount || 0);

                setDeliveryOption(order.deliveryOption || 'home');
            } catch (error) {
                console.error('An error occurred while fetching order details');
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    // Update total amount dynamically based on delivery option
    useEffect(() => {
        let total = baseAmount;
        if (deliveryOption === 'home') total += 5;
        setTotalAmount(total);
    }, [baseAmount, deliveryOption]);

    // Handle upload of payment slip
    const handleUploadSlip = async (file) => {

        if (paymentOption === 'slip') {
            message.error('Payment slip has already been uploaded.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('slipImage', file);
            formData.append('paymentMethod', 'slip');
            formData.append('amount', totalAmount);
            formData.append('verificationStatus', 'pending');
            formData.append('userId', userId);
            formData.append('orderId', orderId);

            const response = await axios.post('http://localhost:5080/api/payments/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                message.success('Slip uploaded successfully.');
                setSlipImage(file);
                setPaymentOption('slip');
            } else {
                message.error('Failed to upload slip.');
            }
        } catch (error) {
            console.error('Error uploading slip:', error);
            message.error('Error uploading slip.');
        }

        return false; // prevent Ant Design from uploading automatically
    };


    const handleCODPayment = () => {
        message.success('Cash on Delivery selected.');
        setPaymentOption('cod');
    };


    const proceedToConfirmation = async () => {
        if (!paymentOption) {
            message.error('Please select a payment method.');
            return;
        }

        try {
            // If already uploaded slip, skip creating payment again
            if (paymentOption !== 'slip') {
                const paymentData = {
                    paymentMethod: paymentOption,
                    amount: totalAmount,
                    verificationStatus: paymentOption === 'slip' ? 'pending' : 'approved',
                    userId,
                    orderId
                };

                const paymentResponse = await axios.post('http://localhost:5080/api/payments', paymentData);

                if (paymentResponse.status !== 200) {
                    message.error('Error submitting the payment.');
                    return;
                }
            }

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
                            Payment
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
                                setPaymentOption(null);
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
                                    border: paymentOption === 'cod' ? 'none' : '1px solid #0e9f6e',
                                    color: paymentOption === 'cod' ? 'white' : '#0e9f6e',
                                    background: paymentOption === 'cod'
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
                                    customRequest={({ file, onSuccess, onError }) => {
                                        handleUploadSlip(file)
                                            .then(() => {
                                                onSuccess("ok");
                                            })
                                            .catch((err) => {
                                                console.error(err);
                                                onError(err);
                                            });
                                    }}
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        block
                                        style={{
                                            height: '50px',
                                            borderRadius: '8px',
                                            border: paymentOption === 'slip' ? 'none' : '1px solid #0c8599',
                                            color: paymentOption === 'slip' ? 'white' : '#0c8599',
                                            background: paymentOption === 'slip'
                                                ? 'linear-gradient(90deg, #0c8599, #0e9f6e)'
                                                : 'transparent',
                                            fontWeight: 'medium',
                                            marginTop: '8px'
                                        }}
                                        disabled={paymentOption === 'slip'}
                                        className="hover:shadow-md transition-all duration-300"
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
                            disabled={!paymentOption}
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
