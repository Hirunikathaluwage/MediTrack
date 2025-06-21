import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, Space, Result } from 'antd';
import { CheckCircleOutlined, HistoryOutlined, HomeOutlined, ShoppingOutlined, CreditCardOutlined, CarOutlined, ShopOutlined, DollarCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, paymentOption, deliveryOption, totalAmount } = location.state || {};

    return (
        <div className="min-h-screen flex justify-center items-center p-4" style={{
            background: 'linear-gradient(135deg, #e6f7ff 0%, #e6fffa 100%)'
        }}>
            <div className="w-full max-w-3xl">
                <Card
                    className="rounded-lg shadow-xl"
                    style={{
                        border: '1px solid rgba(0, 128, 128, 0.2)',
                        boxShadow: '0 10px 25px rgba(0, 128, 128, 0.1)'
                    }}
                >
                    <Result
                        icon={<CheckCircleOutlined style={{ color: '#0e9f6e' }} />}
                        title={
                            <div style={{
                                background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold'
                            }}>
                                Your Order Has Been Placed Successfully!
                            </div>
                        }
                        subTitle={
                            <Text style={{ fontSize: '16px' }}>
                                You'll receive a confirmation soon with the delivery details.
                            </Text>
                        }
                    />

                    <Divider style={{ borderColor: 'rgba(12, 133, 153, 0.2)' }} />

                    <div className="mb-6 p-4 rounded-lg" style={{
                        background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                    }}>
                        <Title level={4} style={{ color: '#0c8599' }}>
                            <ShoppingOutlined style={{ marginRight: '8px' }} />
                            Order Summary
                        </Title>

                        {cartItems && cartItems.length > 0 ? (
                            <ul className="list-disc pl-8 mt-4">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="mb-2">
                                        <Text style={{ fontSize: '16px' }}>{item.name}</Text> — Qty:
                                        <Text strong style={{
                                            color: '#0e9f6e',
                                            marginLeft: '4px'
                                        }}>
                                            {item.quantity}
                                        </Text>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Text type="secondary">No items in your order.</Text>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 rounded-lg" style={{
                            background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                        }}>
                            <Title level={5} style={{ color: '#0c8599' }}>
                                <CreditCardOutlined style={{ marginRight: '8px' }} />
                                Payment Method
                            </Title>
                            <Text style={{ color: '#0e9f6e', fontWeight: 'medium' }}>
                                {paymentOption || "Not selected"}
                            </Text>
                        </div>

                        <div className="p-4 rounded-lg" style={{
                            background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                        }}>
                            <Title level={5} style={{ color: '#0c8599' }}>
                                {deliveryOption === 'home' ?
                                    <CarOutlined style={{ marginRight: '8px' }} /> :
                                    <ShopOutlined style={{ marginRight: '8px' }} />
                                }
                                Delivery Method
                            </Title>
                            <Text style={{ color: '#0e9f6e', fontWeight: 'medium' }}>
                                {deliveryOption === 'home' ? "Home Delivery" : "Pickup"}
                            </Text>
                        </div>

                        <div className="p-4 rounded-lg" style={{
                            background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                        }}>
                            <Title level={5} style={{ color: '#0c8599' }}>
                                <DollarCircleOutlined style={{ marginRight: '8px' }} />
                                Total Amount
                            </Title>
                            <Text className="text-lg font-semibold" style={{ color: '#0e9f6e' }}>
                                ${totalAmount?.toFixed(2)}
                            </Text>
                        </div>
                    </div>

                    <Divider style={{ borderColor: 'rgba(14, 159, 110, 0.2)' }} />

                    <div className="text-center p-4">
                        <Space size="middle">
                            <Button
                                size="large"
                                icon={<HistoryOutlined />}
                                onClick={() => navigate('/order-history')}
                                style={{
                                    height: '44px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                                    color: 'white',
                                    fontWeight: 'medium',
                                    boxShadow: '0 4px 15px rgba(14, 159, 110, 0.3)'
                                }}
                                className="hover:shadow-lg transition-all duration-300"
                            >
                                View Order History
                            </Button>

                            <Button
                                size="large"
                                icon={deliveryOption === 'home' ? <CarOutlined /> : <HomeOutlined />}
                                onClick={() => {
                                    if (deliveryOption === 'home') {
                                        navigate('/delivery-form');
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                style={{
                                    height: '44px',
                                    borderRadius: '8px',
                                    border: deliveryOption === 'home' ? '1px solid #0e9f6e' : '1px solid #0c8599',
                                    color: deliveryOption === 'home' ? '#0e9f6e' : '#0c8599',
                                    fontWeight: 'medium',
                                }}
                                className="hover:shadow-md transition-all duration-300"
                            >
                                {deliveryOption === 'home' ? 'Go to Delivery' : 'Go to Home'}
                            </Button>

                        </Space>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OrderConfirmation;