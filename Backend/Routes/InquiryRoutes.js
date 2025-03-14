import express from 'express';
import { getAllInquiries, getInquiryById, addInquiry, updateInquiry, deleteInquiry } from '../Controlers/InquiryControllers.js';

const router = express.Router();

// Fetch all inquiries
router.get('/', getAllInquiries);

// Fetch inquiry by ID
router.get('/:id', getInquiryById);

// Add a new inquiry
router.post('/', addInquiry);

// Update an inquiry
router.put('/:id', updateInquiry);

// Delete an inquiry
router.delete('/:id', deleteInquiry);

export default router;