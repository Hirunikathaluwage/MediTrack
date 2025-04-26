import express from 'express';
import { getBranchById } from '../controllers/branchController.js';
import { getBranches , getBranchByOrderId} from '../controllers/branchController.js'; // Import the controller functions

const router = express.Router();

// Route to get branch details by branchId
router.get('/:branchId', getBranchById);
router.get('/', getBranches);
router.get('/by-order/:orderId', getBranchByOrderId); // Route to get branch by orderId

export default router;