import { pool } from "../../config/db";
import AppError from "../../utils/app_error";

const insert = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles (
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status) 
    VALUES (
    $1,
    $2,
    $3,
    $4,
    $5)
    RETURNING *;
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const retrieves = async () => {
  return await pool.query(`SELECT * FROM vehicles`);
};

const retrieve = async (id: string) => {
  return await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
};

const modify = async (id: string, payload: Record<string, unknown>) => {
  if (payload === undefined) {
    throw new AppError(400, "There was nothing to update!");
  }
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    UPDATE vehicles
    SET
    vehicle_name        = COALESCE($1, vehicle_name),
    type                = COALESCE($2, type),
    registration_number = COALESCE($3, registration_number),
    daily_rent_price    = COALESCE($4, daily_rent_price),
    availability_status = COALESCE($5, availability_status)
    WHERE id =$6
    RETURNING *;
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result;
};

const destroy = async (id: string) => {
  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1`,
    [id]
  );
  const activeBookings = bookingResult.rows.filter(
    (booking) => booking.status === "active"
  );
  if (activeBookings.length > 0) {
    throw new AppError(403, "Vehicle had active booking!");
  }
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
  return result;
};

export const VehiclesServices = {
  insert,
  retrieves,
  retrieve,
  modify,
  destroy,
};
