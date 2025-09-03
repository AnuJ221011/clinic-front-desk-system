const bcrypt = require('bcryptjs');

const createTables = async (client) => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'front_desk',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialization VARCHAR(100) NOT NULL,
        gender VARCHAR(10) CHECK (gender IN ('male','female','other')) NOT NULL,
        location VARCHAR(100) NOT NULL,
        availability JSON NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        patient_phone VARCHAR(20) NOT NULL,
        patient_email VARCHAR(100),
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status VARCHAR(20) DEFAULT 'booked' CHECK (status IN ('booked','completed','cancelled')),
        doctor_id INT NOT NULL REFERENCES doctors(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS queue (
        id SERIAL PRIMARY KEY,
        queue_number INT NOT NULL,
        patient_name VARCHAR(100) NOT NULL,
        patient_phone VARCHAR(20),
        status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting','with_doctor','completed')),
        is_priority BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const defaultPassword = await bcrypt.hash('password', 10);
    await client.query(`
      INSERT INTO users (username, password, name, role)
      VALUES ('admin', $1, 'Admin User', 'front_desk')
      ON CONFLICT (username) DO NOTHING
    `, [defaultPassword]);

    console.log('Tables created and default user inserted successfully!');
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }
};

module.exports = { createTables };
