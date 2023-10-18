const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const usersRoutes = require("./routes/users.routes");
const appointmentsRoutes = require("./routes/appointments.routes");
const patientDoctorRoutes = require("./routes/patientDoctor.routes");
const fileRoutes = require("./routes/files.routes");
const verifyTonken = require("./middleware/verifyToken");

// Configure security middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(helmet()); // Set security headers

// Define routes
app.use("/patients", usersRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/patientDoctor", patientDoctorRoutes);
app.use("/files", fileRoutes);
// Add routes for other entities (doctors, appointments, files) as needed

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
