import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, message } from 'antd';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stat = () => {
  const [data, setData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5080/api/reports/registrations');
        const { months, registrations, totalUsers } = res.data;
        setData({
          labels: months,
          datasets: [
            {
              label: 'Registrations',
              data: registrations,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
        setTotalUsers(totalUsers);
      } catch (err) {
        console.error(err);
        message.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloadReport = () => {
    if (!data) return;
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Month,Registrations', ...data.labels.map((label, idx) => `${label},${data.datasets[0].data[idx]}`)].join('\n');
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.href = encodeURI(csvContent);
    link.download = `registration_report_${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      title="Registered Users"
      extra={<Button size="small" onClick={downloadReport} disabled={!data}>Download</Button>}
      style={{ height: '100%', padding: '8px' }}
    >
      {loading ? (
        <Spin size="small" />
      ) : (
        <>
          <h2 style={{ fontSize: '20px', marginBottom: '12px', textAlign: 'center' }}>
            {totalUsers}
          </h2>
          {data && (
            <div style={{ height: '150px' }}>
              <Line 
                data={data}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default Stat;
