import { Outlet, NavLink } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";


import "./App.css";
import "./index.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function InventoryDashboard() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider theme="dark">
                <div style={{ padding: "16px", textAlign: "center" }}>
                    <Title level={3} style={{ color: "white" }}>WELCOME</Title>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1"><NavLink to="add-stock">Add Stock</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink to="pending-prescriptions">Pending Prescriptions</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink to="create-medicine">Create New Medicine</NavLink></Menu.Item>
                    <Menu.Item key="4"><NavLink to="manage-stock">Manage Stock</NavLink></Menu.Item>
                    <Menu.Item key="5"><NavLink to="manage-medicines">Manage Medicine</NavLink></Menu.Item>
                    <Menu.Item key="6"><NavLink to="manage-branches">Manage Branches</NavLink></Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="7"><NavLink to="search-medicine-branches">Check available Branch</NavLink></Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                    <Title level={4} style={{ margin: "16px" }}>Medicine Inventory System</Title>
                </Header>
                <Content style={{ margin: "16px" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default InventoryDashboard;
