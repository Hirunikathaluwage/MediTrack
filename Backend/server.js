import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import branchRoutes from "./routes/branchRoutes.js"; // adjust the path accordingly

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/prescription", prescriptionRoutes);
app.use("/branches", branchRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(5080, () => {
  console.log("Server started at http://localhost:5080");
});
