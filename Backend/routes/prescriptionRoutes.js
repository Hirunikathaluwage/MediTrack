const express = require("express");
const multer = require("multer");
const Prescription = require("../models/Prescription");
 
const router = express.Router();
 
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
 
const upload = multer({ storage: storage });
 
 
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { userId, branchId } = req.body;
 
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
 
        // Auto-generate numeric prescriptionId
        const lastPrescription = await Prescription.findOne().sort("-prescriptionId");
        const newPrescriptionId = lastPrescription ? lastPrescription.prescriptionId + 1 : 400001;
 
       
        const newPrescription = new Prescription({
            prescriptionId: newPrescriptionId,
            userId: Number(userId),
            branchId: Number(branchId),
            imageUrl: `/uploads/${req.file.filename}`,
            status: "Pending",  // Default status until verified
            medicines: []
        });
 
        await newPrescription.save();
 
        res.status(201).json({ success: true, message: "Prescription uploaded successfully", prescription: newPrescription });
 
    } catch (error) {
        console.error("Prescription Upload Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});
 
module.exports = router;
 