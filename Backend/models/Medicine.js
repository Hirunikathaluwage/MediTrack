import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },

    genericName: {
        type : String,
        required : true,
    },

    price: {
        type : Number,
        required : true,
    },

    unit: {
        type : String,
        required : true,
    },

    description: {
        type : String,
        required : true,
    },

    expireDate: {
        type : Date,
        required : true,
    },

    manufactureDate: {
        type : Date,
        required : true,
    },
});

//module.exports = mongoose.model('Medicine' , medicineSchema, 'medicine ');

export const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;