import asyncHandler from "../../utils/async_handler";
import reply from "../../utils/reply";
import { BookingsServices } from "./bookings.services";

const insert = asyncHandler(async (require, res) => {
  const result = await BookingsServices.insert(require.body);
  reply(res, {
    statusCode: 200,
    success: true,
    message: "OK",
    data: result,
  });
});

export const BookingsControllers = { insert };
