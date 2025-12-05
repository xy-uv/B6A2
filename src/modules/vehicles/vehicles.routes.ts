import { Router } from "express";
import { VehiclesControllers } from "./vehicles.controllers";

const router = Router();

router.post("/", VehiclesControllers.insert);

export const VehiclesRouter = router;
