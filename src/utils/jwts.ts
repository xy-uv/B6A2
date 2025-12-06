import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const create = (payload: Record<string, unknown>, secret: Secret, expIn: any) =>
  jwt.sign(payload, secret, {
    expiresIn: expIn,
  });

const verify = (token: string, secret: Secret): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;

export const jwts = {
  create,
  verify,
};
