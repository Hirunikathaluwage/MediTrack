import express from "express";
import {
    upload,
    createPayment,
    getAllPayments,
    getPaymentByOrderId,
    deletePayment
} from "../controllers/paymentController.js";

const router = express.Router();


// Apply Multer Middleware to handle file uploads
router.post("/", upload.single("slip"), createPayment);

router.get("/", getAllPayments);
router.get("/:orderId", getPaymentByOrderId);
router.delete("/:paymentId", deletePayment);

export default router;