Hospital Management System API
This is the backend API for a hospital management system. It provides various routes and functions for managing patients, doctors, appointments, files, and patient-doctor relationships.

THE AUTHORIZATION SHOULD BE  JWT Bearer
Algorithm HS256
Secret MohamadSecureCode1999

Routes and Functions
Patients

Create a New Patient
Route: POST /patients/register
Json: {
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "password": "securepassword",
  "field": "NULL",
  "isdoctor":"0",
  "isadmin":"0"
}
Function: usersController.createUser
Use Case: Register a new patient with basic information.

Update IsDoctor Status
Route: POST /patients/updateIsDoctor
Json:{ 
"userId": "19",
"newIsDoctoalue":1,
"newFieldValue": "Specialty" 
}
Function: usersController.updateIsDoctorStatus
Use Case: Update the isdoctor status of a user (0 for patient, 1 for doctor).

Login User
Route: POST /patients/login
Json: {
  "email": "john@example.com",
  "password": "securepassword"
}
Function: usersController.loginUser
Use Case: Authenticate and log in a user (patient or doctor) based on email and password.

Update IsAdmin Status
Route: POST /patients/updateIsAdmin
Json:{
"userId": "20",
"newIsAdminValue":1
}
Function: usersController.updateIsAdminStatus
Use Case: Update the isadmin status of a user (0 for regular user, 1 for admin).

Get All Doctors
Route: GET /patients/doctors
Function: usersController.getAllDoctors
Use Case: Retrieve a list of all registered doctors.

Get All Patients
Route: GET /patients/patients
Function: usersController.getAllPatients
Use Case: Retrieve a list of all registered patients.

Search Doctors by Name
Route: GET /patients/searchByNamedoctors?name=john
Function: usersController.searchDoctorsByName
Use Case: Search for doctors by name.

Search Doctors by Field
Route: GET /patients/searchByFielddoctors?field=null
Function: usersController.searchDoctorsByField
Use Case: Search for doctors by field of specialization.


Appointments

Create an Appointment
Route: POST /appointments/CreateAppointments
Json: 
{  
  "patient_id": 20,
  "doctor_id": 19,
  "appointment_date": "2023-11-16T10:11:00",
  "status": "scheduled"
}
Function: appointmentController.createAppointment
Use Case: Create a new appointment between a patient and a doctor.

Update Appointment Status
Route: POST /appointments/updateAppointmentStatus
Json:
{
  "appointmentId": "1",
  "newStatusValue": "Canceled"
}
Function: appointmentController.updateAppointmentStatus
Use Case: Update the status of an appointment (e.g., from "Pending" to "Confirmed").

Get Appointments by Doctor
Route: GET /appointments/getAppointmentsByDoctor/:doctorId
example: /appointments/getAppointmentsByDoctor/19
Function: appointmentController.getAppointmentsByDoctorId
Use Case: Retrieve a list of appointments for a specific doctor.


Files

Upload a File
Route: POST /files/upload
Json: 
{
  "filePath": "C:\\Users\\DELL\\Documents\\MohamadDornaikCV.pdf",
  "fileName": "CV.pdf",
  "mimeType": "application/pdf",
  "patient_id": 19,  
  "doctor_id": 19    
}
Function: fileController.uploadFile
Use Case: Upload a file (e.g., patient records, medical reports).

Delete a File
Route: DELETE /files/delete/:fileId
example: /files/delete/2
Function: fileController.deleteFile
Use Case: Delete a file by its ID.

Edit a File
Route: POST /files/edit
Json: 
{
   "fileId" : 6,
  "filePath": "C:\\Users\\DELL\\Documents\\MohamadDornaikCV.pdf",
  "fileName": "CV.pdf",
  "mimeType": "application/pdf",
  "patient_id": 20,  
  "doctor_id": 20    
}
Function: fileController.editFile
Use Case: Edit file information (e.g., file name, content).

Get All Files for a Patient
Route: GET /files/getAllFilesForPatient/:patient_id
example: /files/getAllFilesForPatient/19
Function: fileController.getFilesByPatientId
Use Case: Retrieve all files associated with a patient.


Patient-Doctor Relationships

Add a Patient-Doctor Relationship
Route: POST /patientDoctor/addPatientDoctor
Json: {
  "patient_id": "20",
  "doctor_id": "19"
}
Function: patientDoctorController.addPatientDoctor
Use Case: Create a relationship between a patient and a doctor.

Delete a Patient-Doctor Relationship
Route: DELETE /patientDoctor/deletePatientDoctor
Json: {
  "patient_id": "20",
  "doctor_id": "19"
}
Function: patientDoctorController.deletePatientDoctor
Use Case: Delete an existing patient-doctor relationship.

List All Patient-Doctor Relationships
Route: GET /patientDoctor/listAllPatientDoctorRelations
Function: patientDoctorController.listAllPatientDoctorRelations
Use Case: Retrieve a list of all patient-doctor relationships.

Get Patient Relation
Route: GET /patientDoctor/getPatientRelation/:patient_id
Function: patientDoctorController.getPatientRelation
Use Case: Retrieve the relationship details for a specific patient.

Get Doctor Relation
Route: GET /patients/getDoctorRelation/:doctor_id
Function: patientDoctorController.getDoctorRelation
Use Case: Retrieve the relationship details for a specific doctor.


THANK YOU!
