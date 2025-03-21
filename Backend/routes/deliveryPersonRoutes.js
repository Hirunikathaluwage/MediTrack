import express from 'express';

import { addDeliveryPerson } from '../controllers/deliveryPersonController.js';
import { getDeliveryPeople } from '../controllers/deliveryPersonController.js';
import { getAvailableDrivers } from '../controllers/deliveryPersonController.js';
import { updateAvailability } from '../controllers/deliveryPersonController.js';
import {getDeliveryPersonById} from '../controllers/deliveryPersonController.js';


const router = express.Router();
router.post("/", addDeliveryPerson);
router.get("/", getDeliveryPeople);
router.get("/available", getAvailableDrivers);
router.put("/:id/availability", updateAvailability);
router.get("/:id", getDeliveryPersonById);

export default router;