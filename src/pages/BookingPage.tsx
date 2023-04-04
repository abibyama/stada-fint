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
  const [message, setMessage] = useState("");


  const getBookingsFromLocalStorage = () => {
    const bookings = localStorage.getItem("bookings");
    return bookings ? JSON.parse(bookings) : [];
  };


  const fetchBookings = async () => {
    try {
      let bookings = getBookingsFromLocalStorage();
      if (bookings.length === 0) {
        const response = await axios.get("http://localhost:4000/api/bookings");
        bookings = response.data;
        localStorage.setItem("bookings", JSON.stringify(bookings));
      }
      setBookings(bookings);
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
  }, [bookings])


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
        console.log("This booking already exists");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:4000/api/bookings",
        booking
      );
      const newBooking = response.data;
      setBookings([...bookings, newBooking]);
      localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
      setMessage("Bokade denna "); 
    } catch (error) {
      console.log(error);
      setMessage("Blev inte bokad, försök igen"); 
    }
  };
  



/*
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
      const newBooking = response.data;
      setBookings([...bookings, newBooking]);
      localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
    } catch (error) {
      console.log(error);
    }
  };*/

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
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/bookings/${id}`);
      const updatedBookings = bookings.filter((booking) => booking._id !== id);
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
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
      <div className="message">{message}</div>
      <BookingList
        bookings={filteredPendingBooking}
        handleDelete={handleDelete}
        fetchBookings={fetchBookings}
        markBookingCompleted={markBookingCompleted} />
      <CompletedBooking bookings={filteredCompletedBookings}
        handleDelete={handleDelete}
        fetchBookings={fetchBookings}
      />
    </div>
  );
};

export default BookingPage;
