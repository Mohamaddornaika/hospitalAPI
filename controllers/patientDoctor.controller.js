const patientDoctorModel = require("../models/patientDoctor.model");

async function addPatientDoctor(req, res) {
  const { patient_id, doctor_id } = req.body;
  console.log(req.body);
  try {
    const result = await patientDoctorModel.addPatientDoctor(
      patient_id,
      doctor_id,
    );

    if (result.success) {
      res.status(201).json({ message: result.message, result: result.result });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create relation" });
  }
}
async function deletePatientDoctor(req, res) {
  const { patient_id, doctor_id } = req.body;

  try {
    // Check if the relationship exists before attempting to delete it
    const isExisting = await patientDoctorModel.isExistingPatientDoctor(
      patient_id,
      doctor_id,
    );

    if (isExisting) {
      return res
        .status(404)
        .json({ error: "Patient-doctor relationship not found" });
    }

    // Delete the patient-doctor relationship
    const result = await patientDoctorModel.deletePatientDoctor(
      patient_id,
      doctor_id,
    );
    console.log(result);
    if (result.success) {
      res
        .status(200)
        .json({ message: "Patient-doctor relationship deleted successfully" });
    } else {
      res.status(400).json({ error: "Failed to delete the relationship" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function listAllPatientDoctorRelations(req, res) {
  try {
    const relations = await patientDoctorModel.listAllPatientDoctorRelations();
    res.status(200).json(relations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getPatientRelation(req, res) {
  const { patient_id } = req.params; // Assuming you're passing these as URL parameters

  try {
    const relation =
      await patientDoctorModel.getSpecificPatientDoctorRelation(patient_id);

    if (relation.length === 0) {
      res.status(404).json({ error: "Patient relation not found" });
    } else {
      res.status(200).json(relation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function listAllPatientDoctorRelations(req, res) {
  try {
    const relations = await patientDoctorModel.listAllPatientDoctorRelations();
    res.status(200).json(relations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDoctorRelation(req, res) {
  const { doctor_id } = req.params; // Assuming you're passing these as URL parameters

  try {
    const relation = await patientDoctorModel.getDoctorRelation(doctor_id);

    if (relation.length === 0) {
      res.status(404).json({ error: "Patient-doctor relation not found" });
    } else {
      res.status(200).json(relation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  addPatientDoctor,
  listAllPatientDoctorRelations,
  deletePatientDoctor,
  getDoctorRelation,
  getPatientRelation,
};
