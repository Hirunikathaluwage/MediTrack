import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        match: /\S+@\S+\.\S+/
    },
    subject: {
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
        minlength: 20
    },
    category: {
        type: String,
        enum: ['General', 'Technical Support', 'Payment Issue', 'Delivery Issue', 'Billing', 'Product Issue', 'Other'], 
        default: 'General'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    attachment: {
        type: String, // Store file path or URL if uploaded
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;


// meka hri