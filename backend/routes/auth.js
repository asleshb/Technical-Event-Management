// import express from "express";
// import db from "../db.js";

// const router = express.Router();

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

//   db.query(sql, [email, password], (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res
//         .status(500)
//         .json({ success: false, message: "Database error" });
//     }

//     if (results.length > 0) {
//       res.json({ success: true, user: results[0] });
//     } else {
//       res.json({ success: false, message: "Invalid email or password" });
//     }
//   });
// });

// export default router;

import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      const user = results[0];

      // ⭐ SAVE USER SESSION HERE
      req.session.user = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      };

      console.log("Session Created:", req.session.user);

      return res.json({
        success: true,
        message: "Login successful",
        user: req.session.user,
      });
    }

    // Wrong email/password
    res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  });
});

export default router;
