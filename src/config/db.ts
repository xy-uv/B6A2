import { Pool } from "pg";
import variables from ".";

export const pool = new Pool({
  connectionString: variables.neon_connection_str,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(111) NOT NULL,
        email VARCHAR(155) NOT NULL UNIQUE CHECK (email = LOWER(email)),
        password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(11) NOT NULL CHECK (role IN ('admin','customer')) DEFAULT 'customer'
        )
        `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(155) NOT NULL,
        type VARCHAR(15) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(55) UNIQUE NOT NULL,
        daily_rent_price INT NOT NULL CHECK(daily_rent_price>0),
        availability_status VARCHAR(25) NOT NULL CHECK (availability_status IN ('available', 'booked')) DEFAULT 'available'
        )
        `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price INT NOT NULL CHECK (total_price > 0),
        status VARCHAR(25) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')) DEFAULT 'active'
        )
        `);
  console.log(`Database connected!!`);
};
