import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendingInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/inquiries?status=Pending')
      .then(response => {
        setInquiries(response.data.Inquiries);
      })
      .catch(error => {
        console.error('There was an error fetching the pending inquiries!', error);
      });
  }, []);

  return (
    <div>
      <h1>Pending Inquiries</h1>
      <Link to="/create-inquiry">Submit a new Inquiry</Link>
      <ul>
        {inquiries.map(inquiry => (
          <li key={inquiry._id}>
            <h2>{inquiry.subject}</h2>
            <p>{inquiry.description}</p>
            <p><strong>Category:</strong> {inquiry.category}</p>
            <p><strong>Priority:</strong> {inquiry.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingInquiries;
