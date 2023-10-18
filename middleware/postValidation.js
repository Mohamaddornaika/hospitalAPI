function validatecreateUser(req, res, next) {
  const { name, email, age, password } = req.body;

  if (name == null || email == null || age == null || password == null) {
    return res.status(400).json({
      error: "All fields must have a value",
      name,
      email,
      age,
      password,
    });
  } else {
  }
  next(); // Proceed to the route's controller if all fields are not null
}
function validateChangeAppointmentStatus(req, res, next) {
  const { appointmentId, newStatusValue } = req.body;

  if (appointmentId == null || newStatusValue == null) {
    return res.status(400).json({
      error: "All fields must have a value",
      appointmentId,
      newStatusValue,
    });
  } else {
    if (
      newStatusValue !== "Pending" ||
      newStatusValue !== "Scheduled" ||
      newStatusValue !== "Completed" ||
      newStatusValue !== "Canceled"
    ) {
      return res.status(400).json({
        error:
          "newStatusValue must be Pending or Scheduled or Completed or Canceled",
        newStatusValue,
      });
    }
  }
  next(); // Proceed to the route's controller if all fields are not null
}
function validateCreateAppointment(req, res, next) {
  const { patient_id, doctor_id, appointment_date, status } = req.body;

  if (
    patient_id == null ||
    doctor_id == null ||
    appointment_date == null ||
    status == null
  ) {
    return res.status(400).json({
      error: "All fields must have a value",
      patient_id,
      doctor_id,
      appointment_date,
      status,
    });
  } else {
    const appointmentDate = new Date(appointment_date);
    if (!isNaN(appointmentDate)) {
      const currentDate = new Date();

      if (appointmentDate >= currentDate) {
      } else {
        return res.status(400).json({
          error: "the appointment should be in the future",
        });
      }
    } else {
      return res.status(400).json({
        error: "the appointment date should be an actual date",
      });
    }
  }
  next(); // Proceed to the route's controller if all fields are not null
}
function validateUpdateIsDoctorStatus(req, res, next) {
  const { userId, newIsDoctorValue, newFieldValue } = req.body;

  if (userId == null || newIsDoctorValue == null || newFieldValue == null) {
    return res.status(400).json({
      error: "All fields must have a value",
      userId,
      newIsDoctorValue,
      newFieldValue,
    });
  } else {
  }
  next(); // Proceed to the route's controller if all fields are not null
}
function validateUpdateIsAdminStatus(req, res, next) {
  const { userId, newIsAdminValue } = req.body;

  if (userId == null || newIsAdminValue == null) {
    return res.status(400).json({
      error: "All fields must have a value",
      userId,
      newIsAdminValue,
    });
  } else {
  }
  next(); // Proceed to the route's controller if all fields are not null
}

module.exports = {
  validateUpdateIsDoctorStatus,
  validatecreateUser,
  validateUpdateIsAdminStatus,
  validateCreateAppointment,
  validateChangeAppointmentStatus,
};
