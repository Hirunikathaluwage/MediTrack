import Payment from '../models/Payment.js';
import Medicine from '../models/Medicine.js';

// Create new payment
export const createPayment = async (req, res) => {
    try {
        const { paymentMethod, amount, verificationStatus, userId, orderId } = req.body;
        let slipImage = null;

        // If slip image is uploaded
        if (req.file) {
            slipImage = req.file.filename; // Or req.file.path, depending on your multer config
        }

        const newPayment = new Payment({
            paymentMethod,
            amount,
            verificationStatus,
            userId,
            orderId,
            slipImage,
            date: new Date()
        });

        await newPayment.save();

        res.status(200).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};


// Get all payments by user
export const getPaymentsByUser = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.params.userId });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all payments (admin use)
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('orderId userId');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update verification status (admin)
export const updateVerificationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const payment = await Payment.findByIdAndUpdate(
            req.params.paymentId,
            { verificationStatus: status },
            { new: true }
        );
        res.json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
