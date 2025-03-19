import React from "react";

const InquiryList = ({ inquiries }) => {
  return (
    <div>
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="inquiry-item">
          <div>
            <strong>Attachment:</strong>{" "}
            <a href={inquiry.attachmentUrl} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiryList;