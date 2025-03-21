import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const DriverHome = () => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/driver-next'); // Navigate to the DeliveryMain page
  };

  const handleDelete = () => {
    console.log('Delete button clicked'); // Add delete functionality here
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>MediTrack Delivery</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 'normal', marginBottom: '40px' }}>Driver</h2>

      {/* Delivery Card */}
      <Card
        style={{
          width: '600px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#eaeaea',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Centered Heading */}
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center', // Center the heading
          }}
        >
          You have a new delivery!
        </h3>

        {/* Delivery ID */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'normal',
            marginBottom: '20px',
            textAlign: 'center', // Center the Delivery ID
          }}
        >
          <strong>Delivery ID:</strong> D001
        </p>

        {/* Centered Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center', // Center the buttons horizontally
            gap: '20px', // Add spacing between the buttons
          }}
        >
          <Button
            type="default"
            size="large"
            onClick={handleViewDetails}
            style={{
              border: '2px solid black',
              borderRadius: '20px',
              fontWeight: 'bold',
              padding: '0 20px',
            }}
          >
            View Details &gt;
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            onClick={handleDelete}
            style={{
              borderRadius: '20px',
              fontWeight: 'bold',
              padding: '0 20px',
            }}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DriverHome;