import Inquiry from '../models/Inquiry.js';
import { transporter } from '../utils/emailConfig.js';
import { InquiryResponseTemplate } from '../utils/InquiryResponseTemplate.js';

// Get all inquiries with optional filters
export const getAllInquiries = async (req, res) => {
  const { category, priority, status } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (priority) filter.priority = priority;
  if (status) filter.status = status;

  try {
    const inquiries = await Inquiry.find(filter);
    if (!inquiries.length) return res.status(404).json({ message: 'No inquiries found' });
    res.status(200).json({ inquiries });
  } catch (err) {
    console.error("Error retrieving inquiries:", err);
    res.status(500).json({ message: 'Error retrieving inquiries' });
  }
};

// Add a new inquiry
export const addInquiry = async (req, res) => {
  const { name, email, subject, description, category, priority } = req.body;
  const attachment = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    if (!name || !email || !subject || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const inquiry = new Inquiry({ name, email, subject, description, category, priority, attachment });
    console.log("Saving inquiry:", inquiry);
    await inquiry.save();

    res.status(201).json({ message: 'Inquiry added successfully', inquiry });
  } catch (err) {
    console.error("Error adding inquiry:", err.stack);
    res.status(500).json({ message: 'Error adding inquiry', error: err.message });
  }
};

// Get inquiry by ID
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json({ inquiry });
  } catch (err) {
    console.error("Error fetching inquiry:", err);
    res.status(500).json({ message: 'Error fetching inquiry' });
  }
};

// Update inquiry
export const updateInquiry = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, description, category, priority, status } = req.body;
  const attachment = req.file ? `/uploads/${req.file.filename}` : req.body.attachment;

  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { name, email, subject, description, category, priority, status, attachment },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Unable to update inquiry' });

    res.status(200).json({ inquiry });
  } catch (err) {
    console.error("Error updating inquiry:", err);
    res.status(500).json({ message: 'Error updating inquiry' });
  }
};

// Delete inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Unable to delete inquiry' });
    res.status(200).json({ message: 'Inquiry deleted successfully', deleted });
  } catch (err) {
    console.error("Error deleting inquiry:", err);
    res.status(500).json({ message: 'Error deleting inquiry' });
  }
};

// Inquiry statistics
export const getInquiryStats = async (req, res) => {
  try {
    const stats = await Inquiry.aggregate([
      {
        $group: {
          _id: null,
          totalInquiries: { $sum: 1 },
          pendingInquiries: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
          resolvedInquiries: { $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] } },
          criticalInquiries: { $sum: { $cond: [{ $eq: ["$priority", "High"] }, 1, 0] } },
        }
      },
      {
        $project: {
          _id: 0,
          totalInquiries: 1,
          pendingInquiries: 1,
          resolvedInquiries: 1,
          criticalInquiries: 1,
        }
      }
    ]);
    res.status(200).json(stats[0]);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

// Respond to inquiry (mark as Resolved + send email)
export const respondToInquiry = async (req, res) => {
  const { id } = req.params;
  const { response, status } = req.body;

  try {
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    inquiry.status = status || inquiry.status;
    await inquiry.save();

    const html = InquiryResponseTemplate(inquiry.name, inquiry.subject, response, inquiry.status);

    await transporter.sendMail({
      from: `"MediTrack Support" <${process.env.EMAIL_USER}>`,
      to: inquiry.email,
      subject: `📩 Update on your inquiry: ${inquiry.subject}`,
      html,
    });

    res.status(200).json({ message: 'Response email sent successfully', inquiry });
  } catch (error) {
    console.error("❌ Failed to send response:", error);
    res.status(500).json({ message: 'Failed to respond to inquiry', error: error.message });
  }
};
