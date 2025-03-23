import express from "express";
import Feedback from "../models/Feedback.js";
import DeliveryPerson from "../models/DeliveryPerson.js";

const router = express.Router();

// POST: Submit feedback
//router.post("/submit", async (req, res) => {
    export const submitFeedback = async (req, res) => {
  try {
    const { deliveryRating, driverRating, feedback } = req.body;

    // Validate required fields
    if (!deliveryRating || !driverRating ) {
      return res.status(400).json({ message: "All required fields must be filled!" });
    }

    // Check if the driver exists
    // const driver = await DeliveryPerson.findById(driverId);
    // if (!driver) {
    //   return res.status(404).json({ message: "Driver not found" });
    // }

    // Create a new feedback entry
    const newFeedback = new Feedback({
      deliveryRating,
      driverRating,
      feedback,
      //driver: driverId, // Store the driver's ObjectId
    });

    // Save to the database
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET: Fetch all feedback
//router.get("/", async (req, res) => {
    export const getDeliveryFeedbacks = async (req, res) => {
      try {
        const feedbacks = await Feedback.find()
          .populate("driver", "name vehicleType") // Populate driver's name and vehicle type
          .sort({ createdAt: -1 }); // Sort by newest first
    
        res.status(200).json(feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
    



export default router;
 