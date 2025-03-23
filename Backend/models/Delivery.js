import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPerson", required: false }, // Assigned Delivery Person
    status: { type: String, enum: ["pending", "in_transit", "delivered", "failed"], default: "pending" },
    location: { type: String, required: false },
    time: { type: Date, required: false },
    name: { type: String, required: false }, // Name of the person
    contact: { type: String, required: false }, // Contact number
    landmarks: { type: String, required: false } // Optional landmarks
});

export default mongoose.model("Delivery", DeliverySchema);