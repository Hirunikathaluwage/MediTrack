import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Success = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewDelivery = () => {
    navigate('/delivery-main'); // Navigate to the DeliveryMain page
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // Light background color
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>SUCCESS</h1>
      <Button type="primary" size="large" onClick={handleViewDelivery}>
        View Delivery
      </Button>
    </div>
  );
};

export default Success;