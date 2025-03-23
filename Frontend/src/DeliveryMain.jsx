import React, { useEffect, useState } from 'react';
import { Card, Button, List, Spin, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import axios from 'axios'; // Import axios for API calls

const DeliveryMain = () => {
  const location = useLocation(); // Get location object
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Destructure orderId and deliveryId from location state
  const { orderId, deliveryId } = location.state || {}; // Use default empty object to avoid errors if state is undefined

  const [orderDetails, setOrderDetails] = useState(null); // State to store order details
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchOrderDetails = async () => {
    if (!deliveryId) {
      setError("Missing delivery ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch delivery details
      const deliveryResponse = await axios.get(`/api/delivery/${deliveryId}/order-details`);
      console.log("Delivery Details:", deliveryResponse.data);

      // Fetch order items separately
      const itemsResponse = await axios.get(`/api/delivery/${deliveryId}/order-items`);
      console.log("Order Items:", itemsResponse.data);

      // Combine delivery details and order items
      setOrderDetails({
        ...deliveryResponse.data.delivery,
        orderItems: itemsResponse.data.orderItems,
      });
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  fetchOrderDetails();
}, [deliveryId]);

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
          <p><strong>Order ID:</strong> {orderId || "N/A"}</p> {/* Display Order ID */}
          <p><strong>Delivery ID:</strong> {deliveryId || "N/A"}</p> {/* Display Delivery ID */}
          <p><strong>Date:</strong> Fri, 24 Jan</p>
          <div style={{ marginBottom: '20px' }}></div> {/* Added space */}
          <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>IN TRANSIT</h2>
        </Card>

        {/* Right Card */}
        <Card style={{ flex: 2, marginRight: '0px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Summary</h2>
  {loading ? (
    <Spin />
  ) : error ? (
    <p style={{ color: 'red' }}>{error}</p>
  ) : orderDetails && orderDetails.orderItems && orderDetails.orderItems.length > 0 ? (
    <List
      dataSource={orderDetails.orderItems}
      renderItem={(item) => (
        <List.Item>
          <strong>{item.name}</strong> - Quantity: {item.quantity}
        </List.Item>
      )}
    />
  ) : (
    <p>No order items available.</p>
  )}
</Card>

        {/* New Card */}
        <Card style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Driver Details</h2>
          <p><strong>Name:</strong> Ajith Muthukumarana</p>
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