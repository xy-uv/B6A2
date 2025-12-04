import { ErrorRequestHandler } from "express";
import AppError from "../utils/app_error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errors = null;

  if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errors = error.stack;
  } else if (error instanceof Error) {
    statusCode = 400;
    message = error.message;
    errors = error.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export default globalErrorHandler;
