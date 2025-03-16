import mongoose from 'mongoose';
import  BranchStock  from "../models/BranchStock.js";

// searching Medicine by branch name
export const getBranchStock =  async (req,res) => {
        try{
            const {BranchId} = req.params;
            const mediList = await BranchStock.find({ BranchId });

            if (mediList.length === 0) {
                return res.status(404).json({ message: "No locations found for this medicine" });
            }

            res.status(200).json({success:true, data:mediList});
        }catch(error){
            console.log("error in fetching BranchStock list", error.message);
            res.status(500).json({success: false , message: "Server error !"});
        }
};

// searching Location by medicine name
export const getMedicineStock =  async (req,res) => {
    try{
        const {Medicineid} = req.params;
        const locations = await BranchStock.find({ Medicineid });

        if (locations.length === 0) {
            return res.status(404).json({ message: "No locations found for this medicine" });
        }

        res.status(200).json({success:true, data:locations});
    }catch(error){
        console.log("error in fetching BranchStock list", error.message);
        res.status(500).json({success: false , message: "Server error !"});
    }
};

export const createBranchStock = async (req,res) => {
    const branchstock = req.body;
        const newBranchStock = new BranchStock(branchstock);
        
        //Checking all the feilds dynamically using a loop /array
        const requiredFields = ['branchId','medicineId','stock', 'expiryDate', 'price'];
     
        for (let field of requiredFields) {
            if (!branchstock[field]) {
                return res.status(400).json({ success: false, message: `Please provide the ${field} field!` });
            }
        }
        try{
            await newBranchStock.save();
            res.status(201).json({success:true, data:newBranchStock});
        }catch(error){
            console.error("Error in creating new branch Stock:", error.message);
            res.status(500).json({success:false, message:error.message});
        }
};

export const deleteBranchStock = async (req, res) => {
    const { branchId, medicineId } = req.body; // Extract values directly
    const requiredFields = ["branchId", "medicineId"];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ success: false, message: `Please provide the ${field} field!` });
        }
    }

    try {
        const deletedStock = await BranchStock.findOneAndDelete({ branchId, medicineId });

        if (!deletedStock) {
            return res.status(404).json({ success: false, message: "No matching branch stock found!" });
        }

        res.status(200).json({ success: true, message: "Branch stock removed successfully!" });
    } catch (error) {
        console.error("Error in deleting stock:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateBranchStock = async (req,res) => {
    try {
        const { branchId, medicineId,  ...updateFields } = req.body;
    
        const updatedStock = await BranchStock.findOneAndUpdate(
          { branchId, medicineId },
          { $set: updateFields  },
          { new: true }
        );
    
        if (!updatedStock) {
          return res.status(404).json({ message: "Stock entry not found" });
        }
    
        res.json({ message: "Stock updated successfully", updatedStock });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

