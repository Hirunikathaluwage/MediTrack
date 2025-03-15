import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    orderItemId: { type: Number, unique: true, required: true },
    orderId: { type: Number, required: true },
    medicineId: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
});

OrderItemSchema.pre("save", async function (next) {
    if (!this.orderItemId) {
        const lastOrderItem = await mongoose.model("OrderItem").findOne().sort("-orderItemId");
        this.orderItemId = lastOrderItem ? lastOrderItem.orderItemId + 1 : 200001;
    }
    next();
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
export default OrderItem;
