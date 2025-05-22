// File: routes/driverRoutes.js
import express from 'express';
import { driverLogin } from '../controllers/driverAuthController.js';

const router = express.Router();

router.post('/login', driverLogin);

export default router;
