import Inquiry from '../models/Inquiry.js';
import { transporter } from '../utils/emailConfig.js';
import { InquiryResponseTemplate } from '../utils/InquiryResponseTemplate.js';
import { faqMap } from '../utils/autoResponderFAQ.js';
import { detectLanguage, translateText } from '../utils/translate.js';
import { io } from '../server.js';
import Branch from '../models/Branch.js'; 
import twilio from 'twilio'; 

//  Twilio setup
const accountSid = 'ACbe6de37aa642ca0559419a9e1c2bea42';
const authToken = '0207a8a3533c490dd0fe72f9ef24ca13';
const twilioPhoneNumber = '+19082013766';
const client = twilio(accountSid, authToken);

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

//  Updated Add Inquiry (with translation, email, real-time, auto-responder, branch SMS)
export const addInquiry = async (req, res) => {
  const { name, email, subject, description, category, priority, location } = req.body;
  const attachment = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    if (!name || !email || !subject || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const originalLanguage = await detectLanguage(description);
    const translatedDescription = originalLanguage !== 'en'
      ? await translateText(description, 'en')
      : description;

    const inquiry = new Inquiry({
      name,
      email,
      subject,
      description,
      translatedDescription,
      originalLanguage,
      category,
      priority,
      attachment,
      location, 
    });

    await inquiry.save();

    // New Part: Send SMS if Product Issue
    if (category === 'Product Issue' && location) {
      const branch = await Branch.findOne({ location });
      if (branch) {
        const branchPhoneNumber = branch.phoneNumber;
        try {
          await client.messages.create({
            body: ` New Product Issue Inquiry!\nSubject: ${subject}\nFrom: ${name}`,
            from: twilioPhoneNumber,
            to: branchPhoneNumber
          });
          console.log(` SMS sent successfully to Branch (${location}) - ${branchPhoneNumber}`);
        } catch (smsError) {
          console.error(" Failed to send SMS to branch:", smsError.message);
        }
      } else {
        console.warn(` No matching branch found for location: ${location}`);
      }
    }

    io.emit('newInquiry', inquiry);
    console.log(' Real-time New Inquiry event emitted');

    
    let autoReplied = false;
    for (const faq of faqMap) {
      for (const keyword of faq.keywords) {
        if (translatedDescription.toLowerCase().includes(keyword)) {
          await transporter.sendMail({
            from: `"MediTrack Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: ` Auto-Response: ${subject}`,
            html: `
              <div style="font-family: Arial; padding: 20px;">
                <p>Hi ${name},</p>
                <p>Thank you for your inquiry about <strong>"${subject}"</strong>.</p>
                <p><strong>Here’s an instant answer:</strong></p>
                <blockquote style="background-color:#f0f0f0; padding: 1rem; border-left: 4px solid #36A2EB;">
                  ${faq.response}
                </blockquote>
                <p>If this didn't solve your issue, our team will still reach out shortly.</p>
                <p style="margin-top: 20px;">Best,<br/>MediTrack Support</p>
              </div>
            `
          });

          inquiry.status = "Resolved";
          await inquiry.save();
          autoReplied = true;
          break;
        }
      }
      if (autoReplied) break;
    }

 
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2> Your inquiry has been received!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to us regarding <strong>"${subject}"</strong>.</p>
        <p>Our support team will review your inquiry and get back to you shortly.</p>
        <br/>
        <p><strong>Details:</strong></p>
        <ul>
          <li><strong>Category:</strong> ${category || 'General'}</li>
          <li><strong>Priority:</strong> ${priority || 'Normal'}</li>
          <li><strong>Language Detected:</strong> ${originalLanguage}</li>
        </ul>
        <p>If you have any further questions, feel free to reply to this email.</p>
        <p style="margin-top: 20px;">Best regards,<br/>The MediTrack Support Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"MediTrack Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: ` Inquiry Received: ${subject}`,
      html: confirmationHtml,
    });

    res.status(201).json({
      message: 'Inquiry added successfully with translation, confirmation email, real-time notification, and branch SMS (if product issue).',
      inquiry
    });

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

// Inquiry analytics with Month/Year filters
export const getInquiryAnalytics = async (req, res) => {
  try {
    const { month, year } = req.query;
    let match = {};

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
      match.createdAt = { $gte: startDate, $lte: endDate };
    }

    const total = await Inquiry.countDocuments(match);
    const resolved = await Inquiry.countDocuments({ ...match, status: "Resolved" });
    const pending = await Inquiry.countDocuments({ ...match, status: "Pending" });

    const high = await Inquiry.countDocuments({ ...match, priority: "High" });
    const medium = await Inquiry.countDocuments({ ...match, priority: "Medium" });
    const low = await Inquiry.countDocuments({ ...match, priority: "Low" });

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const thisWeek = await Inquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    res.status(200).json({
      total,
      resolved,
      pending,
      thisWeek,
      priority: { high, medium, low }
    });
  } catch (error) {
    console.error(" Failed to load inquiry analytics:", error);
    res.status(500).json({ message: "Error loading inquiry analytics", error: error.message });
  }
};

// Respond to inquiry manually
export const respondToInquiry = async (req, res) => {
  const { id } = req.params;
  const { response, status } = req.body;

  try {
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

    const userLang = inquiry.originalLanguage || 'en';
    const translatedResponse =
      userLang !== 'en' ? await translateText(response, userLang) : response;

    inquiry.status = status || inquiry.status;
    await inquiry.save();

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2> MediTrack Support Response</h2>
        <p>Hi ${inquiry.name},</p>
        <p>We have reviewed your inquiry regarding <strong>"${inquiry.subject}"</strong>.</p>
        <p><strong>Response:</strong></p>
        <blockquote style="background-color:#f1f1f1; padding: 10px; border-left: 4px solid #2196F3;">
          ${translatedResponse}
        </blockquote>
        <p>If you need more help, feel free to reply.</p>
        <p style="margin-top: 20px;">Best regards,<br/>MediTrack Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"MediTrack Support" <${process.env.EMAIL_USER}>`,
      to: inquiry.email,
      subject: `Response to your inquiry: ${inquiry.subject}`,
      html,
    });

    res.status(200).json({ message: 'Response email sent successfully', inquiry });
  } catch (error) {
    console.error(" Failed to send response:", error);
    res.status(500).json({ message: 'Failed to respond to inquiry', error: error.message });
  }
};

