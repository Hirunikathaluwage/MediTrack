import mongoose from "mongoose";
import express from "express";
import Branch from "../models/BranchStock.js";
import { createBranchStock, deleteBranchStock, getBranchStock, updateBranchStock, getMedicineStock } from "../controllers/branchStock.controller.js";

const router = express.Router();

router.get("/m/:medicineId", getMedicineStock);
router.get("/b/:branchId", getBranchStock);

router.post("/", createBranchStock);
router.delete("/delete", deleteBranchStock);
router.put("/update", updateBranchStock);

export default router;