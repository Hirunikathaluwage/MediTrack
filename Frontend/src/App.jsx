
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Prescription from './pages/Prescription'
// import MedicineList from './pages/ApprovedMedicines'
import Approval from './component/Approval';
import Reportgen from './pages/Reportgen'
import AdminPrescription from './pages/AdminPrescription'
import ApprovedMedicines from './pages/ApprovedMedicines'; // was MedicineList

//import Stat from "./component/Stat";
//import TopMedicine from "./component/TopMedicine";
//import BranchOrder from "./component/BranchOrder";
//import Profit from "./component/Profit"; 


function App() {
  return (
    <Router>  
      <Routes>




        <Route path="/" element={<Prescription />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/approved-medicines" element={<ApprovedMedicines />} />
        {/* <Route path="/Approval" element={<Approval />} /> */}
        {/* <Route path="/MedicineList" element={<MedicineList />} /> */}
        <Route path="/reportgen" element={<Reportgen />} />
        <Route path="/adminPrescription" element={<AdminPrescription />} />
       
       {/* <Route path="/Reportgen" element={<Reportgen />} />
        <Route path="/Reportgen" element={<Stat />} />
        <Route path="/Reportgen" element={<TopMedicine />} />
        <Route path="/Reportgen" element={<BranchOrder />} />
        <Route path="/Reportgen" element={<Profit />} /> */}

      </Routes>
    </Router>
  );
}

export default App;