// controllers/prescriptionController.js
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Prescription from "../models/Prescription.js";
import Medicine from "../models/Medicine.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
import BranchStock from "../models/BranchStock.js";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const upload = multer({ storage });

function encodeImageToBase64(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString("base64");
}

async function extractMedicinesFromImage(imagePath) {
    try {
        const base64Image = encodeImageToBase64(imagePath);

        const functionDefinition = {
            name: "extract_medicines",
            description: "Extract medicine names from a prescription image.",
            parameters: {
                type: "object",
                properties: {
                    medicines: {
                        type: "array",
                        items: { type: "string" }
                    }
                },
                required: ["medicines"]
            }
        };

        const response = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
                        { text: `Extract the medicine names from this prescription image.\nReturn only the JSON object in the format specified in the function below.` }
                    ]
                }
            ],
            tools: [{ function_declarations: [functionDefinition] }]
        });

        const functionCall = response.response?.candidates?.[0]?.content?.parts?.[0]?.functionCall;
        return functionCall?.args?.medicines || [];
    } catch (error) {
        console.error("Gemini AI Processing Error:", error);
        return [];
    }
}

export const uploadPrescription = async (req, res) => {
    try {
        const { userId, name, age, branchId, note } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const extractedMedicines = await extractMedicinesFromImage(req.file.path);
        console.log("Medicines extracted from image:", extractedMedicines);


        const matchedMedicines = await Medicine.find({
            name: { $in: extractedMedicines },
        });

        console.log("Matched medicines from DB:", matchedMedicines);


        const medicinesForPrescription = matchedMedicines.map((med) => ({
            medicineId: med._id,
            quantity: 1,
        }));

        const newPrescription = new Prescription({
            userId: new mongoose.Types.ObjectId(userId),
            name,
            age,
            branchId: new mongoose.Types.ObjectId(branchId),
            note,
            imageUrl: `/uploads/${req.file.filename}`,
            status: "Pending",
            medicines: medicinesForPrescription,
        });

        await newPrescription.save();

        res.status(201).json({
            success: true,
            message: "Prescription uploaded and processed successfully",
            prescriptionId: newPrescription._id,
        });

    } catch (error) {
        console.error("Prescription Upload Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const reviewPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicines } = req.body;

        if (!medicines || medicines.length === 0) {
            return res.status(400).json({ success: false, message: "No medicines provided for update." });
        }

        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found." });
        }

        prescription.medicines = medicines.map((med) => ({
            medicineId: new mongoose.Types.ObjectId(med.medicineId),
            quantity: med.quantity,
        }));

        await prescription.save();

        res.status(200).json({
            success: true,
            message: "Medicines updated successfully",
            prescription,
        });
    } catch (error) {
        console.error("Update prescription medicines error", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id).populate("medicines.medicineId");

        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }
        res.status(200).json({ success: true, prescription });
    } catch (error) {
        console.error("Reading prescription error", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePrescription = await Prescription.findByIdAndDelete(id);

        if (!deletePrescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }
        res.status(200).json({ success: true, message: "Prescription deleted successfully" });
    } catch (error) {
        console.error("Delete prescription error", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getApprovedMedicines = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const { branch } = req.query;

        if (!branch) {
            return res.status(400).json({ success: false, message: "Branch is required." });
        }

        const prescription = await Prescription.findById(prescriptionId)
            .populate("medicines.medicineId");

        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found." });
        }

        if (prescription.status !== "Verified") {
            return res.status(403).json({
                success: false,
                message: "Prescription has not been verified yet.",
                status: prescription.status
            });
        }

        const medicines = await Promise.all(
            prescription.medicines.map(async (entry) => {
                const med = entry.medicineId;

                // Find stock for this medicine in the given branch
                const branchStock = await BranchStock.findOne({
                    medicineId: med._id,
                    branch: branch
                });

                // Debugging logs to check fetched branchStock
                console.log('branchStock:', branchStock);

                const stockAvailable = branchStock?.stock > 0; // Ensure stock availability is checked correctly
                const price = branchStock?.price || 0; // Price fallback to 0 if not found

                // Debugging log to check price and availability logic
                console.log('Price:', price, 'Stock:', branchStock?.stock, 'Availability:', stockAvailable);

                return {
                    id: med._id,
                    name: med.name,
                    price: price,
                    quantity: entry.quantity,
                    availability: stockAvailable // Check if stock is > 0 for availability
                };
            })
        );

        res.status(200).json({ success: true, medicines });

    } catch (error) {
        console.error("Get approved medicines error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};







// GET /approval/:prescriptionId - Get medicines with price and availability
// export const getApprovedMedicines = async (req, res) => {
//     try {
//         const { prescriptionId } = req.params;

//         const prescription = await Prescription.findById(prescriptionId)
//             .populate("medicines.medicineId");

//         if (!prescription) {
//             return res.status(404).json({ success: false, message: "Prescription not found." });
//         }

//         if (prescription.status !== "Verified") {
//             return res.status(403).json({
//                 success: false,
//                 message: "Prescription has not been verified yet.",
//                 status: prescription.status
//             });
//         }

//         const medicines = prescription.medicines.map((entry) => {
//             const med = entry.medicineId;
//             return {
//                 id: med._id,
//                 name: med.name,
//                 availability: med.otc === true,
//                 price: med.price || 0,
//                 quantity: entry.quantity
//             };
//         });

//         res.status(200).json({ success: true, medicines });
//     } catch (error) {
//         console.error("Get approved medicines error:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// };



// GET /approval/:prescriptionId - Get medicines with price and availability
// GET /approval/:prescriptionId - Get medicines with price and availability


// export const getApprovedMedicines = async (req, res) => {
//     try {
//         const { prescriptionId } = req.params;
//         const { branch } = req.query; // Get branch from query params

//         if (!branch) {
//             return res.status(400).json({ success: false, message: "Branch is required." });
//         }

//         // Fetch the prescription and its associated medicines
//         const prescription = await Prescription.findById(prescriptionId)
//             .populate("medicines.medicineId");  // Populate medicine details

//         if (!prescription) {
//             return res.status(404).json({ success: false, message: "Prescription not found." });
//         }

//         if (prescription.status !== "Verified") {
//             return res.status(403).json({
//                 success: false,
//                 message: "Prescription has not been verified yet.",
//                 status: prescription.status
//             });
//         }

//         // Map medicines and check stock quantity for availability
//         const medicines = await Promise.all(prescription.medicines.map(async (entry) => {
//             const med = entry.medicineId;

//             // Find stock for this medicine in the given branch
//             const branchStock = await BranchStock.findOne({
//                 medicineId: med._id,
//                 branch: branch
//             });

//             const quantityInStock = branchStock?.quantity || 0;

//             if (!branchStock) {
//                 // If no matching BranchStock found, fallback to price 0
//                 return {
//                     id: med._id,
//                     name: med.name,
//                     availability: false, // Not available if no stock entry
//                     price: 0,
//                     quantity: entry.quantity
//                 };
//             }

//             return {
//                 id: med._id,
//                 name: med.name,
//                 price: branchStock.price,
//                 quantity: entry.quantity,
//                 availability: quantityInStock >= entry.quantity // Available if enough stock
//             };
//         }));

//         res.status(200).json({ success: true, medicines });

//     } catch (error) {
//         console.error("Get approved medicines error:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// };