// frontend/meditrack-frontend/src/components/InquiryCard.jsx
import React from 'react';

const InquiryCard = ({ inquiry, onResolve, onDelete }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  }}>
    <h4>
      {inquiry.subject}
      <small style={{ fontWeight: 'normal', color: '#888', marginLeft: '10px' }}>
        ({inquiry.status})
      </small>
    </h4>

    <p>{inquiry.description}</p>
    <p>
      <strong>Priority:</strong> {inquiry.priority} |{' '}
      <strong>Category:</strong> {inquiry.category}
    </p>
    <small>Submitted by: {inquiry.email}</small>

    {/* 📎 View Attachment */}
    {inquiry.attachment && (
      <div style={{ marginTop: '10px' }}>
        <a
          href={`http://localhost:5000${inquiry.attachment}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📎 View Attachment
        </a>
      </div>
    )}

    {/* Action Buttons */}
    <div style={{ marginTop: '10px' }}>
      {inquiry.status !== 'Resolved' && onResolve && (
        <button onClick={() => onResolve(inquiry)} style={{ marginRight: '10px' }}>
          ✅ Mark as Resolved
        </button>
      )}
      {onDelete && (
        <button onClick={() => onDelete(inquiry._id)} style={{ color: 'red' }}>
          🗑️ Delete
        </button>
      )}
    </div>
  </div>
);

export default InquiryCard;
