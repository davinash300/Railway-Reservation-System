import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa"; // Import icons

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate Email & Phone
    const isEmailValid = email.includes("@");
    const isPhoneValid = /^\d{10}$/.test(phoneNumber);

    if (!isEmailValid) {
      setError("Enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!isPhoneValid) {
      setError("Enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const newUser = {
        name,
        email,
        password,
        phoneNumber,
        role: "USER", // Default role
      };

      const response = await registerUser(newUser);
      if (response) {
        navigate("/login"); // Redirect to Login Page
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg rounded" style={{ width: "25rem" }}>
        <h3 className="text-center text-primary fw-bold mb-3">Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Full Name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Email Address"
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaPhone />
              </span>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter 10-digit Phone Number"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Already have an account? Login */}
          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
