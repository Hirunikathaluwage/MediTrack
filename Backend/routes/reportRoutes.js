const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/registrations', reportController.getRegistrations);
router.get('/profit', reportController.getProfitReport);
router.get('/top-medicines', reportController.getTopMedicines);
router.get('/branch-orders', reportController.getBranchOrders);

module.exports = router;
