import express from 'express';
import {
    createPayment,
    getPaymentsByUser,
    getAllPayments,
    updatePaymentStatus,
    verifyPaymentSlip,
    getSlipPayments
} from '../controllers/paymentController.js';
import multer from 'multer';

// Setup multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/slips'); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();

// POST route for creating a payment with optional slip
router.post('/', upload.single('slipImage'), createPayment);

// Get payments for a user
router.get('/user/:userId', getPaymentsByUser);

// Get all payments (admin view)
router.get('/', getAllPayments);

// Route to verify payment slip
router.put('/payments/:orderId/verify', verifyPaymentSlip);

// Update verification status (admin)
router.put('/update-status/:paymentId', updatePaymentStatus);


router.get("/slips", getSlipPayments);

export default router;


