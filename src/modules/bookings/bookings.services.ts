import { pool } from "../../config/db";
import AppError from "../../utils/app_error";

const insert = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const rented_day = Math.ceil(
    (new Date(rent_end_date as Date).getTime() -
      new Date(rent_start_date as Date).getTime()) /
      (24 * 60 * 60 * 1000)
  );
  const vehicleResult = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);
  if (vehicleResult.rows.length == 0) {
    throw new AppError(400, "Vehicle not found!");
  }
  const vehicle = await vehicleResult.rows[0];

  if (vehicle.availability_status === "booked") {
    throw new AppError(400, "Vehicle already booked!");
  }
  const total_price = rented_day * Number(vehicle.daily_rent_price);
  if (total_price <= 0) {
    throw new AppError(
      400,
      "Total rent price must be grater double check you start and end date. End day must grater from start day."
    );
  }
  const result = await pool.query(
    `
    INSERT INTO bookings (
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price)
    VALUES (
    $1,
    $2,
    $3,
    $4,
    $5)
    RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const vehicleStatus = await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1 RETURNING *`,
    [vehicle_id]
  );
  return {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicleStatus.rows[0].vehicle_name,
      daily_rent_price: vehicleStatus.rows[0].daily_rent_price,
    },
  };
};

const retrieves = async () => {
  const result = await pool.query(`
    SELECT
    b.id,
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.rent_end_date,
    b.total_price,
    b.status,
    json_build_object(
        'name',  u.name,
        'email', u.email
    ) AS customer,
    json_build_object(
        'vehicle_name',        v.vehicle_name,
        'registration_number', v.registration_number
    ) AS vehicle
    FROM bookings b
    JOIN users    u ON u.id = b.customer_id
    JOIN vehicles v ON v.id = b.vehicle_id
    `);
  return result;
};

export const BookingsServices = { insert, retrieves };
