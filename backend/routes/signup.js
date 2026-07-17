

import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { fullname, email, password, phone } = req.body;

  if (!fullname || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql =
    "INSERT INTO users (fullname, email, password, phone) VALUES (?, ?, ?, ?)";

  // db.query(sql, [fullname, email, password, phone], (err, result) => {
  //   if (err) {
  //     console.error("❌ Database insert error:", err);
  //     return res
  //       .status(500)
  //       .json({ message: "Database error while signing up." });
  //   }
  //   res.status(200).json({ message: "Signup successful!" });
  // });
  db.query(sql, [fullname, email, password, phone], (err, result) => {
    if (err) {
      console.error("❌ MySQL Error:", err.sqlMessage);
      return res.status(500).json({ message: err.sqlMessage });
    }
    res.status(200).json({ message: "Signup successful!" });
  });
});

export default router;
