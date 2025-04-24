// src/components/MedicineItem.jsx
import React from 'react';
import { Card, Button } from 'antd';

const MedicineItem = ({ medicine, addToCart }) => {
    return (
        <Card style={{ width: 300, margin: '10px' }} title={medicine.name}>
            <p>{medicine.availability ? "In Stock" : "Out of Stock"}</p>
            <Button
                type="primary"
                onClick={() => addToCart(medicine)}
                disabled={!medicine.availability}
                style={{ marginRight: '10px' }}
            >
                +
            </Button>
            <Button
                type="default"
                disabled={!medicine.availability}
            >
                Reserve
            </Button>
        </Card>
    );
};

export default MedicineItem;
