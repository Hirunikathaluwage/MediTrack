import express from 'express';
import {
    createOrder,
    getOrdersByUser,
    // updateOrderStatus,
    updateDeliveryOption,
    getOrderDetails,
    getAllOrders,
    updateOrderAndPaymentStatus,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUser);
// router.patch('/status/:orderId', updateOrderStatus);
router.put('/:orderId', updateDeliveryOption);
router.get('/:orderId', getOrderDetails);

router.get("/", getAllOrders);

router.patch('/status/:orderId', updateOrderAndPaymentStatus);


router.delete("/orders/:id", deleteOrder);


export default router;