const appointmentModel = require("../models/appointments.model");

async function createAppointment(req, res) {
  const { patient_id, doctor_id, appointment_date /*,status */ } = req.body;
  const status = "Pending";
  console.log(req.body);
  try {
    const result = await appointmentModel.createAppointment(
      patient_id,
      doctor_id,
      appointment_date,
      status,
    );

    if (result.success) {
      res.status(201).json({ message: result.message, result: result.result });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new appointment" });
  }
}

async function updateAppointmentStatus(req, res) {
  const { appointmentId, newStatusValue } = req.body;
  try {
    const result = appointmentModel.changeStatus(appointmentId, newStatusValue);
    res
      .status(200)
      .json({ message: "Appointment status updated successfully" });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update isdoctor status" });
    res.end();
  }
}

async function getAppointmentsByDoctorId(req, res) {
  const { doctorId } = req.params;

  try {
    const appointments =
      await appointmentModel.getAppointmentsByDoctorId(doctorId);

    if (appointments.length === 0) {
      res.status(404).json({ error: "No appointments found for the doctor" });
    } else {
      res.status(200).json(appointments);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  createAppointment,
  updateAppointmentStatus,
  getAppointmentsByDoctorId,
};
