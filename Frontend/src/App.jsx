import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrderRequestPage from "./pages/OrderRequestPage";
import OrderHistory from "./pages/OrderHistory";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/order" element={<OrderRequestPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App
