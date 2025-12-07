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
  const result = await BookingsServices.retrieves(req.user!);
  reply(res, {
    statusCode: 200,
    message: "Bookings retrieved successfully!",
    data: result,
  });
});

const modify = asyncHandler(async (req, res) => {
  const result = await BookingsServices.modify(
    req.params?.bookingId!,
    req.body?.status,
    req.user!
  );
  reply(res, { statusCode: 200, message: result.message, data: result.rs });
});

export const BookingsControllers = { insert, retrieves, modify };
