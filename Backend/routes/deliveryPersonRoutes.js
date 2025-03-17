import express from "express";
import DeliveryPerson from "../models/DeliveryPerson.js";

const router = express.Router();

//  1. Add a Delivery Person
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, vehicleType } = req.body;

        const newDeliveryPerson = new DeliveryPerson({
            name,
            email,
            phone,
            vehicleType,
            availability: true, // Default to available
        });

        await newDeliveryPerson.save();
        res.status(201).json({ success: true, message: "Delivery person added", deliveryPerson: newDeliveryPerson });

    } catch (error) {
        console.error("Add Delivery Person Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//  2. Get All Delivery People
router.get("/", async (req, res) => {
    try {
        const deliveryPeople = await DeliveryPerson.find();
        res.json({ success: true, deliveryPeople });

    } catch (error) {
        console.error("Get Delivery People Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//  3. Get Available Delivery People
router.get("/available", async (req, res) => {
    try {
        const availableDrivers = await DeliveryPerson.find({ availability: true });
        res.json({ success: true, availableDrivers });

    } catch (error) {
        console.error("Get Available Drivers Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//  4. Update Delivery Person Availability
router.put("/:id/availability", async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        const updatedDeliveryPerson = await DeliveryPerson.findByIdAndUpdate(
            id,
            { availability },
            { new: true }
        );

        if (!updatedDeliveryPerson) {
            return res.status(404).json({ success: false, message: "Delivery person not found" });
        }

        res.json({ success: true, message: "Availability updated", deliveryPerson: updatedDeliveryPerson });

    } catch (error) {
        console.error("Update Availability Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//  5. Get Delivery Person by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deliveryPerson = await DeliveryPerson.findById(id);

        if (!deliveryPerson) {
            return res.status(404).json({ success: false, message: "Delivery person not found" });
        }

        res.json({ success: true, deliveryPerson });

    } catch (error) {
        console.error("Get Delivery Person Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
