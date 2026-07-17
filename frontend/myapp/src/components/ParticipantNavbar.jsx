import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ParticipantNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="code-icon">{"</>"}</span> TechFest Portal
      </div>
      <ul className="nav-links">
        {/* 🔥 New Home Option */}
        <li>
          <Link to="/participant/dashboard">Home</Link>
        </li>

        <li>
          <Link to="/events">Events</Link>
        </li>

        <li>
          <Link to="/pregister">Register</Link>
        </li>

        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default ParticipantNavbar;
