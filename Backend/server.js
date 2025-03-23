import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Cross-Origin Resource Sharing
import mongoose from 'mongoose';
import deliveryRoutes from './routes/deliveryRoutes.js'
import DeliveryPersonRoutes from './routes/deliveryPersonRoutes.js';
import deliveryFeedbackRoutes from './routes/deliveryFeedbackRoutes.js';

dotenv.config(); // Load .env file


const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("MongoDB Connection Error:", error));


app.use('/api/delivery', deliveryRoutes);
app.use('/api/delivery-persons', DeliveryPersonRoutes)
app.use('/api/feedbacks', deliveryFeedbackRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.connection.once("open", async () => {
    console.log(`Connected to MongoDB Database: ${mongoose.connection.db.databaseName}`);

    // Log all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in Database:", collections.map(col => col.name));
});