import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, List, Space, Row, Col, InputNumber, message } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const ReserveConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialReservedItems = location.state || [];
    const [reservationConfirmed, setReservationConfirmed] = useState(false);

    const [reservedItems, setReservedItems] = useState(initialReservedItems);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle quantity change
    const handleQuantityChange = (index, value) => {
        const updatedItems = [...reservedItems];
        updatedItems[index].quantity = value;
        setReservedItems(updatedItems);
    };

    const handleSubmit = async () => {
        console.log("Submitting reservation...");
        console.log("Reserved Items:", reservedItems);
        setIsSubmitting(true);

        // Check if reservationId exists for each item
        if (!reservedItems[0]?.reservationId) {
            message.error('Reservation ID is missing. Please try again.');
            setIsSubmitting(false);
            return;
        }

        try {
            const reservationId = reservedItems[0].reservationId;

            if (!reservedItems[0]?.reservationId) {
                message.error('Reservation ID is missing. Please try again.');
                setIsSubmitting(false);
                return;
            }

            const response = await axios.put(`http://localhost:5080/api/reserve/update/${reservationId}`, {
                items: reservedItems.map(item => ({
                    medicineId: item.id,
                    quantity: item.quantity
                }))
            });
            console.log("API Response:", response.data);
            if (response.data.success) {
                message.success('Reservation updated successfully! We will notify you once the items are back in stock.');
                setReservationConfirmed(true);
            } else {
                message.error(response.data.message || 'Failed to update reservation');
            }
        } catch (error) {
            message.error('Error updating reservation');
            console.error(error);
        }

        setIsSubmitting(false);
    };


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
                                renderItem={(item, index) => (
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

                                        <InputNumber
                                            min={1}
                                            defaultValue={item.quantity}
                                            onChange={(value) => handleQuantityChange(index, value)}
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Space direction="vertical" className="mt-4 text-center w-full">
                                <Text className="text-gray-600">
                                    You can adjust the quantity of each item before confirming.
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
                            {reservationConfirmed ? (
                                <Button
                                    type="default"
                                    size="large"
                                    block
                                    onClick={() => navigate('/')}
                                    style={{
                                        fontSize: '16px',
                                        borderColor: '#4CAF50',
                                        color: '#4CAF50',
                                    }}
                                >
                                    Back to Medicines
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        borderColor: '#4CAF50',
                                        fontSize: '16px',
                                    }}
                                >
                                    {isSubmitting ? 'Updating...' : 'Confirm Reservation'}
                                </Button>
                            )}
                        </Col>
                    </Row>

                </Card>
            </div>
        </div>
    );
};

export default ReserveConfirmation;
