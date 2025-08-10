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

dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { scheduleSLAAlert } from './utils/slaChecker.js';

import customerRoutes from './routes/customerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import branchRoutes from './routes/BranchRoute.js';
import adminPrescriptionRoutes from './routes/AdminPresRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import prescriptionRoutes from './routes/PrescriptionRoute.js';
import reservationRoutes from "./routes/reservationRoutes.js"
import medicineroute from './routes/MedicineRoute.js';
import branchstockroute from './routes/BranchStockRoute.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import branchroute from './routes/BranchRoute.js';

connectDB();
const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reserve', reservationRoutes);
app.use("/api/medicines", medicineroute);
app.use("/api/branch", branchroute);
app.use("/branches", branchRoutes);
app.use("/api/branchstock", branchstockroute);
app.use("/prescription", prescriptionRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/adminprescription', adminPrescriptionRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  httpServer.listen(5080, () => {
    console.log('Server running on http://localhost:5080');
  });
}).catch((err) => console.log(err));


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
scheduleSLAAlert();

export { io };

