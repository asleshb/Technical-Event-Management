// import React from "react";
// import "./OrganizerNavbar.css";

// const OrganizerNavbar = ({ setSelected }) => {
//   return (
//     <nav className="org-nav">
//       <div className="nav-left">
//         <span className="logo-icon">&lt;/&gt;</span>
//         <span className="logo-text">TechFest Portal</span>

//         <button onClick={() => setSelected("dashboard")}>Dashboard</button>
//         <button onClick={() => setSelected("events")}>Events</button>
//         <button onClick={() => setSelected("participants")}>
//           Participants
//         </button>

//         <button onClick={() => setSelected("allotment")}>Allotment</button>
//         <button onClick={() => setSelected("logout")}>Logout</button>
//       </div>
//     </nav>
//   );
// };

// export default OrganizerNavbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrganizerNavbar.css";

const OrganizerNavbar = ({ setSelected }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // OPTIONAL: Clear session storage or token if you stored anything
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="org-nav">
      <div className="nav-left">
        <span className="logo-icon">&lt;/&gt;</span>
        <span className="logo-text">TechFest Portal</span>

        <button onClick={() => setSelected("dashboard")}>Dashboard</button>
        <button onClick={() => setSelected("events")}>Events</button>
        <button onClick={() => setSelected("participants")}>
          Participants
        </button>
        <button onClick={() => setSelected("allotment")}>Allotment</button>

        {/* LOGOUT BUTTON */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;
