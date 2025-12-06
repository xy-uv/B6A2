import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import AppError from "../../utils/app_error";
import { jwts } from "../../utils/jwts";
import variables from "../../config";

const signup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  let hashedPassword;
  if (typeof password === "string" && password.length >= 6) {
    hashedPassword = await bcrypt.hash(password as string, 11);
  } else {
    throw new AppError(400, "Password length must be greater or equal 6 ch");
  }

  const result = await pool.query(
    `
    INSERT INTO users (
    name,
    email,
    password,
    phone,
    role)
    VALUES (
    $1,
    $2,
    $3,
    $4,
    $5)
    RETURNING *;
    `,
    [name, email, hashedPassword, phone, role]
  );
  return result;
};

const login = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new AppError(404, "User not found!");
  }
  const user = result.rows[0];
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new AppError(403, "Wrong Password!");
  }
  const token = jwts.create(
    {
      id: user?.id,
      email: user?.email,
      role: user?.role,
    },
    variables.jwt_secret,
    variables.jwt_expires
  );
  // console.log(token);
  return {
    token,
    user,
  };
};

export const AuthServices = { signup, login };
