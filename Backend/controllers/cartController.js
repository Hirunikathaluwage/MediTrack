import Cart from '../models/Cart.js';
import Medicine from '../models/Medicine.js';
import BranchStock from '../models/BranchStock.js';

// Cart Controller: Add or Update Cart
export const createOrUpdateCart = async (req, res) => {
    const { userId, items } = req.body;

    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: "Items must be an array" });
    }

    try {
        const updatedItems = [];

        for (let item of items) {
            const medicine = await Medicine.findById(item.medicineId);
            if (!medicine) {
                return res.status(404).json({ error: `Medicine with ID ${item.medicineId} not found` });
            }

            const branchStock = await BranchStock.findOne({ medicineId: item.medicineId });
            if (!branchStock) {
                return res.status(404).json({ error: `Price for medicine with ID ${item.medicineId} not found` });
            }

            updatedItems.push({
                medicineId: item.medicineId,
                quantity: item.quantity,
                unitPrice: branchStock.price,
                price: branchStock.price * item.quantity,
            });
        }

        const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { userId, items: updatedItems, totalPrice },
            { new: true, upsert: true }
        );

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error in createOrUpdateCart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Cart Controller: Get Cart by User ID
export const getCartByUserId = async (req, res) => {
    const { userId } = req.query;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving cart' });
    }
};



// Cart Controller: Remove Item from Cart
export const removeItemFromCart = async (req, res) => {
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ 'items._id': itemId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        cart.totalPrice = cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error removing item from cart' });
    }
};





// Cart Controller: Update Item Quantity
export const updateItemQuantity = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ 'items._id': itemId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        cart.totalPrice = cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating item quantity' });
    }
};





// Cart Controller: Clear Cart
export const clearCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Empty the cart
        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error clearing cart' });
    }
};

// POST /api/cart/update
// router.post('/update', async (req, res) => {
export const updateCart = async (req, res) => {
    const { userId, items } = req.body;

    try {
        // 1. Remove existing cart
        await Cart.findOneAndUpdate(
            { userId },
            { items, totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0) },
            { new: true, upsert: true }
        );

        return res.status(200).json({ success: true, message: "Cart updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error updating cart" });
    }
};
