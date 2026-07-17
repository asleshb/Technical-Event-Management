# Technical Event Management System

## Project Overview

The Technical Event Management System is a full-stack web application developed to simplify the organization and management of technical events such as Hackathons, Coding Competitions, AI/ML Challenges, Robotics Competitions, UI/UX Contests, and Gaming Events. The system provides separate interfaces for Participants and Organizers, enabling efficient event management, registration, and tracking.

The application follows a decoupled architecture with a React frontend, Node.js and Express.js backend, and a MySQL relational database. It offers secure authentication, role-based access control, event management, and participant registration through an intuitive and responsive user interface.

---

## Key Features

### Participant Features

- Secure user registration and login with session-based authentication.
- Browse technical events categorized into Development, Coding, AI & Machine Learning, Robotics, UI/UX, and Gaming.
- Register for technical events through a simple registration process.
- Personalized dashboard to view registered events, registration details, registration ID, and registration history.
- Automatic association of registered users with selected events using session management.

### Organizer Features

- Secure organizer login with role-based access.
- Interactive dashboard displaying event analytics and registration statistics.
- Complete Event Management (CRUD) including creating, viewing, updating, and deleting technical events.
- View event statistics such as Total Events, Total Participants, Upcoming Events, and Completed Events.
- Monitor participant registrations with complete participant information including name, email, contact number, and registered event.

### System Features

- Full-stack architecture using React, Node.js, Express.js, and MySQL.
- Role-based authentication and authorization using Express Session and secure HTTP cookies.
- RESTful API communication between frontend and backend.
- Responsive and modular user interface for improved user experience.
- Organized dashboard layouts for Participants and Organizers.
- MySQL relational database for efficient storage and management of users, organizers, events, and registrations.
- Modular project structure for easy maintenance and scalability.

---

## Technology Stack

### Frontend

- React 19
- Vite 7
- React Router DOM v7
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS

### Backend

- Node.js
- Express.js
- Express Session
- REST APIs

### Database

- MySQL

#### Database Tables

- Users
- Organizer
- Events
- Registrations
