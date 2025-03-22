import express from 'express';
import mongoose from 'mongoose';
import Inquiry from './Model/InquiryModel.js';
import router from './Routes/InquiryRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Ensure uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, path) => {
    res.setHeader('Content-Disposition', 'inline');
  }
}));

app.use("/api/inquiries", router);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
function connectWithRetry() {
    if (!mongoURI) {
        console.error('MongoDB connection string is not defined.');
        return;
    }
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            const PORT = process.env.PORT || 5001; 
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err.stack); 
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();


