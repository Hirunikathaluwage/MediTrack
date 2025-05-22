import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery', required: true },
  overall: { type: Number, required: true },
  driver: { type: Number, required: true },
  selectedTags: { type: [String], default: [] },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Rating', ratingSchema);