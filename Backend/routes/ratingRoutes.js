import express from 'express';
import { createRating, getAllRatings, getDriverPerformance, getRatingsByDeliveryId } from '../controllers/ratingController.js';

const router = express.Router();

router.get('/performance', getDriverPerformance);

// Route to create a new rating
router.post('/', createRating);

// Route to get ratings by deliveryId
router.get('/:deliveryId', getRatingsByDeliveryId);

router.get('/',getAllRatings);


export default router;