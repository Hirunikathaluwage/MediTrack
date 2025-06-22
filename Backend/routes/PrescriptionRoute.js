import express from 'express';
const router = express.Router();

import {
    uploadPrescription,
    getImageAsBase64,
    reviewPrescription,
    deletePrescription,
    getPrescription,
    getApprovedMedicines,
    upload
} from '../controllers/prescriptionController.js';
 import { getPrescriptions,updatePrescriptionStatus } from "../controllers/prescription.controller.js";

// Get Prescription via branchId
router.get("/:branchId", getPrescriptions);
router.put("/:id/status", updatePrescriptionStatus);
// Upload a prescription with OCR and medicine matching
router.post('/', upload.single('image'), uploadPrescription);
router.get('/image/base64', getImageAsBase64);

// Get a prescription by ID
router.get('/:id', getPrescription);

// Review and update medicines in a prescription
router.put('/:id/review', reviewPrescription);

// Delete a prescription by ID
router.delete('/:id', deletePrescription);

// Fix this route
router.get('/approval/:prescriptionId', getApprovedMedicines);


export default router;
