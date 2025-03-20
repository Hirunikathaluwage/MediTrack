import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Prescription from './Prescription';
import Approval from './Approval';
import MedicineList from './MedicineList';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Prescription />} />
        <Route path="/MedicineList" element={<MedicineList />} />
        <Route path="/Approval" element={<Approval />} />
      </Routes>
    </Router>
  );
}

export default App;

