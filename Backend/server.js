

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";



import branchRoutes from "./routes/branchRoutes.js"; 
import PrescriptionRoute from './routes/PrescriptionRoute.js';
import adminPrescriptionRoutes from './routes/AdminPresRoutes.js';
import reportRoutes  from './routes/reportRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173',
  credentials: true
}));
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
