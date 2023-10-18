const express = require("express");
const router = express.Router();
const fileController = require("../controllers/files.controller");
const dataValidation = require("../middleware/postValidation");
const verifyToken = require("../middleware/verifyToken");

router.post("/upload", verifyToken, fileController.uploadFile);
router.delete("/delete/:fileId", verifyToken, fileController.deleteFile);
router.post("/edit", verifyToken, fileController.editFile);
router.get(
  "/getAllFilesForPatient/:patient_id",
  verifyToken,
  fileController.getFilesByPatientId,
);
// Add other routes for CRUD operations here

module.exports = router;
