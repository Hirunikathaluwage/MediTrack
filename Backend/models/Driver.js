import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  branch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Driver', driverSchema);