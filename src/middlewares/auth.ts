import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app_error";
import { jwts } from "../utils/jwts";
import variables from "../config";
import { JwtPayload } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const headers = req.headers.authorization;
      if (!headers) {
        throw new AppError(401, "Invalid credentials");
      }
      const token = headers?.split(" ")[1];
      if (!token) {
        throw new AppError(401, "Token expected");
      }
      let decoded: JwtPayload;
      try {
        decoded = jwts.verify(token, variables.jwt_secret);
      } catch (error: any) {
        if (error.name === "TokenExpiredError") {
          throw new AppError(401, "Token has expired. Please log in again.");
        }
        if (error.name === "JsonWebTokenError") {
          throw new AppError(401, "Invalid token. Authentication failed.");
        }
        throw new AppError(401, error.message);
      }
      req.user = decoded;

      if (roles.length > 0) {
        if (!decoded.role || !roles.includes(decoded.role)) {
          throw new AppError(
            403,
            "Forbidden: You don't have permission to access this resource."
          );
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const isOwnership = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const isCustomer = req.user?.role === "customer";
    const isOwner = req.params.userId == req.user?.id;

    if (isCustomer && !isOwner) {
      return next(
        new AppError(
          403,
          "Forbidden Access: You do not have permission to view this resource."
        )
      );
    }

    next();
  };
};

export default auth;
