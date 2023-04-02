import React from "react";
import { Table } from "reactstrap";
import { Booking } from "./types";
import "../pages/BookingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
interface Props {
  bookings: Booking[];
}

const CompletedBooking: React.FC<Props> = ({ bookings }) => {

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });


  return (
    <div className="completed-booking-list">
      <h2>Completed Bookings</h2>
      <Table
        bordered
        striped
        hover
        size=""
      >

        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Service Type</th>
            <th>Cleaner</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CompletedBooking;
