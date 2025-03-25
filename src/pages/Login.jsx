import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be email or mobile
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for button loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if identifier is email or mobile
      const isEmail = identifier.includes("@");
      const isMobile = /^\d{10}$/.test(identifier);

      if (!isEmail && !isMobile) {
        setError("Enter a valid Email.");
        setLoading(false);
        return;
      }

      const user = await loginUser(identifier, password);
      if (user) {
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
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
        <h3 className="text-center text-primary fw-bold mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email / Mobile Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email or Mobile</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <FaEnvelope />
              </span>
              <input
                type="text"
                className="form-control"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="Enter Email or Mobile"
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

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register & Forgot Password Links */}
          <div className="text-center mt-3">
            <a href="/register" className="text-decoration-none">
              Create an Account
            </a>{" "}
            |
            <a href="/forgot-password" className="text-decoration-none">
              {" "}
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
