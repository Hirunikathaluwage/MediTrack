import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Routes
import customerRoutes from './routes/customerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

// ✅ Load .env variables
dotenv.config();
console.log('🟢 Starting MediTrack server...');

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware for request parsing and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Allow frontend to talk to backend
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// ✅ Ensure uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Serve static files (profile photos, attachments)
app.use('/uploads', express.static(uploadsDir));

// ✅ API Route handlers
app.use('/api/customers', customerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);

// ✅ Error handling middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
