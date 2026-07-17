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

## Technology Stack

### Frontend (Client-Side)

- **Library:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router DOM v7
- **Styling:** HTML5, CSS3, Tailwind CSS v4
- **Icons:** Lucide React
- **HTTP Client:** Axios and Fetch API

### Backend (Server-Side)

- **Runtime Environment:** Node.js
- **Framework:** Express.js v5
- **Session Management:** Express Session
- **Cross-Origin Resource Sharing:** CORS Middleware
- **Architecture:** RESTful APIs

### Database

- **Database Management System:** MySQL
- **Database Driver:** mysql2
- **Database Name:** `myprojectdb`

---

## Installation and Setup

### Prerequisites

Before running the project, ensure the following software is installed on your system:

- Node.js
- npm
- MySQL Server
- MySQL Workbench (Recommended)
- Git

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/asleshb/Technical-Event-Management.git
cd Technical-Event-Management
```

---

### Step 2: Database Setup

Start the MySQL Server and create the project database.

```sql
CREATE DATABASE myprojectdb;
USE myprojectdb;
```

Create the required database tables.

#### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
);
```

#### Organizer Table

```sql
CREATE TABLE organizer (
    organizer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL
);
```

#### Events Table

```sql
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    organizer_id INT,
    FOREIGN KEY (organizer_id)
        REFERENCES organizer(organizer_id)
        ON DELETE CASCADE
);
```

#### Registrations Table

```sql
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

Insert the default organizer account.

```sql
INSERT INTO organizer (name, email, password, department)
VALUES (
    'CSE Admin',
    'admin@techfest.com',
    'admin123',
    'Computer Science'
);
```

---

### Step 3: Configure the Database Connection

Open the following file:

```text
backend/db.js
```

Update the MySQL credentials according to your local database configuration.

```javascript
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "myprojectdb",
});
```

---

### Step 4: Install and Run the Backend Server

Navigate to the backend directory.

```bash
cd backend
```

Install the required dependencies.

```bash
npm install
```

Start the Express server.

```bash
npm start
```

The backend server will start at:

```text
http://localhost:5000
```

---

### Step 5: Install and Run the Frontend

Open a new terminal and navigate to the frontend directory.

```bash
cd frontend/myapp
```

Install the required dependencies.

```bash
npm install
```

Start the React development server.

```bash
npm run dev
```

The frontend application will be available at:

```text
http://localhost:5173
```

---

## Default Organizer Credentials

Use the following credentials to log in as the organizer.

| Field | Value |
|--------|-------|
| Email | admin@techfest.com |
| Password | admin123 |
---

