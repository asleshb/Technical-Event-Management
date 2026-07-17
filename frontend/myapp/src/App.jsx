import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./index.css";

const App = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setFormData({ fullname: "", email: "", password: "", phone: "" });
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to server");
    }
  };

  return (
    <div>
      <Navbar />

      <section className="signup-page">
        <div className="signup-box">
          <h1>Create Account</h1>
          <p>Join TechFest and explore the world of innovation.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          {message && (
            <p style={{ color: "#28a745", marginTop: "10px" }}>{message}</p>
          )}

          <p className="login-redirect">
            Already have an account? <a href="#">Login here</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
