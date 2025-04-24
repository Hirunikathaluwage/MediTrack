import express from 'express';
import {
    createPayment,
    getPaymentsByUser,
    getAllPayments,
    updateVerificationStatus
} from '../controllers/paymentController.js';

const router = express.Router();

// Create new payment
router.post('/', createPayment);

// Get payments for a user
router.get('/user/:userId', getPaymentsByUser);

// Get all payments (admin view)
router.get('/', getAllPayments);

// Update verification status (admin)
router.put('/:paymentId/verify', updateVerificationStatus);

export default router;


