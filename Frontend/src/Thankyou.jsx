import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate(); // Use navigate for redirection

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ maxWidth: '600px', width: '100%', textAlign: 'center', padding: '40px', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Thank You!</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>Thank you for your feedback. We appreciate your input and will use it to improve our services.</p>
        <Button type="primary" size="large" onClick={handleGoHome}>Go to Home</Button>
      </Card>
    </div>
  );
};

export default ThankYouPage;