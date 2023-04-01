import React, { useState, useEffect } from "react";
import { Params, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingList from "../components/BookingList";
import CompletedBooking from "../components/CompletedBooking";
import AddBookingForm from "../components/AddBookingForm"
import { Booking } from "../components/types";
import "./BookingPage.css";

const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
  const { customerName } = useParams<Params>();
  const navigate = useNavigate();



  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Redirect to landing page if customer name is not available in URL parameters
    if (!customerName) {
      navigate("/");
    } else {
      const fetchBookings = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/bookings");
          setBookings(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBookings();
    }
  }, [customerName, navigate]);

  useEffect(() => {
    const filteredCompletedBookings = bookings.filter(
      (booking) => booking.completed === true
    );
    setCompletedBookings(filteredCompletedBookings);
  }, [bookings]);




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

  const markBookingCompleted = async (id: string) => {
    try {
      await axios.patch(`http://localhost:4000/api/bookings/${id}`, {
        completed: true,
      });
      const updatedBookings = bookings.map((booking) => {
        if (booking._id === id) {
          return { ...booking, completed: true };
        }
        return booking;
      });
      setBookings(updatedBookings);
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

  const filteredPendingBooking = bookings.filter((booking) => !booking.completed)
  const filteredCompletedBookings = bookings.filter((booking) => booking.completed === true);
  return (
    <div id="booking-page">
      <h1>Welcome, {customerName}.</h1>
      <h2>Please Book Your Appointment</h2>
      <AddBookingForm addBooking={addBooking} />
      <BookingList
        bookings={filteredPendingBooking}
        handleDelete={handleDelete}
        fetchBookings={fetchBookings}
        markBookingCompleted={markBookingCompleted} />
      <CompletedBooking bookings={filteredCompletedBookings} />
    </div>
  );
};

export default BookingPage;
