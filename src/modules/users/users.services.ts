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

export const UsersServices = { retrieves, retrieve, modify };
