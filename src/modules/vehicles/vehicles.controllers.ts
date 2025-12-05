import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { VehiclesServices } from "./vehicles.services";

const insert = asyncHandler(async (req, res) => {
  const result = await VehiclesServices.insert(req.body);
  reply(res, {
    statusCode: 201,
    success: true,
    message: "Vehicle inserted successfully!!",
    data: result.rows[0],
  });
});

export const VehiclesControllers = { insert };
