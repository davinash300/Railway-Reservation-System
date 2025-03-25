import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TrainSearch from "./pages/TrainSearch";
import Login from "./pages/Login";
import TravelerDetails from "./pages/TravelerDetails";
import BookingConfirmation from "./pages/PaymentPage";
import MyBookings from "./pages/MyBookings";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile"; // Import Profile Page
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { getSessionUser } from "./services/authService";
import PaymentPage from "./pages/PaymentPage";
import Register from "./pages/Register";

function App() {
  const user = getSessionUser();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="container-fluid">
      {/* Show Navbar except on Login Page */}
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<TrainSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Protected Routes - Require User Login */}
        <Route
          path="/traveler-details"
          element={user ? <TravelerDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking-payment"
          element={user ? <PaymentPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-bookings"
          element={user ? <MyBookings /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking"
          element={user ? <Booking /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* Show Footer except on Login Page */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
