const db = require("./db.model.js");
const usersModel = require("./users.model.js");

async function addPatientDoctor(patient_id, doctor_id) {
  try {
    const isDoctor = await usersModel.checkIsDoctor(doctor_id);
    const isPatient = await usersModel.checkPatientExist(patient_id);
    console.log(isDoctor);
    if (patient_id === doctor_id) {
      return { success: false, message: "patient and doctor are the same" };
    }
    if (!isDoctor) {
      // Handle the case where the doctor is not valid
      return { success: false, message: "Doctor not found" };
    }
    if (!isPatient) {
      // Handle the case where the doctor is not valid
      return { success: false, message: "Patient not found" };
    }
    const isExisting = await isExistingPatientDoctor(patient_id, doctor_id);
    console.log(isExisting);
    if (!isExisting) {
      // Handle the case where the appointment is not available
      return { success: false, message: "relationship exists" };
    }

    const createQuery =
      "INSERT INTO patient_doctor (patient_id, doctor_id) VALUES (?, ?)";

    const result = await db.query(createQuery, [patient_id, doctor_id]);
    return {
      success: true,
      message: "relationship created successfully",
      result,
    };
  } catch (error) {
    throw error;
  }
}

async function isExistingPatientDoctor(patient_id, doctor_id) {
  const exstingQuery = `
    SELECT COUNT(*) AS exsting_count
  FROM patient_doctor
  WHERE patient_id = ?
   AND doctor_id = ?;
  `;
  const appointment = await getPatientDoctorById(patient_id, doctor_id);
  console.log("appointment");
  console.log(appointment);
  try {
    const results = await db.query(exstingQuery, [patient_id, doctor_id]);
    console.log(results);
    const exstingCount = results[0][0].exsting_count;
    console.log(exstingCount);
    return exstingCount === 0;
  } catch (error) {
    throw error;
  }
}
async function getPatientDoctorById(patient_id, doctor_id) {
  const query = `
    SELECT *
    FROM patient_doctor
    WHERE patient_id = ?
   AND doctor_id = ?;
  `;
  try {
    const results = await db.query(query, [patient_id, doctor_id]);
    console.log(results[0]);
    return results[0]; // Assuming you want to return the first (and only) result
  } catch (error) {
    throw error;
  }
}

async function deletePatientDoctor(patient_id, doctor_id) {
  const deleteQuery =
    "DELETE FROM patient_doctor WHERE patient_id = ? AND doctor_id = ?";

  try {
    const result = await db.query(deleteQuery, [patient_id, doctor_id]);
    return {
      success: true,
      message: "Patient-doctor relationship deleted",
      result,
    };
  } catch (error) {
    throw error;
  }
}
async function listAllPatientDoctorRelations() {
  const query = "SELECT * FROM patient_doctor";

  try {
    const results = await db.query(query);
    return results;
  } catch (error) {
    throw error;
  }
}
async function getPatientRelation(patient_id) {
  const query = "SELECT * FROM patient_doctor WHERE patient_id = ?";

  try {
    const results = await db.query(query, [patient_id]);
    return results;
  } catch (error) {
    throw error;
  }
}
async function getDoctorRelation(doctor_id) {
  const query = "SELECT * FROM patient_doctor WHERE doctor_id = ?";

  try {
    const results = await db.query(query, [doctor_id]);
    return results;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  addPatientDoctor,
  deletePatientDoctor,
  isExistingPatientDoctor,
  listAllPatientDoctorRelations,
  getPatientRelation,
  getDoctorRelation,
};
