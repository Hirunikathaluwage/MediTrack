
const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const cors = require('cors');
//const multer = require('multer')
//const path =require('path')
//const vision = require('@google-cloud/vision');
const app = express();
const prescriptionRoutes = require("./routes/prescriptionRoutes");
dotenv.config();


app.use(cors());
app.use(express.json());
app.use("/prescription", prescriptionRoutes);
//app.use("/files",express.static("files"));


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));



/*const storage = multer.diskStorage({
    destination: function (req,file, cb) {

        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname);
    },

})

const Upload = multer({
    storage:storage
}) */


app.listen(5080, () => {
    console.log("Server started at http://localhost:5080 Hello");
});
