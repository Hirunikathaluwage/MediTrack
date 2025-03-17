import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, enum: ["COD", "Upload Slip"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    //deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery", required: false } // Linked to delivery (for COD)
});

export default mongoose.model("Payment", PaymentSchema);

