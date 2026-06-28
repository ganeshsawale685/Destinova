import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Api from "../Api";
import { AdminContext } from "./AdminLayout";

const Bookings = () => {

 const {bookings,users} = useContext(AdminContext)
 console.log(bookings)
  const [selectedBooking, setSelectedBooking] = useState(null);
  

  return (
    <div className="container-fluid">

      <h2 className="mb-4">Bookings</h2>


      <div className="card p-3">
        <table className="table table-hover">

          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Package ID</th>
              <th>Persons</th>
              <th>Total Price</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((b, i) => (
              <tr 
                key={b.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedBooking(b)}
              >
                <td>{i + 1}</td>
                <td>{b.userId}</td>
                <td>{b.packageId}</td>
                <td>{b.persons}</td>
                <td className="text-success">₹{b.totalAmount}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

  
      {selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ width: "450px" }}>

            <h4 className="mb-3">Booking Details</h4>

            <p><strong>Package ID:</strong> {selectedBooking.packageId}</p>
            <p><strong>Persons:</strong> {selectedBooking.persons}</p>
            <p><strong>Total Price:</strong> ₹{selectedBooking.totalAmount}</p>
            <p><strong>Payment Status:</strong> {selectedBooking.status}</p>
            <p><strong>Trip-Date:</strong> {selectedBooking.travelDate}</p>
            

            <div className="text-end mt-3">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Bookings;