const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mohamad",
});
let newDatabase = false;
db.query("CREATE DATABASE IF NOT EXISTS hospital", (createDbErr) => {
  if (createDbErr) {
    console.error("Error creating database:", createDbErr);
    return;
  }
  console.log("Database created or already exists");

  db.query("USE hospital", (useDbErr) => {
    if (useDbErr) {
      console.error("Error using database:", useDbErr);
      return;
    }
    console.log(newDatabase);
    db.query(
      `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    field VARCHAR(255),
    isdoctor Bool NOT NULL,
    isadmin bool NOT NULL
  )`,
      (createTableErr) => {
        if (createTableErr) {
          console.error("Error creating table:", createTableErr);
          return;
        }
        console.log("users Table created or already exists");
        db.query(
          `CREATE TABLE IF NOT EXISTS patient_doctor (
              patient_id INT,
              doctor_id INT
            )`,
          (createTableErr) => {
            if (createTableErr) {
              console.error(
                "Error creating patient_doctor table:",
                createTableErr,
              );
              return;
            }
            console.log("patient_doctor table created or already exists");
            db.query(
              `CREATE TABLE IF NOT EXISTS files (
        file_id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        file_data LONGBLOB NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        doctor_id INT,
        patient_id INT
    );`,
              (createTableErr) => {
                if (createTableErr) {
                  console.error("Error creating files table:", createTableErr);
                  return;
                }

                console.log("files table created or already exists");
                db.query(
                  `CREATE TABLE IF NOT EXISTS appointments (
        appointment_id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id INT,
        doctor_id INT,
        appointment_date DATETIME,
        status ENUM('Scheduled', 'Canceled', 'Completed', 'Pending') NOT NULL

     );`,
                  (createTableErr) => {
                    if (createTableErr) {
                      console.error(
                        "Error creating appointments table:",
                        createTableErr,
                      );
                      return;
                    }
                    console.log("appointments table created or already exists");
                  },
                );
              },
            );
          },
        );
      },
    );

    console.log("Using the hospital database");
  });
});

// Export the pool to be used in other parts of your application
module.exports = db.promise();
