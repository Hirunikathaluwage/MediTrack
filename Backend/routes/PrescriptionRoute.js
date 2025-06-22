<<<<<<< HEAD
import express from "express";
import { getPrescription,updatePrescriptionStatus } from "../controllers/prescription.controller.js";

const router = express.Router();

// Get Prescription via branchId
router.get("/:branchId", getPrescription);
router.put("/:id/status", updatePrescriptionStatus);


export default router;



=======
// routes/prescriptionRoutes.js
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
>>>>>>> e030d7f336e1a0f242b89810cb9aa61465b8c46a
