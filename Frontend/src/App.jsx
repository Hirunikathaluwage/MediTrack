// import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
// import { Layout, Menu, Typography } from "antd";
// import "./App.css";
// import SearchMedicineInBranch from "./SearchMedicineInBranch";
// import SearchMedicineWithBranch from "./SearchMedicineWithBranch";
// // import SearchPrescriptionInBranch from "./SearchPrescriptionInBranch";
// import AddMedicineToInventory from "./AddMedicine";
// import ManageMedicines from "./ManageMedicines";
// import CreateMedicine from "./CreateMedicine";
// import ManageBranches from "./ManageBranches"; // Import the ManageBranches component
// import "./index.css";


          
// import Prescription from './pages/Prescription.jsx'
// import  SearchMedicineInBranch from "./component/SearchMedicineInBranch.jsx";

// // import Profit from "./component/Profit.jsx"
// // import BranchOrder from "./component/BranchOrder.jsx"
// // import Stat from "./component/Stat.jsx";

// // hiruni components

// import MedicineList from './pages/ApprovedMedicines';
// import Approval from './component/Approval';
// import ApprovedMedicines from './pages/ApprovedMedicines';
// import AdminPrescription from "./component/AdminPrescription.jsx";
// import SplitPage from "./pages/split.jsx";


// const { Header, Sider, Content } = Layout;
// const { Title } = Typography;

// function App() {
//   return (
//     <Router>
//       <Layout style={{ minHeight: "100vh" }}>
//         <Sider theme="dark">
//           <div style={{ padding: "16px", textAlign: "center" }}>
//             <Title level={3} style={{ color: "white" }}>WELCOME</Title>
//           </div>
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//             <Menu.Item key="admin-section" disabled style={{ fontWeight: "bold", color: "#ffffff" }}>
//               Admin Section
//             </Menu.Item>
//             <Menu.Item key="1"><NavLink to="/add-stock">Add Stock</NavLink></Menu.Item>
//             <Menu.Item key="2"><NavLink to="/pending-prescriptions">Pending Prescriptions</NavLink></Menu.Item>
//             <Menu.Item key="3"><NavLink to="/create-medicine">Create New Medicine</NavLink></Menu.Item>
//             <Menu.Item key="4"><NavLink to="/manage-stock">Manage Stock</NavLink></Menu.Item>
//             <Menu.Item key="5"><NavLink to="/manage-medicines">Manage Medicine</NavLink></Menu.Item>
//             <Menu.Item key="6"><NavLink to="/manage-branches">Manage Branches</NavLink></Menu.Item>
//             <Menu.Divider />
//             <Menu.Item key="customer-section" disabled style={{ fontWeight: "bold", color: "#ffffff" }}>
//               Customer Sections
//             </Menu.Item>
//             <Menu.Item key="7"><NavLink to="/search-medicine-branches">Check available Branch</NavLink></Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: "#fff", padding: 0 }}>
//             <Title level={4} style={{ margin: "16px" }}>Medicine Inventory System</Title>
//           </Header>
//           <Content style={{ margin: "16px" }}>
//             <Routes>

//               <Route path="/" element={<Prescription/>} />
//               {/* <Route path="/" element={<Home />} /> */}
//               {/* Admin routes */}
//               {/* <Route path="/pending-prescriptions" element={<SearchPrescriptionInBranch />} /> */}
//               <Route path="/manage-stock" element={<SearchMedicineInBranch />} />
//               <Route path="/search-medicine-branches" element={<SearchMedicineWithBranch />} />
//               <Route path="/add-stock" element={<AddMedicineToInventory />} />
//               <Route path="/create-medicine" element={<CreateMedicine />} />
//               <Route path="/manage-medicines" element={<ManageMedicines />} />
//               <Route path="/manage-branches" element={<ManageBranches />} />
//               {/* Hiruni routes */}

              
//               <Route path="/approval" element={<Approval />} />
//               <Route path="/approved-medicines" element={<ApprovedMedicines />} />
//               <Route path="/MedicineList" element={<MedicineList />} />
//               <Route path="/adminPrescription" element={<AdminPrescription />} />
//               <Route path="/SplitPage" element={<SplitPage />} />
//               <Route path="/SearchMedicineInBranch" element={<SearchMedicineInBranch />} />

              
//             </Routes>
//           </Content>
//         </Layout>
//       </Layout>
//     </Router>
//   );
// }

// function Home() {
//   return <div><Typography.Title level={2}>Welcome to the Medicine Inventory</Typography.Title></div>;
// }

// export default App;



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
