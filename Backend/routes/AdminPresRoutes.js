// adminPrescriptionRoutes.js
import express from 'express';
import { getPrescriptionsByBranch, getMedicinesByPrescription,updatePrescriptionStatus } from '../controllers/AdminPresController.js';

const router = express.Router();

// Fetch prescriptions by branch
router.get('/prescription/:branchId', getPrescriptionsByBranch);

// Fetch medicines for a prescription
router.get('/prescriptions/:id/medicines', getMedicinesByPrescription);

// Update prescription status
router.put('/prescription/:prescriptionId/status', updatePrescriptionStatus);


export default router;