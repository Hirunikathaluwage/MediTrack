import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Component/Dashboard';
import InquiryForm from './Component/InquiryForm';
import Home from './Component/Home';
import Success from './Component/Success';
import InquiryDetails from './Component/InquiryDetails'; 
import Display from './Component/Display'; // Add this line
import PendingInquiries from './Component/PendingInquiries'; 
import './App.css';
import { Toaster } from 'react-hot-toast'; // Import Toaster component
import ProtectedRoute from './Component/ProtectedRoute'; // Import ProtectedRoute component
import DashboardPage from './Component/DashboardPage'; // Add this line

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

function App() {
  const [inquiries, setInquiries] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/inquiries')
      .then(response => {
        if (Array.isArray(response.data.Inquiries)) {
          setInquiries(response.data.Inquiries);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => console.error('Error fetching inquiries:', error));
  }, []);

  return ( 
    <ErrorBoundary>
      <Toaster /> {/* Add Toaster component */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/all-inquiries" element={<Display inquiries={inquiries} />} /> 
        <Route path="/create-inquiry" element={<InquiryForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/inquiries/view/:id" element={<InquiryDetails />} /> {/* Fix route */}
        <Route path="/pending" element={<PendingInquiries />} /> {/* Add the new route */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> {/* Add the dashboard route */}
        <Route path="/uploads/:filename" element={<StaticFile />} /> {/* Add this line */}
      </Routes>
    </ErrorBoundary>
  );
}

function StaticFile() {
  const { filename } = useParams();
  return (
    <div>
      <h1>File: {filename}</h1>
      <iframe
        src={`/uploads/${filename}`}
        width="100%"
        height="600px"
        title={filename}
      />
      <a href={`/uploads/${filename}`} target="_blank" rel="noopener noreferrer">Download</a>
    </div>
  );
}

export default App;
