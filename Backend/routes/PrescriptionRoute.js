import mongoose from "mongoose";
import express from "express";
import { getPrescription } from "../controllers/prescription.controller.js";

const router = express.Router();

// Get Prescription via branchId
router.get("/:branchId", getPrescription);


export default router;



