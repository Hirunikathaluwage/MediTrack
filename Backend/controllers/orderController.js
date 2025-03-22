import mongoose from "mongoose";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";



//  Create Order (User Requests Order)
export const createOrder = async (req, res) => {
    try {
        const { userId, prescriptionId, deliveryOption } = req.body;

        if (!userId || !prescriptionId) {
            return res.status(400).json({ success: false, message: "User ID and Prescription ID are required" });
        }

        if (!["Home Delivery", "Pharmacy Pickup"].includes(deliveryOption)) {
            return res.status(400).json({ success: false, message: "Invalid delivery option" });
        }

        // Check if there's already a pending order request for the user
        const existingOrder = await Order.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            status: "Requested"
        });

        if (existingOrder) {
            return res.status(400).json({ success: false, message: "You already have a pending order request." });
        }

        // Fetch the prescription details from the provided prescriptionId
        const prescription = await mongoose.connection.collection("prescriptions").findOne(
            { _id: new mongoose.Types.ObjectId(prescriptionId) }
        );


        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }

        // Fetch medicines from the database
        const medicineIds = prescription.medicines.map(item => new mongoose.Types.ObjectId(item.medicineId));
        const medicineCollection = mongoose.connection.collection("medicines");
        const medicinesData = await medicineCollection.find({ _id: { $in: medicineIds } }).toArray();


        if (!medicinesData.length) {
            return res.status(400).json({ success: false, message: "No valid medicines found in the database" });
        }

        let totalAmount = 0;
        const orderItems = prescription.medicines.map(item => {
            const medicine = medicinesData.find(med => med._id.toString() === item.medicineId.toString());
            if (!medicine) return null;
            const itemTotal = medicine.price * item.quantity;
            totalAmount += itemTotal;
            return {
                orderId: null,
                medicineId: medicine._id,
                quantity: item.quantity
            };
        }).filter(item => item !== null);

        if (orderItems.length === 0) {
            return res.status(400).json({ success: false, message: "No valid order items to add" });
        }

        // Create Order
        const newOrder = new Order({
            userId: new mongoose.Types.ObjectId(userId),
            prescriptionId,
            branchId: prescription.branchId,
            totalAmount,
            paymentStatus: "Pending",
            status: "Requested",
            deliveryOption
        });

        await newOrder.save();

        // Add Order Items
        orderItems.forEach(item => item.orderId = newOrder._id);
        await OrderItem.insertMany(orderItems);

        // Fetch user & branch details directly from the database
        const userCollection = mongoose.connection.collection("users");
        const branchCollection = mongoose.connection.collection("branches");

        const user = await userCollection.findOne(
            { _id: new mongoose.Types.ObjectId(userId) },
            { projection: { name: 1, email: 1 } }
        );

        const branch = await branchCollection.findOne(
            { _id: new mongoose.Types.ObjectId(prescription.branchId) },
            { projection: { name: 1, location: 1 } }
        );

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: {
                _id: newOrder._id,
                user,
                branch,
                totalAmount,
                paymentStatus: newOrder.paymentStatus,
                status: newOrder.status,
                deliveryOption
            }
        });

    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};





//  Get All Orders (with User & Branch Details)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().lean();
        const userCollection = mongoose.connection.collection("users");
        const branchCollection = mongoose.connection.collection("branches");

        const ordersWithDetails = await Promise.all(orders.map(async (order) => {
            const user = await userCollection.findOne({ _id: order.userId });
            const branch = await branchCollection.findOne({ _id: order.branchId });

            return { ...order, user: user || null, branch: branch || null };
        }));

        res.status(200).json(ordersWithDetails);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


//  Get Order by ID (with User & Branch Details)
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).lean();
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        const userCollection = mongoose.connection.collection("users");
        const branchCollection = mongoose.connection.collection("branches");

        const user = await userCollection.findOne({ _id: order.userId });
        const branch = await branchCollection.findOne({ _id: order.branchId });

        res.status(200).json({ ...order, user: user || null, branch: branch || null });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate("orderItems"); // Adjust if needed
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders." });
    }
};

/*
//  Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });

        if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

        res.status(200).json({ success: true, message: "Order updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
*/

//  Delete Order
export const deleteOrder = async (req, res) => {
    try {
        await OrderItem.deleteMany({ orderId: req.params.orderId });

        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });

        res.status(200).json({ success: true, message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};









