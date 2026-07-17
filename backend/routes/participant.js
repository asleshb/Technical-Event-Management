

import express from "express";
import db from "../db.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// ⭐ Fetch ALL registrations of the logged-in user
router.get("/registrations", isAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  const sql = `
    SELECT id, event_name, fullname, email, phone, created_at
    FROM registrations
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // ⭐ IMPORTANT RESPONSE FORMAT ⭐
    return res.json({
      success: true,
      total: results.length, // <-- TOTAL COUNT
      registrations: results, // <-- LIST OF EVENTS
    });
  });
});

export default router;
