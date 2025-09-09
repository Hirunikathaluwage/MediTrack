# MediTrack Email Send API - Visual Overview

```
🏥 MediTrack Email Send API System
├── 📧 Core Email Configuration
│   ├── 🔧 Nodemailer with Gmail SMTP
│   ├── 🔐 Environment Variables (EMAIL_USER, EMAIL_PASS)
│   └── 🌐 TLS Security (Port 587)
│
├── 🚀 Email Types & Triggers
│   ├── ✅ Inquiry Confirmations (Automatic)
│   ├── 🤖 FAQ Auto-Responses (Keyword-based)
│   ├── 🔄 Manual Support Responses
│   ├── 🚨 SLA Violation Alerts (Cron job)
│   └── 🔐 Password Reset Links
│
├── 📍 API Endpoints
│   ├── POST /api/inquiries (Submit + Auto-email)
│   ├── POST /api/inquiries/respond/:id (Manual response)
│   └── POST /api/customers/reset-password-request (Password reset)
│
├── 🎯 Smart Features
│   ├── 🌍 Multi-language Translation
│   ├── 📱 Real-time Socket.IO Notifications  
│   ├── 📲 Twilio SMS Integration
│   └── ⏰ SLA Monitoring (Every 20 min)
│
└── 🤖 Auto-Response Keywords
    ├── "opening hours" → Business hours
    ├── "location" → Store address
    ├── "contact" → Phone/email info
    ├── "delivery" → Shipping timeframe
    ├── "payment" → Payment methods
    ├── "refund" → Return policy
    └── "prescription" → Upload guide
```

## Email Flow Diagram

```
Customer Query → MediTrack API → Email Processing → Customer Response
      │               │               │                    │
      │               │               ├─ Language Detection
      │               │               ├─ FAQ Keyword Match  
      │               │               ├─ HTML Template     
      │               │               └─ SMTP Delivery     
      │               │                                    │
      │               ├─ Database Storage                  │
      │               ├─ Real-time Notification            │
      │               └─ SMS Alert (if applicable)         │
      │                                                    │
      └─ Confirmation Email ←─────────────────────────────┘
```

## Quick Configuration Checklist

- [ ] Set `EMAIL_USER` environment variable
- [ ] Set `EMAIL_PASS` environment variable (use App Password)
- [ ] Enable 2FA on Gmail account
- [ ] Configure `SLA_HOURS` (default: 6)
- [ ] Test SMTP connection
- [ ] Verify FAQ keywords are working
- [ ] Check cron job for SLA alerts

## Example Usage

```javascript
// 1. Submit inquiry (triggers auto-emails)
const inquiry = await fetch('/api/inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Opening hours',
    description: 'What time are you open?'
  })
});

// 2. Admin responds manually
const response = await fetch('/api/inquiries/respond/123', {
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    response: 'We are open 9 AM to 8 PM daily.',
    status: 'Resolved'
  })
});

// 3. Password reset request
const reset = await fetch('/api/customers/reset-password-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com'
  })
});
```

## Support Resources

📖 **Documentation:**
- [EMAIL_API_REFERENCE.md](EMAIL_API_REFERENCE.md) - Quick reference guide
- [EMAIL_API_DOCUMENTATION.md](../EMAIL_API_DOCUMENTATION.md) - Complete documentation

🔧 **Configuration:**
- [.env.example](../.env.example) - Environment variable template

📧 **Contact:**
- Email: ameditrack@gmail.com
- Phone: 070-4949394