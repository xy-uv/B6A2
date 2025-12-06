import { Request, Response } from "express";
import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { AuthServices } from "./auth.services";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthServices.signup(req.body);

  reply(res, {
    statusCode: 201,
    message: "User inserted successfully!!",
    data: result.rows[0],
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthServices.login(email, password);
  reply(res, { statusCode: 200, message: "Login success", data: result });
});

export const AuthControllers = { signup, login };
