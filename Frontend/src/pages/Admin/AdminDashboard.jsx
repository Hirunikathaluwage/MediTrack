import React, { useEffect, useState } from 'react';
import { getAdminProfile } from '../../api/adminAPI';
import { getInquiryStats, getInquiryAnalytics } from '../../api/inquiryAPI';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { 
  ArrowDown, ArrowUp, AlertCircle, Clock, CheckCircle, 
  Activity, Calendar, Filter, Download, FileText 
} from 'lucide-react';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const StatCard = ({ title, value, icon, trend, trendValue, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-md p-6 flex flex-col`}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="p-2 bg-white bg-opacity-30 rounded-full">{icon}</div>
    </div>
    <div className="text-3xl font-bold mb-3">{value}</div>
    {trend && (
      <div className="flex items-center text-sm">
        {trend === 'up' ? (
          <ArrowUp size={16} className="mr-1 text-green-500" />
        ) : (
          <ArrowDown size={16} className="mr-1 text-red-500" />
        )}
        <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
          {trendValue}% since last month
        </span>
      </div>
    )}
  </div>
);

// Helper function to generate and download a report file
const generateReport = (data, type, format) => {
  // Convert the data to the requested format
  let fileContent = '';
  let fileName = '';
  let mimeType = '';
  
  if (format === 'CSV') {
    // Convert data to CSV format
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).join(',');
    fileContent = `${headers}\n${values}`;
    fileName = `${type.replace(/\s+/g, '-').toLowerCase()}-report.csv`;
    mimeType = 'text/csv';
  } else if (format === 'Excel') {
    // For Excel, we'll create a simple CSV that Excel can open
    // In a real app, you'd use a library like exceljs or xlsx
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).join(',');
    fileContent = `${headers}\n${values}`;
    fileName = `${type.replace(/\s+/g, '-').toLowerCase()}-report.xls`;
    mimeType = 'application/vnd.ms-excel';
  } else {
    // Default to PDF-like text format
    // In a real app, you'd use a library like jsPDF
    fileContent = JSON.stringify(data, null, 2);
    fileName = `${type.replace(/\s+/g, '-').toLowerCase()}-report.txt`;
    mimeType = 'text/plain';
  }
  
  // Create a Blob with the file content
  const blob = new Blob([fileContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
  
  return true;
};

const ReportModal = ({ isOpen, onClose, reportData, reportType }) => {
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  
  if (!isOpen) return null;
  
  const handleDownload = () => {
    const success = generateReport(reportData, reportType, selectedFormat);
    if (success) {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Download Report</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Select report format:</p>
          <div className="flex space-x-4">
            <button 
              onClick={() => setSelectedFormat('PDF')}
              className={`flex items-center px-4 py-2 ${
                selectedFormat === 'PDF' 
                  ? 'bg-blue-100 border border-blue-300' 
                  : 'bg-blue-50 border border-blue-200'
              } rounded-md hover:bg-blue-100`}
            >
              <FileText size={16} className="mr-2 text-blue-600" />
              <span>PDF</span>
            </button>
            <button 
              onClick={() => setSelectedFormat('Excel')}
              className={`flex items-center px-4 py-2 ${
                selectedFormat === 'Excel' 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-green-50 border border-green-200'
              } rounded-md hover:bg-green-100`}
            >
              <FileText size={16} className="mr-2 text-green-600" />
              <span>Excel</span>
            </button>
            <button 
              onClick={() => setSelectedFormat('CSV')}
              className={`flex items-center px-4 py-2 ${
                selectedFormat === 'CSV' 
                  ? 'bg-yellow-100 border border-yellow-300' 
                  : 'bg-yellow-50 border border-yellow-200'
              } rounded-md hover:bg-yellow-100`}
            >
              <FileText size={16} className="mr-2 text-yellow-600" />
              <span>CSV</span>
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 font-medium">Report details:</p>
          <p className="text-gray-600 text-sm">Type: {reportType}</p>
          <p className="text-gray-600 text-sm">Data period: {reportData?.period || 'All time'}</p>
          <p className="text-gray-600 text-sm">Records: {reportData?.totalRecords || '0'}</p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 flex items-center"
          >
            <Download size={16} className="mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportType, setReportType] = useState('');

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

  const handleDownloadReport = (type) => {
    // Prepare report data based on type and current filters
    let data = {
      reportType: type,
      period: selectedMonth && selectedYear 
        ? `${new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })} ${selectedYear}`
        : 'All time',
      totalRecords: analytics ? analytics.resolved + analytics.pending : 0
    };
    
    // Add more data based on report type
    if (type === 'Inquiry Summary') {
      data = {
        ...data,
        totalInquiries: stats?.totalInquiries || 0,
        pendingInquiries: stats?.pendingInquiries || 0,
        resolvedInquiries: stats?.resolvedInquiries || 0,
        criticalInquiries: stats?.criticalInquiries || 0
      };
    } else if (type === 'Priority Breakdown' && analytics) {
      data = {
        ...data,
        highPriority: analytics.priority.high,
        mediumPriority: analytics.priority.medium,
        lowPriority: analytics.priority.low
      };
    } else if (type === 'Inquiry Status' && analytics) {
      data = {
        ...data,
        resolved: analytics.resolved,
        pending: analytics.pending
      };
    }
    
    setReportData(data);
    setReportType(type);
    setIsModalOpen(true);
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
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          {admin && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{admin.email}</span>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {admin.name.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Download Report Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-4 rounded-md ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-4 rounded-md ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Analytics
            </button>
          </div>
          
          <div className="flex">
            <button
              onClick={() => handleDownloadReport('Inquiry Summary')}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              <Download size={18} className="mr-2" />
              Download Report
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Inquiries"
                  value={stats.totalInquiries}
                  icon={<Activity size={24} className="text-blue-600" />}
                  trend="up"
                  trendValue="12"
                  bgColor="bg-blue-50"
                />
                <StatCard
                  title="Pending"
                  value={stats.pendingInquiries}
                  icon={<Clock size={24} className="text-yellow-600" />}
                  trend="down"
                  trendValue="5"
                  bgColor="bg-yellow-50"
                />
                <StatCard
                  title="Resolved"
                  value={stats.resolvedInquiries}
                  icon={<CheckCircle size={24} className="text-green-600" />}
                  trend="up"
                  trendValue="8"
                  bgColor="bg-green-50"
                />
                <StatCard
                  title="Critical"
                  value={stats.criticalInquiries}
                  icon={<AlertCircle size={24} className="text-red-600" />}
                  trend="up"
                  trendValue="3"
                  bgColor="bg-red-50"
                />
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                <button 
                  onClick={() => handleDownloadReport('Recent Activity')}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Download size={16} className="mr-1" />
                  Export
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#INQ-1234</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Website not loading correctly</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 24, 2025</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#INQ-1233</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Login issues after update</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 23, 2025</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#INQ-1232</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Payment processing error</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Resolved</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 22, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">2</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>

            {/* Weekly Overview */}
            {analytics && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Weekly Overview</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    This Week: {analytics.thisWeek}
                  </span>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                        }} 
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            {/* Filter Controls */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Filter size={20} className="mr-2 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Filter Analytics</h2>
                </div>
                
                <button 
                  onClick={() => handleDownloadReport('Filtered Analytics')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Download size={18} className="mr-1" />
                  Export Current View
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="w-full md:w-48 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Months</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-full md:w-48 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Years</option>
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
            </div>

            {/* Charts Section */}
            {analytics ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Priority Breakdown Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Priority Breakdown</h3>
                    <button 
                      onClick={() => handleDownloadReport('Priority Breakdown')}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Download size={16} className="mr-1" />
                      Export
                    </button>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priorityData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          labelLine={false}
                        >
                          {priorityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <div className="flex flex-wrap justify-center gap-4">
                      {priorityData.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center">
                          <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Breakdown Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Inquiry Status</h3>
                    <button 
                      onClick={() => handleDownloadReport('Inquiry Status')}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Download size={16} className="mr-1" />
                      Export
                    </button>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statusData}> <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          <Cell fill="#10B981" /> {/* Green for Resolved */}
                          <Cell fill="#F59E0B" /> {/* Amber for Pending */}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-green-600">Resolved</p>
                          <h4 className="text-2xl font-bold text-green-700">{analytics.resolved}</h4>
                        </div>
                        <CheckCircle size={24} className="text-green-500" />
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-yellow-600">Pending</p>
                          <h4 className="text-2xl font-bold text-yellow-700">{analytics.pending}</h4>
                        </div>
                        <Clock size={24} className="text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 flex justify-center">
                <div className="flex flex-col items-center text-gray-500">
                  <div className="animate-spin mb-4">
                    <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <p className="text-lg">Loading analytics data...</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Download Report Modal */}
      <ReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reportData={reportData}
        reportType={reportType}
      />
    </div>
  );
};

export default AdminDashboard;