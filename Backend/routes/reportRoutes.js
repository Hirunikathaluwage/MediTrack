
import express from 'express';
const router = express.Router();
import reportController from '../controllers/reportController.js';

router.get('/registrations', reportController.getRegistrations);
router.get('/profit', reportController.getProfitReport);
router.get('/top-medicines', reportController.getTopMedicines);
router.get('/branch-orders', reportController.getBranchOrders);

export default router;
