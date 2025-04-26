import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';


import deliveryRoutes from './routes/deliveryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import branchRoutes from './routes/branchRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import driverRoutes from './routes/driverRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/deliveries', deliveryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/drivers', driverRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5080, () => console.log('Server running on port 5080'));
}).catch((err) => console.log(err));