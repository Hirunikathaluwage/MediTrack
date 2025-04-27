// src/components/CartItem.jsx
import React, { useState, useContext } from 'react';
import { InputNumber, Card } from 'antd';
// import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity } = useContext(CartContext);
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (value) => {
        setQuantity(value);
        updateQuantity(item.id, value);
    };

    return (
        <Card style={{ margin: '10px 0' }} title={item.name}>
            <InputNumber
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                style={{ marginRight: '10px' }}
            />
        </Card>
    );
};

export default CartItem;
