import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import "./App.css";
import SearchMedicineInBranch from "./SearchMedicineInBranch";
// import SearchMedicineWithBranch from "./SearchMedicineWithBranch";

import SearchPrescriptionInBranch from "./SearchPrescriptionInBranch";
import AddMedicineToInventory from "./AddMedicine";
import ManageMedicines from "./ManageMedicines";
import CreateMedicine from "./CreateMedicine";
import ManageBranches from "./ManageBranches";
import "./index.css";

// Admin Section
// import SearchPrescriptionInBranch from "./compon/SearchPrescriptionInBranch.js";
// import SearchMedicineInBranch from "./compon/SearchMedicineInBranch.js";

import React, { useEffect } from "react";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import ReserveConfirmation from "./pages/ReserveConfirmation";
import DashboardLayout from "./pages/AdminOrderDashboard";
import VerifyPayments from "./pages/VerifyPaymentsPage";
import ApprovedMedicines from "./pages/ApprovedMedicines";
// import Prescription from "./pages/Prescription";
import ManageReservationsPage from "./pages/ManageReservationsPage";
import Reportgen from "./pages/Reportgen.jsx";
import TopMedicine from "./component/TopMedicine.jsx";
import Profit from "./component/Profit.jsx";
import BranchOrder from "./component/BranchOrder.jsx";
import Stat from "./component/Stat.jsx";
import Login from "./pages/Customer/Login";
import Register from "./pages/Customer/Register";
import Dashboard from "./pages/Customer/Dashboard";
import Prescription from "./pages/Prescription.jsx";
import MedicineList from "./pages/ApprovedMedicines";
import AdminPrescription from "./component/AdminPrescription.jsx";
import SubmitInquiry from "./pages/Inquiry/AddInquiry";
import ViewInquiries from "./pages/Inquiry/ViewInquiries";
import SplitPage from "./pages/split.jsx";
import SearchMedicineWithBranch from "./SearchMedicineWithBranch.jsx";
import Approval from "./component/Approval.jsx";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Customer/Profile";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageInquiries from "./pages/Admin/ManageInquiries";
import NotificationPage from "./pages/Admin/NotificationPage";
import { CustomerHome } from "./Home/components/PagesHome/CustomerHome";

// Admin Dashboard Home
import { DashboardHome } from "./Home/components/dashboard/DashboardHome";

// Fallback Pages
import Unauthorized from "./pages/Unauthorized";
// import NotFound from './pages/NotFound';

// Pages

import AppAdmin from "./components/AppAdmin";

import RoleSelection from "./RoleSelection";

import DeliveryForm from "./components/customer/DeliveryForm";

import DeliveryTracking from "./components/customer/DeliveryTracking";

import RatingPage from "./components/customer/RatingPage";
import ThankYouPage from "./components/customer/ThankYouPage";

import Logindriver from "./components/driver/Login";

import Signup from "./components/driver/Signup";

import Dashboarddriver from "./components/driver/Dashboard";

import driverProfile from "./components/driver/Profile";

import DeliveryHistory from "./components/driver/DeliveryHistory";

import DeliveryDetails from "./components/driver/DeliveryDetails";

