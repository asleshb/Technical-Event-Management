import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import ParticipantNavbar from "../components/ParticipantNavbar";

const Navbar = () => {
  const location = useLocation(); // ✅ moved inside component

  useEffect(() => {
    if (location.state?.selectedEvent) {
      setFormData((prev) => ({
        ...prev,
        event: location.state.selectedEvent,
      }));
    }
  }, [location]);

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="code-icon">{"</>"}</span> TechFest Portal
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
