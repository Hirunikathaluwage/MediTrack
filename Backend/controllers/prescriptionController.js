import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Prescription from "../models/Prescription.js";
import Medicine from "../models/Medicine.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log(`API KEY: ${process.env.GEMINI_API_KEY}`);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export { upload };

function encodeImageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

// Extract Medicines using Gemini AI
async function extractMedicinesFromImage(imagePath) {
  try {
    const base64Image = encodeImageToBase64(imagePath);

    // Define function call for structured output
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
            {
              text: `Extract the medicine names from this prescription image.
              Return only the JSON object in the format specified in the function below.`
            }
          ]
        }
      ],
      tools: [{ function_declarations: [functionDefinition] }]
    });

    console.log("Gemini AI Raw Response:", JSON.stringify(response, null, 2));

    if (!response.response || !response.response.candidates || response.response.candidates.length === 0) {
      console.error("Gemini AI returned an empty response.");
      return [];
    }

    const functionCall = response.response.candidates[0]?.content?.parts[0]?.functionCall;

    if (!functionCall || !functionCall.args) {
      console.error("Function call output missing.");
      return [];
    }

    const jsonOutput = functionCall.args;
    return jsonOutput.medicines || [];

  } catch (error) {
    console.error("Gemini AI Processing Error:", error);
    return [];
  }
}

// **Insert Prescription**
export const uploadPrescription = async (req, res) => {
  try {
    console.log("Received Body:", req.body);  // Log the request body
    console.log("Received File:", req.file);  // Log the file received

    const { userId, branchId } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    console.log("File saved at:", req.file.path);  // Log the file path

    // Step 1: Extract Medicines from Image using Gemini AI
    const extractedMedicines = await extractMedicinesFromImage(req.file.path);
    console.log("Extracted Medicines:", extractedMedicines);

    if (extractedMedicines.length === 0) {
      return res.status(400).json({ success: false, message: "No medicines detected in the prescription." });
    }

    // Step 2: Match Extracted Medicines with MongoDB
    const matchedMedicines = await Medicine.find({
      name: { $in: extractedMedicines },
    });

    console.log("Matched Medicines:", matchedMedicines);

    // Step 3: Format Medicines for Prescription Schema
    const medicinesForPrescription = matchedMedicines.map((med) => ({
      medicineId: med._id,
      quantity: 1, // Default quantity (adjust as needed)
    }));

    if (medicinesForPrescription.length === 0) {
      return res.status(400).json({ success: false, message: "Couldn't find any matching medicines in the database." });
    }

    // Step 4: Save Prescription with Medicines
    const newPrescription = new Prescription({
      userId: new mongoose.Types.ObjectId(userId),
      branchId: new mongoose.Types.ObjectId(branchId),
      imageUrl: `/uploads/${req.file.filename}`,
      status: "Pending",
      medicines: medicinesForPrescription,
    });

    await newPrescription.save();

    // Step 5: Return Updated Prescription
    res.status(201).json({
      success: true,
      message: "Prescription uploaded and processed successfully",
      prescription: newPrescription,
    });
  } catch (error) {
    console.error("Prescription Upload Error:", error);
    res.status(500).json({ success: false, error: error.message, stack: error.stack });
  }
};

// **Review Medicines in a Prescription**
export const reviewPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { medicines } = req.body;

    if (!medicines || medicines.length === 0) {
      return res.status(400).json({ success: false, message: "No medicines provided for update." });
    }
/*
    // Validate prescription exists
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found." });
    }
*/
    // Validate medicine data (ensure `medicineId` and `quantity` exist)
    for (const med of medicines) {
      if (!med.medicineId || !med.quantity || med.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Each medicine must have a valid 'medicineId' and a 'quantity' greater than 0.",
        });
      }
    }
/*
    // Update prescription with new medicines & quantities
    prescription.medicines = medicines.map(med => ({
      medicineId: new mongoose.Types.ObjectId(med.medicineId),
      quantity: med.quantity,
    })); */

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

// **Read Prescription**
export const getPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`ID ==> ${id}`);
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

// **Delete Prescription**
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

export default router;
