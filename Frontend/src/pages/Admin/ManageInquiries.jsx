import React, { useEffect, useState } from 'react';
import {
    getAllInquiries,
    deleteInquiry,
    respondToInquiry,
    updateInquiry
  } from '../../api/inquiryAPI';
  

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries();
      setInquiries(data.inquiries);
    } catch (err) {
      setMessage('Failed to load inquiries');
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInquiry(id);
      setMessage('Inquiry deleted');
      fetchInquiries();
    } catch (err) {
      setMessage('Delete failed');
    }
  };

  const handleRespond = async (id) => {
    try {
      await respondToInquiry(id, { response: responseText, status: 'Resolved' });
      setMessage('Response sent');
      setResponseText('');
      fetchInquiries();
    } catch (err) {
      setMessage('Response failed');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiry(id, new FormData()); // You could add a proper update object here
      setMessage('Status updated');
      fetchInquiries();
    } catch (err) {
      setMessage('Status update failed');
    }
  };

  return (
    <div>
      <h2>Manage Inquiries</h2>
      {message && <p>{message}</p>}
      {inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <ul>
          {inquiries.map((inq) => (
            <li key={inq._id} style={{ marginBottom: '20px' }}>
              <p><strong>Subject:</strong> {inq.subject}</p>
              <p><strong>Status:</strong> {inq.status}</p>
              <p><strong>Priority:</strong> {inq.priority}</p>
              <p><strong>Email:</strong> {inq.email}</p>
              <button onClick={() => handleDelete(inq._id)}>Delete</button>

              <div style={{ marginTop: '10px' }}>
                <textarea
                  placeholder="Write a response"
                  value={selectedInquiry === inq._id ? responseText : ''}
                  onChange={(e) => {
                    setSelectedInquiry(inq._id);
                    setResponseText(e.target.value);
                  }}
                />
                <br />
                <button onClick={() => handleRespond(inq._id)}>Send Response</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageInquiries;
