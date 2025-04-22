// backend/utils/emailConfig.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// ✅ Nodemailer transporter using Gmail SMTP
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS, not SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Optional: Run this to test email sending directly
/*
const SendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"MediTrack🐼" <${process.env.EMAIL_USER}>`,
      to: "awanthaimesh65@example.com", // change to your test email
      subject: "Test Email from MediTrack ✔",
      text: "This is a plain text test email.",
      html: "<b>This is a test email sent from your MediTrack backend</b>",
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message || err);
  }
};

// SendEmail(); // uncomment to run test
*/
