import React from 'react';
import { Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ManageDeliveries = () => {
  const deliveries = [
    {
      deliveryId: 'D001',
      orderId: 'O001',
      name: 'John Doe',
      driverId: 'DR001',
      outlet: 'Outlet 1',
      amount: '$100',
      status: 'Pending',
    },
    {
      deliveryId: 'D002',
      orderId: 'O002',
      name: 'Jane Smith',
      driverId: 'DR002',
      outlet: 'Outlet 2',
      amount: '$150',
      status: 'Delivered',
    },
  ];

  const handleDelete = (deliveryId) => {
    console.log(`Delete delivery with ID: ${deliveryId}`);
    // Add your delete logic here
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5', // Light background color
      }}
    >
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Manage Deliveries</h1>
      {deliveries.map((delivery) => (
        <Card
          key={delivery.deliveryId}
          style={{
            width: '80%',
            maxWidth: '800px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#eaeaea', // Light background color for card
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex' }}>  
            <div>
              <p><strong>Delivery ID:</strong> {delivery.deliveryId}</p>
              <p><strong>Order ID:</strong> {delivery.orderId}</p>
              <p><strong>Name:</strong> {delivery.name}</p>
              <p><strong>Driver ID:</strong> {delivery.driverId}</p>
            </div>
            <div style={{ marginLeft: '200px' }}>
              <p><strong>Outlet:</strong> {delivery.outlet}</p>
              <p><strong>Amount:</strong> {delivery.amount}</p>
              <p><strong>Status:</strong> {delivery.status}</p>
            </div>
          </div>
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(delivery.deliveryId)}
            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          />
        </Card>
      ))}
    </div>
  );
};

export default ManageDeliveries;