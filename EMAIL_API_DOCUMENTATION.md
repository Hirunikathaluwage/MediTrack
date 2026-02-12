# MediTrack Email Send API Documentation

## Overview

The MediTrack system includes a comprehensive email sending functionality built on top of **Nodemailer** with Gmail SMTP integration. The email system supports automated responses, multi-language translations, HTML templates, and SLA monitoring alerts.

## 🏗️ Architecture

### Core Components

1. **Email Configuration** (`Backend/utils/emailConfig.js`)
2. **Inquiry System** (`Backend/controllers/inquiryController.js`) 
3. **SLA Monitoring** (`Backend/utils/slaChecker.js`)
4. **Customer Authentication** (`Backend/controllers/customerController.js`)

## 📧 Email Configuration

### Setup (`Backend/utils/emailConfig.js`)

```javascript
import nodemailer from 'nodemailer';

// Gmail SMTP transporter setup
export const transporter = nodemailer.createTransporter({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// Generic email sending function
export const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"MediTrack Alerts" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: `<p>${text}</p>`,  
    replyTo: process.env.EMAIL_USER
  };

  await transporter.sendMail(mailOptions);
};
```

### Environment Variables Required

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

> **Note**: Use Gmail App Password instead of regular password for enhanced security.

## 🚀 Email API Endpoints

### 1. Inquiry System Emails

#### Submit Inquiry (Auto-Email Triggered)
- **Endpoint**: `POST /api/inquiries`
- **Description**: Automatically sends confirmation and auto-response emails
- **Email Types**:
  - Confirmation email to customer
  - Auto-response based on FAQ keywords
  - Internal notifications

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "customer@example.com",
  "subject": "Medicine availability",
  "description": "When are you open?",
  "category": "General",
  "priority": "Medium",
  "location": "Colombo"
}
```

**Auto-Generated Emails:**

1. **Confirmation Email** (Always sent):
```html
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>✅ Your inquiry has been received!</h2>
  <p>Hi John Doe,</p>
  <p>Thank you for reaching out to us regarding <strong>"Medicine availability"</strong>.</p>
  <p>Our support team will review your inquiry and get back to you shortly.</p>
  <p><strong>Details:</strong></p>
  <ul>
    <li><strong>Category:</strong> General</li>
    <li><strong>Priority:</strong> Medium</li>
    <li><strong>Language Detected:</strong> en</li>
  </ul>
</div>
```

2. **Auto-Response Email** (If FAQ keywords match):
```html
<div style="font-family: Arial; padding: 20px;">
  <p>Hi John Doe,</p>
  <p>Thank you for your inquiry about <strong>"Medicine availability"</strong>.</p>
  <p><strong>Here's an instant answer:</strong></p>
  <blockquote style="background-color:#f0f0f0; padding: 1rem; border-left: 4px solid #36A2EB;">
    🕒 Our pharmacy is open daily from 9:00 AM to 8:00 PM.
  </blockquote>
  <p>If this didn't solve your issue, our team will still reach out shortly.</p>
</div>
```

#### Manual Response to Inquiry
- **Endpoint**: `POST /api/inquiries/respond/:id`
- **Description**: Send manual response email to customer inquiry

**Request Body:**
```json
{
  "response": "Thank you for your inquiry. We have the medicine in stock.",
  "status": "Resolved"
}
```

**Generated Email:**
```html
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>🔄 MediTrack Support Response</h2>
  <p>Hi Customer,</p>
  <p>We have reviewed your inquiry regarding <strong>"Medicine availability"</strong>.</p>
  <p><strong>Response:</strong></p>
  <blockquote style="background-color:#f1f1f1; padding: 10px; border-left: 4px solid #2196F3;">
    Thank you for your inquiry. We have the medicine in stock.
  </blockquote>
</div>
```

### 2. Authentication System Emails

#### Password Reset Request
- **Endpoint**: `POST /api/customers/reset-password-request`
- **Description**: Sends password reset link to user email

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Generated Email:**
```html
<p>Hello User Name,</p>
<p>Click the link below to reset your password:</p>
<p><a href="https://meditrack-reset.com/reset-password/userId/token">Reset Password</a></p>
<p>This link will expire in 15 minutes.</p>
```

### 3. SLA Alert System (Automated)

#### High-Priority Inquiry Alerts
- **Trigger**: Automated cron job (every 20 minutes)
- **Description**: Sends alert emails for overdue high-priority inquiries
- **Target**: Internal admin emails

**Alert Email:**
```text
Subject: ⚠️ SLA Alert: High-Priority Inquiry

