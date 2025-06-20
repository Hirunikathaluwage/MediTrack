// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors'; // Import CORS
// import { connectDB } from './dbconnect.js';

import medicineroute from './routes/MedicineRoute.js';
import branchroute from './routes/BranchRoute.js';
import branchstockroute from './routes/BranchStockRoute.js';
import PrescriptionRoute from './routes/PrescriptionRoute.js';

// dotenv.config();

// const app = express();

// // Enable CORS for all requests
// app.use(cors());

// app.use(express.json());

app.use("/api/medicines", medicineroute);
app.use("/api/branch", branchroute);
app.use("/api/branchstock", branchstockroute);
app.use("/api/prescription", PrescriptionRoute);

// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// console.log(process.env.MONGO_URI);

// app.listen(5080, () => {
//     connectDB();
//     console.log("MediTrack Server started at http://localhost:5080");
// });
