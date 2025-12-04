import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const variables = {
  port: Number(process.env.PORT) ?? 5000,
} as const;

export default variables;
