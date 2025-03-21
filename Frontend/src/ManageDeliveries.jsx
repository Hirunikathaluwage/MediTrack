import React, { useEffect, useState } from 'react';
import { Card, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getDeliveries, deleteDelivery } from './services/deliveryService'; // Import delivery APIs
import API from './services/api'; // Import API instance for order-related requests

const ManageDeliveries = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]); // State to store delivery data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch deliveries and enrich with order data
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await getDeliveries(); // Fetch deliveries using the API
        const enrichedDeliveries = await Promise.all(
          response.data.map(async (delivery) => {
            try {
              // Fetch order details for each delivery
              const orderResponse = await API.get(`/orders/${delivery.orderId}`); // Replace with the correct API for fetching order details
              return {
                ...delivery,
                branch: orderResponse.data.branch, // Assign branch from the order database
                amount: orderResponse.data.amount, // Assign amount from the order database
              };
            } catch (error) {
              console.error(`Error fetching order details for order ID ${delivery.orderId}:`, error);
              return { ...delivery, branch: 'N/A', amount: 'N/A' }; // Fallback values
            }
          })
        );
        setDeliveries(enrichedDeliveries); // Set the enriched deliveries
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        message.error('Failed to fetch deliveries. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDeliveries();
  }, []);

  const handleDelete = async (deliveryId) => {
    try {
      await deleteDelivery(deliveryId); // Delete delivery using the API
      message.success('Delivery deleted successfully.');
      setDeliveries((prev) => prev.filter((delivery) => delivery.deliveryId !== deliveryId)); // Update the state
    } catch (error) {
      console.error('Error deleting delivery:', error);
      message.error('Failed to delete delivery. Please try again.');
    }
  };

  const handleAssignDriver = (deliveryId) => {
    console.log(`Navigating to AssignDriver page for delivery ID: ${deliveryId}`);
    navigate('/assign-driver', { state: { deliveryId } }); // Navigate to AssignDriver page with deliveryId
  };

  const handleConfirmOrder = (deliveryId) => {
    console.log(`Confirm order for delivery ID: ${deliveryId}`);
    // Add your confirm order logic here
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Manage Deliveries</h1>
      {loading ? (
        <p>Loading deliveries...</p>
      ) : (
        deliveries.map((delivery) => (
          <Card
            key={delivery.deliveryId}
            style={{
              width: '80%',
              maxWidth: '800px',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#eaeaea',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div>
                <p><strong>Delivery ID:</strong> {delivery.deliveryId}</p>
                <p><strong>Order ID:</strong> {delivery.orderId}</p>
                <p><strong>Name:</strong> {delivery.name}</p>
              </div>
              <div style={{ marginLeft: '200px' }}>
                <p><strong>Branch:</strong> {delivery.branch}</p>
                <p><strong>Amount:</strong> {delivery.amount}</p>
              </div>
            </div>
            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <Button
                type="default"
                onClick={() => handleAssignDriver(delivery.branch)}
                style={{
                  border: '2px solid black',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  padding: '0 20px',
                }}
              >
                Assign Driver
              </Button>
              <Button
                type="primary"
                onClick={() => handleConfirmOrder(delivery.deliveryId)}
                style={{
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  padding: '0 20px',
                }}
              >
                Confirm
              </Button>
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(delivery.deliveryId)}
              />
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ManageDeliveries;