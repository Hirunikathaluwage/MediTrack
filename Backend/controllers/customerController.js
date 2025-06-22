import Customer from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import { transporter } from '../utils/emailConfig.js';

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

// UPDATE PROFILE WITH AVATAR
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, age } = req.body;
    const user = await Customer.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.age = age || user.age;

    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      userId: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      phoneNumber: updatedUser.phoneNumber,
      age: updatedUser.age,
      avatar: updatedUser.avatar || ''
    });
  } catch (error) {
    next(error);
  }
};

// PASSWORD RESET REQUEST
export const resetPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Customer.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m'
    });

    const resetLink = `https://meditrack-reset.com/reset-password/${user._id}/${token}`;

    await transporter.sendMail({
      from: `"MediTrack Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: '🔐 Password Reset',
      html: `
        <p>Hello ${user.name},</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
        <p>This link will expire in 15 minutes.</p>
      `
    });

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id: userId, token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.userId !== userId) {
      res.status(401);
      throw new Error('Invalid or expired reset token');
    }

    const user = await Customer.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    next(error);
  }
};
