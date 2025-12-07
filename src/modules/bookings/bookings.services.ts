import { pool } from "../../config/db";
import AppError from "../../utils/app_error";
import { ROLE } from "../auth/auth.constrain";

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

const retrieves = async (user: Record<string, unknown>) => {
  let result;
  if (user.role === ROLE.customer) {
    const bookings = await pool.query(`
    SELECT
    b.id,
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.rent_end_date,
    b.total_price,
    b.status,
    json_build_object(
        'vehicle_name',        v.vehicle_name,
        'registration_number', v.registration_number,
        'type',                v.type          
    ) AS vehicle
    FROM bookings b
    JOIN vehicles v ON v.id = b.vehicle_id
    `);
    const rs = bookings.rows.filter(
      (booking) => booking.customer_id == user.id
    );
    if (rs.length > 0) {
      result = rs;
    } else {
      throw new AppError(403, "You don't have permission to do that!");
    }
  } else if (user.role === ROLE.admin) {
    const rs = await pool.query(`
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
    result = rs.rows;
  } else {
    throw new AppError(
      403,
      "Forbidden: Maybe you are not logged in. Kindly double check everything"
    );
  }
  return result;
};

const modify = async (
  id: string,
  status: string,
  user: Record<string, unknown>
) => {
  const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    id,
  ]);
  // console.log(bookingResult);
  if (bookingResult.rows.length === 0) {
    throw new AppError(400, "Booking not founded!");
  }
  const booking = bookingResult.rows[0];
  if ((booking.rent_start_date as Date).getTime() <= new Date().getTime()) {
    throw new AppError(
      400,
      user.role === "admin"
        ? "Can't accept the returned order. Time over."
        : "Can't accept the cancelled order. Time over."
    );
  }
  if (user.role === "admin" && status === "returned") {
    const result = await pool.query(
      `UPDATE bookings SET status='returned' WHERE id=$1 RETURNING *`,
      [id]
    );
    const vehicleResult = await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING *`,
      [result.rows[0].vehicle_id]
    );
    if (vehicleResult.rows[0].availability_status == "booked") {
      throw new AppError(404, "Something went wrong!");
    }
    return {
      rs: result.rows[0],
      message: "Booking marked as returned. Vehicle is now available",
    };
  } else if (user.role === "customer" && status === "cancelled") {
    const result = await pool.query(
      `UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
      [id]
    );
    const vehicleResult = await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING *`,
      [result.rows[0].vehicle_id]
    );
    if (result.rows[0].customer_id == user.id) {
      return {
        rs: {
          ...result.rows[0],
          vehicle: {
            availability_status: vehicleResult.rows[0].availability_status,
          },
        },
        message: "Booking cancelled successfully",
      };
    } else {
      throw new AppError(403, "You don't have permission to do that!");
    }
  } else {
    throw new AppError(
      400,
      "Maybe there was some mistaken by you. Kindly double check everything"
    );
  }
};

export const BookingsServices = { insert, retrieves, modify };
