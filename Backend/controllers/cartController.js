import Cart from '../models/Cart.js';
import Medicine from '../models/Medicine.js';
import BranchStock from '../models/BranchStock.js';

// Cart Controller: Add or Update Cart
// Cart Controller: Add or Update Cart
export const addOrUpdateCart = async (req, res) => {
    const { userId, items } = req.body;

    try {
        // Fetch the user's cart
        let cart = await Cart.findOne({ userId });

        // If cart exists, update the cart
        if (cart) {
            // Update the existing cart items with the new data
            for (let item of items) {
                const existingItemIndex = cart.items.findIndex(existingItem => existingItem.medicineId.toString() === item.medicineId);

                if (existingItemIndex !== -1) {
                    // Update the quantity of the existing item
                    cart.items[existingItemIndex].quantity += item.quantity;
                } else {
                    // Add new item to the cart with unitPrice
                    const medicine = await Medicine.findById(item.medicineId);
                    if (!medicine) {
                        return res.status(404).json({ message: `Medicine with ID ${item.medicineId} not found` });
                    }

                    // Fetch the price from BranchStock using the medicineId
                    const branchMedicine = await BranchStock.findOne({ medicineId: item.medicineId });
                    if (!branchMedicine) {
                        return res.status(404).json({ message: `Price for medicine with ID ${item.medicineId} not found` });
                    }

                    // Add the item with the unit price
                    cart.items.push({
                        medicineId: item.medicineId,
                        quantity: item.quantity,
                        unitPrice: branchMedicine.price,  // Fetch price from BranchStock
                    });
                }
            }

            // Recalculate totalPrice
            cart.totalPrice = cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // If no cart exists, create a new cart
            const newItems = [];
            for (let item of items) {
                const medicine = await Medicine.findById(item.medicineId);
                if (!medicine) {
                    return res.status(404).json({ message: `Medicine with ID ${item.medicineId} not found` });
                }

                // Fetch the price from BranchStock using the medicineId
                const branchMedicine = await BranchStock.findOne({ medicineId: item.medicineId });
                if (!branchMedicine) {
                    return res.status(404).json({ message: `Price for medicine with ID ${item.medicineId} not found` });
                }

                // Add the item with the unit price
                newItems.push({
                    medicineId: item.medicineId,
                    quantity: item.quantity,
                    unitPrice: branchMedicine.price,  // Fetch price from BranchStock
                });
            }

            // Create a new cart
            cart = new Cart({
                userId,
                items: newItems,
                totalPrice: newItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
            });
            await cart.save();
            return res.status(201).json(cart);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error saving cart' });
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

