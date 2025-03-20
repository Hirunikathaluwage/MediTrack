import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Home, List, Clock, CheckCircle, Users, FileText, Search,
  Bell, Settings, HelpCircle, LogOut, Calendar, Zap,
  AlertTriangle, BarChart2, PieChart, Activity, Inbox, ExternalLink
} from "lucide-react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "./Dashboard.css";

Chart.register(...registerables);

const Dashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ 
    totalInquiries: 0, 
    pendingInquiries: 0, 
    resolvedInquiries: 0,
    criticalInquiries: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New inquiry assigned to you", time: "10 minutes ago", read: false },
    { id: 2, message: "Reminder: 3 inquiries pending response", time: "1 hour ago", read: false },
    { id: 3, message: "Weekly report available", time: "3 hours ago", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Fetch data and initialize charts
  useEffect(() => {
    setLoading(true);
    
    const fetchInquiries = axios.get("http://localhost:5000/api/inquiries");
    const fetchStats = axios.get("http://localhost:5000/api/inquiries/stats");
    
    Promise.all([fetchInquiries, fetchStats])
      .then(([inquiriesResponse, statsResponse]) => {
        if (inquiriesResponse.headers['content-type']?.includes('application/json')) {
          const data = inquiriesResponse.data;
          if (Array.isArray(data.Inquiries)) {
            setInquiries(data.Inquiries);
          } else {
            throw new Error("Unexpected inquiries format");
          }
        } else {
          throw new Error("Invalid inquiries response format");
        }
        
        if (statsResponse.headers['content-type']?.includes('application/json')) {
          setStats({
            ...statsResponse.data,
            criticalInquiries: 5 // Adding mock data for critical inquiries
          });
        } else {
          throw new Error("Invalid stats response format");
        }
      })
      .catch(error => {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please refresh and try again.");
        
        // Set mock data for development/demo purposes
        setInquiries([
          { _id: "INQ001", subject: "System Access Issue", status: "Pending", priority: "High", date: new Date(), assignee: "John Doe", department: "IT" },
          { _id: "INQ002", subject: "Payroll Discrepancy", status: "Resolved", priority: "Medium", date: new Date(Date.now() - 86400000), assignee: "Jane Smith", department: "Finance" },
          { _id: "INQ003", subject: "Customer Complaint", status: "Critical", priority: "High", date: new Date(Date.now() - 172800000), assignee: "Mark Johnson", department: "Customer Service" },
          { _id: "INQ004", subject: "Equipment Request", status: "Pending", priority: "Low", date: new Date(Date.now() - 259200000), assignee: "Sarah Williams", department: "Operations" },
          { _id: "INQ005", subject: "Website Bug Report", status: "In Progress", priority: "Medium", date: new Date(Date.now() - 345600000), assignee: "David Lee", department: "IT" }
        ]);
        
        setStats({
          totalInquiries: 127,
          pendingInquiries: 42,
          resolvedInquiries: 78,
          criticalInquiries: 7
        });
      })
      .finally(() => {
        setLoading(false);
        initCharts();
      });
      
    // Toggle dark mode class on body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
      
    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
    };
  }, [darkMode]);

  const initCharts = () => {
    // Line chart for inquiry trends
    const lineCtx = document.getElementById("inquiryTrendsChart")?.getContext("2d");
    if (lineCtx && lineChartRef.current) {
      lineChartRef.current.destroy();
    }
    
    if (lineCtx) {
      lineChartRef.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "New Inquiries",
              data: [65, 59, 80, 81, 56, 90],
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
            {
              label: "Resolved Inquiries",
              data: [45, 55, 72, 81, 50, 75],
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            }
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Inquiry Trends (6 Months)'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Inquiries'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            }
          },
        },
      });
    }

    // Pie chart for status distribution
    const pieCtx = document.getElementById("statusDistributionChart")?.getContext("2d");
    if (pieCtx && pieChartRef.current) {
      pieChartRef.current.destroy();
    }
    
    if (pieCtx) {
      pieChartRef.current = new Chart(pieCtx, {
        type: "doughnut",
        data: {
          labels: ["Pending", "In Progress", "Resolved", "Critical"],
          datasets: [
            {
              data: [stats.pendingInquiries, 15, stats.resolvedInquiries, stats.criticalInquiries],
              backgroundColor: [
                "rgba(255, 159, 64, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(255, 99, 132, 0.8)"
              ],
              borderColor: [
                "rgba(255, 159, 64, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)"
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Inquiry Status Distribution'
            }
          },
          cutout: '65%'
        },
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Filter inquiries based on search
  const filteredInquiries = inquiries.filter(inq => 
    inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inq._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <aside className="sidebar">
        <div className="logo-container">
          <h2>IMS</h2>
          <span className="tagline">Inquiry Management System</span>
        </div>
        
        <nav>
          <ul className="main-menu">
            <li className="active"><Link to="/"> <Home size={18} /> Dashboard</Link></li>
            <li><Link to="/all-inquiries"> <List size={18} /> All Inquiries</Link></li>
            <li><Link to="/pending"> <Clock size={18} /> Pending</Link></li>
            <li><Link to="/in-progress"> <Activity size={18} /> In Progress</Link></li>
            <li><Link to="/resolved"> <CheckCircle size={18} /> Resolved</Link></li>
            <li><Link to="/critical"> <AlertTriangle size={18} /> Critical</Link></li>
            <li><Link to="/users"> <Users size={18} /> Users</Link></li>
            <li><Link to="/reports"> <FileText size={18} /> Reports</Link></li>
            <li><Link to="/calendar"> <Calendar size={18} /> Calendar</Link></li>
          </ul>
          
          <div className="sidebar-footer">
            <button className="settings-button"><Settings size={18} /></button>
            <button className="help-button"><HelpCircle size={18} /></button>
            <button className="logout-button"><LogOut size={18} /></button>
          </div>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="header">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search inquiries, users, or departments..." 
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="search-button"><Search size={18} /></button>
          </div>
          
          <div className="header-actions">
            <button 
              className="notification-button" 
              onClick={toggleNotifications}
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
            </button>
            
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '🌞' : '🌙'}
            </button>
            
            <div className="user-profile">
              <div className="avatar">👤</div>
              <div className="user-details">
                <span className="user-name">Admin User</span>
                <span className="user-role">System Administrator</span>
              </div>
            </div>
            
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h4>Notifications</h4>
                  <button onClick={markAllNotificationsRead}>Mark all as read</button>
                </div>
                <div className="notifications-list">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">No notifications</p>
                  )}
                </div>
                <div className="notifications-footer">
                  <Link to="/all-notifications">View all notifications</Link>
                </div>
              </div>
            )}
          </div>
        </header>
        
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <AlertTriangle size={48} />
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="dashboard-header">
              <h1>Dashboard Overview</h1>
              <div className="date-display">
                <Calendar size={16} />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            
            <section className="overview">
              <div className="card total">
                <div className="card-icon"><Inbox size={24} /></div>
                <div className="card-content">
                  <h3>Total Inquiries</h3>
                  <span className="card-value">{stats.totalInquiries}</span>
                  <span className="trend positive">+12% from last month</span>
                </div>
              </div>
              
              <div className="card pending">
                <div className="card-icon"><Clock size={24} /></div>
                <div className="card-content">
                  <h3>Pending</h3>
                  <span className="card-value">{stats.pendingInquiries}</span>
                  <span className="trend negative">+5% from last month</span>
                </div>
              </div>
              
              <div className="card resolved">
                <div className="card-icon"><CheckCircle size={24} /></div>
                <div className="card-content">
                  <h3>Resolved</h3>
                  <span className="card-value">{stats.resolvedInquiries}</span>
                  <span className="trend positive">+18% from last month</span>
                </div>
              </div>
              
              <div className="card critical">
                <div className="card-icon"><AlertTriangle size={24} /></div>
                <div className="card-content">
                  <h3>Critical</h3>
                  <span className="card-value">{stats.criticalInquiries}</span>
                  <span className="trend neutral">No change from last month</span>
                </div>
              </div>
            </section>

            <section className="charts-container">
              <div className="chart-card trend-chart">
                <div className="chart-header">
                  <h3><BarChart2 size={18} /> Inquiry Trends</h3>
                  <div className="chart-actions">
                    <select className="time-range-selector">
                      <option>Last 6 Months</option>
                      <option>Last 12 Months</option>
                      <option>This Year</option>
                    </select>
                    <button className="export-button"><ExternalLink size={14} /> Export</button>
                  </div>
                </div>
                <div className="chart-body">
                  <canvas id="inquiryTrendsChart"></canvas>
                </div>
              </div>
              
              <div className="chart-card status-chart">
                <div className="chart-header">
                  <h3><PieChart size={18} /> Status Distribution</h3>
                  <button className="export-button"><ExternalLink size={14} /> Export</button>
                </div>
                <div className="chart-body">
                  <canvas id="statusDistributionChart"></canvas>
                </div>
              </div>
            </section>

            <section className="quick-actions">
              <h3><Zap size={18} /> Quick Actions</h3>
              <div className="actions-grid">
                <Link to="/create-inquiry" className="action-card">
                  <div className="action-icon">+</div>
                  <div className="action-text">Create New Inquiry</div>
                </Link>
                
                <Link to="/pending" className="action-card">
                  <div className="action-icon">⏱️</div>
                  <div className="action-text">View Pending ({stats.pendingInquiries})</div>
                </Link>
                
                <Link to="/critical" className="action-card">
                  <div className="action-icon">⚠️</div>
                  <div className="action-text">Critical Issues ({stats.criticalInquiries})</div>
                </Link>
                
                <Link to="/generate-report" className="action-card">
                  <div className="action-icon">📊</div>
                  <div className="action-text">Generate Report</div>
                </Link>
                
                <Link to="/user-management" className="action-card">
                  <div className="action-icon">👥</div>
                  <div className="action-text">User Management</div>
                </Link>
                
                <Link to="/settings" className="action-card">
                  <div className="action-icon">⚙️</div>
                  <div className="action-text">System Settings</div>
                </Link>
              </div>
            </section>

            <section className="recent-activity">
              <div className="section-header">
                <h3><Activity size={18} /> Recent Inquiries</h3>
                <Link to="/all-inquiries" className="view-all">View All</Link>
              </div>
              
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SUBJECT</th>
                      <th>STATUS</th>
                      <th>PRIORITY</th>
                      <th>DATE</th>
                      <th>ASSIGNEE</th>
                      <th>DEPARTMENT</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.length > 0 ? (
                      filteredInquiries.map(inquiry => (
                        <tr key={inquiry._id} className={inquiry.status === 'Critical' ? 'critical-row' : ''}>
                          <td className="id-cell">{inquiry._id}</td>
                          <td className="subject-cell">
                            <Link to={`/inquiry/${inquiry._id}`}>{inquiry.subject}</Link>
                          </td>
                          <td>
                            <span className={`status-badge ${inquiry.status?.toLowerCase()}`}>
                              {inquiry.status === 'Pending' && <Clock size={12} />}
                              {inquiry.status === 'In Progress' && <Activity size={12} />}
                              {inquiry.status === 'Resolved' && <CheckCircle size={12} />}
                              {inquiry.status === 'Critical' && <AlertTriangle size={12} />}
                              {inquiry.status}
                            </span>
                          </td>
                          <td>
                            <span className={`priority-badge ${inquiry.priority?.toLowerCase()}`}>
                              {inquiry.priority}
                            </span>
                          </td>
                          <td>{new Date(inquiry.date).toLocaleDateString()}</td>
                          <td className="assignee-cell">
                            <div className="assignee-info">
                              <div className="assignee-avatar">
                                {inquiry.assignee?.charAt(0)}
                              </div>
                              {inquiry.assignee}
                            </div>
                          </td>
                          <td>{inquiry.department}</td>
                          <td className="actions-cell">
                            <div className="table-actions">
                              <button className="action-button view-button" title="View Details">
                                <Search size={14} />
                              </button>
                              <button className="action-button edit-button" title="Edit Inquiry">
                                <FileText size={14} />
                              </button>
                              <button className="action-button assign-button" title="Reassign">
                                <Users size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-data">
                          {searchQuery ? "No inquiries matching your search" : "No inquiries available"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="table-footer">
                <div className="pagination">
                  <button className="pagination-button" disabled>&lt; Previous</button>
                  <button className="pagination-button active">1</button>
                  <button className="pagination-button">2</button>
                  <button className="pagination-button">3</button>
                  <button className="pagination-button">Next &gt;</button>
                </div>
                <div className="items-per-page">
                  <span>Items per page:</span>
                  <select>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;