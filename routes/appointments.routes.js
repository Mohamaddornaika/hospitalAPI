// routes/appointmentRoutes.js

const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointments.controller");
const dataValidation = require("../middleware/postValidation");
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/CreateAppointments",
  verifyToken,
  dataValidation.validateCreateAppointment,
  appointmentController.createAppointment,
);
router.post(
  "/updateAppointmentStatus",
  verifyToken,
  dataValidation.validateChangeAppointmentStatus,
  appointmentController.updateAppointmentStatus,
);
router.get(
  "/getAppointmentsByDoctor/:doctorId",
  verifyToken,
  appointmentController.getAppointmentsByDoctorId,
);

// Add other routes for CRUD operations here

module.exports = router;
