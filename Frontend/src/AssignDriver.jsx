import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const AssignDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve deliveryId from location.state
  //const deliveryId = location.state?.deliveryId;

  /*if (!deliveryId) {
    console.error('Error: deliveryId is undefined. Ensure it is passed from the Manage Deliveries page.');
  }*/

  // Example driver data
  const drivers = [
    { id: 'DR001', name: 'Ajith Muthukumarana', branch: 'Colombo Branch', status: 'Available' },
    { id: 'DR002', name: 'Vidu Lakrathna', branch: 'Colombo Branch', status: 'Unavailable' },
    { id: 'DR003', name: 'Sumudu Lakmal', branch: 'Colombo Branch', status: 'Available' },
  ];

  const [selectedDriver, setSelectedDriver] = useState(null); // State to store selected driver

  const handleConfirm = () => {
    if (!selectedDriver) {
      alert('Please select a driver before confirming!');
      return;
    }
  
    // Find the selected driver's name
    const driverName = drivers.find((driver) => driver.id === selectedDriver)?.name;
  
    console.log(`Driver ${driverName} assigned`);
  
    // Navigate back to Manage Deliveries with the selected driver's name
    navigate('/manage-deliveries', {
      state: {
        updatedDriverName: driverName, // Pass only the driver's name
      },
    });
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
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: driver.status === 'Available' ? '#f6fff6' : '#fff6f6',
              }}
            >
              {/* Driver Details */}
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ flex: 1, fontWeight: 'bold' }}>{`${index + 1}. ${driver.name}`}</span>
                <span style={{ flex: 1 }}>ID: {driver.id}</span>
                <span
                  style={{
                    flex: 1,
                    color: driver.status === 'Available' ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {driver.status}
                </span>
              </div>
              {/* Radio Button */}
              <Radio.Group
                onChange={(e) => setSelectedDriver(e.target.value)} // Update selected driver
                value={selectedDriver}
              >
                <Radio
                  value={driver.id}
                  disabled={driver.status !== 'Available'} // Disable if driver is unavailable
                  style={{
                    flex: 0,
                    appearance: 'none',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
              </Radio.Group>
            </li>
          ))}
        </ul>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            type="primary"
            size="large"
            onClick={handleConfirm} // Confirm button handler
            style={{
              width: '200px',
              height: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '25px',
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignDriver;