import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Result, Table, Typography, Button, Tag, message, Spin } from 'antd';


import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ShoppingCartOutlined,
    BookOutlined,
    MedicineBoxOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const Approval = () => {
    const [searchParams] = useSearchParams();
    const prescriptionId = searchParams.get("id");
    const branch = searchParams.get("branch");
    const [approved, setApproved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [medicines, setMedicines] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [reservedItems, setReservedItems] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    const pollingRef = useRef(null);

    const userId = "680b51cc9304025f19b2d7d1";

    useEffect(() => {
        localStorage.removeItem("cart");

        setCartItems([]);
        setReservedItems([]);


        if (prescriptionId) {
            startPollingStatus();
        } else {
            setLoading(false);
            setStatusMessage("No prescription ID provided.");
        }

        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [prescriptionId]);

    const startPollingStatus = () => {

        fetchMedicines(); // Initial fetch
        pollingRef.current = setInterval(fetchMedicines, 5000); // Poll every 5s
    };

    const fetchMedicines = async () => {
        try {
            const res = await axios.get(`http://localhost:5080/prescription/approval/${prescriptionId}?branch=${branch}`);

            const data = res.data;

            if (data.success && Array.isArray(data.medicines)) {
                console.log("Verified medicines:", data.medicines);
                const updatedMedicines = data.medicines.map(m => ({
                    ...m,
                    id: m.id || m._id,
                    name: m.name,
                    availability: m.availability,
                    price: m.price || 0
                }));
                setMedicines(updatedMedicines);
                setApproved(true);
                clearInterval(pollingRef.current);
            } else {
                setStatusMessage("Prescription is not verified yet. Please wait.");
            }
        } catch (error) {
            if (error.response?.status === 403) {
                setStatusMessage("Prescription is not verified yet. Please wait.");
            } else if (error.response?.status === 404) {
                setStatusMessage("Prescription not found.");
            } else {
                setStatusMessage("An unexpected error occurred.");
            }
            setMedicines([]);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (medicine) => {
        const alreadyInCart = cartItems.some(item => item.id === medicine.id);
        if (alreadyInCart) return;

        try {
            const response = await axios.post('http://localhost:5080/api/cart', {

                userId: userId,

                items: [
                    {
                        medicineId: medicine.id,
                        quantity: 1,
                        unitPrice: medicine.price,
                        price: medicine.price * 1
                    }
                ]
            });

            if (response.data) {
                const updatedCart = response.data.items.map(item => ({
                    id: item.medicineId,
                    quantity: item.quantity,
                    price: item.unitPrice
                }));
                setCartItems(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                message.success(`${medicine.name} added to cart`);


            } else {
                message.error("Failed to add to cart");
            }
        } catch (err) {
            console.error(err);
            message.error("Error adding to cart");
        }
    };

    const reserve = (medicine) => {
        if (!reservedItems.some(item => item.id === medicine.id)) {

            const updatedReserved = [...reservedItems, {
                id: medicine.id,
                name: medicine.name,
                price: medicine.price,
                availability: medicine.availability,
                description: medicine.description || "",
                genericName: medicine.genericName || "",
                unit: medicine.unit || "",
                quantity: 1
            }];

            setReservedItems(updatedReserved);
            message.success(`${medicine.name} reserved.`);
        }
    };


    const goToReserve = async (updatedReservedItems) => {
        if (updatedReservedItems.length === 0) {
            message.info("No reserved items.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5080/api/reserve', {
                userId: userId,
                items: updatedReservedItems.map(item => ({
                    medicineId: item.id,  // <-- ensure medicineId is passed correctly
                    quantity: item.quantity || 1
                }))
            });

            if (response.data.success) {
                const reservationId = response.data.reservationId;
                message.success("Reservation created successfully!");
                const updatedReservedItemsWithId = updatedReservedItems.map(item => ({
                    ...item,
                    reservationId: reservationId
                }));
                console.log(updatedReservedItemsWithId);
                setReservedItems(updatedReservedItemsWithId);
                navigate('/reserve-confirmation', { state: updatedReservedItemsWithId });
            } else {
                message.error(response.data.message || "Failed to create reservation");
            }
        } catch (error) {
            console.error("Error creating reservation:", error);
            message.error("An unexpected error occurred while reserving.");
        }
    };





  



    const goToCart = async () => {
        try {
            const itemsToAdd = medicines
                .filter(med => med.availability)
                .map(med => ({
                    medicineId: med.id,
                    quantity: 1,
                    unitPrice: med.price,
                    price: med.price
                }));

            if (itemsToAdd.length === 0) {
                message.info("No available medicines to add to cart.");
                return;
            }

            const response = await axios.post('http://localhost:5080/api/cart', {

                userId: userId,


                items: itemsToAdd
            });

            if (response.data) {

                const updatedCart = response.data.items.map(item => ({
                    id: item.medicineId,
                    quantity: item.quantity,
                    price: item.unitPrice
                }));
                setCartItems(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                message.success("Available medicines added to cart.");
                navigate(`/cart?id=${prescriptionId}&branch=${branch}`);
            } else {
                message.error("Failed to update cart.");
            }
        } catch (err) {
            console.error(err);
            message.error("Error saving cart data.");
        }
    };






    const columns = [
        {
            title: "Medicine",
            dataIndex: "name",
            key: "name",
            render: (text) => (
                <div className="flex items-center">
                    <MedicineBoxOutlined style={{ color: "#0c8599", marginRight: 10 }} />
                    <Text strong>{text}</Text>
                </div>
            )
        },
        {
            title: "Price ($)",
            dataIndex: "price",
            key: "price",

            render: (price) => {
                const displayPrice = typeof price === "number" ? price.toFixed(2) : "0.00";
                return (
                    <Text style={{ color: "#0e9f6e", fontWeight: 'bold' }}>${displayPrice}</Text>
                );
            }

        },
        {
            title: "Availability",
            dataIndex: "availability",
            key: "availability",
            render: (available) => (
                <Tag
                    icon={available ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: available ? 'rgba(14, 159, 110, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                        color: available ? '#0e9f6e' : '#dc2626'
                    }}
                >
                    {available ? 'In Stock' : 'Out of Stock'}
                </Tag>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_, medicine) => {
                const alreadyInCart = cartItems.some(item => item.id === medicine.id);
                const alreadyReserved = reservedItems.some(item => item.id === medicine.id);
                const isAvailable = medicine.availability;

                return (
                    <div className="flex gap-2">
                        <Button
                            icon={<ShoppingCartOutlined />}
                            disabled={!isAvailable || alreadyInCart}
                            onClick={() => addToCart(medicine)}
                            style={{
                                borderRadius: '6px',
                                color: alreadyInCart ? 'white' : '#0e9f6e',
                                background: alreadyInCart ? 'linear-gradient(90deg, #0e9f6e, #0c8599)' : 'white',
                                border: alreadyInCart ? 'none' : '1px solid #0e9f6e',
                            }}
                        >
                            {alreadyInCart ? 'Added' : 'Add to Cart'}
                        </Button>

                        <Button
                            icon={<BookOutlined />}
                            disabled={isAvailable || alreadyReserved}
                            onClick={() => reserve(medicine)}
                            style={{
                                borderRadius: '6px',
                                border: '1px solid #0c8599',
                                color: alreadyReserved ? 'white' : '#0c8599',
                                background: alreadyReserved
                                    ? 'linear-gradient(90deg, #0c8599, #0e9f6e)'
                                    : 'white',
                            }}
                        >
                            {alreadyReserved ? 'Reserved' : 'Reserve'}
                        </Button>


                    </div>
                );
            }
        }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!approved) {
        return (
            <div className="max-w-xl mt-10 mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-10">
                    <Result
                        status="info"
                        title="Awaiting Verification"
                        subTitle={statusMessage || "Please wait while your prescription is being verified."}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center items-start bg-gradient-to-br from-cyan-100 to-teal-100">
            <div className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-xl">
                <Title level={2} style={{ color: "#0c8599" }}>
                    Your Prescribed Medicines
                </Title>
                <Table
                    dataSource={medicines}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />

                {(cartItems.length > 0 || reservedItems.length > 0) && (
                    <div className="mt-6 text-center flex justify-center gap-4">
                        {cartItems.length > 0 && (
                            <Button
                                type="primary"
                                size="large"
                                onClick={goToCart}
                            >
                                Go to Cart ({cartItems.length})
                            </Button>
                        )}

                        {reservedItems.length > 0 && (
                            <Button
                                type="default"
                                size="large"

                                onClick={() => goToReserve(reservedItems)}

                                style={{ borderColor: "#0c8599", color: "#0c8599" }}
                            >
                                Go to Reserve ({reservedItems.length})
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Approval;