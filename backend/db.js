

// db.js
import mysql from "mysql2";

// Create connection to database
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "myprojectdb",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log(" Connected to MySQL as ID", db.threadId);
});

export default db;
