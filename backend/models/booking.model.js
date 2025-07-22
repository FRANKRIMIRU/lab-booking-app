import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  testType: {
    type: String,
    required: [true, "Test type is required"],
    enum: ['Blood Test', 'COVID-19 Test', 'Urine Analysis', 'Other'],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
