import React, { useState } from 'react';
import { addInquiry } from "../../api/inquiryAPI";

const AddInquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    category: 'General',
    priority: 'Medium',
    location: '',
    attachment: null
  });

  const [otherDescription, setOtherDescription] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalDescription = formData.category === "Other"
      ? otherDescription
      : formData.description;

    if (finalDescription.length < 20) {
      return alert('❌ Description must be at least 20 characters.');
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "description") {
        form.append(key, value);
      }
    });
    form.append("description", finalDescription);

    try {
      await addInquiry(form);
      alert('✅ Inquiry submitted successfully!');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Submission failed';
      alert('❌ Error: ' + msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Submit an Inquiry</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        required
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* ✅ Show textarea only if not Other */}
      {formData.category !== 'Other' && (
        <textarea
          name="description"
          placeholder="Describe your issue (min 20 characters)"
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 h-28 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      )}

      {/* ✅ Show special textarea only if category is Other */}
      {formData.category === 'Other' && (
        <textarea
          name="otherDescription"
          placeholder="Ask your custom question (e.g. What are your opening hours?)"
          required
          value={otherDescription}
          onChange={(e) => setOtherDescription(e.target.value)}
          className="w-full p-3 h-28 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      )}

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>General</option>
        <option>Technical Support</option>
        <option>Payment Issue</option>
        <option>Delivery Issue</option>
        <option>Billing</option>
        <option>Product Issue</option>
        <option>Other</option>
      </select>

      {/* ✅ Branch selector for Product Issue */}
      {formData.category === 'Product Issue' && (
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Branch Location</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Galle">Galle</option>
        </select>
      )}

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="file"
        name="attachment"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit Inquiry
      </button>
    </form>
  );
};

export default AddInquiry;
