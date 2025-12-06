import { Router } from "express";
import { VehiclesControllers } from "./vehicles.controllers";

const router = Router();

router.post("/", VehiclesControllers.insert);
router.get("/", VehiclesControllers.retrieves);
router.get("/:vehicleId", VehiclesControllers.retrieve);
router.put("/:vehicleId", VehiclesControllers.modify);

export const VehiclesRouter = router;
