import { pool } from "../../config/db";
import AppError from "../../utils/app_error";

const retrieves = async () => {
  return await pool.query(`SELECT * FROM users`);
};

const retrieve = async (id: string) => {
  return await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

const modify = async (id: string, payload: Record<string, unknown>) => {
  if (payload === undefined) {
    throw new AppError(400, "There was nothing to update!");
  }
  // console.log(payload);
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `
    UPDATE users
    SET
    name  = COALESCE($1, name),
    email = COALESCE($2, email),
    phone = COALESCE($3, phone),
    role  = COALESCE($4, role)
    WHERE id=$5
    RETURNING *;
    `,
    [name, email, phone, role, id]
  );
  return result;
};

const destroy = async (id: string) => {
  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1`,
    [id]
  );
  const activeBookings = bookingResult.rows.filter(
    (booking) => booking.status === "active"
  );
  if (activeBookings.length > 0) {
    throw new AppError(403, "User had active booking!");
  }
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const UsersServices = { retrieves, retrieve, modify, destroy };
