import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

//  Gmail SMTP transporter setup
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

//  Function to send email
export const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"MediTrack Alerts" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: `<p>${text}</p>`,  
    replyTo: process.env.EMAIL_USER
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(` Email sent to ${to}`);
  } catch (error) {
    console.error(` Email sending failed:`, error.message);
  }
};
