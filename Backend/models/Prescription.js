const mongoose = require("mongoose");
 
const PrescriptionSchema = new mongoose.Schema({
  
    userId: { type: mongoose.Schema.Types.ObjectId,ref:"User",required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId,ref:"branch", required: true },
    imageUrl: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
    medicines: [
        {
            medicineId: { type: mongoose.Schema.Types.ObjectId,ref:"medicine", required: true },
            quantity: { type: Number, required: true }
        }
    ]
});



module.exports = mongoose.model("Prescription", PrescriptionSchema);