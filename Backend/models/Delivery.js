import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
  },
  landmarks: {
    type: String,
    default: '',
  },
  driverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Driver', // optional reference
    default: null,
  },
  driver: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in transit', 'delivered'], // Define allowed statuses
    default: 'pending', // Default status
  },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Delivery = mongoose.model('Delivery', DeliverySchema);
export default Delivery;