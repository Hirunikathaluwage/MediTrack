import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';

// LOGIN
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(404);
      throw new Error('Invalid admin email');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Incorrect password');
    }

    generateToken(req, res, admin._id);

    res.status(200).json({
      message: 'Admin login successful',
      adminId: admin._id,
      name: admin.name,
      email: admin.email
    });
  } catch (error) {
    next(error);
  }
  
};

// REGISTER
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      res.status(409);
      throw new Error('Admin with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    generateToken(req, res, admin._id);

    res.status(201).json({
      message: 'Admin registered successfully',
      adminId: admin._id,
      name: admin.name,
      email: admin.email
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logoutAdmin = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true });
  res.status(200).json({ message: 'Admin logged out successfully' });
};

// GET PROFILE
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      res.status(404);
      throw new Error('Admin not found');
    }

    res.status(200).json({
      message: 'Admin profile retrieved',
      adminId: admin._id,
      name: admin.name,
      email: admin.email
    });
  } catch (error) {
    next(error);
  }
};
