import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  date: { type: Date, default: Date.now },
  assignee: { type: String, required: true }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
