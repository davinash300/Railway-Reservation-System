import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTrain,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/bookings")
      .then((response) => response.json())
      .then((data) => {
        const userBookings = data.filter(
          (booking) => booking.userId === user?.id
        );
        setBookings(userBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [user, navigate]);

  return (
    <div className="container mt-4 mb-5">
      <h3 className="text-center fw-bold text-primary mb-4">
        <FaTrain className="me-2" /> My Bookings
      </h3>

      {bookings.length === 0 ? (
        <div className="alert alert-warning text-center">
          No bookings found.
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => {
            const train = booking.train;
            const trainName = train.name;
            const trainNumber = train.trainNumber || "N/A";
            const source = train.source || train.departure;
            const destination = train.destination || train.arrival;
            const departureTime = train.departureTime || train.time;
            const departureDate = train.departureDate || train.date;
            const status = booking.status || "Pending";

            return (
              <div className="col-md-6 mb-4" key={booking.id}>
                <div className="card border rounded shadow-sm p-3">
                  {/* Train Name */}
                  <h5 className="fw-bold text-dark mb-3">
                    <FaTrain className="me-2 text-primary" />
                    {trainName} ({trainNumber})
                  </h5>

                  {/* Route Info (Source → Destination) */}
                  <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
                    <span className="fw-bold">{source}</span>
                    <FaArrowRight className="text-secondary" />
                    <span className="fw-bold">{destination}</span>
                  </div>

                  {/* Date & Time */}
                  <p className="mt-3 mb-2">
                    <strong>📅 Date:</strong> {departureDate} | ⏰{" "}
                    <strong>Time:</strong> {departureTime}
                  </p>

                  {/* Travelers */}
                  <div>
                    <h6 className="fw-bold">
                      <FaUser className="me-2 text-secondary" /> Travelers:
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {booking.travelers.map((traveler, index) => (
                        <span
                          key={index}
                          className="badge bg-secondary text-white px-3 py-2"
                        >
                          {traveler.name} ({traveler.age}, {traveler.gender})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking Status */}
                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <strong>Status:</strong>
                    {status === "Confirmed" ? (
                      <span className="badge bg-success text-white px-3 py-2">
                        <FaCheckCircle className="me-1" /> Confirmed
                      </span>
                    ) : status === "Canceled" ? (
                      <span className="badge bg-danger text-white px-3 py-2">
                        <FaTimesCircle className="me-1" /> Canceled
                      </span>
                    ) : (
                      <span className="badge bg-warning text-dark px-3 py-2">
                        <FaClock className="me-1" /> Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
