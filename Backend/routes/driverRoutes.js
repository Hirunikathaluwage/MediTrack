import express from 'express';
import { createDriver, deleteDriver, getAllDrivers ,
    getDriverById, updateDriver , getDriversByBranch } from '../controllers/driverController.js';

const router = express.Router();

// Route to create a new driver
router.post('/', createDriver);

// Route to get all drivers
router.get('/', getAllDrivers);

router.get('/:id',getDriverById);

router.put('/:id',updateDriver);

router.delete('/:id',deleteDriver);

router.get('/branch/:branchName', getDriversByBranch);

export default router;