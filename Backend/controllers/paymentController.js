import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

// Create Payment
export const createPayment = async (req, res) => {
    try {
        const { orderId, userId, paymentMethod } = req.body;

        if (!orderId || !userId || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const amount = order.totalAmount;

        const newPayment = new Payment({
            orderId,
            userId,
            paymentMethod,
            amount
        });

        await newPayment.save();

        let updatedStatus = order.paymentStatus;
        if (paymentMethod === "COD") {
            updatedStatus = "Pending";  // COD is paid at delivery
        } else if (paymentMethod === "Upload Slip") {
            updatedStatus = "Verification Pending";  // Wait for pharmacist approval
        }

        await Order.findByIdAndUpdate(orderId, { paymentStatus: updatedStatus });

        res.status(201).json({ success: true, message: "Payment recorded successfully", payment: newPayment });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Pharmacist Approves Payment (for Upload Slip)
export const verifyPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const payment = await Payment.findOne({ orderId });
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid", status: "Processing" });

        res.status(200).json({ success: true, message: "Payment verified and marked as Paid" });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get All Payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("orderId userId");
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Payment by Order ID
export const getPaymentByOrderId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.orderId }).populate("orderId userId");
        if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Payment
export const deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.paymentId);
        if (!deletedPayment) return res.status(404).json({ success: false, message: "Payment not found" });

        res.status(200).json({ success: true, message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
