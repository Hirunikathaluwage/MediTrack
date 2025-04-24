import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, message, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const MedicineList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [medicines, setMedicines] = useState([]); // State to hold medicines data
    const navigate = useNavigate();

    useEffect(() => {
        // For now, we use static medicines data. You can fetch from backend later.
        setMedicines([
            { id: 1, name: "Paracetamol", availability: true, price: 10 },
            { id: 2, name: "Ibuprofen", availability: false, price: 15 },
            { id: 3, name: "Aspirin", availability: true, price: 8 },
            { id: 4, name: "Asidol", availability: false, price: 12 },
        ]);

        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (medicine) => {
        const alreadyAdded = cartItems.some(item => item.id === medicine.id);
        if (!alreadyAdded) {
            const updatedCart = [...cartItems, { ...medicine, quantity: 1 }];
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            message.success(`${medicine.name} added to cart`);
        }
    };

    const handleReserve = (medicine) => {
        message.success(`${medicine.name} added to reservation list`);
    };

    const goToCart = () => {
        navigate('/cart');
    };

    const columns = [
        {
            title: 'Medicine Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
            render: (available) => (
                <Tag color={available ? 'green' : 'red'}>
                    {available ? 'In Stock' : 'Out of Stock'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, medicine) => {
                const alreadyInCart = cartItems.some(item => item.id === medicine.id);
                return (
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            size="small"
                            disabled={!medicine.availability || alreadyInCart}
                            onClick={() => addToCart(medicine)}
                        >
                            {alreadyInCart ? '✔ Added' : 'Add to Cart'}
                        </Button>
                        <Button
                            size="small"
                            disabled={medicine.availability}
                            onClick={() => handleReserve(medicine)}
                        >
                            Reserve
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
            <div className="w-full max-w-6xl bg-white p-6 rounded shadow">
                <Title level={2} className="text-center mb-6">Your Prescribed Medicines</Title>
                {medicines.length > 0 ? (
                    <Table
                        dataSource={medicines}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                    />
                ) : (
                    <div className="text-center">No medicines available</div>
                )}
                {cartItems.length > 0 && (
                    <div className="mt-6 text-center">
                        <Button
                            type="primary"
                            size="large"
                            onClick={goToCart}
                        >
                            Go to Cart ({cartItems.length})
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicineList;
