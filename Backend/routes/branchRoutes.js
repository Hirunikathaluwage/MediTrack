import mongoose from "mongoose";
import express from "express";
import Branch from "../models/Branch.js";
import { createBranch, deleteBranch, getBranch, updateBranch } from "../controllers/branch.controller.js";
import { getBranchById } from '../controllers/branchController.js';
import { getBranches , getBranchByOrderId} from '../controllers/branchController.js';
 
const router = express.Router();
 
// Get branch details
router.get("/", getBranch);
 
//Create branch
router.post("/", createBranch);
 
//delete branch
router.delete("/:id", deleteBranch);
 
//update branch
router.put("/:id", updateBranch);
 
router.get('/:branchId', getBranchById);
 
router.get('/', getBranches);
 
router.get('/by-order/:orderId', getBranchByOrderId);
 
export default router;