// controllers/fileController.js
const fs = require("fs");
const File = require("../models/files.model");

async function uploadFile(req, res) {
  const { filePath, fileName, mimeType, patient_id, doctor_id } = req.body;

  try {
    const fileData = await readFileAsync(filePath);
    const fileSize = Buffer.byteLength(fileData);

    const result = await File.insertFile(
      fileName,
      fileData,
      mimeType,
      patient_id,
      doctor_id,
    );
    console.log(result);
    if (result.success) {
      res.status(200).json({
        message: "File added successfully",
      });
    } else {
      res.status(400).json({ error: "Failed to add the File" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
async function deleteFile(req, res) {
  const fileId = req.params.fileId; // Assuming the file ID is passed as a URL parameter
  try {
    const result = await File.deleteFile(fileId);
    if (result.success) {
      if (result.result[0].affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "File not found in the database" });
      }

      res.status(200).json({
        message: "File deleted successfully",
      });
    } else {
      res.status(400).json({ error: "File deleted from the database" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function editFile(req, res) {
  const { fileId, filePath, fileName, mimeType, patient_id, doctor_id } =
    req.body;
  console.log(fileId);
  try {
    const fileData = await readFileAsync(filePath);
    const fileSize = Buffer.byteLength(fileData);

    const result = await File.editFile(
      fileId,
      fileName,
      fileData,
      mimeType,
      patient_id,
      doctor_id,
    );
    console.log(result);
    if (result.success) {
      console.log(result.result[0].affectedRows);
      if (result.result[0].affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "File not found in the database" });
      }
      res.status(200).json({
        message: "File added successfully",
      });
    } else {
      res.status(400).json({ error: "Failed to add the File" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getFilesByPatientId(req, res) {
  const { patient_id } = req.params; // Assuming patient_id is passed as a URL parameter

  try {
    const [rows, fields] = await File.getFilesByPatientId(patient_id);
    console.log(rows);
    if (rows.length === 0) {
      res.status(404).json({ error: "No files found for the patient" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { deleteFile, uploadFile, editFile, getFilesByPatientId };
