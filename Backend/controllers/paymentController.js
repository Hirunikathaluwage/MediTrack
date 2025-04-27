import Payment from '../models/Payment.js';
import Medicine from '../models/Medicine.js';
import Order from '../models/Order.js';

// Create new payment
export const createPayment = async (req, res) => {
    try {
        const { paymentMethod, amount, verificationStatus, userId, orderId } = req.body;
        let slipImage = null;

        if (req.file) {
            slipImage = req.file.filename;
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
export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body;

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        payment.verificationStatus = status;
        await payment.save();

        const order = await Order.findById(payment.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.paymentStatus = status === "approved" ? "Completed" : "Failed";
        await order.save();

        res.status(200).json({ message: `Payment ${status} successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update payment status" });
    }
};



export const verifyPaymentSlip = async (req, res) => {
    const { orderId } = req.params;
    const { verificationStatus } = req.body;

    try {
        const payment = await Payment.findOne({ orderId });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        if (payment.paymentMethod === "slip") {
            await Payment.updateOne({ orderId }, { paymentStatus: verificationStatus });

            if (verificationStatus === "Completed") {
                await Order.findByIdAndUpdate(orderId, { status: "Completed" });
            } else {
                await Order.findByIdAndUpdate(orderId, { status: "Cancelled" });
            }

            return res.status(200).json({ message: "Payment verified successfully" });
        }

        return res.status(400).json({ message: "Payment method is not 'slip'" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getSlipPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ paymentMethod: "slip" })
            .populate("userId", "name")
            .sort({ date: -1 });

        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch slip payments" });
    }
};