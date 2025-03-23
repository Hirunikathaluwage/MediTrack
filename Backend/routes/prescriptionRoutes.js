import express from 'express'
const router = express.Router();

import { uploadPrescription } from '../controllers/prescriptionController.js';
import {upload} from '../controllers/prescriptionController.js';
import { reviewPrescription } from '../controllers/prescriptionController.js';
import { deletePrescription } from '../controllers/prescriptionController.js';
import { getPrescription } from '../controllers/prescriptionController.js';


router.post("/", upload.single("image"), uploadPrescription);
router.get("/:id", getPrescription);
router.put("/:id/review", reviewPrescription);

router.delete("/:id", deletePrescription);

export default router;