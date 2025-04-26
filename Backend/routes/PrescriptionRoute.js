import express from "express";
import { getPrescription,updatePrescriptionStatus } from "../controllers/prescription.controller.js";

const router = express.Router();

// Get Prescription via branchId
router.get("/:branchId", getPrescription);
router.put("/:id/status", updatePrescriptionStatus);


export default router;