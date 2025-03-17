import express from 'express';
import delivery from '../models/Delivery.js';

const router = express.Router();

// Save delivery
router.post('/', async (req, res) => {
    try {
        let newDelivery = new delivery(req.body);
        await newDelivery.save();
        return res.status(200).json({ success: "Delivery saved successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default router;