import React from "react";
import { Table, Button } from "reactstrap";
import { Booking } from "./types";

interface Props {
  bookings: Booking[];
  handleDelete: (id: string) => Promise<void>;
  fetchBookings: () => Promise<void>;
  markBookingCompleted: (id: string) => Promise<void>;
}

const BookingList: React.FC<Props> = ({ bookings, handleDelete, markBookingCompleted }) => {
  const handleCompleteBooking = async (id: string) => {
    await markBookingCompleted(id);
  };

  return (
    <>
      <h2>Pending Bookings</h2>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Service Type</th>
            <th>Cleaner</th>
            <th></th>
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
                <td>
                  <Button
                    color="success"
                    onClick={() => {
                      handleCompleteBooking(booking._id);
                    }}
                  >
                    Complete
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={async () => {
                      await handleDelete(booking._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BookingList;
