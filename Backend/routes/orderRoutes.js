import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    // updateOrderStatus,
    deleteOrder,
    getOrdersByUserId
} from "../controllers/orderController.js";

const router = express.Router();


router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
// router.put("/:orderId", updateOrderStatus);
router.delete("/:orderId", deleteOrder);
router.get("/user/:userId", getOrdersByUserId);
export default router;