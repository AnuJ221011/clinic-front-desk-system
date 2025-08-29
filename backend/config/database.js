const mysql = require('mysql2');

const createTables = (db) => {
  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'front_desk',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create doctors table
  const createDoctorsTable = `
    CREATE TABLE IF NOT EXISTS doctors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      specialization VARCHAR(100) NOT NULL,
      gender ENUM('male', 'female', 'other') NOT NULL,
      location VARCHAR(100) NOT NULL,
      availability JSON NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create appointments table
  const createAppointmentsTable = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_name VARCHAR(100) NOT NULL,
      patient_phone VARCHAR(20) NOT NULL,
      patient_email VARCHAR(100),
      appointment_date DATE NOT NULL,
      appointment_time TIME NOT NULL,
      status ENUM('booked', 'completed', 'cancelled') DEFAULT 'booked',
      doctor_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (doctor_id) REFERENCES doctors(id)
    )
  `;

  // Create queue table
  const createQueueTable = `
    CREATE TABLE IF NOT EXISTS queue (
      id INT AUTO_INCREMENT PRIMARY KEY,
      queue_number INT NOT NULL,
      patient_name VARCHAR(100) NOT NULL,
      patient_phone VARCHAR(20),
      status ENUM('waiting', 'with_doctor', 'completed') DEFAULT 'waiting',
      is_priority BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Execute table creation
  db.query(createUsersTable, (err) => {
    if (err) console.log('Error creating users table:', err);
  });

  db.query(createDoctorsTable, (err) => {
    if (err) console.log('Error creating doctors table:', err);
  });

  db.query(createAppointmentsTable, (err) => {
    if (err) console.log('Error creating appointments table:', err);
  });

  db.query(createQueueTable, (err) => {
    if (err) console.log('Error creating queue table:', err);
  });

  // Insert default user
  const insertDefaultUser = `
    INSERT IGNORE INTO users (username, password, name, role) 
    VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'front_desk')
  `;
  
  db.query(insertDefaultUser, (err) => {
    if (err) console.log('Error inserting default user:', err);
  });
};

module.exports = { createTables };