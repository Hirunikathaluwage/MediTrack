const mongoose = require("mongoose");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true, required: true },
    patientId: { type: Number, required: true },
    branchId: { type: Number, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Delivered"], default: "Pending" }
});

module.exports = mongoose.model("Order", OrderSchema, "order");

