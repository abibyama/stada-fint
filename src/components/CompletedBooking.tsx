import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import { Booking } from "./types";
import "../pages/BookingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  bookings: Booking[];
  handleDelete: (id: string) => Promise<void>;
  fetchBookings: () => Promise<void>;
}

const CompletedBooking: React.FC<Props> = ({ bookings, handleDelete, fetchBookings }) => {
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [bookings2, setBookings] = useState<Booking[]>([]);

 

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const handleSelectBooking = (id: string) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(selectedBookings.filter((bookingId) => bookingId !== id));
    } else {
      setSelectedBookings([...selectedBookings, id]);
    }
  };


const handleDeleteSelectedBookings = async (event: React.MouseEvent<HTMLButtonElement>) => {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Call the delete function for each selected booking
  await Promise.all(selectedBookings.map((id) => handleDelete(id)));

  // Get the checked boxes that were selected
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

  // Remove the parent <tr> element of each selected checked box
  checkedBoxes.forEach((box) => {
    const row = box.closest('tr');
    if (row) {
      row.remove();
    }
  });
};



  return (
    <div className="completed-booking-list">
      <h2>Completed Bookings</h2>
      <Table bordered striped hover size="">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Service Type</th>
            <th>Cleaner</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedBookings.map((booking) => {
            const date = new Date(booking.date);
            return (
              <tr key={booking._id}>
                <td>{date.toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>{booking.serviceType}</td>
                <td>{booking.cleaner}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking._id)}
                    onChange={() => handleSelectBooking(booking._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table> 
      {selectedBookings.length > 0 && (
        <Button color="danger" onClick={handleDeleteSelectedBookings}>Delete Selected Bookings</Button>
      )}
    </div>
  );
};

export default CompletedBooking;

