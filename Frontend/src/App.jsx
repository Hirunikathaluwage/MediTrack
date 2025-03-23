import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Prescription from './pages/Prescription'
import MedicineList from './pages/MedicineList'
import Approval from './component/Approval';
/*import Reportgen from './pages/Reportgen'
import Stat from "./component/Stat";
import TopMedicine from "./component/TopMedicine";
import BranchOrder from "./component/BranchOrder";
import Profit from "./component/Profit"; */


function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Prescription />} />
        <Route path="/Approval" element={<Approval />} />
        <Route path="/MedicineList" element={<MedicineList />} />
       
        {/*<Route path="/" element={<Reportgen />} />
        <Route path="/" element={<Stat />} />
        <Route path="/" element={<TopMedicine />} />
        <Route path="/" element={<BranchOrder />} />
        <Route path="/" element={<Profit />} />*/}

      </Routes>
    </Router>
  );
}

export default App;