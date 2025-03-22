import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import multer from "multer";

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/slips/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

export { upload };

//  Create Payment 
export const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;

        if (!orderId || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        //  find order exists 
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        //  Get totalAmount from Order
        const amount = order.totalAmount;

        let slipUrl = null;
        if (paymentMethod === "Upload Slip") {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Upload Slip is required for this method" });
            }
            slipUrl = `/uploads/slips/${req.file.filename}`;
        }

        const paymentStatus = paymentMethod === "Cash on Delivery" ? "Pending" : "Pending Verification";


        //  Create Payment
        const newPayment = new Payment({
            orderId,
            userId: order.userId,
            paymentMethod,
            amount,
            slipUrl,
            status: paymentStatus
        });

        await newPayment.save();

        //  Update Order Payment Status
        await Order.findByIdAndUpdate(orderId, { paymentStatus });

        res.status(201).json({ success: true, message: "Payment successful!", payment: newPayment });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

//  Get All Payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("orderId userId");
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//  Get Payment by Order ID
export const getPaymentByOrderId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.orderId }).populate("orderId userId");
        if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//  Delete Payment
export const deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.paymentId);
        if (!deletedPayment) return res.status(404).json({ success: false, message: "Payment not found" });

        res.status(200).json({ success: true, message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};









/*




// Pharmacist Approves Payment 
export const verifyPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Check if order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if payment exists
        const payment = await Payment.findOne({ orderId });
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        if (payment.paymentMethod !== "Upload Slip") {
            return res.status(400).json({ success: false, message: "Only Upload Slip payments need verification" });
        }

        await Payment.findByIdAndUpdate(payment._id, { status: "Paid" });
        await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid", status: "Processing" });

        res.status(200).json({ success: true, message: "Payment verified and  marked as Paid" });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

*/