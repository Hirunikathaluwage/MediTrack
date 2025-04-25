import React, { useEffect, useState } from 'react';
import { getAdminProfile } from '../../api/adminAPI';
import { getInquiryStats, getInquiryAnalytics } from '../../api/inquiryAPI';

import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data);
      } catch (err) {
        console.error('⚠️ Admin not authenticated');
      }
    };

    const fetchStats = async () => {
      try {
        const statsData = await getInquiryStats();
        setStats(statsData);
      } catch (err) {
        console.error('⚠️ Failed to fetch inquiry stats');
      }
    };

    fetchAdmin();
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        let query = {};
        if (selectedMonth && selectedYear) {
          query = { month: selectedMonth, year: selectedYear };
        }
        const data = await getInquiryAnalytics(query);
        setAnalytics(data);
      } catch (err) {
        console.error('⚠️ Failed to fetch inquiry analytics');
      }
    };

    fetchAnalytics();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const priorityData = analytics ? [
    { name: 'High', value: analytics.priority.high },
    { name: 'Medium', value: analytics.priority.medium },
    { name: 'Low', value: analytics.priority.low }
  ] : [];

  const statusData = analytics ? [
    { name: 'Resolved', value: analytics.resolved },
    { name: 'Pending', value: analytics.pending }
  ] : [];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>

      {admin ? (
        <div>
          <p><strong>Welcome,</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      ) : (
        <p>Loading admin profile...</p>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>📋 Inquiry Summary</h3>
      {stats ? (
        <ul>
          <li>Total Inquiries: {stats.totalInquiries}</li>
          <li>Pending: {stats.pendingInquiries}</li>
          <li>Resolved: {stats.resolvedInquiries}</li>
          <li>Critical (High Priority): {stats.criticalInquiries}</li>
        </ul>
      ) : (
        <p>Loading summary stats...</p>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>📊 Inquiry Analytics</h3>

      {/* Month and Year Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label>Month: </label>
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Year: </label>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="">All</option>
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Analytics Charts */}
      {analytics ? (
        <>
          <p><strong>Total Inquiries (Analytics):</strong> {analytics.total}</p>
          <p><strong>This Week:</strong> {analytics.thisWeek}</p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h4>Priority Breakdown</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ flex: 1, minWidth: 300 }}>
              <h4>Inquiry Status</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
