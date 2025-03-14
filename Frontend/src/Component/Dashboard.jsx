import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, List, Clock, CheckCircle, Users, FileText } from "lucide-react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "./Dashboard.css";

Chart.register(...registerables);

const Dashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ totalInquiries: 0, pendingInquiries: 0, resolvedInquiries: 0 });
  const chartRef = React.useRef(null);

  useEffect(() => {
    // Fetch inquiries from the backend
    axios.get("/api/inquiries")
      .then(response => {
        if (Array.isArray(response.data.inquiries)) {
          setInquiries(response.data.inquiries);
          console.log("Inquiries fetched successfully:", response.data.inquiries);
        } else {
          console.error("Unexpected response format for inquiries:", response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the inquiries!", error);
      });

    // Fetch inquiry statistics from the backend
    axios.get("/api/inquiries/stats")
      .then(response => {
        setStats(response.data);
        console.log("Inquiry statistics fetched successfully:", response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the inquiry statistics!", error);
      });

    // Initialize the chart
    const ctx = document.getElementById("inquiryTrendsChart").getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Inquiries",
            data: [65, 59, 80, 81, 56, 55],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    chartRef.current = newChart;

    // Cleanup function to destroy the chart
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>IMS</h2>
        <nav>
          <ul>
            <li><Link to="/"> <Home size={18} /> Dashboard</Link></li>
            <li><Link to="/all-inquiries"> <List size={18} /> All Inquiries</Link></li>
            <li><Link to="/pending"> <Clock size={18} /> Pending</Link></li>
            <li><Link to="/resolved"> <CheckCircle size={18} /> Resolved</Link></li>
            <li><Link to="/users"> <Users size={18} /> Users</Link></li>
            <li><Link to="/reports"> <FileText size={18} /> Reports</Link></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="header">
          <input type="text" placeholder="Search inquiries..." />
          <div className="user-info">👤 Admin <span className="notification-dot"></span></div>
        </header>
        
        <section className="overview">
          <div className="card"><Home /> Total Inquiries <span>{stats.totalInquiries}</span></div>
          <div className="card"><Clock /> Pending <span>{stats.pendingInquiries}</span></div>
          <div className="card"><CheckCircle /> Resolved <span>{stats.resolvedInquiries}</span></div>
          <div className="card"><Clock /> Average Response <span>3h</span></div>
        </section>

        <section className="charts">
          <div className="chart">
            <canvas id="inquiryTrendsChart"></canvas>
          </div>
          <div className="chart">Status Distribution (Pie chart will be implemented here)</div>
        </section>

        <section className="actions">
          <Link to="/create-inquiry" className="action-card">Create New Inquiry</Link>
          <Link to="/pending" className="action-card">Pending Requests</Link>
          <Link to="/generate-report" className="action-card">Generate Report</Link>
          <Link to="/user-management" className="action-card">User Management</Link>
        </section>

        <section className="recent-inquiries">
          <h3>Recent Inquiries</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>SUBJECT</th>
                <th>STATUS</th>
                <th>PRIORITY</th>
                <th>DATE</th>
                <th>ASSIGNEE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inquiries) && inquiries.map(inquiry => (
                <tr key={inquiry._id}>
                  <td>{inquiry._id}</td>
                  <td>{inquiry.subject}</td>
                  <td><span className={`status ${inquiry.status.toLowerCase()}`}>{inquiry.status}</span></td>
                  <td><span className={`priority ${inquiry.priority.toLowerCase()}`}>{inquiry.priority}</span></td>
                  <td>{new Date(inquiry.date).toLocaleDateString()}</td>
                  <td>{inquiry.assignee}</td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
