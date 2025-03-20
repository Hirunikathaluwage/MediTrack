import React from 'react';
import { Card, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate

const DeliveryMain = () => {
  const location = useLocation(); // Get location object
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { orderID, deliveryID } = location.state || {}; // Destructure orderID and deliveryID from location state

  const handleRateDelivery = () => {
    navigate('/delivery-rate'); // Navigate to the delivery rate page
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Your Deliveries</h1>
      </header>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        {/* Left Card */}
        <Card style={{ flex: 1, marginRight: '20px' }}>
          <p><strong>Order ID:</strong> {orderID}</p>
          <p><strong>Delivery ID:</strong> {deliveryID}</p>
          <p><strong>Date:</strong> Fri, 24 Jan</p>
          <div style={{ marginBottom: '20px' }}></div> {/* Added space */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>IN TRANSIT</h2>
        </Card>

        {/* Right Card */}
        <Card style={{ flex: 2, marginRight: '0px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Summary</h2>
          <p><strong>Outlet:</strong></p>
          {/* Add content here */}
        </Card>

        {/* New Card */}
        <Card style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Driver Details</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Contact:</strong> +1234567890</p>
          <p><strong>Vehicle:</strong> ABC-1234</p>
          <p><strong>Rating:</strong> 4.0</p>
        </Card>
      </div>

      {/* Centered Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" size="large" onClick={handleRateDelivery}>Rate Your Delivery</Button>
      </div>
    </div>
  );
};

export default DeliveryMain;