// frontend/meditrack-frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/inquiryAPI";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error(err);
        alert(" Failed to fetch stats");
      });
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2> Inquiry Dashboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Total Inquiries:</strong> {stats.totalInquiries}
        </li>
        <li>
          <strong>Pending:</strong> {stats.pendingInquiries}
        </li>
        <li>
          <strong>Resolved:</strong> {stats.resolvedInquiries}
        </li>
        <li>
          <strong>High Priority:</strong> {stats.criticalInquiries}
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
