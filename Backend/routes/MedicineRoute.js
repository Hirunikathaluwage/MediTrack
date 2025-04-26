import mongoose from 'mongoose';
import express from 'express';
import Medicine from '../models/Medicine.js';
import {getMedicine, createMedicine, deleteMedicine, updateMedicine} from '../controllers/medicine.controller.js';
//const express = require('express');
const router = express.Router();

//create a new medicine
router.post("/", createMedicine);

// Get all medicines
router.get("/", getMedicine);

//Delete a Product
router.delete("/:id", deleteMedicine);

//Update product
router.put("/:id", updateMedicine);

export default router; 