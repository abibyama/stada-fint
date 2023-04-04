// import React from "react";
// import { Table } from "reactstrap";
// import { Booking } from "./types";
// import "../pages/BookingPage.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// interface Props {
//   bookings: Booking[];
// }

// const CompletedBooking: React.FC<Props> = ({ bookings }) => {

//   const sortedBookings = [...bookings].sort((a, b) => {
//     const dateA = new Date(a.date);
//     const dateB = new Date(b.date);
//     return dateA.getTime() - dateB.getTime();
//   });


//   return (
//     <div className="completed-booking-list">
//       <h2>Completed Bookings</h2>
//       <Table
//         bordered
//         striped
//         hover
//         size=""
//       >

//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Service Type</th>
//             <th>Cleaner</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedBookings.map((booking) => {
//             const date = new Date(booking.date);
//             return (
//               <tr key={booking._id}>
//                 <td>{date.toLocaleDateString()}</td>
//                 <td>{booking.time}</td>
//                 <td>{booking.serviceType}</td>
//                 <td>{booking.cleaner}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default CompletedBooking;


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

  const deleteMultipleBookings = async (ids: string[], deleteBooking: (id: string) => Promise<void>) => {
  try {
    // delete the selected bookings
    await Promise.all(ids.map((id) => deleteBooking(id)));
    
    // return a success message or perform any other actions you need to do after deletion
    console.log(`Deleted ${ids.length} bookings successfully!`);
    
  } catch (error) {
    // Handle the error if necessary
    console.error(`Error deleting bookings: ${error}`);
  }
};


 const handleDeleteSelectedBookings = async () => {
  // call the delete function for each selected booking
  await Promise.all(selectedBookings.map((id) => handleDelete(id)));
  // clear the selection
  setSelectedBookings([]);
  // refetch the bookings
  await fetchBookings();
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

