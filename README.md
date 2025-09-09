## MediTrack Centralised Pharmacy Management System
The MediTrack System is designed to modernize and provides an efficient way of medicine purchasing and delivery for patients, pharmacies, and suppliers. The current problem in the healthcare sector is the lack of real-time medicine availability information, which leads to delays in obtaining medications in 
critical situations, unnecessary pharmacy visits, wastage of time, and medicine shortages. This system bridges the gap between patients, pharmacies, and suppliers, ensuring that medicines are available when needed.

##  Tech Stack

- **Frontend:** React, Ant Design, Tailwind CSS , HTML,CSS
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **AI & OCR:** Google Vision API  
- **Authentication:** JWT (JSON Web Tokens)
- **Email System:** Nodemailer with Gmail SMTP, Multi-language support
- **Real-time:** Socket.IO for live notifications
- **SMS Integration:** Twilio for urgent alerts
- **Other Tools:** Git, GitHub, VS Code

## 📧 Email Send API

MediTrack includes a comprehensive **Email Send API** that automatically handles customer communications:

### Features
- ✅ **Automated inquiry confirmations** - Instant email confirmations for customer inquiries
- 🤖 **Smart auto-responses** - FAQ-based automatic replies using keyword detection
- 🔄 **Manual support responses** - Admin can send personalized email responses
- 🚨 **SLA monitoring alerts** - Automatic alerts for overdue high-priority inquiries
- 🔐 **Password reset emails** - Secure password reset functionality
- 🌐 **Multi-language support** - Automatic translation for international customers

### Quick Start
```bash
# Submit inquiry (triggers automatic emails)
POST /api/inquiries
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Opening hours",
  "description": "What time are you open?",
  "category": "General"
}

# Manual response to inquiry  
POST /api/inquiries/respond/:id
{
  "response": "We are open 9 AM to 8 PM daily.",
  "status": "Resolved"
}
```

### Configuration
Set these environment variables:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
SLA_HOURS=6
```

### Documentation
- **Quick Reference:** [docs/EMAIL_API_REFERENCE.md](docs/EMAIL_API_REFERENCE.md)
- **Full Documentation:** [EMAIL_API_DOCUMENTATION.md](EMAIL_API_DOCUMENTATION.md)  
