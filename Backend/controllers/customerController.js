import Customer from '../models/users.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Customer.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('Invalid email. Please check and try again.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid password. Please try again.');
    }

    generateToken(req, res, user._id);

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      age: user.age,
      avatar: user.avatar || ''
    });
  } catch (error) {
    next(error);
  }
};

// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, age } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error('User already exists with this email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Customer.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      age
    });

    generateToken(req, res, user._id);

    res.status(201).json({
      message: 'Registration successful. Welcome!',
      userId: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      age: user.age,
      avatar: user.avatar || ''
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict' });
  res.status(200).json({ message: 'Logout successful' });
};

// GET PROFILE
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      message: 'User profile retrieved',
      userId: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      age: user.age,
      avatar: user.avatar || ''
    });
  } catch (error) {
    next(error);
  }
};

