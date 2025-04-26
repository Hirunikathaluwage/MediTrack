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
  const [messageType, setMessageType] = useState('');
  const [responseText, setResponseText] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  const [viewingAttachment, setViewingAttachment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getAllInquiries();
      setInquiries(data.inquiries);
      setLoading(false);
    } catch (err) {
      setMessage('Failed to load inquiries');
      setMessageType('error');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInquiries();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await deleteInquiry(id);
      setMessage('Inquiry deleted successfully');
      setMessageType('success');
      fetchInquiries();
    } catch (err) {
      setMessage('Delete failed');
      setMessageType('error');
    }
  };
  
  const handleRespond = async (id) => {
    if (!responseText.trim()) {
      setMessage('Response cannot be empty');
      setMessageType('error');
      return;
    }
    
    try {
      await respondToInquiry(id, { response: responseText, status: 'Resolved' });
      setMessage('Response sent successfully');
      setMessageType('success');
      setResponseText('');
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (err) {
      setMessage('Response failed to send');
      setMessageType('error');
    }
  };
  
  const handleStatusChange = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append('status', status);
      await updateInquiry(id, formData);
      setMessage(`Status updated to ${status}`);
      setMessageType('success');
      fetchInquiries();
    } catch (err) {
      setMessage('Status update failed');
      setMessageType('error');
    }
  };
  
  const toggleExpand = (id) => {
    if (expandedInquiry === id) {
      setExpandedInquiry(null);
    } else {
      setExpandedInquiry(id);
    }
  };
  
  const openAttachment = (attachment) => {
    setViewingAttachment(attachment);
  };
  
  const closeAttachment = () => {
    setViewingAttachment(null);
  };
  
  const predefinedCategories = [
    'all', 
    'General', 
    'Technical Support', 
    'Payment Issue', 
    'Delivery Issue', 
    'Billing', 
    'Product Issue', 
    'Other'
  ];
  
  // Filter inquiries based on status, category, and search query
  const filteredInquiries = inquiries.filter(inq => {
    const statusMatch = filter === 'all' || inq.status.toLowerCase() === filter.toLowerCase();
    const categoryMatch = categoryFilter === 'all' || inq.category === categoryFilter;
    const searchMatch = searchQuery === '' || 
      inq.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && categoryMatch && searchMatch;
  });
  
  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Inquiries</h1>
          <button 
            onClick={fetchInquiries} 
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-all"
          >
            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin mr-1"></span>
            <span>Refresh</span>
          </button>
        </div>
        
        {message && (
          <div className={`mb-4 p-4 rounded-lg flex items-center justify-between ${
            messageType === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="text-lg font-bold">
              &times;
            </button>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by subject, message or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Status Filter Tabs */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilter('all')} 
                className={`px-4 py-2 rounded-md transition-all ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('open')} 
                className={`px-4 py-2 rounded-md transition-all ${
                  filter === 'open' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Open
              </button>
              <button 
                onClick={() => setFilter('in progress')} 
                className={`px-4 py-2 rounded-md transition-all ${
                  filter === 'in progress' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setFilter('resolved')} 
                className={`px-4 py-2 rounded-md transition-all ${
                  filter === 'resolved' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              {predefinedCategories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setCategoryFilter(category)} 
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    categoryFilter === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin mx-auto mb-4 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="text-gray-600">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 text-gray-400 text-4xl">⚠️</div>
              <p className="text-gray-600">No inquiries found.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredInquiries.map((inq) => (
                <li key={inq._id} className="transition-all">
                  <div 
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(inq._id)}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-gray-900 mb-1">{inq.subject}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <span className="text-blue-500">✉️</span>
                            {inq.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-gray-500">🕒</span>
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                          {inq.category && (
                            <span className="flex items-center gap-1">
                              <span className="text-green-500">📂</span>
                              {inq.category}
                            </span>
                          )}
                          {inq.attachments && inq.attachments.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openAttachment(inq.attachments[0]);
                              }}
                              className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-all"
                            >
                              📎 View Attachment
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(inq.priority)}`}>
                          {inq.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedInquiry === inq._id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Message:</h4>
                        <div className="p-3 bg-white border border-gray-200 rounded-lg text-gray-700">
                          {inq.message}
                        </div>
                      </div>
                      
                      {/* Attachments Section */}
                      {inq.attachments && inq.attachments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Attachments:</h4>
                          <div className="flex flex-wrap gap-2">
                            {inq.attachments.map((attachment, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openAttachment(attachment);
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                              >
                                <span className="text-blue-500">📎</span>
                                <span className="text-sm">{attachment.filename || `Attachment ${index + 1}`}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">Change Status:</h4>
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => handleStatusChange(inq._id, 'Open')}
                              className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200"
                            >
                              Open
                            </button>
                            <button 
                              onClick={() => handleStatusChange(inq._id, 'In Progress')}
                              className="px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200"
                            >
                              In Progress
                            </button>
                            <button 
                              onClick={() => handleStatusChange(inq._id, 'Resolved')}
                              className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200"
                            >
                              Resolved
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleDelete(inq._id)}
                          className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200"
                        >
                          <span>🗑️</span>
                          Delete
                        </button>
                      </div>
                      
                      <div className="bg-white p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium mb-3">Send Response:</h4>
                        <textarea
                          placeholder="Write your response here..."
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-24 mb-3"
                          value={selectedInquiry === inq._id ? responseText : ''}
                          onChange={(e) => {
                            setSelectedInquiry(inq._id);
                            setResponseText(e.target.value);
                          }}
                        />
                        <div className="flex justify-end">
                          <button 
                            onClick={() => handleRespond(inq._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            <span>💬</span>
                            Send Response
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Attachment Viewer Modal */}
      {viewingAttachment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">
                {viewingAttachment.filename || 'Attachment Preview'}
              </h3>
              <button 
                onClick={closeAttachment}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-4">
              {viewingAttachment.type?.startsWith('image/') ? (
                <img 
                  src={viewingAttachment.url || '#'} 
                  alt={viewingAttachment.filename || 'Attachment'} 
                  className="max-w-full h-auto max-h-96 mx-auto"
                />
              ) : viewingAttachment.type?.startsWith('application/pdf') ? (
                <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                  <iframe 
                    src={viewingAttachment.url || '#'} 
                    className="w-full h-full rounded" 
                    title={viewingAttachment.filename || 'PDF Document'}
                  />
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="mb-4">{viewingAttachment.filename || 'Document'}</p>
                  <a 
                    href={viewingAttachment.url || '#'} 
                    download={viewingAttachment.filename}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInquiries;