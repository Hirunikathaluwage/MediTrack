import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';  
import { Server } from 'socket.io';   
 
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js"
 
import medicineroute from './routes/MedicineRoute.js';
import branchstockroute from './routes/BranchStockRoute.js';
 
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
 
// NEW: Import SLA Scheduler
import { scheduleSLAAlert } from './utils/slaChecker.js';
 
// Routes
import customerRoutes from './routes/customerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
 
 
import deliveryRoutes from './routes/deliveryRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
 
// Load .env variables
dotenv.config();
console.log('Starting MediTrack server...');
 
//  Connect to MongoDB
connectDB();
 
const app = express();
app.use(cors());
app.use(express.json());
 
// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reserve', reservationRoutes);
app.use("/api/medicines", medicineroute);
app.use("/api/branch", branchRoutes);
app.use("/api/branchstock", branchstockroute);
app.use("/api/prescription", prescriptionRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/inquiries', inquiryRoutes);
 
 
app.use('/api/deliveries', deliveryRoutes);
 
app.use('/api/ratings', ratingRoutes);
 
app.use('/api/drivers', driverRoutes);
 
 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5080, () => console.log('Server running on port 5080'));
}).catch((err) => console.log(err));
 
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  credentials: true
}));
 
 
app.use(notFound);
app.use(errorHandler);
 
scheduleSLAAlert();
 
// Create HTTP Server
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
 
 
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN || 'http://localhost:5173',
    credentials: true
  }
});
 
 
io.on('connection', (socket) => {
  console.log('New Client Connected:', socket.id);
 
  socket.on('disconnect', () => {
    console.log('Client Disconnected:', socket.id);
  });
});
 
export { io };
 
httpServer.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});