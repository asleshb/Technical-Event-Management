// import React, { useEffect, useState } from "react";
// import OrganizerNavbar from "../components/OrganizerNavbar.jsx";
// import "./OrganizerDashboard.css";

// export default function OrganizerDashboard() {
//   const [selected, setSelected] = useState("dashboard");

//   // SUMMARY
//   const [summary, setSummary] = useState({
//     totalParticipants: 0,
//     totalEvents: 0,
//     upcoming: 0,
//     completed: 0,
//   });

//   // PARTICIPANTS
//   const [participants, setParticipants] = useState([]);

//   // EVENTS LIST
//   const [events, setEvents] = useState([]);

//   // EVENT FORM STATE
//   const [eventForm, setEventForm] = useState({
//     event_name: "",
//     description: "",
//     date: "",
//     time: "",
//     location: "",
//   });

//   const [myEvents, setMyEvents] = useState([]);

//   const [editPopup, setEditPopup] = useState(false);
//   const [editEvent, setEditEvent] = useState({});

//   /* -------------------- Fetch Summary ------------------ */
//   useEffect(() => {
//     fetch("http://localhost:5000/api/organizer/summary", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => setSummary(data));
//   }, []);

//   /* -------------------- Fetch Participants ------------------ */
//   useEffect(() => {
//     if (selected === "participants") {
//       fetch("http://localhost:5000/api/organizer/registrations", {
//         credentials: "include",
//       })
//         .then((res) => res.json())
//         .then((data) => setParticipants(data.participants || []));
//     }
//   }, [selected]);

//   /* -------------------- Fetch Events ------------------ */
//   useEffect(() => {
//     if (selected === "events") {
//       fetch("http://localhost:5000/api/organizer/events", {
//         credentials: "include",
//       })
//         .then((res) => res.json())
//         .then((data) => setEvents(data.events || []));
//     }
//   }, [selected]);

//   useEffect(() => {
//     if (selected === "dashboard") {
//       fetch("http://localhost:5000/api/organizer/my-events", {
//         credentials: "include",
//       })
//         .then((res) => res.json())
//         .then((data) => setMyEvents(data.events || []));
//     }
//   }, [selected]);

//   /* -------------------- SUBMIT EVENT FORM ------------------ */
//   const handleAddEvent = (e) => {
//     e.preventDefault();

//     fetch("http://localhost:5000/api/organizer/add-event", {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(eventForm),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data.message);

//         if (data.success) {
//           // Reset form
//           setEventForm({
//             event_name: "",
//             description: "",
//             date: "",
//             time: "",
//             location: "",
//           });

//           // Refresh events
//           setSelected("events");
//         }
//       });
//   };

//   /* -------------------- DELETE EVENT FUNCTION ------------------ */
//   const deleteEvent = (id) => {
//     if (!confirm("Delete this event?")) return;

//     fetch(`http://localhost:5000/api/organizer/delete-event/${id}`, {
//       method: "DELETE",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data.message);

//         // refresh the "Your Events" table
//         fetch("http://localhost:5000/api/organizer/my-events", {
//           credentials: "include",
//         })
//           .then((res) => res.json())
//           .then((data) => setMyEvents(data.events || []));
//       });
//   };

//   return (
//     <div>
//       <OrganizerNavbar setSelected={setSelected} />

//       <div className="org-dashboard">
//         {selected === "dashboard" && (
//           <>
//             <h1>Organizer Dashboard</h1>

//             <div className="stats-box">
//               <div className="stat-card pink">
//                 <h3>Total Participants</h3>
//                 <p>{summary.totalParticipants}</p>
//               </div>

//               <div className="stat-card purple">
//                 <h3>Total Events</h3>
//                 <p>{summary.totalEvents}</p>
//               </div>

//               <div className="stat-card blue">
//                 <h3>Upcoming</h3>
//                 <p>{summary.upcoming}</p>
//               </div>

//               <div className="stat-card green">
//                 <h3>Completed</h3>
//                 <p>{summary.completed}</p>
//               </div>
//             </div>

//             {/* ⭐ ADD THIS BLOCK BELOW THE SUMMARY ⭐ */}
//             <h2 style={{ marginTop: "40px" }}>Your Events</h2>

//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {myEvents.length > 0 ? (
//                   myEvents.map((ev) => (
//                     <tr key={ev.event_id}>
//                       <td>{ev.event_id}</td>
//                       <td>{ev.event_name}</td>
//                       <td>{ev.date}</td>
//                       <td>{ev.time}</td>
//                       <td>
//                         <button
//                           className="edit-btn"
//                           onClick={() => openEdit(ev)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="delete-btn"
//                           onClick={() => deleteEvent(ev.event_id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       style={{ textAlign: "center", padding: "20px" }}
//                     >
//                       No events created yet
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </>
//         )}

//         {/* PARTICIPANTS SECTION */}
//         {selected === "participants" && (
//           <div className="content-box">
//             <h1>All Participants</h1>

