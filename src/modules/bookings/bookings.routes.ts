import { Router } from "express";
import { BookingsControllers } from "./bookings.controllers";
import auth from "../../middlewares/auth";
import { ROLE } from "../auth/auth.constrain";

const router = Router();

router.post("/", auth(ROLE.admin, ROLE.customer), BookingsControllers.insert);
router.get("/", auth(ROLE.admin, ROLE.customer), BookingsControllers.retrieves);
router.put(
  "/:bookingId",
  auth(ROLE.admin, ROLE.customer),
  BookingsControllers.modify
);

export const BookingsRouter = router;
