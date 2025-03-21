import React from 'react';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const AssignDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Example driver data
  const drivers = [
    { id: 'DR001', name: 'Ajith Muthukumarana', branch: 'Colombo Branch', status: 'Available' },
    { id: 'DR002', name: 'Another One', branch: 'Colombo Branch', status: 'Unavailable' },
    { id: 'DR003', name: 'Ch Vckjwhc Kjc Vlckc Cxn;s', branch: 'Colombo Branch', status: 'Available' },
  ];

  const handleAssignDriver = (driverId) => {
    console.log(`Driver ${driverId} assigned to delivery ${location.state?.deliveryId}`);
    navigate('/delivery-main'); // Navigate to the DeliveryMain page
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
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>MediTrack Drivers</h1>
      <div
        style={{
          width: '80%',
          maxWidth: '800px',
          backgroundColor: '#eaeaea',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Colombo Branch</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {drivers.map((driver, index) => (
            <li
              key={driver.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <span style={{ flex: 1 }}>{`${index + 1}. ${driver.name}`}</span>
              <span style={{ flex: 1 }}>{driver.id}</span>
              <span
                style={{
                  flex: 1,
                  color: driver.status === 'Available' ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {driver.status}
              </span>
              <Button
                type="default"
                shape="circle"
                onClick={() => handleAssignDriver(driver.id)}
                style={{
                  border: '2px solid black',
                  fontWeight: 'bold',
                }}
              >
                &gt;
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignDriver;