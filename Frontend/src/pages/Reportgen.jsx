import React from 'react';
import { Row, Col, Typography } from 'antd';
import TopMedicine from '../components/TopMedicine';
import BranchOrder from '../components/BranchOrder';
import Stat from '../components/Stat';
import Profit from '../components/Profit';

const { Title } = Typography;

const Reportgen = () => {
  const topMedicinesChartData = {
    labels: ['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Cetrizine', 'Metformin'],
    datasets: [{
      label: 'Most Sold Medicines',
      data: [120, 95, 80, 70, 65],
      backgroundColor: 'rgba(75,192,192,0.6)',
    }]
  };

  const branchOrdersChartData = {
    labels: ['Branch A', 'Branch B', 'Branch C', 'Branch D'],
    datasets: [{
      label: 'Orders per Branch',
      data: [350, 280, 150, 100],
      backgroundColor: [
        'rgba(153,102,255,0.6)',
        'rgba(255,159,64,0.6)',
        'rgba(54,162,235,0.6)',
        'rgba(255,99,132,0.6)'
      ],
    }]
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: 32 }}>Dashboard Reports</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Stat />
        </Col>
        <Col xs={24} md={12}>
          <Profit />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <TopMedicine chartData={topMedicinesChartData} />
        </Col>
        <Col xs={24} md={12}>
          <BranchOrder chartData={branchOrdersChartData} />
        </Col>
      </Row>
    </div>
  );
};

export default Reportgen;
