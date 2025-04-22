import jwt from 'jsonwebtoken';
import Customer from '../models/customer.model.js';
import Admin from '../models/admin.model.js';

/**
 * Protect routes for Customers
 */
const protectCustomer = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401);
      throw new Error('Authentication failed: No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.userId).select('-password');

    if (!customer) {
      res.status(401);
      throw new Error('Authentication failed: Customer not found');
    }

    req.user = customer;      // Attach to request as req.user
    req.user.role = 'customer'; // Add role explicitly (used by role middleware)
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Protect routes for Admins
 */
const protectAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401);
      throw new Error('Authentication failed: No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.userId).select('-password');

    if (!admin) {
      res.status(401);
      throw new Error('Authentication failed: Admin not found');
    }

    req.user = admin;       // Attach to request as req.user for consistency
    req.user.role = 'admin';
    next();
  } catch (error) {
    next(error);
  }
};

export { protectCustomer, protectAdmin };
