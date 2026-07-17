import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import registerRoute from "./routes/register.js";
import signupRoute from "./routes/signup.js";
import authRoute from "./routes/auth.js";
import organizerRoute from "./routes/organizer.js";
import participantRoute from "./routes/participant.js";     

const app = express();
const PORT = 5000;

/* ---------------------------------------
   1️⃣ CORS (MUST BE FIRST)
---------------------------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ---------------------------------------
   2️⃣ BODY PARSER
---------------------------------------- */
app.use(bodyParser.json());

/* ---------------------------------------
   3️⃣ SESSION (VERY IMPORTANT)
---------------------------------------- */
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // allow HTTP for localhost
      httpOnly: false, // allow frontend JS to read it
      sameSite: "lax", // required for localhost cross-site cookies
    },
  })
);

/* ---------------------------------------
   4️⃣ ROUTES (AFTER SESSION)
---------------------------------------- */
app.use("/api/register", registerRoute);
app.use("/api/signup", signupRoute);
app.use("/api", authRoute);
app.use("/api/organizer", organizerRoute); //
app.use("/api/participant", participantRoute);

/* ---------------------------------------
   5️⃣ START SERVER
---------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
