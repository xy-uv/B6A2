import AppError from "../../utils/app_error";
import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { UsersServices } from "./users.services";

const retrieves = asyncHandler(async (_req, res) => {
  const result = await UsersServices.retrieves();
  reply(res, {
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result.rows,
  });
});

const retrieve = asyncHandler(async (req, res) => {
  const result = await UsersServices.retrieve(req.params.userId!);
  reply(res, {
    statusCode: 200,
    message: "User retrieved successfully",
    data: result.rows[0],
  });
});

const modify = asyncHandler(async (req, res) => {
  const result = await UsersServices.modify(req.params.userId!, req.body);
  reply(res, {
    statusCode: 200,
    message: "User updated successfully",
    data: result.rows[0],
  });
});

const destroy = asyncHandler(async (req, res) => {
  const result = await UsersServices.destroy(req.params.userId!);
  // if (result.rowCount === 0) {
  //   throw new AppError(404, "User not found!");
  // }
  reply(res, { statusCode: 200, message: "User deleted successfully" });
});

export const UserControllers = { retrieves, retrieve, modify, destroy };
