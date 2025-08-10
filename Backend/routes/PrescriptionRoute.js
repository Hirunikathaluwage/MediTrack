import express from 'express';
const router = express.Router();

import {
    uploadPrescription,
    getImageAsBase64,
    reviewPrescription,
    deletePrescription,
    getPrescription,
    getApprovedMedicines,
    getAllPrescriptions,
    upload
} from '../controllers/prescriptionController.js';
import { getPrescriptions, updatePrescriptionStatus } from "../controllers/prescription.controller.js";

router.get("/", getAllPrescriptions);

router.get("/:branchId", getPrescriptions);
router.put("/:id/status", updatePrescriptionStatus);
// Upload a prescription with OCR and medicine matching
router.post('/', upload.single('image'), uploadPrescription);
router.get('/image/base64', getImageAsBase64);

router.get('/:id', getPrescription);
router.put('/:id/review', reviewPrescription);
router.delete('/:id', deletePrescription);
router.get('/approval/:prescriptionId', getApprovedMedicines);




export default router;
