

import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import "./App.css";
import "./index.css";

// Admin Section
import Prescription from "./pages/Prescription.jsx";
import SearchPrescriptionInBranch from "./component/SearchPrescriptionInBranch.jsx";
import SearchMedicineInBranch from "./component/SearchMedicineInBranch.jsx";
import AddMedicineToInventory from "./AddMedicine.jsx";
import ManageMedicines from "./ManageMedicines.jsx";
import CreateMedicine from "./CreateMedicine.jsx";
import ManageBranches from "./ManageBranches.jsx";
  
  
import React, { useEffect } from 'react';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import ReserveConfirmation from './pages/ReserveConfirmation';
import DashboardLayout from './pages/AdminOrderDashboard';
import VerifyPayments from './pages/VerifyPaymentsPage'
import ApprovedMedicines from './pages/ApprovedMedicines'
import Prescription from './pages/Prescription'
import ManageReservationsPage from './pages/ManageReservationsPage';

// Customer Section
import SearchMedicineWithBranch from "./SearchMedicineWithBranch.jsx";


// Hiruni’s pages
import Approval from "./component/Approval.jsx";
import ApprovedMedicines from "./pages/ApprovedMedicines.jsx";
import AdminPrescription from "./component/AdminPrescription.jsx";
import SplitPage from "./pages/Split.jsx";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  return (

    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="dark">
          <div style={{ padding: 16, textAlign: "center" }}>
            <Title level={3} style={{ color: "#fff" }}>WELCOME</Title>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
            <Menu.Item key="admin-section" disabled>Admin Section</Menu.Item>
            <Menu.Item key="add-stock"><NavLink to="/add-stock">Add Stock</NavLink></Menu.Item>
            <Menu.Item key="pending-prescriptions"><NavLink to="/pending-prescriptions">Pending Prescriptions</NavLink></Menu.Item>
            <Menu.Item key="create-medicine"><NavLink to="/create-medicine">Create New Medicine</NavLink></Menu.Item>
            <Menu.Item key="manage-stock"><NavLink to="/manage-stock">Manage Stock</NavLink></Menu.Item>
            <Menu.Item key="manage-medicines"><NavLink to="/manage-medicines">Manage Medicine</NavLink></Menu.Item>
            <Menu.Item key="manage-branches"><NavLink to="/manage-branches">Manage Branches</NavLink></Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="customer-section" disabled>Customer Section</Menu.Item>
            <Menu.Item key="search-medicine-branches"><NavLink to="/search-medicine-branches">Check available Branch</NavLink></Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Title level={4} style={{ margin: 16 }}>Medicine Inventory System</Title>
          </Header>
          <Content style={{ margin: 16 }}>
            <Routes>
              {/* Default / Home */}
              <Route path="/" element={<Prescription />} />

              {/* Admin */}
              <Route path="/pending-prescriptions" element={<SearchPrescriptionInBranch />} />
              <Route path="/manage-stock" element={<SearchMedicineInBranch />} />
              <Route path="/add-stock" element={<AddMedicineToInventory />} />
              <Route path="/create-medicine" element={<CreateMedicine />} />
              <Route path="/manage-medicines" element={<ManageMedicines />} />
              <Route path="/manage-branches" element={<ManageBranches />} />

              {/* Customer */}
              <Route path="/search-medicine-branches" element={<SearchMedicineWithBranch />} />

              {/* Hiruni */}
              <Route path="/approval" element={<Approval />} />
              <Route path="/approved-medicines" element={<ApprovedMedicines />} />
              <Route path="/admin-prescription" element={<AdminPrescription />} />
              <Route path="/split-page" element={<SplitPage />} />

                {/* Nilakshi */}
                <Route path="/" element={<Prescription />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/reserve-confirmation" element={<ReserveConfirmation />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/verify-payments" element={<VerifyPayments />} />
          <Route path="/manage-reservations" element={<ManageReservationsPage />} />
            
              {/* Catch-all: redirect unknown URLs back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>

  );

}

export default App;
