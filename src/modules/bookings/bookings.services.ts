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
  const vehicle = vehicleResult.rows[0];
  const total_price = rented_day * vehicle.daily_rent_price;
  if (total_price <= 0) {
    throw new AppError(
      400,
      "Total rent price must be grater double check you start and end date. End day must grater from start day."
    );
  }
  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  return {
    ...result.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

export const BookingsServices = { insert };
