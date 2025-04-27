
import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
    location: {type : String,required : true,},
    branchName: {type : String,required : true,},
    phoneNumber: {type : String,required : true,},
});

export const Branch = mongoose.model("Branch", BranchSchema);


export default Branch;

