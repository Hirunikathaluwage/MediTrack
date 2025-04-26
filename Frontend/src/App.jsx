import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import "./App.css";
import SearchMedicineInBranch from "./SearchMedicineInBranch";
import SearchMedicineWithBranch from "./SearchMedicineWithBranch";
import SearchPrescriptionInBranch from "./SearchPrescriptionInBranch";
import AddMedicineToInventory from "./AddMedicine";
import ManageMedicines from "./ManageMedicines";
import CreateMedicine from "./CreateMedicine";
import ManageBranches from "./ManageBranches"; // Import the ManageBranches component
import "./index.css";

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
            <Menu.Item key="admin-section" disabled style={{ fontWeight: "bold", color: "#ffffff" }}>
              Admin Section
            </Menu.Item>
            <Menu.Item key="1">
              <NavLink to="/add-stock">Add Stock</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/pending-prescriptions">Pending Prescriptions</NavLink>
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
              <NavLink to="/manage-branches">Manage Branches</NavLink> {/* Add Manage Branches menu */}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="customer-section" disabled style={{ fontWeight: "bold", color: "#ffffff" }}>
              Customer Sections
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/search-medicine-branches">Check available Branch</NavLink>
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
              <Route
                path="/add-stock"
                element={<AddMedicineToInventory />}
              />
              <Route path="/create-medicine" element={<CreateMedicine />} />
              <Route path="/manage-medicines" element={<ManageMedicines />} />
              <Route path="/manage-branches" element={<ManageBranches />} /> {/* Add Manage Branches route */}
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
      <Typography.Title level={2}>Welcome to the Medicine Inventory</Typography.Title>
    </div>
  );
}

export default App;
