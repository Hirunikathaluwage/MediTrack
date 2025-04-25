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
import { scheduleSLAAlert } from './utils/slaChecker.js'; // 🕒 SLA Alert Scheduler
import { scheduleAutoCloseInquiries } from './utils/autoCloseInquiries.js'; // 🕒 Auto-Close Scheduler

// Routes
import customerRoutes from './routes/customerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

// ✅ Load environment variables
dotenv.config();
console.log('🟢 Starting MediTrack server...');

// ✅ Connect to MongoDB
connectDB();

// ✅ Start Cron Jobs
scheduleSLAAlert();           // ⏱ SLA Alert every 10 mins
scheduleAutoCloseInquiries(); // ⏳ Auto-Close Pending Inquiries daily at 2AM

const app = express();

// ✅ Middleware for parsing JSON, URL-encoded data and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// ✅ Ensure "uploads" folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Serve static files
app.use('/uploads', express.static(uploadsDir));

// ✅ Define Routes
app.use('/api/customers', customerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);

// ✅ Error handling middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
