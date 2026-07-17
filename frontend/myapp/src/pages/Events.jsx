
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Events.css";

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      category: "Development",
      title: "Hackathon",
      description:
        "24-hour coding marathon to build innovative solutions and prototypes.",
      date: "November 15, 2025",
      time: "9:00 AM - 9:00 AM (Next Day)",
      venue: "Main Auditorium",
    },
    {
      category: "Coding",
      title: "Code Sprint",
      description:
        "Fast-paced coding challenge to test your logic and problem-solving skills.",
      date: "November 20, 2025",
      time: "10:00 AM - 2:00 PM",
      venue: "Lab Block",
    },
    {
      category: "AI & ML",
      title: "AI Innovate",
      description:
        "Showcase your machine learning and AI models to solve real-world problems.",
      date: "November 25, 2025",
      time: "11:00 AM - 4:00 PM",
      venue: "Seminar Hall",
    },
    {
      category: "Robotics",
      title: "Robo Race",
      description:
        "Compete with your custom-built robots in a high-speed obstacle race.",
      date: "November 28, 2025",
      time: "1:00 PM - 5:00 PM",
      venue: "Ground Arena",
    },
    {
      category: "Gaming",
      title: "E-Sports Showdown",
      description:
        "Face off in competitive e-sports tournaments featuring popular titles.",
      date: "December 1, 2025",
      time: "3:00 PM - 8:00 PM",
      venue: "Auditorium 2",
    },
    {
      category: "Design",
      title: "UI/UX Challenge",
      description:
        "Show off your creative skills in crafting intuitive and modern user interfaces.",
      date: "December 3, 2025",
      time: "10:00 AM - 1:00 PM",
      venue: "Design Studio",
    },
  ];

  // Handle navigation to Register page
  const handleRegisterClick = (eventName) => {
    navigate("/register", { state: { selectedEvent: eventName } });
  };

  return (
    <>
      <Navbar />
      <div className="events-page">
        <div className="events-container">
          <div className="events-header">
            <h1>Technical Events</h1>
            <p>Explore and register for our exciting technical competitions</p>
          </div>

          <div className="events-grid">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <span className="event-category">{event.category}</span>
                <h2>{event.title}</h2>
                <p className="event-description">{event.description}</p>

                <div className="event-info">
                  <div>📅 {event.date}</div>
                  <div>⏰ {event.time}</div>
                  <div>📍 {event.venue}</div>
                </div>

                <button
                  className="register-btn"
                  onClick={() => handleRegisterClick(event.title)}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
