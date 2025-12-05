import { pool } from "../../config/db";

const retrieves = async () => {
  return await pool.query(`SELECT * FROM users`);
};

const retrieve = async (id: string) => {
  return await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

export const UsersServices = { retrieves, retrieve };
