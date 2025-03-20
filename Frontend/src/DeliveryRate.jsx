import React, { useState } from 'react';
import { Card, Rate, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const DeliveryRate = () => {
  const [deliveryRating, setDeliveryRating] = useState(0); // Initial delivery rating set to 0
  const [driverRating, setDriverRating] = useState(0); // Initial driver rating set to 0
  const [feedback, setFeedback] = useState(''); // Feedback text
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = () => {
    if (deliveryRating === 0 || driverRating === 0) {
      message.error('Please provide both delivery and driver ratings before submitting!');
      return;
    }

    console.log('Feedback submitted:', { deliveryRating, driverRating, feedback });
    message.success('Thank you for your feedback!');
    navigate('/thankyou'); // Navigate to the Thank You page
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>How was your delivery?</h1>
      
      {/* Delivery Rating Section */}
      <Rate 
        style={{ fontSize: '30px', marginBottom: '20px' }} 
        value={deliveryRating} 
        onChange={(value) => setDeliveryRating(value)} 
      />

      {/* Feedback Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <Card style={{ flex: 1, padding: '20px', backgroundColor: '#eaeaea', borderRadius: '10px', maxWidth: '300px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Rate Driver</h2>
          <Rate 
            style={{ fontSize: '30px', marginBottom: '10px' }} 
            value={driverRating} 
            onChange={(value) => setDriverRating(value)} 
          />
        </Card>

        <Card style={{ flex: 2, padding: '20px', backgroundColor: '#eaeaea', borderRadius: '10px', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Give us Feedback</h2>
          <Input.TextArea 
            rows={4} 
            placeholder="Write your feedback here.  (Optional)" 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
          />
        </Card>
      </div>

      {/* Submit Button */}
      <Button 
        type="primary" 
        size="large" 
        onClick={handleSubmit} 
        style={{ marginTop: '20px' }}
      >
        Submit Feedback
      </Button>
    </div>
  );
};

export default DeliveryRate;