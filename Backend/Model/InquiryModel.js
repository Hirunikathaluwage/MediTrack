import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    category: {
        type: String,
        enum: ['General', 'Technical Support', 'Billing', 'Other'],
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
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
