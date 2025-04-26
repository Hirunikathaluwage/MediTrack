import React, { useState } from 'react';

const InquiryCard = ({ inquiry, onResolve, onDelete, onSendReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
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

      {inquiry.originalLanguage && (
        <p><strong>Detected Language:</strong> {inquiry.originalLanguage.toUpperCase()}</p>
      )}

      <p><strong>Description:</strong></p>
      <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
        {inquiry.description}
      </p>

      {inquiry.translatedDescription &&
        inquiry.translatedDescription !== inquiry.description && (
          <>
            <p><strong>Translated (English):</strong></p>
            <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#eef9ff', padding: '10px', borderRadius: '5px' }}>
              {inquiry.translatedDescription}
            </p>
          </>
      )}

      <p>
        <strong>Priority:</strong> {inquiry.priority} |{' '}
        <strong>Category:</strong> {inquiry.category}
      </p>
      <small>Submitted by: {inquiry.email}</small>

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

      <div style={{ marginTop: '10px' }}>
        {inquiry.status !== 'Resolved' && (
          <>
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              style={{ marginRight: '10px' }}
            >
              📝 {showReplyBox ? 'Cancel Reply' : 'Reply'}
            </button>
            <button onClick={() => onResolve(inquiry)} style={{ marginRight: '10px' }}>
              ✅ Mark as Resolved
            </button>
          </>
        )}
        {onDelete && (
          <button onClick={() => onDelete(inquiry._id)} style={{ color: 'red' }}>
            🗑️ Delete
          </button>
        )}
      </div>

      {showReplyBox && (
        <div style={{ marginTop: '10px' }}>
          <textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button
            style={{ marginTop: '8px' }}
            onClick={() => {
              onSendReply(inquiry._id, replyText);
              setReplyText('');
              setShowReplyBox(false);
            }}
          >
            📩 Send Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default InquiryCard;
