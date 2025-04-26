import express from "express";
import {
  getPrescriptionsByBranch,
  updatePrescriptionStatus,
  getAllMedicines,
  getBranchMedicineStock
} from "../controllers/prescriptionController.js";

const router = express.Router();

// Prescription routes
router.get('/prescription/:branchId', getPrescriptionsByBranch);
router.put('/prescription/:prescriptionId/status', updatePrescriptionStatus);

// Medicines
router.get('/medicines', getAllMedicines);

// Branch stock for a specific medicine
router.get('/branch-stock/:branchId/:medicineId', getBranchMedicineStock);

export default router;
