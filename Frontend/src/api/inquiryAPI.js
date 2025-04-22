// MediTrack/Frontend/src/api/inquiryAPI.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/inquiries',
  withCredentials: true
});

// ✅ Get all inquiries (with optional filters)
export const getAllInquiries = async (filters = {}) => {
  const res = await api.get('/', { params: filters });
  return res.data;
};

// ✅ Add a new inquiry (multipart/form-data)
export const addInquiry = async (formData) => {
  const res = await api.post('/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

// ✅ Get a single inquiry by ID
export const getInquiryById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

// ✅ Update an inquiry
export const updateInquiry = async (id, formData) => {
  const res = await api.put(`/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

// ✅ Delete an inquiry
export const deleteInquiry = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

// ✅ Respond to an inquiry
export const respondToInquiry = async (id, responsePayload) => {
  const res = await api.post(`/respond/${id}`, responsePayload);
  return res.data;
};

// ✅ Get inquiry statistics
export const getInquiryStats = async () => {
  const res = await api.get('/stats');
  return res.data;
};
