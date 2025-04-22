import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  resetPasswordRequest,
  resetPassword
} from '../controllers/customerController.js';
import { protectCustomer } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/customers/register
router.post('/register', registerUser);

// @route   POST /api/customers/login
router.post('/login', loginUser);

// @route   POST /api/customers/logout
router.post('/logout', logoutUser);

// @route   GET /api/customers/profile
router.get('/profile', protectCustomer, getUserProfile);

// @route   PUT /api/customers/profile
router.put('/profile', protectCustomer, updateUserProfile);

// @route   POST /api/customers/reset-password-request
router.post('/reset-password-request', resetPasswordRequest);

// @route   POST /api/customers/reset-password/:id/:token
router.post('/reset-password/:id/:token', resetPassword);

export default router;
