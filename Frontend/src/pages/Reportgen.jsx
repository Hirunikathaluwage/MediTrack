"use client";

import React, { useState } from 'react';
import { Layout, Menu, Typography, Divider, Row, Col } from 'antd';
import { ShoppingCartOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import TopMedicine from '../component/TopMedicine';
import BranchOrder from '../component/BranchOrder';
import Stat from '../component/Stat';
import Profit from '../component/Profit';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Reportgen = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#001529" }}>
        <div className="text-center text-white font-bold text-lg py-6 tracking-wide">MediTrack</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />} onClick={() => navigate("/pharmacy")}>
            Prescriptions
          </Menu.Item>
          <Menu.Item key="3" icon={<FileSearchOutlined />} onClick={() => navigate("/reports")}>
            Reports
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#f0f2f5", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="flex items-center gap-4">
            <ShoppingCartOutlined style={{ fontSize: 28, color: "#722ED1" }} />
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#333" }}>
              MediTrack Admin Dashboard
            </h1>
          </div>
        </Header>

        <Content className="m-6">
          <div style={{ padding: '12px', background: '#f0f2f5', minHeight: '100%' }}>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px' }}>
              <Title level={4} style={{ textAlign: 'center', marginBottom: '24px' }}>
                Dashboard Reports
              </Title>

              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <Stat />
                </Col>
                <Col xs={24} md={12}>
                  <Profit />
                </Col>
              </Row>

              <Divider style={{ margin: '20px 0' }}>Sales Insights</Divider>

              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <TopMedicine />
                </Col>
                <Col xs={24} md={12}>
                  <BranchOrder />
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Reportgen;
