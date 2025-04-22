// frontend/meditrack-frontend/src/pages/AddInquiry.jsx
import React, { useState } from 'react';
import * as api from "../../api/inquiryAPI";

const AddInquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length < 20) {
      return alert('❌ Description must be at least 20 characters.');
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      await api.post('/', form);
      alert('✅ Inquiry submitted successfully!');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Submission failed';
      alert('❌ Error: ' + msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Submit an Inquiry</h2>
      <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="text" name="subject" placeholder="Subject" required onChange={handleChange} />
      <textarea name="description" placeholder="Description (min 20 characters)" required onChange={handleChange}></textarea>
      <select name="category" onChange={handleChange}>
        <option>General</option>
        <option>Technical Support</option>
        <option>Payment Issue</option>
        <option>Delivery Issue</option>
        <option>Billing</option>
        <option>Product Issue</option>
        <option>Other</option>
      </select>
      <select name="priority" onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input type="file" name="attachment" onChange={handleChange} />
      <button type="submit">Submit Inquiry</button>
    </form>
  );
};

export default AddInquiry;
