import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import { scheduleSLAAlert } from './utils/slaChecker.js';

import customerRoutes from './routes/customerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

import branchRoutes from "./routes/branchRoutes.js"; 
import PrescriptionRoute from './routes/PrescriptionRoute.js';
import adminPrescriptionRoutes from './routes/AdminPresRoutes.js';
import reportRoutes  from './routes/reportRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();
console.log('Starting MediTrack server...');

connectDB();

app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  credentials: true
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));


app.use('/api/customers', customerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);


app.use(notFound);
app.use(errorHandler);


scheduleSLAAlert();


const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

//  Setup Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN || 'http://localhost:5173',
    credentials: true
  }
});


io.on('connection', (socket) => {
  console.log(' New Client Connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client Disconnected:', socket.id);
  });
});


export { io };

httpServer.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use("/branches", branchRoutes);
app.use("/prescription", PrescriptionRoute);
app.use('/adminprescription', adminPrescriptionRoutes);
app.use('/api/reports', reportRoutes);




mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(5080, () => {
  console.log("Server started at http://localhost:5080");
});
