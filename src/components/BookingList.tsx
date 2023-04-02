import React from "react";
import { Table, Button } from "reactstrap";
import { Booking } from "./types";
import "../pages/BookingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';


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

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });



  return (
    <div className="booking-list">
      <h2>Pending Bookings</h2>
      <Table
        borderless
        hover
        size=""
      >
        <thead>
          <tr>
            <th scope="row">Date</th>
            <th scope="row">Time</th>
            <th scope="row">Service Type</th>
            <th scope="row">Cleaner</th>
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
                  <Button
                    color="success"
                    onClick={() => {
                      handleCompleteBooking(booking._id);
                    }}
                  >
                    Complete
                  </Button>{" "}
                  <Button
                    onClick={async () => {
                      await handleDelete(booking._id);
                    }}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545", }} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {bookings.length === 0 && <div className="no-bookings">No pending bookings</div>}
    </div>
  );
};

export default BookingList;
