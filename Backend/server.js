

import express from 'express';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js"
import { fileURLToPath } from 'url';

import { connectDB } from './dbconnect.js';
import medicineroute from './routes/MedicineRoute.js';
import branchstockroute from './routes/BranchStockRoute.js';


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
app.use("/api/branch", branchroute);
app.use("/api/branchstock", branchstockroute);
app.use("/api/prescription", PrescriptionRoute);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5080, () => console.log('Server running on port 5080'));
}).catch((err) => console.log(err));








