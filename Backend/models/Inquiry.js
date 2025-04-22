// backend/models/Inquiry.js
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
  subject: { type: String, required: true, minlength: 5 },
  description: { type: String, required: true, maxlength: 1000, minlength: 20 },
  category: {
    type: String,
    enum: [
      'General',
      'Technical Support',
      'Payment Issue',
      'Delivery Issue',
      'Billing',
      'Product Issue',
      'Other'
    ],
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  attachment: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
