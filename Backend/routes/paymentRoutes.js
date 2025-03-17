import express from "express";
import {
    createPayment,
    verifyPayment,
    getAllPayments,
    getPaymentByOrderId,
    deletePayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.put("/verify/:orderId", verifyPayment);
router.get("/", getAllPayments);
router.get("/:orderId", getPaymentByOrderId);
router.delete("/:paymentId", deletePayment);

export default router;
