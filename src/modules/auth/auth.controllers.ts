import { Request, Response } from "express";
import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { AuthServices } from "./auth.services";

const insert = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthServices.insert(req.body);

  reply(res, {
    statusCode: 201,
    message: "User inserted successfully!!",
    data: result.rows[0],
  });
});

export const AuthControllers = { insert };
