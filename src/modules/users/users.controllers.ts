import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { UsersServices } from "./users.services";

const retrieves = asyncHandler(async (req, res) => {
  const result = await UsersServices.retrieves();
  reply(res, {
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result.rows[0],
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

export const UserControllers = { retrieves, retrieve };
