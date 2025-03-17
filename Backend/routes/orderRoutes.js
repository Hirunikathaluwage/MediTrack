import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

const router = express.Router();

// Create Order  
router.post("/", async (req, res) => {
    try {
        const { prescriptionId, branchId, deliveryOption } = req.body;

        if (!prescriptionId || !branchId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (!["Home Delivery", "Pharmacy Pickup"].includes(deliveryOption)) {
            return res.status(400).json({ success: false, message: "Invalid delivery option" });
        }

        const prescriptionCollection = mongoose.connection.collection("prescriptions");
        const prescription = await prescriptionCollection.findOne({
            _id: new mongoose.Types.ObjectId(prescriptionId),
            status: "Verified"
        });

        if (!prescription) {
            return res.status(404).json({ success: false, message: "Verified prescription not found" });
        }

        if (!prescription.userId) {
            return res.status(400).json({ success: false, message: "Prescription is missing userId" });
        }

        const branchCollection = mongoose.connection.collection("branch");

        if (!mongoose.Types.ObjectId.isValid(branchId)) {
            return res.status(400).json({ success: false, message: "Invalid branchId format" });
        }

        const branchExists = await branchCollection.findOne({ _id: new mongoose.Types.ObjectId(branchId) });

        if (!branchExists) {
            return res.status(404).json({ success: false, message: "Branch not found in database" });
        }

        if (!prescription.medicines || prescription.medicines.length === 0) {
            return res.status(400).json({ success: false, message: "No medicines found in prescription" });
        }

        const medicineCollection = mongoose.connection.collection("medicines");
        const medicineIds = prescription.medicines.map(item => new mongoose.Types.ObjectId(item.medicineId));

        const medicinesData = await medicineCollection.find({ _id: { $in: medicineIds } }).toArray();

        if (!medicinesData || medicinesData.length === 0) {
            return res.status(400).json({ success: false, message: "No valid medicines found in the database" });
        }

        let totalAmount = 0;
        const orderItems = prescription.medicines
            .map(item => {
                const medicine = medicinesData.find(med => med._id.toString() === item.medicineId.toString());
                if (!medicine) return null;
                const itemTotal = medicine.price * item.quantity;
                totalAmount += itemTotal;
                return {
                    orderId: null,
                    medicineId: medicine._id,
                    quantity: item.quantity
                };
            })
            .filter(item => item !== null);

        if (orderItems.length === 0) {
            return res.status(400).json({ success: false, message: "No valid order items to add" });
        }


        // Create Order
        const newOrder = new Order({
            userId: prescription.userId,
            branchId: new mongoose.Types.ObjectId(branchId),
            totalAmount,
            paymentStatus: "Pending",
            status: "Pending",
            deliveryOption
        });

        await newOrder.save();

        orderItems.forEach(item => item.orderId = newOrder._id);
        await OrderItem.insertMany(orderItems);

        res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Get All Orders 
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().lean();

        const userCollection = mongoose.connection.collection("User");
        const branchCollection = mongoose.connection.collection("branch");

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const user = await userCollection.findOne({ _id: order.userId });
                const branch = await branchCollection.findOne({ _id: order.branchId });

                return {
                    ...order,
                    user: user || null,
                    branch: branch || null
                };
            })
        );

        res.status(200).json(ordersWithDetails);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Order by ID
router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).lean();

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        const userCollection = mongoose.connection.collection("User");
        const branchCollection = mongoose.connection.collection("branch");

        const user = await userCollection.findOne({ _id: order.userId });
        const branch = await branchCollection.findOne({ _id: order.branchId });

        res.status(200).json({
            ...order,
            user: user || null,
            branch: branch || null
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update Order Status
router.put("/:orderId", async (req, res) => {
    try {
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

        res.status(200).json({ success: true, message: "Order updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete Order
router.delete("/:orderId", async (req, res) => {
    try {
        await OrderItem.deleteMany({ orderId: req.params.orderId });

        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

        if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });

        res.status(200).json({ success: true, message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
