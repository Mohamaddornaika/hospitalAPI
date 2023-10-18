const db = require("./db.model.js");
//TODO log in,get all, search dr, order,search field

function getPatient(req, res) {}
function createUser(
  name,
  email,
  age,
  password,
  field,
  isdoctor,
  isadmin,
  callback,
) {
  const query = `INSERT INTO users (name, email, age, password, field, isdoctor, isadmin) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [name, email, age, password, field, isdoctor, isadmin],
    callback,
  );
}

function changeIsDoctor(userId, newIsDoctorValue, newFieldValue, callback) {
  // Perform a database update to change the isdoctor value and field
  const query = "UPDATE users SET isdoctor = ?, field = ? WHERE id = ?"; // Assuming 'id' is the primary key of your users table
  db.query(
    query,
    [newIsDoctorValue, newFieldValue, userId],
    (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    },
  );
}

function changeIsAdmin(userId, newIsAdminValue, callback) {
  // Perform a database update to change the isdoctor value
  const query = "UPDATE users SET isadmin = ? WHERE id = ?"; // Assuming 'id' is the primary key of your users table
  db.query(query, [newIsAdminValue, userId], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
}
async function getDoctors() {
  const query = "SELECT * FROM users WHERE isdoctor = 1";
  const [rows, fields] = await db.execute(query);
  return rows;
}
async function getPatients() {
  const query = "SELECT * FROM users WHERE isdoctor = 0";
  const [rows, fields] = await db.execute(query);
  return rows;
}
async function searchDoctorsByName(name) {
  const query = "SELECT * FROM users WHERE name LIKE ? AND isdoctor = 1";
  const [rows, fields] = await db.execute(query, [`%${name}%`]);
  return rows;
}
function searchDoctorsByField(field) {
  const query = "SELECT * FROM users WHERE field LIKE ? AND isdoctor = 1";
  return db.query(query, [`%${field}%`]);
}
async function checkIsDoctor(doctor_id, callback) {
  const isDoctorQuery = "SELECT isdoctor FROM users WHERE id = ?";
  // Check if the doctor with the provided ID exists and has isdoctor set to 1
  try {
    const [results, fields] = await db.execute(isDoctorQuery, [doctor_id]);
    if (results.length > 0 && results[0].isdoctor === 1) {
      console.log("The doctor exists and is a doctor");
      return true;
    } else {
      console.log("The doctor doesn't exist or is not marked as a doctor");
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function checkPatientExist(patient_id, callback) {
  const isPatientQuery = "SELECT * FROM users WHERE id = ?";

  try {
    const [results, fields] = await db.execute(isPatientQuery, [patient_id]);
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserByEmail(email) {
  const query = "SELECT id, email, password FROM users WHERE email = ?";
  const [results] = await db.query(query, [email]);
  return results[0] || null;
}

async function comparePasswords(inputPassword, hashedPassword) {
  return inputPassword === hashedPassword;
}
module.exports = {
  getPatient,
  createUser,
  changeIsDoctor,
  changeIsAdmin,
  getDoctors,
  getPatients,
  searchDoctorsByName,
  searchDoctorsByField,
  checkIsDoctor,
  checkPatientExist,
  getUserByEmail,
  comparePasswords,
};
