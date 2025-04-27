import React, { useEffect, useState } from 'react';
import InquiryCard from "../../components/InquiryCard";
import { getAllInquiries, respondToInquiry, deleteInquiry } from "../../api/inquiryAPI";

const ViewInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [searchTerm, category, status, inquiries]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getAllInquiries();
      setInquiries(data.inquiries);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const filterInquiries = () => {
    let result = [...inquiries];
    if (searchTerm) {
      result = result.filter(i =>
        i.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category) {
      result = result.filter(i => i.category === category);
    }
    if (status) {
      result = result.filter(i => i.status === status);
    }
    setFiltered(result);
  };

  const handleResolve = async (inquiry) => {
    try {
      await respondToInquiry(inquiry._id, {
        status: 'Resolved',
        response: 'Thank you for contacting MediTrack. Your inquiry has been resolved.'
      });
      fetchInquiries(); // Refresh the updated list
    } catch (err) {
      console.error(err);
      alert('❌ Failed to resolve and send email');
    }
  };

  const handleSendReply = async (id, responseText) => {
    if (!responseText.trim()) return alert("Reply cannot be empty!");
    try {
      await respondToInquiry(id, {
        status: 'Resolved',
        response: responseText,
      });
      fetchInquiries(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send reply");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await deleteInquiry(id);
      fetchInquiries(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete inquiry');
    }
  };

  const downloadCSV = () => {
    const headers = [
      'Name', 'Email', 'Subject', 'Original Language', 'Original Description',
      'Translated Description', 'Category', 'Priority', 'Status'
    ];
    const rows = filtered.map(i => [
      i.name,
      i.email,
      i.subject,
      i.originalLanguage || '',
      i.description,
      i.translatedDescription || '',
      i.category,
      i.priority,
      i.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'inquiries_report.csv';
    a.click();

    URL.revokeObjectURL(url);
  };

  const getCategoryCount = (categoryName) => {
    return inquiries.filter(i => i.category === categoryName).length;
  };

  const getStatusCount = (statusName) => {
    return inquiries.filter(i => i.status === statusName).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg mb-8 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Customer Inquiries
        </h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600">Total Inquiries</div>
            <div className="text-2xl font-bold">{inquiries.length}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600">Resolved</div>
            <div className="text-2xl font-bold">{getStatusCount('Resolved')}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-yellow-600">Pending</div>
            <div className="text-2xl font-bold">{getStatusCount('Pending')}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-orange-600">High Priority</div>
            <div className="text-2xl font-bold">{inquiries.filter(i => i.priority === 'High').length}</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search by subject or email"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select 
                onChange={e => setCategory(e.target.value)} 
                value={category}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="General">General ({getCategoryCount('General')})</option>
                <option value="Technical Support">Technical Support ({getCategoryCount('Technical Support')})</option>
                <option value="Payment Issue">Payment Issue ({getCategoryCount('Payment Issue')})</option>
                <option value="Delivery Issue">Delivery Issue ({getCategoryCount('Delivery Issue')})</option>
                <option value="Billing">Billing ({getCategoryCount('Billing')})</option>
                <option value="Product Issue">Product Issue ({getCategoryCount('Product Issue')})</option>
                <option value="Other">Other ({getCategoryCount('Other')})</option>
              </select>

              <select 
                onChange={e => setStatus(e.target.value)} 
                value={status}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending ({getStatusCount('Pending')})</option>
                <option value="In Progress">In Progress ({getStatusCount('In Progress')})</option>
                <option value="Resolved">Resolved ({getStatusCount('Resolved')})</option>
              </select>

              <button 
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading inquiries...</p>
          </div>
        )}

        {/* Inquiries List */}
        {!loading && filtered.length > 0 ? (
          filtered.map(inquiry => (
            <InquiryCard
              key={inquiry._id}
              inquiry={inquiry}
              onResolve={handleResolve}
              onDelete={handleDelete}
              onSendReply={handleSendReply} 
            />
          ))
        ) : !loading && (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4">No inquiries match your filter.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setCategory('');
                setStatus('');
              }}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInquiries;