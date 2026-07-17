

import express from "express";
import db from "../db.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, (req, res) => {
  const { fullname, email, phone, event } = req.body;
  const userId = req.session.user.id; // ⭐ Get user ID from session

  if (!fullname || !email || !phone || !event) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO registrations (user_id, fullname, email, phone, event_name)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [userId, fullname, email, phone, event], (err, result) => {
    if (err) {
      console.error("Error inserting registration:", err);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(200).json({ message: "Registration successful!" });
  });
});

export default router;
