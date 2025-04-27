import React, { useState } from 'react';

const InquiryCard = ({ inquiry, onResolve, onDelete, onSendReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-3 bg-white shadow-sm">
      <h4 className="text-lg font-medium">
        {inquiry.subject}
        <small className="font-normal text-gray-500 ml-2">
          ({inquiry.status})
        </small>
      </h4>

      {inquiry.originalLanguage && (
        <p className="mt-2"><strong>Detected Language:</strong> {inquiry.originalLanguage.toUpperCase()}</p>
      )}

      <p className="mt-2"><strong>Description:</strong></p>
      <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
        {inquiry.description}
      </p>

      {inquiry.translatedDescription &&
        inquiry.translatedDescription !== inquiry.description && (
          <>
            <p className="mt-2"><strong>Translated (English):</strong></p>
            <p className="whitespace-pre-wrap bg-blue-50 p-3 rounded-md">
              {inquiry.translatedDescription}
            </p>
          </>
      )}

      <p className="mt-3">
        <strong>Priority:</strong> {inquiry.priority} |{' '}
        <strong>Category:</strong> {inquiry.category}
      </p>
      <small className="text-gray-600">Submitted by: {inquiry.email}</small>

      {inquiry.attachment && (
        <div className="mt-3">
          <a
            href={`http://localhost:5000${inquiry.attachment}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            View Attachment
          </a>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {inquiry.status !== 'Resolved' && (
          <>
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {showReplyBox ? 'Cancel Reply' : 'Reply'}
            </button>
            <button 
              onClick={() => onResolve(inquiry)} 
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark as Resolved
            </button>
          </>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(inquiry._id)} 
            className="text-red-600 hover:text-red-700 px-3 py-1 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        )}
      </div>

      {showReplyBox && (
        <div className="mt-4">
          <textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => {
              onSendReply(inquiry._id, replyText);
              setReplyText('');
              setShowReplyBox(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default InquiryCard; 