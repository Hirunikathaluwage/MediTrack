import express from 'express';
import multer from 'multer';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  resetPasswordRequest,
  resetPassword
} from '../controllers/customerController.js';
import { protectCustomer } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Multer file storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// ✅ Protected customer routes
router.get('/profile', protectCustomer, getUserProfile);
router.put('/profile', protectCustomer, upload.single('avatar'), updateUserProfile);

// ✅ Password recovery
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password/:id/:token', resetPassword);

export default router;
