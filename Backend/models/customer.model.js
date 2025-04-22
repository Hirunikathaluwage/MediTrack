import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  address: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('Customer', customerSchema);
