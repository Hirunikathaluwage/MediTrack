import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    quantity: { type: Number, required: true, min: 1 },
    // branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    unitPrice: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;