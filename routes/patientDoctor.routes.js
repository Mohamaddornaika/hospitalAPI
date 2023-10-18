const express = require("express");
const router = express.Router();
const patientDoctorController = require("../controllers/patientDoctor.controller");
const dataValidation = require("../middleware/postValidation");
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/addPatientDoctor",
  verifyToken,
  // dataValidation.validateCreateAppointment,
  patientDoctorController.addPatientDoctor,
);
router.delete(
  "/deletePatientDoctor",
  verifyToken,
  patientDoctorController.deletePatientDoctor,
);
router.get(
  "/listAllPatientDoctorRelations",
  verifyToken,
  patientDoctorController.listAllPatientDoctorRelations,
);
router.get(
  "/getPatientRelation/:patient_id",
  verifyToken,
  patientDoctorController.getPatientRelation,
);
router.get(
  "/getDoctorRelation/:doctor_id",
  verifyToken,
  patientDoctorController.getDoctorRelation,
);

module.exports = router;
