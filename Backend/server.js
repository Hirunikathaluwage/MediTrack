import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './dbconnect.js';

import medicineroute from './routes/MedicineRoute.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/medicines", medicineroute);

app.get("/", (req, res) => {
    res.send("API is running...");
});

console.log(process.env.MONGO_URI);

app.listen(5080, () => {
    connectDB();
    console.log("Server started at http://localhost:5080 Hello");
});

