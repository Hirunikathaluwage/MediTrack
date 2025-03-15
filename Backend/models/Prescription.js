const mongoose = require("mongoose");
 
const PrescriptionSchema = new mongoose.Schema({
    prescriptionId: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    branchId: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
    medicines: [
        {
            medicineId: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});
 
PrescriptionSchema.pre("save", async function (next) {
    if (!this.prescriptionId) {
        const lastPrescription = await mongoose.model("Prescription").findOne().sort("-prescriptionId");
        this.prescriptionId = lastPrescription ? lastPrescription.prescriptionId + 1 : 400001;  // Start from 400001
    }
    next();
});
 
module.exports = mongoose.model("Prescription", PrescriptionSchema);