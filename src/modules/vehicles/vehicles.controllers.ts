import AppError from "../../utils/app_error";
import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { VehiclesServices } from "./vehicles.services";

const insert = asyncHandler(async (req, res) => {
  const result = await VehiclesServices.insert(req.body);
  reply(res, {
    statusCode: 201,
    message: "Vehicle created successfully",
    data: result.rows[0],
  });
});

const retrieves = asyncHandler(async (_req, res) => {
  const result = await VehiclesServices.retrieves();
  reply(res, {
    statusCode: 200,
    message:
      result.rows.length > 0
        ? "Vehicles retrieved successfully"
        : "No vehicles found",
    data: result.rows,
  });
});

const retrieve = asyncHandler(async (req, res) => {
  const result = await VehiclesServices.retrieve(req.params.vehicleId!);
  reply(res, {
    statusCode: 200,
    message: "Vehicle retrieved successfully",
    data: result.rows[0],
  });
});

const modify = asyncHandler(async (req, res) => {
  const result = await VehiclesServices.modify(req.params.vehicleId!, req.body);
  reply(res, {
    statusCode: 200,
    message: "Vehicle updated successfully",
    data: result.rows[0],
  });
});

const destroy = asyncHandler(async (req, res) => {
  const result = await VehiclesServices.destroy(req.params.vehicleId!);
  if (result.rowCount === 0) {
    throw new AppError(404, "Vehicle not found!");
  }
  reply(res, { statusCode: 200, message: "Vehicle deleted successfully" });
});

export const VehiclesControllers = {
  insert,
  retrieves,
  retrieve,
  modify,
  destroy,
};
