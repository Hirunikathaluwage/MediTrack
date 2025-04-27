
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './index.css';
// import Prescription from './pages/Prescription'
// // import MedicineList from './pages/ApprovedMedicines'
// import Approval from './component/Approval';
// //import Reportgen from './pages/Reportgen'
// //import AdminPrescription from './pages/AdminPrescription'
// import ApprovedMedicines from './pages/ApprovedMedicines'; // was MedicineList

// // import SplitScreenDashboard from "./pages/SplitScreenDashboard.jsx"; deleted this file
// // import AdminPrescription from "./component/AdminPrescription.jsx";
// // import  SearchMedicineInBranch from "./component/SearchMedicineInBranch.jsx";
// import SplitPage from "./pages/split.jsx";

// //import Stat from "./component/Stat";
// //import TopMedicine from "./component/TopMedicine";
// //import BranchOrder from "./component/BranchOrder";
// //import Profit from "./component/Profit"; 


// function App() {
//   return (
//     <Router>  
//       <Routes>


//         <Route path="/" element={<Prescription />} />
//         <Route path="/approval" element={<Approval />} />
//         <Route path="/approved-medicines" element={<ApprovedMedicines />} />
//         {/* <Route path="/Approval" element={<Approval />} /> */}
//         {/* <Route path="/MedicineList" element={<MedicineList />} /> */}
//         {/* <Route path="/reportgen" element={<Reportgen />} /> */}
//         {/* <Route path="/adminPrescription" element={<AdminPrescription />} /> */}
//         <Route path="/SearchMedicineInBranch" element={<SearchMedicineInBranch />} />
//         {/* <Route path="/SplitScreenDashboard" element={<SplitScreenDashboard />} /> not used */}
//         <Route path="/SplitPage" element={<SplitPage />} />
       
//        {/* <Route path="/Reportgen" element={<Reportgen />} />
//         <Route path="/Reportgen" element={<Stat />} />
//         <Route path="/Reportgen" element={<TopMedicine />} />
//         <Route path="/Reportgen" element={<BranchOrder />} />
//         <Route path="/Reportgen" element={<Profit />} /> */}

//       </Routes>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Prescription from './pages/Prescription.jsx'
import MedicineList from './pages/ApprovedMedicines'
import Approval from './component/Approval';
// import Reportgen from './pages/Reportgen'
//import AdminPrescription from './pages/AdminPrescription'
import ApprovedMedicines from './pages/ApprovedMedicines'; // was MedicineList
//import SearchMedicineInBranch from "./pages/SearchMedicineInBranch.jsx";
// import SplitScreenDashboard from "./pages/SplitScreenDashboard.jsx"; deleted this file
import AdminPrescription from "./component/AdminPrescription.jsx";
import  SearchMedicineInBranch from "./component/SearchMedicineInBranch.jsx";
import SplitPage from "./pages/split.jsx";

import Reportgen from "./pages/Reportgen.jsx";
import TopMedicine from "./component/TopMedicine.jsx";
import Profit from "./component/Profit.jsx"
import BranchOrder from "./component/BranchOrder.jsx"
import Stat from "./component/Stat.jsx";
import Login from './pages/Customer/Login';
import Register from './pages/Customer/Register';
import Dashboard from './pages/Customer/Dashboard';

//import Stat from "./component/Stat";
//import TopMedicine from "./component/TopMedicine";
//import BranchOrder from "./component/BranchOrder";
//import Profit from "./component/Profit"; 


function App() {
  return (
    <Router>  
      <Routes>

      <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        <Route path="/prescription" element={<Prescription />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/approved-medicines" element={<ApprovedMedicines />} />
        {/* <Route path="/Approval" element={<Approval />} /> */}
        <Route path="/MedicineList" element={<MedicineList />} />
        {/* <Route path="/reportgen" element={<Reportgen />} /> */}
        <Route path="/adminPrescription" element={<AdminPrescription />} />
        <Route path="/SearchMedicineInBranch" element={<SearchMedicineInBranch />} />
        {/* <Route path="/SplitScreenDashboard" element={<SplitScreenDashboard />} /> not used */}
        <Route path="/SplitPage" element={<SplitPage />} />
       
        <Route path="/ReportGen" element={<Reportgen />} />
        <Route path="/TopMedicine" element={<TopMedicine />} />
        <Route path="/Profit" element={<Profit />} />
        <Route path="/Stat" element={<Stat/>} />
        <Route path="/BranchOrder" element={<BranchOrder/>} />

      </Routes>
    </Router>
  );
}

export default App;