import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { BookingsServices } from "./bookings.services";

const insert = asyncHandler(async (req, res) => {
  const result = await BookingsServices.insert(req.body);
  reply(res, {
    statusCode: 200,
    message: "Booking inserted successfully",
    data: result,
  });
});

const retrieves = asyncHandler(async (req, res) => {
  const result = await BookingsServices.retrieves();
  reply(res, {
    statusCode: 200,
    message: "Bookings retrieved successfully!",
    data: result.rows,
  });
});

export const BookingsControllers = { insert, retrieves };
