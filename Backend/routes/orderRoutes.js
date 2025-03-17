import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();


router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.put("/:orderId", updateOrderStatus);
router.delete("/:orderId", deleteOrder);

export default router;
