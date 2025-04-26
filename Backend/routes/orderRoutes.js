import express from 'express';
import {
    createOrder,
    getOrdersByUser,
    updateOrderStatus,
    updateDeliveryOption,
    getOrderDetails,
    getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.patch('/status/:orderId', updateOrderStatus);
router.put('/:orderId', updateDeliveryOption);
router.get('/:orderId', getOrderDetails);
router.get('/by-order/:orderId', getOrderById);

export default router;