import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import orderRoutes from './routes/orderRoutes.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Altas"))
    .catch((error) => console.error("MongoDB Connection Error:", error));

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

