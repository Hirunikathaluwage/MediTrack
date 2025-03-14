import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import InquiryForm from './Component/InquiryForm';
import Home from './Component/Home';
import Success from './Component/Success';
import AllInquiries from './Component/AllInquiries';
import './App.css';

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
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/all-inquiries" element={<AllInquiries />} />
        <Route path="/create-inquiry" element={<InquiryForm />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
