import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true, required: true },
    patientId: { type: Number, required: true },
    branchId: { type: Number, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Delivered"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

OrderSchema.pre("save", async function (next) {
    if (!this.orderId) {
        const lastOrder = await mongoose.model("Order").findOne().sort("-orderId");
        this.orderId = lastOrder ? lastOrder.orderId + 1 : 100001;
    }
    next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

