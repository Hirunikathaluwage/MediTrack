import { Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import InquiryForm from './Component/InquiryForm';
import Success from './Component/Success';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inquiry-form" element={<InquiryForm />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
