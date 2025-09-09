# Email Send API - Quick Reference

## What is the Email Send API?

The **Email Send API** in MediTrack is a comprehensive email notification system that automatically handles:

- ✅ **Customer inquiry confirmations**
- 🤖 **Automated FAQ responses** 
- 🔄 **Manual support responses**
- 🚨 **SLA violation alerts**
- 🔐 **Password reset emails**

## 🏗️ Core Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Gmail SMTP    │◄───│   Nodemailer    │◄───│  MediTrack API  │
│   (Port 587)    │    │   Transporter   │    │   Controllers   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📧 Email Types & Triggers

| Email Type | Trigger | Endpoint | Auto/Manual |
|------------|---------|----------|-------------|
| Inquiry Confirmation | New inquiry submitted | `POST /api/inquiries` | Automatic |
| FAQ Auto-Response | Keywords detected | `POST /api/inquiries` | Automatic |
| Manual Response | Admin responds | `POST /api/inquiries/respond/:id` | Manual |
| Password Reset | Forgot password request | `POST /api/customers/reset-password-request` | Manual |
| SLA Alert | High priority overdue | Background cron job | Automatic |

## 🚀 Quick Start Usage

### 1. Submit Inquiry (Triggers Auto-Emails)

```bash
POST /api/inquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Opening hours",
  "description": "What time are you open?",
  "category": "General",
  "priority": "Medium"
}
```

**Result**: 
- ✅ Confirmation email sent to customer
- 🤖 Auto-response email sent (if FAQ keyword detected)

### 2. Manual Response to Inquiry

```bash
POST /api/inquiries/respond/INQUIRY_ID
Content-Type: application/json

{
  "response": "We are open from 9 AM to 8 PM daily.",
  "status": "Resolved"
}
```

**Result**: 
- 📧 Response email sent to customer
- 🔄 Inquiry status updated

### 3. Password Reset Email

```bash
POST /api/customers/reset-password-request
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Result**: 
- 🔐 Password reset link emailed to user
- ⏰ Link expires in 15 minutes

## 🤖 Auto-Response Keywords

| Keywords | Auto-Response |
|----------|---------------|
| `opening hours`, `when open`, `working time` | 🕒 Business hours information |
| `location`, `address`, `where are you` | 📍 Store location details |
| `contact`, `phone`, `call` | 📞 Contact information |
| `delivery time`, `order arrive` | 🚚 Delivery timeframe |
| `payment`, `how to pay`, `card` | 💳 Payment methods |
| `refund`, `return`, `cancel` | 🔁 Return/refund policy |
| `prescription`, `upload` | 📄 Prescription upload guide |

## ⚙️ Configuration

### Environment Variables
```env
# Required for email functionality
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
SLA_HOURS=6
```

### Email Settings
- **SMTP**: Gmail (smtp.gmail.com:587)
- **Security**: TLS encryption
- **Authentication**: App Password required
- **Rate Limiting**: Built-in Gmail limits

## 📊 Monitoring

### SLA Alerts
- **Frequency**: Every 20 minutes
- **Trigger**: High-priority inquiries > 6 hours old
- **Target**: Admin email addresses

### Real-time Features
- **Socket.IO**: Live inquiry notifications
- **SMS Integration**: Twilio for urgent alerts
- **Translation**: Multi-language support

## 🔧 Direct API Usage (Developer)

### Import Email Functions
```javascript
import { sendEmail, transporter } from './utils/emailConfig.js';
```

### Simple Email
```javascript
await sendEmail({
  to: 'customer@example.com',
  subject: 'Welcome!',
  text: 'Thank you for joining MediTrack!'
});
```

### HTML Email with Custom Template
```javascript
await transporter.sendMail({
  from: '"MediTrack" <noreply@meditrack.com>',
  to: 'customer@example.com',
  subject: 'Order Confirmation',
  html: `
    <div style="padding: 20px; font-family: Arial;">
      <h2>Order Confirmed! 🎉</h2>
      <p>Your order #12345 has been confirmed.</p>
    </div>
  `
});
```

## ❗ Common Issues & Solutions

### Email Not Sending
1. ✅ Check `EMAIL_USER` and `EMAIL_PASS` environment variables
2. ✅ Verify Gmail App Password (not regular password)
3. ✅ Ensure 2FA is enabled on Gmail account
4. ✅ Check internet connectivity

### Auto-Response Not Working
1. ✅ Verify FAQ keywords are correctly spelled
2. ✅ Check if inquiry description contains keywords
3. ✅ Confirm translation service is working

### SLA Alerts Not Sending
1. ✅ Check cron job is running (`scheduleSLAAlert()`)
2. ✅ Verify `SLA_HOURS` environment variable
3. ✅ Confirm high-priority inquiries exist

## 📱 Integration Examples

### React Frontend Integration
```javascript
// Submit inquiry (triggers emails automatically)
const submitInquiry = async (formData) => {
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (response.ok) {
    alert('Inquiry submitted! Check your email for confirmation.');
  }
};
```

### Admin Panel Response
```javascript
// Send manual response (triggers response email)
const respondToInquiry = async (inquiryId, response) => {
  await fetch(`/api/inquiries/respond/${inquiryId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      response, 
      status: 'Resolved' 
    })
  });
};
```

## 🎯 Best Practices

1. **Use HTML Templates**: Create professional-looking emails
2. **Include Error Handling**: Always wrap email calls in try-catch
3. **Rate Limiting**: Don't spam customers with too many emails
4. **Personalization**: Use customer names in email content
5. **Mobile-Friendly**: Ensure emails render well on mobile devices
6. **Security**: Never include sensitive data in emails

---

**Need Help?** 
- 📧 Email: ameditrack@gmail.com  
- 📞 Phone: 070-4949394
- 📖 Full Documentation: [EMAIL_API_DOCUMENTATION.md](../EMAIL_API_DOCUMENTATION.md)