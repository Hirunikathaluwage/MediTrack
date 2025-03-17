import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User (Can be Driver or Customer)
    status: { type: String, enum: ["pending", "in_transit", "delivered", "failed"], default: "pending" },
    location: { type: String, required: true },
    time: { type: Date, required: true }
});

export default mongoose.model("Delivery", DeliverySchema);