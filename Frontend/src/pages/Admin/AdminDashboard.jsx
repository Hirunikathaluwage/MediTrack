import React, { useEffect, useState } from 'react';
import { getAdminProfile } from '../../api/adminAPI';
import { getInquiryStats } from '../../api/inquiryAPI';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);

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
        const data = await getInquiryStats();
        setStats(data);
      } catch (err) {
        console.error('⚠️ Failed to fetch inquiry stats');
      }
    };

    fetchAdmin();
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {admin ? (
        <div>
          <p><strong>Welcome,</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      ) : (
        <p>Loading admin profile...</p>
      )}

      <hr />

      <h3>Inquiry Statistics</h3>
      {stats ? (
        <ul>
          <li>Total Inquiries: {stats.totalInquiries}</li>
          <li>Pending: {stats.pendingInquiries}</li>
          <li>Resolved: {stats.resolvedInquiries}</li>
          <li>Critical (High Priority): {stats.criticalInquiries}</li>
        </ul>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
