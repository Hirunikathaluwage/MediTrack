// routes/prescriptionRoutes.js
import express from 'express';

const router = express.Router();

import {
    uploadPrescription,
    reviewPrescription,
    deletePrescription,
    getPrescription,
    getApprovedMedicines,
    upload
} from '../controllers/prescriptionController.js';

// Upload a prescription with OCR and medicine matching
router.post('/', upload.single('image'), uploadPrescription);

// Get a prescription by ID
router.get('/:id', getPrescription);

// Review and update medicines in a prescription
router.put('/:id/review', reviewPrescription);

// Delete a prescription by ID
router.delete('/:id', deletePrescription);

// Fix this route
router.get('/approval/:prescriptionId', getApprovedMedicines);


export default router;