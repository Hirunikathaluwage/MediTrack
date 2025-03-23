import React, { useEffect, useState } from 'react';
import { Card, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDeliveries, deleteDelivery } from './services/deliveryService'; // Import delivery APIs

const ManageDeliveries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deliveries, setDeliveries] = useState([]); // State to store delivery data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await getDeliveries(); // Fetch deliveries using the API
        setDeliveries(response.data); // Set the deliveries in state
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        message.error('Failed to fetch deliveries. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDeliveries();
  }, []);

  // Update the driver name for all deliveries (or a specific one if needed)
  useEffect(() => {
    if (location.state?.updatedDriverName) {
      const updatedDriverName = location.state.updatedDriverName;
      console.log('Driver updated:', updatedDriverName);
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) => ({
          ...delivery,
          driver: updatedDriverName, // Update the driver field
        }))
      );
      
    }
  }, [location.state]);

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

  const handleAssignDriver = () => {
    console.log('Navigate to Assign Driver page');
    navigate('/assign-driver'); // Navigate to the Assign Driver page
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
            key={delivery.deliveryId || delivery._id} // Use _id as a fallback key
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>Delivery ID:</strong> {delivery._id || "N/A"}</p>
                <p><strong>Order ID:</strong> {delivery.orderId || "N/A"}</p>
                <p><strong>Name:</strong> {delivery.name || "N/A"}</p>
                <p><strong>Contact:</strong> {delivery.contact || "N/A"}</p>
                <p><strong>Branch:</strong> Colombo Branch</p>
                <p><strong>Driver:</strong> {delivery.driver || "Not Assigned"}</p> {/* Driver Field */}
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
              {/* Assign Driver Button */}
              <Button
                type="default"
                shape="round"
                onClick={handleAssignDriver} // Call the assign driver handler
              >
                Assign Driver
              </Button>

              {/* Delete Button */}
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