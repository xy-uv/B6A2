import { Router } from "express";
import { BookingsControllers } from "./bookings.controllers";

const router = Router();

router.post("/", BookingsControllers.insert);

export const BookingsRouter = router;
