import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import BranchStock from '../models/BranchStock.js';
import Medicine from '../models/Medicine.js';
import Payment from '../models/Payment.js';

// Create order from cart
export const createOrder = async (req, res) => {
    const { userId, deliveryOption = 'pending' } = req.body;  // Provide default value for deliveryOption

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found' });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const cartItem of cart.items) {
            const branchStock = await BranchStock.findOne({ medicineId: cartItem.medicineId });

            if (!branchStock) {
                return res.status(400).json({ message: `Medicine not available at this branch: ${cartItem.medicineId}` });
            }

            totalAmount += branchStock.price * cartItem.quantity;

            orderItems.push({
                medicineId: cartItem.medicineId,
                quantity: cartItem.quantity
            });
        }

        // Create a new order with the provided deliveryOption or default value
        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount,
            paymentStatus: 'Pending',
            deliveryStatus: 'Pending',
            deliveryOption  // Pass the deliveryOption here
        });

        const savedOrder = await newOrder.save();

        // Clear the cart after creating the order
        await Cart.updateOne({ userId }, { $set: { items: [], totalPrice: 0 } });

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
        // Get userId from the URL parameters
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Step 1: Get the orders of this user
        const orders = await Order.find({ userId });

        // Step 2: Get all BranchStock data once to use for price lookup
        const branchStock = await BranchStock.find();

        // Step 3: Populate medicine name and price from BranchStock (without needing branchId)
        const populatedOrders = await Promise.all(orders.map(async (order) => {

            const payment = await Payment.findOne({ orderId: order._id });

            const populatedItems = await Promise.all(order.items.map(async (item) => {
                const medicine = await Medicine.findById(item.medicineId);

                // Get the stock entry for the medicine (use only medicineId for price lookup)
                const stockEntry = branchStock.find(s =>
                    s.medicineId.toString() === item.medicineId.toString()  // Use medicineId to find price
                );

                return {
                    name: medicine?.name || 'Unknown',
                    quantity: item.quantity,
                    price: stockEntry?.price || 0  // Default to 0 if no price found
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



// Update delivery status of an order
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { deliveryStatus: status }, { new: true });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Update delivery option separately (NEW)
export const updateDeliveryOption = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { deliveryOption } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).send('Order not found');

        order.deliveryOption = deliveryOption; // Update delivery option
        await order.save();

        res.status(200).send(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Failed to update order');
    }
};
