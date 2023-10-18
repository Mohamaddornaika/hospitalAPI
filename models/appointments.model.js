const db = require("./db.model.js");
const usersModel = require("./users.model.js");

async function createAppointment(
  patient_id,
  doctor_id,
  appointment_date,
  status,
) {
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
    const isAvailable = await checkAvailability(
      patient_id,
      doctor_id,
      appointment_date,
      status,
    );
    console.log(isAvailable);
    if (!isAvailable) {
      // Handle the case where the appointment is not available
      return { success: false, message: "Appointment conflict" };
    }

    const createQuery =
      "INSERT INTO Appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)";

    const result = await db.query(createQuery, [
      patient_id,
      doctor_id,
      appointment_date,
      status,
    ]);
    return {
      success: true,
      message: "Appointment created successfully",
      result,
    };
  } catch (error) {
    throw error;
  }
}

async function checkAvailability(
  patient_id,
  doctor_id,
  appointment_date,
  status,
) {
  const conflictQuery = `
    SELECT COUNT(*) AS conflict_count
  FROM Appointments
  WHERE (patient_id = ? OR doctor_id = ?)
  AND appointment_date >= DATE_SUB(?, INTERVAL 10 MINUTE)
  AND appointment_date <= DATE_ADD(?, INTERVAL 10 MINUTE)
  AND status != 'Canceled';
  `;

  try {
    const results = await db.query(conflictQuery, [
      patient_id,
      doctor_id,
      appointment_date,
      appointment_date,
    ]);
    console.log(results);
    const conflictCount = results[0][0].conflict_count;
    console.log(conflictCount);
    return conflictCount === 0;
  } catch (error) {
    throw error;
  }
}
async function checkAvailabilityExisting(appointment_id) {
  const conflictQuery = `
    SELECT COUNT(*) AS conflict_count
  FROM Appointments
  WHERE (patient_id = ? OR doctor_id = ?)
  AND appointment_date >= DATE_SUB(?, INTERVAL 10 MINUTE)
  AND appointment_date <= DATE_ADD(?, INTERVAL 10 MINUTE)
  AND status != 'Canceled'
  AND appointment_id != ?;
  `;
  const appointment = await getAppointmentById(appointment_id);

  try {
    const results = await db.query(conflictQuery, [
      appointment[0].patient_id,
      appointment[0].doctor_id,
      appointment[0].appointment_date,
      appointment[0].appointment_date,
      appointment_id,
    ]);
    console.log(results);
    const conflictCount = results[0][0].conflict_count;
    console.log(conflictCount);
    return conflictCount === 0;
  } catch (error) {
    throw error;
  }
}
async function getAppointmentById(appointment_id) {
  const query = `
    SELECT *
    FROM Appointments
    WHERE appointment_id = ?;
  `;
  try {
    const results = await db.query(query, [appointment_id]);
    console.log(results[0]);
    return results[0]; // Assuming you want to return the first (and only) result
  } catch (error) {
    throw error;
  }
}
async function changeStatus(appointment_id, newStatusValue, callback) {
  // Perform a database update to change the isdoctor value and field
  const query = "UPDATE appointments SET status = ? WHERE appointment_id = ?";
  const isAvailable = await checkAvailabilityExisting(appointment_id);
  if (!isAvailable) {
    return { success: false, message: "Appointment conflict" };
  }
  db.query(query, [newStatusValue, appointment_id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
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
  createAppointment,
  changeStatus,
  getAppointmentsByDoctorId,
};
