import express from 'express';
import {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile
} from '../controllers/adminController.js';

import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/admins/register
router.post('/register', registerAdmin);

// @route   POST /api/admins/login
router.post('/login', loginAdmin);

// @route   POST /api/admins/logout
router.post('/logout', logoutAdmin);

// @route   GET /api/admins/profile
router.get('/profile', protectAdmin, getAdminProfile);

export default router;
