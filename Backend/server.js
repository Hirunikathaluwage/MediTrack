import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';  // ✅ Added
import { Server } from 'socket.io';   // ✅ Added

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// ✅ NEW: Import SLA Scheduler
import { scheduleSLAAlert } from './utils/slaChecker.js';

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

// ✅ Start SLA Checker (Cron-based Alerts)
scheduleSLAAlert();

// ✅ Create HTTP Server
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

// ✅ Setup Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN || 'http://localhost:5173',
    credentials: true
  }
});

// ✅ Handle WebSocket connection
io.on('connection', (socket) => {
  console.log('🟢 New Client Connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Client Disconnected:', socket.id);
  });
});

// ✅ Export io to use in controllers (like inquiryController.js)
export { io };

// ✅ Start Express + WebSocket server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
