import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    imageUrl: { type: String, required: true },
    note: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
    medicines: [
        {
            medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

export default mongoose.model("Prescription", PrescriptionSchema);

