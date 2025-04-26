import express from 'express';
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  deleteDelivery,
  getDeliveriesByUserId,
  updateDeliveryStatus,
  assignDriverToDelivery
} from '../controllers/DeliveryController.js';

const router = express.Router();

// Create a new delivery request
router.post('/', createDelivery);

// Get all delivery requests
router.get('/', getAllDeliveries);

// Get a single delivery request by ID
router.get('/:id', getDeliveryById);

// Delete a delivery request
router.delete('/:id', deleteDelivery);

router.get('/user/:userId', getDeliveriesByUserId);

router.patch('/:id/status', updateDeliveryStatus);

router.put('/deliveries/:deliveryId/assign-driver', assignDriverToDelivery);

export default router;