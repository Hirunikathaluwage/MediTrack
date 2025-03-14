import React from "react";
import { Link } from "react-router-dom";
import { Home, List, Clock, CheckCircle, Users, FileText } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>IMS</h2>
        <nav>
          <ul>
            <li><Link to="/"> <Home size={18} /> Dashboard</Link></li>
            <li><Link to="/inquiries"> <List size={18} /> All Inquiries</Link></li>
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
          <div className="card"><Home /> Total Inquiries <span>150</span></div>
          <div className="card"><Clock /> Pending <span>25</span></div>
          <div className="card"><CheckCircle /> Resolved <span>125</span></div>
          <div className="card"><Clock /> Average Response <span>3h</span></div>
        </section>

        <section className="charts">
          <div className="chart">Inquiry Trends (Chart will be implemented here)</div>
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
              <tr>
                <td>INQ001</td>
                <td>Payment Processing Issue</td>
                <td><span className="status pending">Pending</span></td>
                <td><span className="priority high">High</span></td>
                <td>2023-10-25</td>
                <td>John Doe</td>
                <td>...</td>
              </tr>
              <tr>
                <td>INQ002</td>
                <td>Account Access Problem</td>
                <td><span className="status in-progress">In Progress</span></td>
                <td><span className="priority medium">Medium</span></td>
                <td>2023-10-24</td>
                <td>Jane Smith</td>
                <td>...</td>
              </tr>
              <tr>
                <td>INQ003</td>
                <td>Feature Request</td>
                <td><span className="status resolved">Resolved</span></td>
                <td><span className="priority low">Low</span></td>
                <td>2023-10-23</td>
                <td>Mike Johnson</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
