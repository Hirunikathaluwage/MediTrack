import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  },
  avatar: {
    type: String,
    default: '' // e.g. '/uploads/avatar123.jpg'
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
