import React, { useEffect, useState } from 'react';
import InquiryCard from "../../components/InquiryCard";
import { getAllInquiries, respondToInquiry, deleteInquiry } from "../../api/inquiryAPI";

const ViewInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [searchTerm, category, inquiries]);

  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries();
      setInquiries(data.inquiries);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to fetch inquiries');
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
    const headers = ['Name', 'Email', 'Subject', 'Description', 'Category', 'Priority', 'Status'];
    const rows = filtered.map(i => [
      i.name, i.email, i.subject, i.description, i.category, i.priority, i.status
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

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>All Inquiries</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by subject or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select onChange={e => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Payment Issue">Payment Issue</option>
          <option value="Delivery Issue">Delivery Issue</option>
          <option value="Billing">Billing</option>
          <option value="Product Issue">Product Issue</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={downloadCSV} style={{ marginLeft: '10px' }}>
          📥 Download Report
        </button>
      </div>

      {filtered.length > 0 ? (
        filtered.map(inquiry => (
          <InquiryCard
            key={inquiry._id}
            inquiry={inquiry}
            onResolve={handleResolve}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No inquiries match your filter.</p>
      )}
    </div>
  );
};

export default ViewInquiries;
