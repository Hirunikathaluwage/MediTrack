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

// Get all delivery requests (Admin, Driver Dashboard)
router.get('/', getAllDeliveries);

// Get a single delivery by ID (Driver DeliveryDetails page)
router.get('/:id', getDeliveryById);

// Delete a delivery (Admin Management page)
router.delete('/:id', deleteDelivery);

// Get deliveries assigned to a specific user (Optional - for user history)
router.get('/user/:userId', getDeliveriesByUserId);

// Update delivery status (Driver clicks "In Transit", "Delivered", etc.)
router.patch('/:id/status', updateDeliveryStatus);

// Assign a driver to a delivery (Admin -> AssignDriver page)
router.put('/:id/assign-driver', assignDriverToDelivery);

export default router;
