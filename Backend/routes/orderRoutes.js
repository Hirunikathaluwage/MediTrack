import express from 'express';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import mongoose from 'mongoose';


const router = express.Router();

// Create Order 
router.post("/", async (req, res) => {
    try {
        const { prescriptionId, branchId, totalAmount } = req.body;

        // Fetch verified prescription
        const prescriptionCollection = mongoose.connection.collection("prescriptions");
        const prescription = await prescriptionCollection.findOne({ prescriptionId, status: "Verified" });

        if (!prescription) {
            return res.status(404).json({ success: false, message: "Verified prescription not found" });
        }

        if (!prescription.userId) {
            return res.status(400).json({ success: false, message: "Prescription is missing userId (patientId)" });
        }

        const lastOrder = await Order.findOne().sort("-orderId");
        const newOrderId = lastOrder ? lastOrder.orderId + 1 : 100001;

        // Create Order
        const newOrder = new Order({
            orderId: newOrderId,
            patientId: prescription.userId,
            branchId: branchId,
            totalAmount,
            paymentStatus: "Pending",
            status: "Pending"
        });

        await newOrder.save();

        // Create OrderItems 
        for (const item of prescription.medicines) {
            const lastOrderItem = await OrderItem.findOne().sort("-orderItemId");
            const newOrderItemId = lastOrderItem ? lastOrderItem.orderItemId + 1 : 200001;

            const orderItem = new OrderItem({
                orderItemId: newOrderItemId,
                orderId: newOrder.orderId,
                medicineId: item.medicineId,
                quantity: item.quantity
            });

            await orderItem.save();
        }

        res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//  Get All Orders 
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const userCollection = mongoose.connection.collection("User");
                const patient = await userCollection.findOne({ user_id: order.patientId });
                const branchCollection = mongoose.connection.collection("branch");
                const branch = await branchCollection.findOne({ branchId: order.branchId });
                return {
                    ...order.toJSON(),
                    patient: patient || null,
                    branch: branch || null
                };
            })
        );

        res.status(200).json(ordersWithDetails);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;