import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medicineId: {
        type: Number,
        required : true,
    },

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

    qty: {
        type : String,
        required : true,
    },
    otc: {
        type : Boolean,
        required : false, // over the count .. kalin true.
    },
});


export const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;