This high-priority inquiry has not been addressed in 6 hours:

Subject: [Inquiry Subject]
ID: [Inquiry ID]
```

## 🎯 Auto-Response System

### FAQ Keyword Mapping

The system automatically responds to inquiries containing specific keywords:

```javascript
const faqMap = [
  {
    keywords: ['opening hours', 'working time', 'when open'],
    response: '🕒 Our pharmacy is open daily from 9:00 AM to 8:00 PM.'
  },
  {
    keywords: ['location', 'where are you', 'address'],
    response: '📍 We are located at 123 Main Street, Colombo.'
  },
  {
    keywords: ['contact', 'phone number', 'call'],
    response: '📞 You can contact us at 070-4949394 or email ameditrack@gmail.com.'
  },
  {
    keywords: ['delivery time', 'when will my order arrive'],
    response: '🚚 Your order will be delivered within 2–3 business days.'
  },
  {
    keywords: ['payment methods', 'how to pay'],
    response: '💳 We accept cash on delivery and bank transfer.'
  },
  {
    keywords: ['refund', 'return', 'cancel order'],
    response: '🔁 You can cancel your order within 1 hour of placing it.'
  },
  {
    keywords: ['prescription', 'upload prescription'],
    response: '📄 You can upload your prescription during checkout.'
  }
];
```

## 🌐 Multi-Language Support

The email system includes automatic language detection and translation:

1. **Language Detection**: Automatically detects the language of incoming inquiries
2. **Translation**: Translates responses to the customer's original language
3. **Supported Languages**: Any language supported by Google Translate API

## 📱 Integration Features

### Real-time Notifications
- Socket.IO integration for real-time inquiry notifications
- Live dashboard updates

### SMS Integration
- Twilio integration for product issue inquiries
- Automatic SMS to relevant pharmacy branches

## 🔧 Configuration

### Required Dependencies

```json
{
  "nodemailer": "^6.10.0",
  "dotenv": "^16.4.7",
  "google-translate-api-x": "^10.7.2",
  "node-cron": "^3.0.3",
  "twilio": "^5.5.2"
}
```

### Email Templates

All emails use HTML templates with:
- Professional styling
- Responsive design
- Brand consistency (MediTrack branding)
- Emoji indicators for better UX

## 📊 Monitoring & Analytics

### SLA Configuration
```javascript
const SLA_HOURS = process.env.SLA_HOURS ? parseInt(process.env.SLA_HOURS) : 6;
```

### Cron Schedule
```javascript
cron.schedule("*/20 * * * *", checkInquirySLA);
// Runs every 20 minutes
```

## 🛡️ Security Features

1. **Environment Variables**: Sensitive credentials stored in environment variables
2. **JWT Tokens**: Secure password reset tokens with expiration
3. **App Passwords**: Gmail App Password for enhanced security
4. **Input Validation**: All email inputs are validated before processing

## 📝 Usage Examples

### Direct Email Sending
```javascript
import { sendEmail } from './utils/emailConfig.js';

await sendEmail({
  to: 'customer@example.com',
  subject: 'Welcome to MediTrack',
  text: 'Thank you for joining our pharmacy management system!'
});
```

### Using Transporter Directly
```javascript
import { transporter } from './utils/emailConfig.js';

await transporter.sendMail({
  from: '"MediTrack Support" <noreply@meditrack.com>',
  to: 'customer@example.com',
  subject: 'Custom Email',
  html: '<h1>Custom HTML Content</h1>'
});
```

## 🚨 Error Handling

All email operations include comprehensive error handling:

```javascript
try {
  await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to ${to}`);
} catch (error) {
  console.error(`❌ Email sending failed:`, error.message);
}
```

## 📞 Support

For questions about the email API:
- Email: ameditrack@gmail.com
- Phone: 070-4949394

---

*This documentation covers the complete email sending functionality in the MediTrack Centralized Pharmacy Management System.*