export const InquiryResponseTemplate = (name, subject, response, status) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        padding: 20px;
      }
      .card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        margin: auto;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      .title {
        font-size: 20px;
        font-weight: bold;
        color: #4CAF50;
        margin-bottom: 10px;
      }
      .content {
        font-size: 16px;
        color: #333;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="title">Your Inquiry Has Been Responded</div>
      <div class="content">
        <p>Hi ${name},</p>
        <p>We’ve responded to your inquiry regarding "<strong>${subject}</strong>".</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Response:</strong></p>
        <blockquote>${response}</blockquote>
        <p>If you have more questions, feel free to reply again.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} MediTrack | All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;
