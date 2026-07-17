
import React, { useState } from "react";
import ParticipantNavbar from "../components/ParticipantNavbar";
import "./pregister.css";

const Pregister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    event: "",
  });

  const events = [
    "Hackathon",
    "Code Sprint",
    "AI Innovate",
    "Robo Race",
    "E-Sports Showdown",
    "UI/UX Challenge",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        credentials: "include", // ⭐ REQUIRED
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setFormData({ fullname: "", email: "", phone: "", event: "" });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <>
      <ParticipantNavbar />

      <div className="register-page">
        <div className="register-header">
          <h1>Event Registration</h1>
          <p>Fill in the details below to register for a technical event</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Full Name *</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Select Event *</label>
          <select
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
          >
            <option value="">-- Select an Event --</option>
            {events.map((ev, index) => (
              <option key={index} value={ev}>
                {ev}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            Submit Registration
          </button>
        </form>
      </div>
    </>
  );
};

export default Pregister;
