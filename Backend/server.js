import express from 'express';
import mongoose from 'mongoose';
import Inquiry from './Model/InquiryModel.js';
import router from './Routes/InquiryRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());




// Enable CORS
app.use(cors());

// Ensure uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Other middleware

app.use("/api/inquiries", router);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../Frontend/dist')));



app.use("/api/auth",authRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to database"))
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.log(err);
});