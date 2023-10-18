const db = require("./db.model.js");

async function insertFile(
  fileName,
  fileData,
  mimeType,
  patient_id,
  doctor_id,
  callback,
) {
  const query = `
      INSERT INTO Files (file_name, file_data, mime_type, patient_id, doctor_id)
      VALUES (?, ?, ?, ?, ?);
    `;
  console.log(query);
  try {
    const result = await db.query(
      query,
      [fileName, fileData, mimeType, patient_id, doctor_id],
      callback,
    );
    return {
      success: true,
      message: "File Added",
      result,
    };
  } catch (error) {
    throw error;
  }
}
async function deleteFile(fileId, callback) {
  console.log(fileId);
  const query = `
      DELETE FROM files
      WHERE file_id = ?;
    `;
  try {
    const result = await db.query(query, [fileId]);
    return {
      success: true,
      message: "File deleted",
      result,
    };
  } catch (error) {
    throw error;
  }
}
async function editFile(
  fileId,
  fileName,
  fileData,
  mimeType,
  patient_id,
  doctor_id,
  callback,
) {
  console.log(fileId);
  console.log(fileName);
  console.log(fileData);
  console.log(mimeType);
  console.log(patient_id);
  console.log(doctor_id);
  const query = `
      UPDATE files
      SET file_name = ?, file_data = ?, mime_type = ?, patient_id = ?, doctor_id = ?
      WHERE file_id = ?;
    `;

  try {
    const result = await db.query(query, [
      fileName,
      fileData,
      mimeType,
      patient_id,
      doctor_id,
      fileId,
    ]);
    console.log(result);
    return {
      success: true,
      message: "File edited",
      result,
    };
  } catch (error) {
    throw error;
  }
}

async function getFilesByPatientId(patientId) {
  const query = "SELECT * FROM files WHERE patient_id = ?";
  try {
    console.log(patientId);
    return await db.query(query, [patientId]);
  } catch (error) {
    throw error;
  }
}
async function getAppointmentsByDoctorId(doctorId) {
  const query = "SELECT * FROM appointments WHERE doctor_id = ?";
  try {
    const [rows] = await db.query(query, [doctorId]);
    return rows;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  insertFile,
  deleteFile,
  editFile,
  getFilesByPatientId,
  getAppointmentsByDoctorId,
};
