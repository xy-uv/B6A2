import { pool } from "../../config/db";

const insert = async (payload: Record<string, unknown>) => {
  const { vehicle_name, type, registration_number, daily_rent_price } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price) 
    VALUES($1,$2,$3,$4) RETURNING *`,
    [vehicle_name, type, registration_number, daily_rent_price]
  );
  return result;
};

export const VehiclesServices = { insert };
