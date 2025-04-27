import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            medicineId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            status: {
                type: String,
                enum: ['pending', 'available', 'notified'],
                default: 'pending'
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
