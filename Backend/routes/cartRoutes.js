import express from 'express';
import {
    addOrUpdateCart, getCartByUserId, removeItemFromCart,
    updateItemQuantity, clearCart
} from '../controllers/cartController.js';

const router = express.Router();



// Route to add or update items in the cart
router.post('/', addOrUpdateCart);

// Route to get the cart by userId
router.get('/', getCartByUserId);


router.delete('/item/:itemId', removeItemFromCart);
router.put('/item/:itemId', updateItemQuantity);

// Route to clear the cart
router.delete('/clear', clearCart);



export default router;
