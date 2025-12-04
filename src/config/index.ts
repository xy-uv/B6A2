import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const variables = {
  port: Number(process.env.PORT) ?? 5000,
  neon_connection_str: process.env.NEON_CONNECTION_STRING ?? "",
  jwt_secret: process.env.JWT_SECRET ?? "",
  jwt_expires: process.env.JWT_EXPIRES_IN ?? "3d",
} as const;

export default variables;
