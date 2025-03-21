import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    getOrdersByUserId
} from "../controllers/orderController.js";

const router = express.Router();


router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.delete("/:orderId", deleteOrder);
router.get("/user/:userId", getOrdersByUserId);
export default router;