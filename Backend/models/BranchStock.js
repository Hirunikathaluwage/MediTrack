import mongoose from "mongoose";

const BranchStockSchema = new mongoose.Schema({
    
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },

    stock: {type: Number,required : true,},
    // location: {type : String,required : true,},
    expiryDate: {type : Date,required : true,},
    price: {type : Number,required : true,},
});

export const BranchStock = mongoose.model("BranchStock", BranchStockSchema);
export default BranchStock;
