import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DeliveryAdmin = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Delivery Management</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          width: '80%',
          maxWidth: '800px',
        }}
      >
        <Card
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onClick={() => handleNavigation('/manage-deliveries')}
          hoverable
        >
          Manage Deliveries
        </Card>
        <Card
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onClick={() => handleNavigation('/manage-drivers')}
          hoverable
        >
          Manage Drivers
        </Card>
        <Card
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onClick={() => handleNavigation('/feedbacks')}
          hoverable
        >
          Feedbacks
        </Card>
        <Card
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onClick={() => handleNavigation('/profile')}
          hoverable
        >
          Profile
        </Card>
      </div>
    </div>
  );
};

export default DeliveryAdmin;