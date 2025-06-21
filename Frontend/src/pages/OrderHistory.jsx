import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Typography, Empty, Divider, Tag } from 'antd';
import { HistoryOutlined, HomeOutlined, ShopOutlined, DollarCircleOutlined, CreditCardOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = "680b51cc9304025f19b2d7d1";
                const response = await axios.get(`http://localhost:5080/api/orders/user/${userId}`);
                console.log("Fetched Orders:", response.data);
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen p-6 flex justify-center" style={{
            background: 'linear-gradient(135deg, #e6f7ff 0%, #e6fffa 100%)'
        }}>
            <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                    <Title level={2} style={{
                        background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold'
                    }}>
                        <HistoryOutlined className="mr-2" />
                        Order History
                    </Title>
                    <div className="w-16 h-1 mx-auto mt-2" style={{
                        background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                        borderRadius: '4px'
                    }}></div>
                </div>

                {orders.length === 0 ? (
                    <Empty description="You have no past orders." />
                ) : (
                    <List
                        itemLayout="vertical"
                        dataSource={orders}
                        renderItem={(order) => (
                            <Card
                                key={order.id}
                                className="mb-6 rounded-lg"
                                style={{
                                    border: '1px solid rgba(0, 128, 128, 0.2)',
                                    boxShadow: '0 6px 15px rgba(0, 128, 128, 0.1)'
                                }}
                                title={(
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold" style={{ color: '#0c8599' }}>
                                            <ShoppingOutlined className="mr-2" />
                                            Order ID: {order._id}
                                        </span>
                                        <Tag color="#0e9f6e" style={{ borderRadius: '12px', padding: '2px 10px' }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </Tag>
                                    </div>
                                )}

                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="p-3 rounded-lg" style={{
                                        background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                                    }}>
                                        <Text type="secondary">Delivery Method</Text>
                                        <div className="flex items-center mt-2">
                                            {order.deliveryOption === 'Home Delivery' ? (
                                                <HomeOutlined style={{ color: '#0e9f6e', marginRight: '8px' }} />
                                            ) : (
                                                <ShopOutlined style={{ color: '#0c8599', marginRight: '8px' }} />
                                            )}
                                            <Text strong style={{ color: '#0e9f6e' }}>
                                                {order.deliveryOption}
                                            </Text>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg" style={{
                                        background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                                    }}>
                                        <Text type="secondary">Payment Method</Text>
                                        <div className="flex items-center mt-2">
                                            <CreditCardOutlined style={{ color: '#0c8599', marginRight: '8px' }} />
                                            <Text strong style={{ color: '#0e9f6e' }}>
                                                {order.paymentOption}
                                            </Text>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg" style={{
                                        background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))'
                                    }}>
                                        <Text type="secondary">Total Amount</Text>
                                        <div className="flex items-center mt-2">
                                            <DollarCircleOutlined style={{ color: '#0e9f6e', marginRight: '8px' }} />
                                            <Text strong className="text-lg" style={{ color: '#0e9f6e' }}>
                                                ${order.totalAmount.toFixed(2)}
                                            </Text>
                                        </div>
                                    </div>
                                </div>

                                <Divider style={{ borderColor: 'rgba(12, 133, 153, 0.2)' }} />

                                <div>
                                    <Title level={5} style={{ color: '#0c8599' }}>
                                        <ShoppingOutlined style={{ marginRight: '8px' }} />
                                        Items Ordered
                                    </Title>
                                    <List
                                        dataSource={order.items}
                                        size="small"
                                        renderItem={(item) => (
                                            <List.Item style={{ padding: '12px 0' }}>
                                                <div className="flex justify-between w-full items-center">
                                                    <div>
                                                        <Text style={{ fontSize: '15px' }}>{item.medicineId}</Text> {/* showing ID for now */}
                                                        <Tag style={{
                                                            marginLeft: '8px',
                                                            backgroundColor: 'rgba(14, 159, 110, 0.1)',
                                                            color: '#0e9f6e',
                                                            border: 'none'
                                                        }}>
                                                            x{item.quantity}
                                                        </Tag>
                                                    </div>
                                                    <Text strong style={{ color: '#0c8599' }}>
                                                        ${(item.price).toFixed(2)}
                                                    </Text>
                                                </div>
                                            </List.Item>
                                        )}
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.02), rgba(12, 133, 153, 0.02))',
                                            borderRadius: '8px',
                                            padding: '0 16px'
                                        }}
                                    />
                                </div>
                            </Card>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderHistory;