import express from 'express';
import { submitFeedback, getDeliveryFeedbacks } from '../controllers/deliveryFeedbackController.js';

const router = express.Router();
router.post('/submit', submitFeedback);
router.get('/', getDeliveryFeedbacks);

export default router;