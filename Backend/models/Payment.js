import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    paymentMethod: { type: String, enum: ["slip", "cod"], required: true },
    amount: { type: Number, required: true },

    slipImage: { type: String }, // path or URL to uploaded slip image
    verificationStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },

    date: { type: Date, default: Date.now }
});

export const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
