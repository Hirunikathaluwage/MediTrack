import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, List, Space, Row, Col } from 'antd';

const { Title, Text } = Typography;

const ReserveConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const reservedItems = location.state?.reservedItems || []; // Changed to support multiple reserved items

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
            <div className="w-full max-w-3xl">
                <Card
                    className="shadow-lg rounded-xl p-8 bg-white"
                    style={{ borderRadius: '20px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
                >
                    <Title level={2} className="text-center text-green-600 mb-6">
                        Reservation Successful
                    </Title>

                    <Divider />

                    {reservedItems.length > 0 ? (
                        <>
                            <Text className="text-lg text-gray-800 mb-4 block text-center">
                                You have successfully reserved the following items:
                            </Text>
                            <List
                                size="large"
                                bordered
                                dataSource={reservedItems}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{
                                            border: '1px solid #EAEAEA',
                                            borderRadius: '8px',
                                            marginBottom: '10px',
                                            padding: '12px 16px',
                                        }}
                                    >
                                        <Text strong className="text-blue-600">
                                            {item.name}
                                        </Text>{' '}
                                        - <Text className="text-gray-600">{item.quantity} units</Text>
                                    </List.Item>
                                )}
                            />
                            <Space direction="vertical" className="mt-4 text-center w-full">
                                <Text className="text-gray-600">
                                    We will notify you once these items are back in stock. Thank you for your patience!
                                </Text>
                            </Space>
                        </>
                    ) : (
                        <Text type="danger" className="text-center block mb-6">
                            No reserved items found. Please try again later.
                        </Text>
                    )}

                    <Row justify="center" className="mt-6">
                        <Col span={24}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                onClick={() => navigate('/')}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    borderColor: '#4CAF50',
                                    fontSize: '16px',
                                }}
                            >
                                Back to Home
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default ReserveConfirmation;
