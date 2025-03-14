import express from 'express';
import mongoose from 'mongoose';
import router from './Routes/InquiryRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Other middleware

app.use("/Inquiries", router);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to database"))
.then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
.catch(err => {
    console.log(err);
});