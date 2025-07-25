import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import BranchStock from '../models/BranchStock.js';
import Medicine from '../models/Medicine.js';
import Payment from '../models/Payment.js';
import Branch from "../models/Branch.js";
import User from "../models/User.js";

// Create order from cart
export const createOrder = async (req, res) => {
    const { userId, branchId, deliveryOption = 'pending' } = req.body; // Extract branchId from request body

    try {
        // Retrieve the cart based on the userId
        const cart = await Cart.findOne({ userId });

        // Check if the cart is empty
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found' });
        }

        let totalAmount = 0;
        const orderItems = [];

        // Loop through cart items to calculate total amount and prepare order items
        for (const cartItem of cart.items) {
            // Find branch stock for each medicine
            const branchStock = await BranchStock.findOne({ medicineId: cartItem.medicineId, branchId });

            if (!branchStock) {
                return res.status(400).json({ message: `Medicine not available at this branch: ${cartItem.medicineId}` });
            }

            totalAmount += branchStock.price * cartItem.quantity;

            orderItems.push({
                medicineId: cartItem.medicineId,
                quantity: cartItem.quantity,
                unitPrice: branchStock.price,
                branchId // Include the branchId in order items for tracking
            });
        }

        // Create a new order with the provided deliveryOption or default value
        const newOrder = new Order({
            userId,
            branchId, // Include branchId in the main order document
            items: orderItems,
            totalAmount,
            paymentStatus: 'Pending',
            deliveryStatus: 'Pending',
            deliveryOption  // Pass the deliveryOption here
        });

        // Save the new order
        const savedOrder = await newOrder.save();

        // Clear the cart after creating the order
        await Cart.updateOne({ userId }, { $set: { items: [], totalPrice: 0 } });

        // Return the created order as a response
        return res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order' });
    }
};


export const getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('items.medicineId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching order details' });
    }
};

// Get all orders for a specific user
export const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const orders = await Order.find({ userId });

        const branchStock = await BranchStock.find();

        const populatedOrders = await Promise.all(orders.map(async (order) => {

            const payment = await Payment.findOne({ orderId: order._id });

            const populatedItems = await Promise.all(order.items.map(async (item) => {
                const medicine = await Medicine.findById(item.medicineId);


                const stockEntry = branchStock.find(s =>
                    s.medicineId.toString() === item.medicineId.toString()
                );

                return {
                    name: medicine?.name || 'Unknown',
                    quantity: item.quantity,
                    price: stockEntry?.price || 0
                };
            }));

            return {
                ...order.toObject(),
                items: populatedItems,
                paymentOption: payment?.paymentMethod || 'Not Available'
            };
        }));

        res.json(populatedOrders);
    } catch (err) {
        console.error("Error in getOrdersByUser:", err);
        res.status(500).json({ error: err.message });
    }
};

//  Update delivery option separately 
export const updateDeliveryOption = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { deliveryOption } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).send('Order not found');

        order.deliveryOption = deliveryOption;
        await order.save();

        res.status(200).send(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Failed to update order');
    }
};


// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name')
            .populate('branchId', 'branchName')
            .lean();

        for (const order of orders) {
            const payment = await Payment.findOne({ orderId: order._id });
            order.paymentMethod = payment?.paymentMethod || null;
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};


// Order update route in Express (Backend)
export const updateOrderAndPaymentStatus = async (req, res) => {
    const { newStatus, newPaymentStatus } = req.body;
    const { orderId } = req.params;

    try {
        // Update order status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: newStatus },  // Update the order status
            { new: true }  // Return the updated order document
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        // If newPaymentStatus is provided, update the payment status in the Order document
        if (newPaymentStatus) {
            updatedOrder.paymentStatus = newPaymentStatus;  // Update payment status in the order document
            await updatedOrder.save();  // Save the updated order
        }

        // Respond with the updated order
        res.json({ message: "Order and payment statuses updated successfully!", updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update order and payment status" });
    }
};




// Delete an order
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Failed to delete order" });
    }
};