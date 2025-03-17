import express from "express";
import mongoose from "mongoose";
import Delivery from "../models/Delivery.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

const router = express.Router();

// Assign Delivery Person to an Order (Check Payment Before Assigning)
router.post("/", async (req, res) => {
    try {
        const { orderId, deliveryPersonId, location, time } = req.body;

        if (!orderId || !deliveryPersonId || !location || !time) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Ensure order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // If order is for Pharmacy Pickup, no need for delivery
        if (order.deliveryOption === "Pharmacy Pickup") {
            await Order.findByIdAndUpdate(orderId, { status: "Ready for Pickup" });
            return res.status(200).json({ success: true, message: "Order is ready for pickup at the pharmacy" });
        }

        //  Ensure payment exists
        const payment = await Payment.findOne({ orderId });
        if (!payment) {
            return res.status(400).json({ success: false, message: "Payment not found" });
        }

        //  Prevent delivery assignment if Upload Slip is not verified
        if (payment.paymentMethod === "Upload Slip" && payment.paymentStatus !== "Paid") {
            return res.status(400).json({ success: false, message: "Payment verification pending. Delivery cannot be assigned." });
        }

        //  Ensure delivery person is provided for Home Delivery
        if (!deliveryPersonId) {
            return res.status(400).json({ success: false, message: "Delivery person is required for Home Delivery" });
        }

        //  Create Delivery Entry
        const newDelivery = new Delivery({
            orderId,
            deliveryPersonId,
            location,
            time
        });

        await newDelivery.save();

        res.status(201).json({ success: true, message: "Delivery assigned successfully", delivery: newDelivery });

    } catch (error) {
        console.error("Delivery Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


//  Get All Deliveries
router.get("/", async (req, res) => {
    try {
        const deliveries = await Delivery.find().populate("orderId deliveryPersonId");
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update Delivery Status & Location (Also Update Order Status)
router.put("/:deliveryId", async (req, res) => {
    try {
        const { status, location } = req.body;

        const updatedDelivery = await Delivery.findByIdAndUpdate(
            req.params.deliveryId,
            { status, location, time: new Date() },
            { new: true }
        );

        if (!updatedDelivery) return res.status(404).json({ success: false, message: "Delivery not found" });

        //  If delivery is completed, update order status
        if (status === "delivered") {
            await Order.findByIdAndUpdate(updatedDelivery.orderId, { status: "Completed" });
        }

        res.status(200).json({ success: true, message: "Delivery updated", delivery: updatedDelivery });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// ...existing code...

// Delete Delivery
router.delete("/:deliveryId", async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.deliveryId);

        if (!deletedDelivery) {
            return res.status(404).json({ success: false, message: "Delivery not found" });
        }

        // Optionally, you can also update the order status if needed
        await Order.findByIdAndUpdate(deletedDelivery.orderId, { status: "Cancelled" });

        res.status(200).json({ success: true, message: "Delivery deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ...existing code...




export default router;
