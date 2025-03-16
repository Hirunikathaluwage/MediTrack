const mongoose = require("mongoose");
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
        console.log("Received Body:", req.body);
        console.log("Received File:", req.file);

        const { userId, branchId,status } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const newPrescription = new Prescription({
            userId: new mongoose.Types.ObjectId(userId),
            branchId: new mongoose.Types.ObjectId(branchId),
            imageUrl: `/uploads/${req.file.filename}`,
            status: status,
            medicines: []
        });

        await newPrescription.save();

        res.status(201).json({ success: true, message: "Prescription uploaded successfully", prescription: newPrescription });

    } catch (error) {
        console.error("Prescription Upload Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
//express.application.get

module.exports = router;
 