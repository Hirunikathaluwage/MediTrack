import mongoose from 'mongoose';
import  Branch  from "../models/Branch.js";

export const getBranch = async (req,res) => {
    try{
        const branch = await Branch.find({});
        res.status(200).json({success:true, data:branch});
    }catch(error){
        console.log("error in fetching Branch list", error.message);
        res.status(500).json({success: false , message: "Server error !"});
    }
};

export const createBranch = async (req,res) => {
    const branch = req.body;
    const newBranch = new Branch(branch);
    
    //Checking all the feilds dynamically using a loop /array
    const requiredFields = ['location', 'branchName', 'phoneNumber'];
 
    for (let field of requiredFields) {
        if (!branch[field]) {
            return res.status(400).json({ success: false, message: `Please provide the ${field} field!` });
        }
    }
    try{
        await newBranch.save();
        res.status(201).json({success:true, data:newBranch});
    }catch(error){
        console.error("Error in creating new branch :", error.message);
        res.status(500).json({success:false, message:error.message});
    }
};

export const deleteBranch = async (req,res) => {
    const {id} = req.params;
    try{
        await Branch.findByIdAndDelete(id);
         res.status(200).json({ success : true , message : "Branch removed successfully ! "});
    }catch(error){
        console.log("error in deleting Medications", error.message);
        res.status(404).json({ success : false, message: error.message});
        }
};

export const updateBranch = async (req, res) => {
    const {id} = req.params;
    const branch = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false , message:"Invalid ID"});
    }

    try{
        const updateBranch = await Branch.findByIdAndUpdate(id, branch,{new:true});
        res.status(200).json({ success:true, data: updateBranch });
    }catch(error){
        res.status(500).json({success:false, message: error.message});
    }
};
