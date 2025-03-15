import React, { useEffect, useState } from "react";
import axios from "axios";
import Display from "./Display";

const URL = "http://localhost:5000/api/inquiries";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const InquiryDetails = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setInquiries(data.inquiries));
  }, []);

  return (
    <div>
      <h1>Inquiry Display Details</h1>
      {inquiries && inquiries.map((inquiry, i) => (
        <div key={i}>
          <Display inquire={Display} />
        </div>
      ))}
    </div>
  );
};

export default InquiryDetails;

//Display