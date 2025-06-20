// MediTrack/Backend/utils/autoResponderFAQ.js

export const faqMap = [
  {
    keywords: ['opening hours', 'working time', 'when open', 'what time open', 'close time'],
    response: '🕒 Our pharmacy is open daily from 9:00 AM to 8:00 PM.'
  },
  {
    keywords: ['location', 'where are you', 'address', 'find store'],
    response: '📍 We are located at 123 Main Street, Colombo. You can find us easily via Google Maps.'
  },
  {
    keywords: ['contact', 'phone number', 'call', 'how to contact'],
    response: '📞 You can contact us at 070-4949394 or email ameditrack@gmail.com.'
  },
  {
    keywords: ['delivery time', 'when will my order arrive', 'delivery status'],
    response: '🚚 Your order will be delivered within 2–3 business days. You will receive tracking updates via SMS.'
  },
  {
    keywords: ['payment methods', 'how to pay', 'accept card'],
    response: '💳 We accept cash on delivery and bank transfer (upload your payment slip).'
  },
  {
    keywords: ['refund', 'return', 'cancel order'],
    response: '🔁 You can cancel your order within 1 hour of placing it. For refunds, please contact our support team.'
  },
  {
    keywords: ['prescription', 'upload prescription', 'how to add prescription'],
    response: '📄 You can upload your prescription during checkout or through the inquiry form. Our pharmacist will verify it.'
  }
];
