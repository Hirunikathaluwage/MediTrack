import mongoose from 'mongoose';
import  Medicine  from "../models/Medicine.js";

export const getMedicine = async (req, res) => {
    try{
        const medicine = await Medicine.find({});
        res.status(200).json({success : true , data : medicine});
    }catch(error){
        console.log("error in fetching Medications list", error.message);
        res.status(500).json({success: false , message: "Server error !"});
    }
};

export const createMedicine = async (req, res) => {
    const medicine = req.body;

    if(!medicine.name || !medicine.genericName || !medicine.price || !medicine.unit || !medicine.description || !medicine.expireDate || !medicine.manufactureDate || !medicine.qty){
        return res.status(400).json({ success:false, message: "Please provide all Fields !" });
    }

    const newMedicine = new Medicine(medicine);
    console.log("Server is running");

    try{
        await newMedicine.save();
        res.status(201).json({ success:true, data: newMedicine});
    }catch(error){
        console.error("Error in creating product :", error.message);
        res.status(500).json({ success: false, message: error.message});
    }
};

export const deleteMedicine = async (req, res) => {
    const {id} = req.params;
    try{
        await Medicine.findByIdAndDelete(id);
        res.status(200).json({ success : true , message : "Medicine deleted successfully ! "});
    }catch(error){
        console.log("error in deleting Medications", error.message);
        res.status(404).json({ success : false, message: "Product not Found!"});
    }
};

export const updateMedicine = async (req, res) => {
    const {id} = req.params;
    const medicine = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false , message: "Invalid Product ID"});
    }

    try{
        const updateMedicine = await Medicine.findByIdAndUpdate(id, medicine,{new:true});
        res.status(200).json({ success:true, data: updateMedicine });
    }catch(error){
        res.status(500).json({success:false, message: "Server Error!"});
    }
};