import Layoutdriver from "./components/driver/layout/Layout"; // import your Layout

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Navbar />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="dark">
          <div style={{ padding: 16, textAlign: "center" }}>
            <Title level={3} style={{ color: "#fff" }}>
              WELCOME
            </Title>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
            <Menu.Item key="admin-section" disabled>
              Admin Section
            </Menu.Item>
            <Menu.Item key="add-stock">
              <NavLink to="/add-stock">Add Stock</NavLink>
            </Menu.Item>
            <Menu.Item key="pending-prescriptions">
              <NavLink to="/pending-prescriptions">
                Pending Prescriptions
              </NavLink>
            </Menu.Item>
            <Menu.Item key="create-medicine">
              <NavLink to="/create-medicine">Create New Medicine</NavLink>
            </Menu.Item>
            <Menu.Item key="manage-stock">
              <NavLink to="/manage-stock">Manage Stock</NavLink>
            </Menu.Item>
            <Menu.Item key="manage-medicines">
              <NavLink to="/manage-medicines">Manage Medicine</NavLink>
            </Menu.Item>
            <Menu.Item key="manage-branches">
              <NavLink to="/manage-branches">Manage Branches</NavLink>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="customer-section" disabled>
              Customer Section
            </Menu.Item>
            <Menu.Item key="search-medicine-branches">
              <NavLink to="/search-medicine-branches">
                Check available Branch
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Title level={4} style={{ margin: 16 }}>
              Medicine Inventory System
            </Title>
          </Header>
          <Content style={{ margin: 16 }}>
            <Routes>
              {/* Default / Home */}
              <Route path="/" element={<Prescription />} />

              {/* Admin */}
              <Route
                path="/pending-prescriptions"
                element={<SearchPrescriptionInBranch />}
              />
              <Route
                path="/manage-stock"
                element={<SearchMedicineInBranch />}
              />
              <Route path="/add-stock" element={<AddMedicineToInventory />} />
              <Route path="/create-medicine" element={<CreateMedicine />} />
              <Route path="/manage-medicines" element={<ManageMedicines />} />
              <Route path="/manage-branches" element={<ManageBranches />} />

              {/* Customer */}
              <Route
                path="/search-medicine-branches"
                element={<SearchMedicineWithBranch />}
              />

              {/* Hiruni */}
              <Route path="/approval" element={<Approval />} />
              <Route
                path="/approved-medicines"
                element={<ApprovedMedicines />}
              />
              <Route
                path="/admin-prescription"
                element={<AdminPrescription />}
              />
              <Route path="/split-page" element={<SplitPage />} />

              {/* Nilakshi */}
              <Route path="/" element={<Prescription />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route
                path="/reserve-confirmation"
                element={<ReserveConfirmation />}
              />
              <Route path="/dashboard" element={<DashboardLayout />} />
              <Route path="/verify-payments" element={<VerifyPayments />} />
              <Route
                path="/manage-reservations"
                element={<ManageReservationsPage />}
              />

              {/* Catch-all: redirect unknown URLs back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />

              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Customer-Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit-inquiry"
                element={
                  <ProtectedRoute>
                    <SubmitInquiry />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view-inquiries"
                element={
                  <ProtectedRoute>
                    <ViewInquiries />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/home"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerHome />
                  </ProtectedRoute>
                }
              />

              {/* Admin-Protected Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/panel"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/manage-inquiries"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ManageInquiries />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard-home"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <DashboardHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <NotificationPage />
                  </ProtectedRoute>
                }
              />

              {/* Unauthorized Access */}
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Default: Redirect */}
              <Route path="*" element={<Navigate to="/login" replace />} />

              <Route path="/" element={<RoleSelection />} />

              <Route path="/admin" element={<AppAdmin />} />

              <Route path="/user/delivery" element={<DeliveryForm />} />

              <Route
                path="/tracking/:deliveryId"
                element={<DeliveryTracking />}
              />

              <Route path="/rating/:deliveryId" element={<RatingPage />} />

              <Route path="/thank-you" element={<ThankYouPage />} />

              <Route path="/driver" element={<Logindriver />} />

              <Route path="/driver/signup" element={<Signup />} />

              {/* Driver Protected Routes */}

              <Route
                path="/driver/dashboard/:id"
                element={
                  <Layoutdriver>
                    <Dashboarddriver />
                  </Layoutdriver>
                }
              />

              <Route
                path="/driver/profile"
                element={
                  <Layout>
                    <driverProfile />
                  </Layout>
                }
              />

              <Route
                path="/driver/history"
                element={
                  <Layout>
                    <DeliveryHistory />
                  </Layout>
                }
              />

              <Route
                path="/driver/delivery/:id"
                element={
                  <Layout>
                    <DeliveryDetails />
                  </Layout>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <Typography.Title level={2}>
        Welcome to the Medicine Inventory
      </Typography.Title>
    </div>
  );
}

export default App;
