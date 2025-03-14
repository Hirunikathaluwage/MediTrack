import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const AllInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Fetch all inquiries from the backend
    axios.get("/api/inquiries")
      .then(response => {
        if (Array.isArray(response.data)) {
          setInquiries(response.data);
          console.log("Inquiries fetched successfully:", response.data);
        } else {
          console.error("Unexpected response format for inquiries:", response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the inquiries!", error);
      });
  }, []);

  return (
    <div className="all-inquiries">
      <h3>All Inquiries</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>SUBJECT</th>
            <th>DESCRIPTION</th>
            <th>CATEGORY</th>
            <th>PRIORITY</th>
            <th>ATTACHMENT</th>
            <th>CREATED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(inquiries) && inquiries.map(inquiry => (
            <tr key={inquiry._id}>
              <td>{inquiry._id}</td>
              <td>{inquiry.name}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.subject}</td>
              <td>{inquiry.description}</td>
              <td>{inquiry.category}</td>
              <td><span className={`priority ${inquiry.priority.toLowerCase()}`}>{inquiry.priority}</span></td>
              <td><a href={`/${inquiry.attachment}`} target="_blank" rel="noopener noreferrer">View</a></td>
              <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllInquiries;
