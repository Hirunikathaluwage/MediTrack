import React, { useState, useEffect } from 'react';
import {
    Button, InputNumber, Card, Typography, Empty, Divider, message, Spin
} from 'antd';
import {
    ShoppingCartOutlined, DeleteOutlined, DollarCircleOutlined,
    MinusCircleOutlined, PlusCircleOutlined, ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const CartPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;


    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const prescriptionId = queryParams.get('id');
    const branchId = queryParams.get('branch');

    console.log(prescriptionId, branchId);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5080/api/cart`, { params: { userId } });
                console.log(res.data);
                setCartItems(res.data.items || []);
                console.log("Cart Items:", res.data.items);
            } catch (error) {
                console.error("Error fetching cart:", error);
                message.error("Failed to load cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const updateQuantity = async (itemId, quantity) => {
        try {
            await axios.put(`http://localhost:5080/api/cart/item/${itemId}`, { quantity });
            setCartItems(prev =>
                prev.map(item =>
                    item._id === itemId ? { ...item, quantity } : item
                )
            );
            message.success('Quantity updated');
        } catch (error) {
            console.error("Error updating quantity:", error);
            message.error("Failed to update quantity");
        }
    };


    // Remove item from backend cart
    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5080/api/cart/item/${itemId}`);
            setCartItems(prev => prev.filter(item => item._id !== itemId));
            message.success('Item removed');
        } catch (error) {
            console.error("Error removing item:", error);
            message.error("Failed to remove item");
        }
    };


    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    };

    const handleProceedToPayment = async () => {
        try {

            const deliveryOption = 'pending';

            // Get branchId from URL 
            const branchId = new URLSearchParams(window.location.search).get('branch');

            if (!branchId) {
                message.error('Branch ID is required');
                return;
            }

            const response = await axios.post('http://localhost:5080/api/orders/create', {
                userId,
                branchId,
                deliveryOption,
            });

            navigate(`/payment/${response.data._id}`);
        } catch (error) {
            console.error('Error proceeding to payment', error);
            message.error('Failed to proceed to payment');
        }
    };


    return (
        <div className="min-h-screen py-10 px-4 flex justify-center" style={{
            background: 'linear-gradient(135deg, #e6f7ff 0%, #e6fffa 100%)'
        }}>
            <div className="w-full max-w-4xl rounded-lg shadow-xl p-6" style={{
                background: 'white',
                border: '1px solid rgba(0, 128, 128, 0.2)',
                boxShadow: '0 10px 25px rgba(0, 128, 128, 0.1)'
            }}>
                <div className="text-center mb-8">
                    <Title level={2} style={{
                        background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold'
                    }}>
                        <ShoppingCartOutlined className="mr-2" />
                        Your Cart
                    </Title>
                    <div className="w-16 h-1 mx-auto mt-2" style={{
                        background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                        borderRadius: '4px'
                    }}></div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <Spin size="large" />
                        <div className="mt-4" style={{ color: '#0c8599' }}>Loading your cart...</div>
                    </div>
                ) : cartItems.length === 0 ? (
                    <Empty
                        description={<span style={{ color: '#0c8599', fontSize: '16px' }}>Your cart is currently empty.</span>}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{
                            padding: '40px',
                            background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))',
                            borderRadius: '8px'
                        }}
                    />
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <Card
                                key={item._id}
                                className="mb-4"
                                style={{ borderRadius: '8px' }}
                                title={
                                    <div className="flex items-center">
                                        <ShoppingCartOutlined style={{ marginRight: 8, color: '#0e9f6e' }} />
                                        <Text strong style={{ color: '#0c8599' }}>{item.name}</Text>
                                    </div>
                                }
                                extra={
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeFromCart(item._id)} // Corrected to use _id
                                        danger
                                    >
                                        Remove
                                    </Button>
                                }
                            >
                                <div className="flex justify-between items-center flex-wrap gap-4">
                                    <Text>
                                        <DollarCircleOutlined style={{ color: '#0e9f6e' }} /> Unit Price: <strong>
                                            {item.unitPrice ? `$${item.unitPrice.toFixed(2)}` : 'N/A'}
                                        </strong>
                                    </Text>

                                    <div className="flex items-center gap-2">
                                        <Text>Quantity:</Text>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #0e9f6e', borderRadius: 6 }}>
                                            <Button
                                                icon={<MinusCircleOutlined />}
                                                type="text"
                                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                            />
                                            <InputNumber
                                                min={1}
                                                value={item.quantity}
                                                onChange={(value) => updateQuantity(item._id, value)}
                                                controls={false}
                                                style={{ width: 50, border: 'none', textAlign: 'center' }}
                                            />
                                            <Button
                                                icon={<PlusCircleOutlined />}
                                                type="text"
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            />
                                        </div>
                                    </div>

                                    <Text>
                                        Total: <strong style={{ color: '#0e9f6e' }}>${(item.unitPrice * item.quantity).toFixed(2)}</strong>
                                    </Text>
                                </div>
                            </Card>
                        ))}

                        <Divider />

                        <div className="flex justify-between items-center p-4" style={{
                            background: 'linear-gradient(135deg, rgba(14, 159, 110, 0.05), rgba(12, 133, 153, 0.05))',
                            borderRadius: 8
                        }}>
                            <Title level={4} style={{ margin: 0, color: '#0c8599' }}>Grand Total:</Title>
                            <Title level={3} style={{
                                margin: 0,
                                background: 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                ${calculateTotal().toFixed(2)}
                            </Title>
                        </div>

                        <div className="text-center mt-6">
                            <Button
                                type="primary"
                                icon={<ArrowRightOutlined />}
                                size="large"
                                onClick={handleProceedToPayment}
                                disabled={cartItems.length === 0}
                                style={{
                                    background: cartItems.length === 0 ? '#ccc' : 'linear-gradient(90deg, #0e9f6e, #0c8599)',
                                    color: '#fff',
                                    borderRadius: '8px',
                                    padding: '12px 30px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Proceed to Payment
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
