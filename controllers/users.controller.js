const db = require("../models/users.model");
const jwt = require("jsonwebtoken");

const secretKey = "MohamadSecureCode1999";
// Handle POST request to create a new patient

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Step 2: Query the database to check if the user exists
    const user = await db.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Step 3: Check if the provided password matches the stored hashed password
    const passwordMatch = await db.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Passwords match, generate a token and send a successful response
    const token = jwt.sign({ email: user.email, id: user.id }, secretKey);
    console.log("logged In");
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
function createUser(req, res) {
  const { name, email, age, password, field, isdoctor, isadmin } = req.body;
  try {
    const result = db.createUser(name, email, age, password, null, 0, 0);
    const user = { email: email, role: "patient" };
    const token = jwt.sign(user, secretKey);
    res.status(201).json({ token });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create a new patient" });
    res.end();
  }
}
function updateIsDoctorStatus(req, res) {
  const { userId, newIsDoctorValue, newFieldValue } = req.body;
  try {
    const result = db.changeIsDoctor(userId, newIsDoctorValue, newFieldValue);
    res.status(200).json({ message: "isdoctor status updated successfully" });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update isdoctor status" });
    res.end();
  }
}

function updateIsAdminStatus(req, res) {
  const { userId, newIsAdminValue } = req.body;
  try {
    const result = db.changeIsAdmin(userId, newIsAdminValue);
    res.status(200).json({ message: "isadmin status updated successfully" });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update isadmin status" });
    res.end();
  }
}

// function getAllDoctors(req, res) {
//   db.getDoctors((error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Failed to retrieve doctors" });
//     }

//     res.json(results);
//   });
// }
async function getAllDoctors(req, res) {
  try {
    const results = await db.getDoctors();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve doctors" });
  }
}
async function getAllPatients(req, res) {
  try {
    const results = await db.getPatients();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve doctors" });
  }
}
async function searchDoctorsByName(req, res) {
  const { name } = req.query;

  try {
    const results = await db.searchDoctorsByName(name);
    console.log(results);
    if (results) res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search for doctors by name" });
  }
}
async function searchDoctorsByField(req, res) {
  const { field } = req.query;

  try {
    const results = await db.searchDoctorsByField(field);
    console.log(results[0] === []);
    if (results[0] === []) res.json(results);
    res.status(500).json({ error: "No doctors by field" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search for doctors by field" });
  }
}
module.exports = {
  loginUser,
  createUser,
  updateIsDoctorStatus,
  updateIsAdminStatus,
  getAllDoctors,
  getAllPatients,
  searchDoctorsByField,
  searchDoctorsByName,
};
