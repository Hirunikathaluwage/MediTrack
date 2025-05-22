import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  branch: { type: String, required: true },
  ongoingDeliveries: [
    {
      deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
      orderId: { type: String },
      location: {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String },
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Driver', driverSchema);