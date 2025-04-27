import express from 'express';
import {
    createOrUpdateCart, getCartByUserId, removeItemFromCart,
    updateItemQuantity, clearCart, updateCart
} from '../controllers/cartController.js';

const router = express.Router();



// Route to add or update items in the cart
router.post('/', createOrUpdateCart);

// Route to get the cart by userId
router.get('/', getCartByUserId);

router.post('/update', updateCart);
router.delete('/item/:itemId', removeItemFromCart);
router.put('/item/:itemId', updateItemQuantity);

// Route to clear the cart
router.delete('/clear', clearCart);



export default router;
