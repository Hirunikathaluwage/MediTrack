import mongoose from 'mongoose';
import  Prescription  from "../models/Prescription.js";



export const getPrescriptions = async (req, res) => {
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

  export const updatePrescriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ["Pending", "Verified", "Rejected"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status provided." });
    }

    const prescription = await Prescription.findById(id);

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found." });
    }

    prescription.status = status;
    
    await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription status updated successfully.",
      prescription,
    });
  } catch (error) {
    console.error("Error updating prescription status:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


