import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    status: { type: String, enum: ["Pending", "Processing", "Completed", "Cancelled"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    deliveryOption: { type: String, enum: ["Home Delivery", "Pharmacy Pickup"], required: true }
});


export default mongoose.model("Order", OrderSchema);



