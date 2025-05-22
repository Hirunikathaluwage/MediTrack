import mongoose from 'mongoose';

const branchStockSchema = new mongoose.Schema({
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    stock: { type: Number, required: true }, // Quantity in stock
    expiryDate: { type: Date, required: true },
    price: { type: Number, required: true }, // Price of the medicine at this branch
});

const BranchStock = mongoose.model('BranchStock', branchStockSchema);

export default BranchStock;