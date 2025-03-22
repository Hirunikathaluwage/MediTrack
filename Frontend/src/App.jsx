import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { useState, useEffect } from "react";
import "./App.css";
import SearchMedicineInBranch from "./SearchMedicineInBranch";
import SearchMedicineWithBranch from "./SearchMedicineWithBranch";
import SearchPrescriptionInBranch from "./SearchPrescriptionInBranch";
import AddMedicineToInventory from "./AddMedicine";
import ManageMedicines from "./ManageMedicines";
import CreateMedicine from "./CreateMedicine";
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
            <Menu.Item key="1">
              <NavLink to="/add-medicine-stock">ADD STOCK</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/search-perscription-branch">PENDING REQUESTS</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/manage-medicine">ADD NEW MEDICINE</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/search-in-branch">MANAGE STOCK</NavLink>
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
                path="/search-perscription-branch"
                element={<SearchPrescriptionInBranch />}
              />
              <Route
                path="/search-in-branch"
                element={<SearchMedicineInBranch />}
              />
              <Route
                path="/search-with-branch"
                element={<SearchMedicineWithBranch />}
              />
              <Route
                path="/add-medicine-stock"
                element={<AddMedicineToInventory />}
              />
              <Route path="/add-medicine" element={<CreateMedicine />} />
              <Route path="/manage-medicine" element={<ManageMedicines />} />
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
