import React, { useEffect, useState } from 'react';
import { getCustomerProfile } from '../../api/customerAPI';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCustomerProfile();
        setUser(data);
      } catch (err) {
        console.error('❌ Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
