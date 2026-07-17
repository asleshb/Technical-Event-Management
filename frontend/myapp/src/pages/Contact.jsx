import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! ✅");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <div className="contact-container">
        <div className="contact-card">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

          <div className="contact-info">
            <h3>Reach Us</h3>
            <p>📍 Mangalore, Karnataka</p>
            <p>📧 techfest@gmail.com</p>
            <p>📞 +91 9876543210</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
