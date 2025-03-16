import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/prescription", prescriptionRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(5080, () => {
  console.log("Server started at http://localhost:5080");
});
