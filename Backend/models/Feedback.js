import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  deliveryRating: { type: Number, required: true }, // Delivery rating (1-5)
  driverRating: { type: Number, required: true }, // Driver rating (1-5)
  feedback: { type: String, default: "" }, // Optional feedback text
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPerson", required: true }, // Reference to DeliveryPerson
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("Feedback", FeedbackSchema);