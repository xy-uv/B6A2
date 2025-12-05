import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import AppError from "../../utils/app_error";

const insert = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone } = payload;
  let hashedPassword;
  if (typeof password === "string" && password.length >= 6) {
    hashedPassword = await bcrypt.hash(password as string, 11);
  } else {
    throw new AppError(400, "Password length must be greater or equal 6 ch");
  }

  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, hashedPassword, phone]
  );
  return result;
};

export const AuthServices = { insert };
