const express = require('express');
const router = express.Router();
const Booking = require('../models/booking-model');

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one booking
router.get('/bookings/:id', getBooking, (req, res) => {
  res.json(res.booking);
});

// Create one booking
router.post('/bookings', async (req, res) => {
  const { date, time, serviceType, cleaner } = req.body;

  try {
    const existingBooking = await Booking.findOne({ date, time, serviceType, cleaner });

    if (existingBooking) {
      return res.status(400).json({ message: 'This booking already exists' });
    }

    const booking = new Booking({
      date,
      time,
      serviceType,
      cleaner,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one booking
router.put('/bookings/:id', getBooking, async (req, res) => {
  if (res.booking) {
    if (req.body.date != null) {
      res.booking.date = req.body.date;
    }

    if (req.body.time != null) {
      res.booking.time = req.body.time;
    }

    if (req.body.serviceType != null) {
      res.booking.serviceType = req.body.serviceType;
    }

    if (req.body.cleaner != null) {
      res.booking.cleaner = req.body.cleaner;
    }

    if (req.body.complete != null) {
      res.booking.complete = req.body.complete;
    }

    try {
      const updatedBooking = await res.booking.save();
      res.json(updatedBooking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: 'Cannot find booking' });
  }
});

// Delete one booking
router.delete('/bookings/:id', getBooking, async (req, res) => {
  try {
    await res.booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single booking by ID
async function getBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking == null) {
      return res.status(404).json({ message: 'Cannot find booking' });
    }
    res.booking = booking;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
