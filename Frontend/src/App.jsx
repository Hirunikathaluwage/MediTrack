import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import "./App.css";
import SearchMedicineInBranch from "./SearchMedicineInBranch";
import SearchMedicineWithBranch from "./SearchMedicineWithBranch";
import SearchPrescriptionInBranch from "./SearchPrescriptionInBranch";
import AddMedicineToInventory from "./AddMedicine";
import ManageMedicines from "./ManageMedicines";
import CreateMedicine from "./CreateMedicine";
import ManageBranches from "./ManageBranches";
import "./index.css";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import ReserveConfirmation from "./pages/ReserveConfirmation";
import DashboardLayout from "./pages/AdminOrderDashboard";
import VerifyPayments from "./pages/VerifyPaymentsPage";
import ApprovedMedicines from "./pages/ApprovedMedicines";
import Prescription from "./pages/Prescription";
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
import Approval from "./component/Approval";
import ApprovedMedicines from "./pages/ApprovedMedicines";
import AdminPrescription from "./component/AdminPrescription.jsx";
import SearchMedicineInBranch from "./component/SearchMedicineInBranch.jsx";
import SplitPage from "./pages/split.jsx";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="dark">
          <div style={{ padding: "16px", textAlign: "center" }}>
            <Title level={3} style={{ color: "white" }}>
              WELCOME
            </Title>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="admin-section"
              disabled
              style={{ fontWeight: "bold", color: "#ffffff" }}
            >
              Admin Section
            </Menu.Item>
            <Menu.Item key="1">
              <NavLink to="/add-stock">Add Stock</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/pending-prescriptions">
                Pending Prescriptions
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/create-medicine">Create New Medicine</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/manage-stock">Manage Stock</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/manage-medicines">Manage Medicine</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/manage-branches">Manage Branches</NavLink>{" "}
              {/* Add Manage Branches menu */}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              key="customer-section"
              disabled
              style={{ fontWeight: "bold", color: "#ffffff" }}
            >
              Customer Sections
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/search-medicine-branches">
                Check available Branch
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Title level={4} style={{ margin: "16px" }}>
              Medicine Inventory System
            </Title>
          </Header>
          <Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/pending-prescriptions"
                element={<SearchPrescriptionInBranch />}
              />
              <Route
                path="/manage-stock"
                element={<SearchMedicineInBranch />}
              />
              <Route
                path="/search-medicine-branches"
                element={<SearchMedicineWithBranch />}
              />
              <Route path="/add-stock" element={<AddMedicineToInventory />} />
              <Route path="/create-medicine" element={<CreateMedicine />} />
              <Route path="/manage-medicines" element={<ManageMedicines />} />
              <Route
                path="/manage-branches"
                element={<ManageBranches />}
              />{" "}
              {/* Add Manage Branches route */}
              <Route path="/" element={<Prescription />} />
              <Route
                path="/approved-medicines"
                element={<ApprovedMedicines />}
              />
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/prescription" element={<Prescription />} />
              <Route path="/approval" element={<Approval />} />
              <Route
                path="/approved-medicines"
                element={<ApprovedMedicines />}
              />
              {/* <Route path="/Approval" element={<Approval />} /> */}
              <Route path="/MedicineList" element={<MedicineList />} />
              {/* <Route path="/reportgen" element={<Reportgen />} /> */}
              <Route
                path="/adminPrescription"
                element={<AdminPrescription />}
              />
              <Route
                path="/SearchMedicineInBranch"
                element={<SearchMedicineInBranch />}
              />
              {/* <Route path="/SplitScreenDashboard" element={<SplitScreenDashboard />} /> not used */}
              <Route path="/pharmacy" element={<SplitPage />} />
              <Route path="/reports" element={<Reportgen />} />
              <Route path="/TopMedicine" element={<TopMedicine />} />
              <Route path="/Profit" element={<Profit />} />
              <Route path="/Stat" element={<Stat />} />
              <Route path="/BranchOrder" element={<BranchOrder />} />
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
