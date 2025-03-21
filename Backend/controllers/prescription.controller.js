import mongoose from 'mongoose';
import  Prescription  from "../models/Prescription.js";



export const getPrescription = async (req, res) => {
    try {
      const { branchId } = req.params;  // Use branchId passed in the request parameters
      const prescriptions = await Prescription.find({ branchId });
  
      if (!prescriptions || prescriptions.length === 0) {
        return res.status(404).json({ success: false, message: "No prescriptions found for this branch" });
      }
  
      res.status(200).json({ success: true, prescriptions });
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };