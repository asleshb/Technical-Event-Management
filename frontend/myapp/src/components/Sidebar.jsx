import React from "react";
import "./Sidebar.css";

export default function Sidebar({ selected, setSelected }) {
  return (
    <div className="sidebar-box">
      <h2 className="side-title">TechFest Admin</h2>

      <div className="side-menu">
        <button
          className={
            selected === "dashboard" ? "side-btn active-side" : "side-btn"
          }
          onClick={() => setSelected("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={
            selected === "events" ? "side-btn active-side" : "side-btn"
          }
          onClick={() => setSelected("events")}
        >
          Events
        </button>

        <button
          className={
            selected === "participants" ? "side-btn active-side" : "side-btn"
          }
          onClick={() => setSelected("participants")}
        >
          Participants
        </button>
      </div>
    </div>
  );
}
