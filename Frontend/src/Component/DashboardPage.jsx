import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/inquiries')
            .then(response => {
                setInquiries(response.data);
            })
            .catch(error => {
                console.error('Error fetching inquiries:', error);
            });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {inquiries.map(inquiry => (
                <div key={inquiry._id}>
                    <h2>{inquiry.title}</h2>
                    <p>{inquiry.description}</p>
                    {inquiry.attachment && (
                        <a href={`http://localhost:5000/uploads/${inquiry.attachment}`} target="_blank" rel="noopener noreferrer">
                            View Attachment
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DashboardPage;
