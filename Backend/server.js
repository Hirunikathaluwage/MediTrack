import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


// import medicineRoutes from './routes/medicineRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/medicines', medicineRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/branches", branchRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5080, () => console.log('Server running on port 5080'));
}).catch((err) => console.log(err));

