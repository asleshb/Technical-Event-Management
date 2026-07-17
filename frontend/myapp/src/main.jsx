import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Events from "./pages/Events.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import ParticipantDashboard from "./pages/ParticipantDashboard.jsx";
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx";
import Pregister from "./pages/Pregister.jsx";

import Contact from "./pages/Contact.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pregister" element={<Pregister />} />
        <Route
          path="/participant/dashboard"
          element={<ParticipantDashboard />}
        />

        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