//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Full Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Event</th>
//                   <th>Registered On</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {participants.length > 0 ? (
//                   participants.map((p) => (
//                     <tr key={p.registration_id}>
//                       <td>{p.registration_id}</td>
//                       <td>{p.fullname}</td>
//                       <td>{p.email}</td>
//                       <td>{p.phone}</td>
//                       <td>{p.event_name}</td>
//                       <td>{p.created_at}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="no-data">
//                       No participants found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* EVENTS SECTION */}
//         {selected === "events" && (
//           <div className="content-box event-layout">
//             {/* LEFT FORM */}
//             <div className="event-form-section">
//               <h2>Add Event</h2>

//               <form className="event-form" onSubmit={handleAddEvent}>
//                 <input
//                   type="text"
//                   placeholder="Event Name"
//                   value={eventForm.event_name}
//                   onChange={(e) =>
//                     setEventForm({ ...eventForm, event_name: e.target.value })
//                   }
//                   required
//                 />

//                 <textarea
//                   placeholder="Description"
//                   value={eventForm.description}
//                   onChange={(e) =>
//                     setEventForm({ ...eventForm, description: e.target.value })
//                   }
//                 ></textarea>

//                 <input
//                   type="date"
//                   value={eventForm.date}
//                   onChange={(e) =>
//                     setEventForm({ ...eventForm, date: e.target.value })
//                   }
//                   required
//                 />

//                 <input
//                   type="time"
//                   value={eventForm.time}
//                   onChange={(e) =>
//                     setEventForm({ ...eventForm, time: e.target.value })
//                   }
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Location"
//                   value={eventForm.location}
//                   onChange={(e) =>
//                     setEventForm({ ...eventForm, location: e.target.value })
//                   }
//                   required
//                 />

//                 <button type="submit" className="add-btn">
//                   Add Event
//                 </button>
//               </form>
//             </div>

//             {/* RIGHT EVENTS TABLE */}
//             <div className="event-list-section">
//               <h2>All Events</h2>

//               <table className="styled-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Event</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Location</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {events.length > 0 ? (
//                     events.map((ev) => (
//                       <tr key={ev.event_id}>
//                         <td>{ev.event_id}</td>
//                         <td>{ev.event_name}</td>
//                         <td>{ev.date}</td>
//                         <td>{ev.time}</td>
//                         <td>{ev.location}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr className="no-data-row">
//                       <td colSpan="5">No events yet</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/OrganizerDashboard.jsx
import React, { useEffect, useState } from "react";
import OrganizerNavbar from "../components/OrganizerNavbar.jsx";
import "./OrganizerDashboard.css";

