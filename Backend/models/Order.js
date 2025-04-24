import mongoose from 'mongoose';

// Subdocument schema for each item in the order
const orderItemSchema = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

// Main order schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // branchId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Branch',
    //     required: true
    // },
    items: [orderItemSchema], // Embedded order items
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryOption: {
        type: String,
        enum: ['home', 'pickup', 'pending'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
