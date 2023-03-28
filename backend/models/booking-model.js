const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    dateFormat: "YYYY-MM-DD",
  },
  time: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['Fönstertvätt', 'Basic Städning', 'Topp Städning', 'Diamant Städning'],
    default: 'Fönstertvätt',
    required: true,
  },
  cleaner:{
    type: String,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;