export default function OrganizerDashboard() {
  const [selected, setSelected] = useState("dashboard");

  // SUMMARY
  const [summary, setSummary] = useState({
    totalParticipants: 0,
    totalEvents: 0,
    upcoming: 0,
    completed: 0,
  });

  // PARTICIPANTS
  const [participants, setParticipants] = useState([]);

  // EVENTS LIST (all events)
  const [events, setEvents] = useState([]);

  // MY EVENTS (dashboard personal events)
  const [myEvents, setMyEvents] = useState([]);

  // ADD EVENT FORM
  const [eventForm, setEventForm] = useState({
    event_name: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  // EDIT POPUP
  const [editPopup, setEditPopup] = useState(false);
  const [editEvent, setEditEvent] = useState({});

  /* -------------------- Fetch Summary ------------------ */
  useEffect(() => {
    fetch("http://localhost:5000/api/organizer/summary", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Summary fetch error:", err));
  }, []);

  /* -------------------- Fetch Participants ------------------ */
  useEffect(() => {
    if (selected === "participants") {
      fetch("http://localhost:5000/api/organizer/registrations", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setParticipants(data.participants || []))
        .catch((err) => console.error("Registrations fetch error:", err));
    }
  }, [selected]);

  /* -------------------- Fetch Events (All Events) ------------------ */
  useEffect(() => {
    if (selected === "events") {
      fetch("http://localhost:5000/api/organizer/events", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setEvents(data.events || []))
        .catch((err) => console.error("Events fetch error:", err));
    }
  }, [selected]);

  /* -------------------- Fetch My Events (Dashboard) ------------------ */
  useEffect(() => {
    if (selected === "dashboard") {
      fetch("http://localhost:5000/api/organizer/my-events", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setMyEvents(data.events || []))
        .catch((err) => console.error("My-events fetch error:", err));
    }
  }, [selected]);

  /* -------------------- Add Event ------------------ */
  const handleAddEvent = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/organizer/add-event", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventForm),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        if (data.success) {
          setEventForm({
            event_name: "",
            description: "",
            date: "",
            time: "",
            location: "",
          });

          // show events tab (it will refetch events useEffect)
          setSelected("events");
        }
      })
      .catch((err) => {
        console.error("Add event error:", err);
        alert("Failed to add event");
      });
  };

  /* -------------------- Delete Event ------------------ */
  const deleteEvent = (id) => {
    if (!confirm("Delete this event?")) return;

    fetch(`http://localhost:5000/api/organizer/delete-event/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Deleted");

        // refresh the "Your Events" table
        fetch("http://localhost:5000/api/organizer/my-events", {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setMyEvents(data.events || []))
          .catch((err) => console.error("Refresh my-events error:", err));
      })
      .catch((err) => {
        console.error("Delete event error:", err);
        alert("Delete failed");
      });
  };

  /* -------------------- OPEN EDIT POPUP ------------------ */
  const openEdit = (ev) => {
    // ensure we copy object so inputs are controlled
    setEditEvent({ ...ev });
    setEditPopup(true);
  };

  /* -------------------- UPDATE EVENT ------------------ */
  const updateEvent = () => {
    // --- FIX DATE ---
    let cleanDate = editEvent.date;
    if (cleanDate.includes("T")) {
      cleanDate = cleanDate.split("T")[0]; // keep only YYYY-MM-DD
    }

    // --- FIX TIME ---
    let cleanTime = editEvent.time;
    if (cleanTime.length > 5) {
      cleanTime = cleanTime.substring(0, 5); // take HH:MM only
    }

    fetch(
      `http://localhost:5000/api/organizer/update-event/${editEvent.event_id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editEvent,
          date: cleanDate,
          time: cleanTime,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setEditPopup(false);

        fetch("http://localhost:5000/api/organizer/my-events", {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setMyEvents(data.events || []));
      });
  };

  return (
    <div>
      <OrganizerNavbar setSelected={setSelected} />

      <div className="org-dashboard">
        {/* ---------------- DASHBOARD ---------------- */}
        {selected === "dashboard" && (
          <>
            <h1>Organizer Dashboard</h1>

            <div className="stats-box">
              <div className="stat-card pink">
                <h3>Total Participants</h3>
                <p>{summary.totalParticipants}</p>
              </div>

              <div className="stat-card purple">
                <h3>Total Events</h3>
                <p>{summary.totalEvents}</p>
              </div>

              <div className="stat-card blue">
                <h3>Upcoming</h3>
                <p>{summary.upcoming}</p>
              </div>

              <div className="stat-card green">
                <h3>Completed</h3>
                <p>{summary.completed}</p>
              </div>
            </div>

            {/* ---------------- YOUR EVENTS TABLE ---------------- */}
            <h2 style={{ marginTop: "40px" }}>Your Events</h2>

            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myEvents.length > 0 ? (
                  myEvents.map((ev) => (
                    <tr key={ev.event_id}>
                      <td>{ev.event_id}</td>
                      <td>{ev.event_name}</td>
                      <td>{ev.description}</td>
                      <td>{ev.date}</td>
                      <td>{ev.time}</td>
                      <td>{ev.location}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => openEdit(ev)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteEvent(ev.event_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No events created yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* ---------------- PARTICIPANTS ---------------- */}
        {selected === "participants" && (
          <div className="content-box">
            <h1>All Participants</h1>

            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Registered On</th>
                </tr>
              </thead>

              <tbody>
                {participants.length > 0 ? (
                  participants.map((p) => (
                    <tr key={p.registration_id}>
                      <td>{p.registration_id}</td>
                      <td>{p.fullname}</td>
                      <td>{p.email}</td>
                      <td>{p.phone}</td>
                      <td>{p.event_name}</td>
                      <td>{p.created_at}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No participants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ---------------- EVENTS PAGE ---------------- */}
        {selected === "events" && (
          <div className="content-box event-layout">
            {/* LEFT FORM */}
            <div className="event-form-section">
              <h2>Add Event</h2>

              <form className="event-form" onSubmit={handleAddEvent}>
                <input
                  type="text"
                  placeholder="Event Name"
                  value={eventForm.event_name}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, event_name: e.target.value })
                  }
                  required
                />

                <textarea
                  placeholder="Description"
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      description: e.target.value,
                    })
                  }
                ></textarea>

                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, date: e.target.value })
                  }
                  required
                />

                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, time: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  required
                />

                <button type="submit" className="add-btn">
                  Add Event
                </button>
              </form>
            </div>

            {/* RIGHT EVENTS TABLE */}
            <div className="event-list-section">
              <h2>All Events</h2>

              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                  </tr>
                </thead>

                <tbody>
                  {events.length > 0 ? (
                    events.map((ev) => (
                      <tr key={ev.event_id}>
                        <td>{ev.event_id}</td>
                        <td>{ev.event_name}</td>
                        <td>{ev.date}</td>
                        <td>{ev.time}</td>
                        <td>{ev.location}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No events yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- EDIT POPUP ---------------- */}
        {editPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>Edit Event</h2>

              <input
                type="text"
                value={editEvent.event_name || ""}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, event_name: e.target.value })
                }
              />

              <textarea
                value={editEvent.description || ""}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, description: e.target.value })
                }
              ></textarea>

              <input
                type="date"
                value={editEvent.date ? editEvent.date.split("T")[0] : ""}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, date: e.target.value })
                }
              />

              <input
                type="time"
                value={editEvent.time || ""}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, time: e.target.value })
                }
              />

              <input
                type="text"
                value={editEvent.location || ""}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, location: e.target.value })
                }
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button className="save-btn" onClick={updateEvent}>
                  Save Changes
                </button>

                <button
                  className="close-btn"
                  onClick={() => setEditPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
