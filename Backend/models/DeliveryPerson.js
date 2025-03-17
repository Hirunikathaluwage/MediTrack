import mongoose from "mongoose";

const DeliveryPersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    vehicleType: { type: String, enum: ["bike", "car", "van"], required: true },
    availability: { type: Boolean, default: true } // True = Ready for orders
});

export default mongoose.model("DeliveryPerson", DeliveryPersonSchema);
