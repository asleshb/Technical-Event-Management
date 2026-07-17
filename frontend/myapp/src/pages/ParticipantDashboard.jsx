import React, { useEffect, useState } from "react";
import ParticipantNavbar from "../components/ParticipantNavbar";
import Navbar from "../components/Navbar";
import "./ParticipantDashboard.css";

const ParticipantDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [totalRegs, setTotalRegs] = useState(0);
  const [loading, setLoading] = useState(true);

  // ⭐ Fetch user registrations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/participant/registrations",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await res.json();

        if (res.ok) {
          setTotalRegs(data.total);
          setRegistrations(data.registrations);
        } else {
          console.log("Not logged in or unauthorized");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ParticipantNavbar />
      <div className="dashboard-container">
        <section className="dashboard-content">
          <h1 className="dashboard-title">Participant Dashboard</h1>
          <p className="dashboard-subtitle">
            View and manage only your registered events
          </p>

          {/* ⭐ STATS */}
          <div className="stats-container">
            <div className="stat-card pink">
              <h3>Total Registrations</h3>
              <p className="stat-number">{totalRegs}</p>
              <span className="stat-icon">📅</span>
            </div>

            <div className="stat-card purple">
              <h3>Upcoming Events</h3>
              <p className="stat-number">0</p>
              <span className="stat-icon">⏱️</span>
            </div>

            <div className="stat-card blue">
              <h3>Completed Events</h3>
              <p className="stat-number">0</p>
              <span className="stat-icon">🏅</span>
            </div>
          </div>

          {/* ⭐ My Registered Events List */}
          <h2 className="section-heading">My Registered Events</h2>

          {registrations.length === 0 ? (
            <p>No events registered yet.</p>
          ) : (
            registrations.map((reg) => (
              <div className="event-card" key={reg.id}>
                <div className="event-header">
                  <h3>{reg.event_name}</h3>
                  <span className="status-badge">Confirmed</span>
                </div>

                <p className="event-id">
                  Registration ID: <b>#{reg.id}</b> • Registered on{" "}
                  {new Date(reg.created_at).toDateString()}
                </p>

                <div className="event-details">
                  <p>📅 Event Name: {reg.event_name}</p>
                  <p>📞 Phone: {reg.phone}</p>
                  <p>📧 Email: {reg.email}</p>
                </div>

                <div className="event-actions">
                  <button className="update-btn">Update</button>
                  <button className="cancel-btn">Cancel</button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
};

export default ParticipantDashboard;
