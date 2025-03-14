import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/Inquiries')
      .then(response => {
        setInquiries(response.data.Inquiries);
      })
      .catch(error => {
        console.error('There was an error fetching the inquiries!', error);
      });
  }, []);

  return (
    <div>
      <h1>Inquiries</h1>
      <Link to="/inquiry-form">Submit a new Inquiry</Link>
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

export default Home;
