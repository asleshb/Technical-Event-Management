
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Login.css";
import LoginForm from "../components/LoginForm"; // Popup component

const Login = () => {
  const [showParticipantLogin, setShowParticipantLogin] = useState(false);
  const [showOrganizerLogin, setShowOrganizerLogin] = useState(false);

  return (
    <>
      <Navbar />
      <div className="login-portal-page">
        <div className="login-portal-container">
          <h1>Login Portal</h1>
          <p>Select your user type to continue</p>
                           v
          <div className="login-portal-grid">
            {/* Participant Card */}
            <div className="portal-card">
              <div className="portal-icon participant">
                <i className="fas fa-user"></i>
              </div>
              <h2>Participant</h2>
              <p>
                Access your registered events, view schedules, and check results
              </p>
              <button
                className="portal-btn participant-btn"
                onClick={() => setShowParticipantLogin(true)}
              >
                Login as Participant
              </button>
            </div>

            {/* Organizer Card */}
            <div className="portal-card">
              <div className="portal-icon organizer">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h2>Organizer</h2>
              <p>
                Manage events, view registrations, assign venues, and publish
                results
              </p>
              <button
                className="portal-btn organizer-btn"
                onClick={() => setShowOrganizerLogin(true)}
              >
                Login as Organizer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Login Forms */}
      {showParticipantLogin && (
        <LoginForm
          userType="participant"
          onClose={() => setShowParticipantLogin(false)}
        />
      )}

      {showOrganizerLogin && (
        <LoginForm
          userType="organizer"
          onClose={() => setShowOrganizerLogin(false)}
        />
      )}
    </>
  );
};

export default Login;
