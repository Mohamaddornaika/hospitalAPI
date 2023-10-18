const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller.js");
const dataValidation = require("../middleware/postValidation");
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/register",
  verifyToken,
  dataValidation.validatecreateUser,
  usersController.createUser,
);
router.post(
  "/updateIsDoctor",
  verifyToken,
  dataValidation.validateUpdateIsDoctorStatus,
  usersController.updateIsDoctorStatus,
);
router.post("/login", verifyToken, usersController.loginUser);
router.post(
  "/updateIsAdmin",
  verifyToken,
  dataValidation.validateUpdateIsAdminStatus,
  usersController.updateIsAdminStatus,
);
router.get("/doctors", verifyToken, usersController.getAllDoctors);
router.get("/Patients", verifyToken, usersController.getAllPatients);
router.get(
  "/searchByFielddoctors",
  verifyToken,
  usersController.searchDoctorsByField,
);
router.get(
  "/searchByNamedoctors",
  verifyToken,
  usersController.searchDoctorsByName,
);

// Add more routes as needed

module.exports = router;
