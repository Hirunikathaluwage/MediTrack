const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
    orderItemId: { type: Number, unique: true, required: true }, // Manual have to change this
    orderId: { type: Number, required: true },
    medicineId: { type: Number, required: true },

    quantity: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model("OrderItem", OrderItemSchema, "orderItem");

