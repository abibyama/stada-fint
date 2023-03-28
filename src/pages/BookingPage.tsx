import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingList from "../../components/BookingList/BookingList";
import AddBookingForm from "../../components/AddBookingForm/AddBookingForm"
import { Booking } from "../../components/types";

const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


 const addBooking = async (booking: Booking) => {
  try {
    const existingBooking = bookings.find(
      (b) =>
        b.date === booking.date &&
        b.time === booking.time &&
        b.serviceType === booking.serviceType &&
        b.cleaner === booking.cleaner
    );
    if (existingBooking) {
      // If a booking with the same information already exists, do not add it again
      console.log("This booking already exists");
      return;
    }

    const response = await axios.post(
      "http://localhost:4000/api/bookings",
      booking
    );
    setBookings([...bookings, response.data]);
  } catch (error) {
    console.log(error);
  }
};


  const deleteBooking = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      await fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Bookings</h1>
      <AddBookingForm addBooking={addBooking} />
      <BookingList bookings={bookings} handleDelete={handleDelete} fetchBookings={fetchBookings} />
    </div>
  );
};

export default BookingPage;
