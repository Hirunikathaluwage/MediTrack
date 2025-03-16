import mongoose from "mongoose";
import express from "express";
import Branch from "../models/BranchStock.js";
import { createBranchStock, deleteBranchStock, getBranchStock, updateBranchStock, getMedicineStock } from "../controllers/branchStock.controller.js";

const router = express.Router();

router.get("/:medicineId", getMedicineStock);
router.get("/:branchId", getBranchStock);

router.post("/", createBranchStock);
router.delete("/delete", deleteBranchStock);
router.put("/update", updateBranchStock);

export default router;