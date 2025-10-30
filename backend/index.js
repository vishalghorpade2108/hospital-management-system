import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connectDB/connect.js";
import FeedbackRoutes from "./routes/feedbackRoutes.js"
import PatientRoutes from "./routes/patientRoutes.js"
import DoctorRoutes from "./routes/doctorRoutes.js"
import AppointmentRoutes from "./routes/appointmentRoutes.js"
import MedicalRoutes from "./routes/medicalRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
dotenv.config();
const app = express();

//  Enable CORS to allow React frontend to connect
app.use(
  cors({
    origin: "http://localhost:5173",  // your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


//  Parse JSON data from request body
app.use(express.json());
connectDB();


app.use("/user/feedback",FeedbackRoutes)
app.use("/patient",PatientRoutes)
app.use("/doctor",DoctorRoutes)
app.use("/appointment",AppointmentRoutes)
app.use("/admin",adminRoutes)
app.use("/medical",MedicalRoutes)
app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));