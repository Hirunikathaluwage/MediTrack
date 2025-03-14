import React from 'react';
import { Link } from 'react-router-dom';
import './Success.css';

const Success = () => {
  return (
    <div className="success-container">
      <h1>Inquiry Submitted Successfully!</h1>
      <p>Thank you for submitting your inquiry. We will get back to you shortly.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};

export default Success;
