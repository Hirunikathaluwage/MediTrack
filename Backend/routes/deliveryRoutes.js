import express from 'express';
import { createDelivery } from '../controllers/deliveryController.js';
import { getDeliveries } from '../controllers/deliveryController.js';
import { updateDelivery } from '../controllers/deliveryController.js';
import { deleteDelivery } from '../controllers/deliveryController.js';
import { getOrderItemsByDeliveryId } from '../controllers/deliveryController.js';

const router = express.Router();
router.post("/", createDelivery);
router.get("/", getDeliveries);
router.put("/:deliveryId", updateDelivery);
router.delete("/:deliveryId", deleteDelivery);
router.get("/:deliveryId/order-items", getOrderItemsByDeliveryId);

export default router;