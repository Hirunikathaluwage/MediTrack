import express from 'express';
import {
    createOrder,
    getOrdersByUser,
    updateOrderStatus,
    updateDeliveryOption,
    getOrderDetails
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.patch('/status/:orderId', updateOrderStatus);
router.put('/:orderId', updateDeliveryOption);
router.get('/:orderId', getOrderDetails);

export default router;
