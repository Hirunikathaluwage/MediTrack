import React, { useState } from 'react';
import axios from 'axios';
import './InquiryForm.css';
import { useNavigate } from 'react-router-dom';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    attachment: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios.post('http://localhost:5000/Inquiries', data)
      .then(response => {
        console.log('Inquiry submitted successfully:', response.data);
        navigate('/success');
      })
      .catch(error => {
        console.error('There was an error submitting the inquiry!', error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <h1>Submit Inquiry</h1>
      <p>Please provide the details of your issue so we can assist you quickly.</p>
      <div className="form-group">
        <label>Your Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
      </div>
      <div className="form-group">
        <label>Email Address *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@example.com" />
      </div>
      <div className="form-group">
        <label>Subject of Inquiry *</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Select a subject" />
      </div>
      <div className="form-group">
        <label>Description of the Issue *</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Describe the issue in detail..." maxLength="1000" />
        <small>Maximum 1000 characters</small>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="General">General</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Billing">Billing</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-group">
        <label>Attach a File (Optional)</label>
        <input type="file" name="attachment" onChange={handleFileChange} />
        <small>Supported formats: JPG, PNG, PDF (max 5MB)</small>
      </div>
      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="submit-button">Submit Inquiry</button>
      </div>
    </form>
  );
};

export default InquiryForm;
