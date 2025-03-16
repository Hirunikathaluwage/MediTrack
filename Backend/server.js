import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './dbconnect.js';

import medicineroute from './routes/MedicineRoute.js';
import branchroute from './routes/BranchRoute.js';
import branchstockroute from './routes/BranchStockRoute.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/medicines", medicineroute);
app.use("/api/branch", branchroute);
app.use("/api/branchstock", branchstockroute)

app.get("/", (req, res) => {
    res.send("API is running...");
});

console.log(process.env.MONGO_URI);

app.listen(5080, () => {
    connectDB();
    console.log("MediTrack Server started at http://localhost:5080");
});

