import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaTrain,
  FaUser,
  FaCheckCircle,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, userName, train, travelers } = location.state || {};

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setError("All fields are required!");
      return;
    }

    setPaymentSuccess(true);
    setTimeout(() => navigate("/"), 5000); // Redirect after 5 sec
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h2 className="text-center text-dark fw-bold">
          Payment & Ticket Confirmation
        </h2>
        <p className="text-center text-muted">
          Secure your ticket with online payment
        </p>

        {!paymentSuccess ? (
          <div className="row">
            {/* Train & Traveler Details */}
            <div className="col-md-6">
              <div className="card shadow-sm p-3 border-0 rounded-3 bg-light">
                <h4 className="text-primary">
                  <FaTrain className="me-2" /> Train Details
                </h4>
                <p>
                  <strong>Name:</strong> {train.name}
                </p>
                <p>
                  <strong>From:</strong> {train.departure}
                </p>
                <p>
                  <strong>To:</strong> {train.arrival}
                </p>
                <p>
                  <strong>Date:</strong> {train.date}
                </p>
                <p>
                  <strong>Time:</strong> {train.time}
                </p>

                <h5 className="mt-4">
                  <FaUser className="me-2 text-success" /> Traveler Details
                </h5>
                <ul className="list-group">
                  {travelers.map((traveler, index) => (
                    <li key={index} className="list-group-item">
                      {traveler.name} - {traveler.age} - {traveler.gender}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payment Form */}
            <div className="col-md-6">
              <div className="card shadow-sm p-4 border-0 rounded-3">
                <h4 className="text-success">
                  <FaCreditCard className="me-2" /> Payment Details
                </h4>

                {error && <div className="alert alert-danger">{error}</div>}

                {/* Card Number */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Card Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark text-white">
                      <FaCreditCard />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="**** **** **** ****"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Expiry Date
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary text-white">
                        <FaCalendarAlt />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">CVV</label>
                    <div className="input-group">
                      <span className="input-group-text bg-info text-white">
                        <FaLock />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="***"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pay Now Button */}
                <button
                  className="btn btn-primary w-100 fw-bold"
                  onClick={handlePayment}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <FaCheckCircle size={80} className="text-success mb-3" />
            <h3 className="text-success">Payment Successful!</h3>
            <p>Your train ticket has been booked successfully.</p>

            {/* Ticket Details */}
            <div
              className="card shadow-sm p-4 mt-3 mx-auto border-0 rounded-3"
              style={{ maxWidth: "500px" }}
            >
              <h4 className="text-primary">
                <FaTrain className="me-2" /> Train Ticket
              </h4>
              <p>
                <strong>Passenger:</strong> {userName}
              </p>
              <p>
                <strong>Train:</strong> {train.name}
              </p>
              <p>
                <strong>From:</strong> {train.departure} → <strong>To:</strong>{" "}
                {train.arrival}
              </p>
              <p>
                <strong>Date & Time:</strong> {train.date}, {train.time}
              </p>
              <p>
                <strong>Travelers:</strong>
              </p>
              <ul className="list-group">
                {travelers.map((traveler, index) => (
                  <li key={index} className="list-group-item">
                    {traveler.name} - {traveler.age} - {traveler.gender}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
