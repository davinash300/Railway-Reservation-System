import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { createBooking } from "../services/bookingService";
import {
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaPlusCircle,
  FaArrowRight,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const TravelerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const train = location.state?.train || {};
  const user = JSON.parse(localStorage.getItem("user"));

  const [travelers, setTravelers] = useState([
    {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      email: "",
      phoneNumber: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const addTraveler = () => {
    setTravelers([
      ...travelers,
      {
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        email: "",
        phoneNumber: "",
      },
    ]);
  };

  const handleChange = (index, event) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index][event.target.name] = event.target.value;
    setTravelers(updatedTravelers);
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const passengerResponses = await Promise.all(
        travelers.map(async (traveler) => {
          const response = await axios.post(
            "http://localhost:9090/api/passengers",
            traveler
          );
          return response.data; // Get the saved passenger data
        })
      );

      const passengerIds = passengerResponses.map((p) => p.id);

      const bookingData = {
        userId: user.id,
        userName: user.name,
        train,
        travelers: passengerIds, // Store only passenger IDs in booking
      };

      await createBooking(bookingData);
      navigate("/booking-payment", { state: bookingData });
    } catch (error) {
      console.error("Error storing passenger data:", error);
      alert("Failed to store passenger data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0 p-4 rounded-4 bg-light">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark">
            <FaUser className="me-2 text-primary" /> Traveler Details
          </h3>
          <p className="text-muted">
            Enter details for all passengers traveling on this booking.
          </p>
        </div>

        {/* Traveler Form */}
        <div className="row">
          {travelers.map((traveler, index) => (
            <div className="col-md-12 mb-3" key={index}>
              <div className="card border-0 shadow-sm p-3 rounded-3">
                <div className="row g-3 align-items-center">
                  {/* First Name */}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark text-white">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        name="firstName"
                        value={traveler.firstName}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name"
                      name="lastName"
                      value={traveler.lastName}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>

                  {/* Age */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold">Age</label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary text-white">
                        <FaCalendarAlt />
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter age"
                        name="age"
                        value={traveler.age}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold">Gender</label>
                    <div className="input-group">
                      <span className="input-group-text bg-info text-white">
                        <FaVenusMars />
                      </span>
                      <select
                        className="form-control"
                        name="gender"
                        value={traveler.gender}
                        onChange={(e) => handleChange(index, e)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      value={traveler.email}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      name="phoneNumber"
                      value={traveler.phoneNumber}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-dark fw-bold px-4 py-2 rounded-3"
            onClick={addTraveler}
          >
            <FaPlusCircle className="me-2" /> Add Traveler
          </button>
          <button
            className="btn btn-primary fw-bold px-4 py-2 rounded-3"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                Proceed to Booking <FaArrowRight className="ms-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelerDetails;
