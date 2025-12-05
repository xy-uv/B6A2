import { Router } from "express";
import { BookingsControllers } from "./bookings.controllers";

const router = Router();

router.post("/", BookingsControllers.insert);
router.get("/", BookingsControllers.retrieves);

export const BookingsRouter = router;
