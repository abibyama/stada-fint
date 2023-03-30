import React from "react";
import { Table } from "reactstrap";
import { Booking } from "./types";

interface Props {
  bookings: Booking[];
}

const CompletedBooking: React.FC<Props> = ({ bookings }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Service Type</th>
          <th>Cleaner</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => {
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
  );
};

export default CompletedBooking;
