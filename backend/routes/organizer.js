import express from "express";
import db from "../db.js";
import { isOrganizer } from "../middleware/organizerAuth.js";

const router = express.Router();

/* --------------------------------------
   ORGANIZER LOGIN
--------------------------------------- */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM organizer WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", err });

    if (results.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const organizer = results[0];

    req.session.organizer = {
      id: organizer.organizer_id,
      name: organizer.name,
      email: organizer.email,
      dept: organizer.department,
    };

    return res.json({
      success: true,
      message: "Organizer Login Successful",
      organizer: req.session.organizer,
    });
  });
});

/* --------------------------------------
   ORGANIZER DASHBOARD SUMMARY
--------------------------------------- */
router.get("/summary", isOrganizer, (req, res) => {
  const organizerId = req.session.organizer.id;

  const q1 =
    "SELECT COUNT(*) AS totalEvents FROM events WHERE organizer_id = ?";
  const q2 = "SELECT COUNT(*) AS totalParticipants FROM registrations";
  const q3 = "SELECT COUNT(*) AS upcoming FROM events WHERE event_date > NOW()";
  const q4 =
    "SELECT COUNT(*) AS completed FROM events WHERE event_date < NOW()";

  db.query(q1, [organizerId], (err1, r1) => {
    if (err1) return res.status(500).json({ error: err1 });

    db.query(q2, (err2, r2) => {
      if (err2) return res.status(500).json({ error: err2 });

      db.query(q3, (err3, r3) => {
        if (err3) return res.status(500).json({ error: err3 });

        db.query(q4, (err4, r4) => {
          if (err4) return res.status(500).json({ error: err4 });

          return res.json({
            success: true,
            totalEvents: r1[0]?.totalEvents || 0,
            totalParticipants: r2[0]?.totalParticipants || 0,
            upcoming: r3[0]?.upcoming || 0,
            completed: r4[0]?.completed || 0,
          });
        });
      });
    });
  });
});

/* --------------------------------------
   GET ALL PARTICIPANT REGISTRATIONS ✔ FIXED
--------------------------------------- */
router.get("/registrations", isOrganizer, (req, res) => {
  const sql = `
    SELECT 
      id AS registration_id,
      fullname,
      email,
      phone,
      event_name,
      created_at
    FROM registrations
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("REGISTRATION FETCH ERROR:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }

    return res.json({
      success: true,
      participants: results,
    });
  });
});

/* --------------------------------------
   ADD NEW EVENT (Organizer Only)
--------------------------------------- */
router.post("/add-event", isOrganizer, (req, res) => {
  const { event_name, description, date, time, location } = req.body;
  const organizer_id = req.session.organizer.id;

  if (!event_name || !date || !time || !location) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const sql = `
    INSERT INTO events (event_name, description, date, time, location, organizer_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [event_name, description, date, time, location, organizer_id],
    (err, result) => {
      if (err) {
        console.error("EVENT INSERT ERROR:", err);
        return res.status(500).json({ success: false, message: "DB Error" });
      }

      return res.json({ success: true, message: "Event added successfully!" });
    }
  );
});

/* --------------------------------------
   GET ALL EVENTS
--------------------------------------- */
router.get("/events", isOrganizer, (req, res) => {
  const sql = `
    SELECT 
      event_id,
      event_name,
      description,
      date,
      time,
      location
    FROM events
    ORDER BY event_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("EVENTS FETCH ERROR:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }

    return res.json({
      success: true,
      events: results,
    });
  });
});

router.get("/my-events", isOrganizer, (req, res) => {
  const organizerId = req.session.organizer.id;

  const sql = `
    SELECT event_id, event_name, description, date, time, location
    FROM events
    WHERE organizer_id = ?
    ORDER BY date ASC
  `;

  db.query(sql, [organizerId], (err, results) => {
    if (err) return res.status(500).json({ success: false, err });
    res.json({ success: true, events: results });
  });
});

router.delete("/delete-event/:id", isOrganizer, (req, res) => {
  const eventId = req.params.id;

  const sql = "DELETE FROM events WHERE event_id = ?";
  db.query(sql, [eventId], (err, result) => {
    if (err) return res.status(500).json({ success: false, err });

    res.json({ success: true, message: "Event deleted successfully" });
  });
});

router.put("/update-event/:id", isOrganizer, (req, res) => {
  const eventId = req.params.id;
  const { event_name, description, date, time, location } = req.body;

  const sql = `
    UPDATE events 
    SET 
      event_name = ?, 
      description = ?, 
      \`date\` = ?, 
      \`time\` = ?, 
      location = ?
    WHERE event_id = ?
  `;

  db.query(
    sql,
    [event_name, description, date, time, location, eventId],
    (err, result) => {
      if (err) {
        console.error("UPDATE ERROR:", err);
        return res
          .status(500)
          .json({ success: false, message: "DB Error", err });
      }

      res.json({ success: true, message: "Event updated successfully!" });
    }
  );
});

export default router;
